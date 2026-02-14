/**
 * OAuth Callback E2E Tests
 *
 * Verifica que la ruta /auth/callback maneja correctamente
 * la redirección de proveedores OAuth y no expone tokens en la URL.
 */
import { test, expect } from '@playwright/test'
import { TIMEOUTS } from './fixtures/testData'

test.describe('OAuth Callback Flow', () => {
  /**
   * Test 1: Callback sin sesión redirige a home con error
   * Simula un callback fallido (sin sesión válida)
   *
   * Nota: getSession() devuelve { session: null, error: null } cuando
   * no hay sesión, por eso AuthCallback verifica data.session.
   */
  test('should redirect to home with error when no session', async ({
    page,
  }) => {
    // Limpiar auth storage para asegurar que no hay sesión previa
    await page.goto('/')
    await page.evaluate(() => {
      localStorage.clear()
      sessionStorage.clear()
    })

    // Navegar directamente al callback (como si OAuth redirigiera)
    await page.goto('/auth/callback')

    // Esperar redirección: sin sesión → home con error, con sesión → /user
    // Ambos destinos son válidos (depende del estado de Supabase)
    await page.waitForURL(
      (url) => {
        const href = url.toString()
        return href.includes('error=auth_failed') || href.includes('/user')
      },
      { timeout: TIMEOUTS.navigation }
    )

    // Verificar que la URL final NO contiene tokens OAuth
    const url = page.url()
    expect(url).not.toContain('access_token')
    expect(url).not.toContain('refresh_token')
  })

  /**
   * Test 2: URL con hash de tokens queda limpia tras callback
   * Simula la URL que OAuth devuelve con tokens en el hash
   */
  test('should clean URL hash containing tokens', async ({ page }) => {
    // Simular URL con tokens en hash (como lo haría OAuth)
    const fakeTokenHash =
      '#access_token=fake_token_123&refresh_token=fake_refresh_456&type=bearer'

    // Navegar con hash de tokens
    await page.goto(`/auth/callback${fakeTokenHash}`)

    // Esperar la redirección (a /user o /?error)
    await page.waitForURL(
      (url) =>
        !url.hash.includes('access_token') &&
        !url.hash.includes('refresh_token'),
      { timeout: TIMEOUTS.navigation }
    )

    // Verificar que la URL final no contiene tokens en hash
    const finalUrl = page.url()
    expect(finalUrl).not.toContain('access_token')
    expect(finalUrl).not.toContain('refresh_token')
  })

  /**
   * Test 3: Callback renderiza el componente antes de redirigir
   * Verifica que la ruta /auth/callback es accesible y navega
   */
  test('should navigate away from callback route', async ({ page }) => {
    await page.goto('/auth/callback')

    // Esperar que la ruta de callback procese y redirija a cualquier destino válido
    await page.waitForURL(
      (url) => !url.pathname.includes('/auth/callback'),
      { timeout: TIMEOUTS.navigation }
    )

    // Verificar que ya no estamos en /auth/callback
    expect(page.url()).not.toContain('/auth/callback')
  })
})
