/**
 * OAuth Callback E2E Tests
 *
 * Verifica que la ruta /auth/callback maneja correctamente
 * la redirección de proveedores OAuth y no expone tokens en la URL.
 *
 * Con PKCE habilitado, el flujo normal usa ?code=... en query string.
 * Estos tests verifican que:
 * - El callback siempre redirige fuera de /auth/callback
 * - Tokens nunca quedan visibles en la URL final
 * - El timeout redirige correctamente si no hay sesión
 */
import { test, expect } from '@playwright/test'

// Auth callback has a 10s timeout, so we need higher test timeouts
const CALLBACK_TIMEOUT = 15_000

test.describe('OAuth Callback Flow', () => {
  /**
   * Test 1: Callback sin sesión redirige tras timeout
   * Sin sesión válida ni código PKCE, AuthCallback espera hasta
   * el timeout (10s) y redirige a home con error.
   */
  test('should redirect away when no session exists', async ({ page }) => {
    // Limpiar auth storage para asegurar que no hay sesión previa
    await page.goto('/')
    await page.evaluate(() => {
      localStorage.clear()
      sessionStorage.clear()
    })

    // Navegar directamente al callback (sin code ni tokens)
    await page.goto('/auth/callback')

    // Esperar redirección: sin sesión → timeout → home,  con sesión → /user
    await page.waitForURL((url) => !url.pathname.includes('/auth/callback'), {
      timeout: CALLBACK_TIMEOUT,
    })

    // Verificar que la URL final NO contiene tokens OAuth
    const url = page.url()
    expect(url).not.toContain('access_token')
    expect(url).not.toContain('refresh_token')
  })

  /**
   * Test 2: URL con hash de tokens queda limpia tras callback
   * Simula flujo implícito legacy: tokens en el hash son limpiados
   */
  test('should clean URL hash containing tokens', async ({ page }) => {
    const fakeTokenHash =
      '#access_token=fake_token_123&refresh_token=fake_refresh_456&type=bearer'

    await page.goto(`/auth/callback${fakeTokenHash}`)

    // Esperar que la URL quede sin tokens (redirect o limpieza de hash)
    await page.waitForURL(
      (url) =>
        !url.hash.includes('access_token') &&
        !url.hash.includes('refresh_token'),
      { timeout: CALLBACK_TIMEOUT }
    )

    const finalUrl = page.url()
    expect(finalUrl).not.toContain('access_token')
    expect(finalUrl).not.toContain('refresh_token')
  })

  /**
   * Test 3: Callback muestra spinner de loading
   * Verifica UX mientras se procesa la autenticación
   */
  test('should show loading spinner during callback', async ({ page }) => {
    // Interceptar Supabase para que no resuelva rápido
    await page.route('**/auth/v1/**', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      await route.continue()
    })

    await page.goto('/auth/callback')

    // Verificar que se muestra el texto de carga
    await expect(page.getByText(/autenticando/i)).toBeVisible({ timeout: 3000 })
  })
})
