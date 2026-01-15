/**
 * Navigation E2E Tests
 *
 * Tests para navegación y rutas de la aplicación.
 */
import { test, expect } from '@playwright/test'
import { SELECTORS, TIMEOUTS, ROUTES } from './fixtures/testData'
import { loginUser } from './fixtures/testHelpers'

test.describe('Navigation', () => {
  /**
   * Test 1: Navegación básica - Home
   */
  test('should load home page', async ({ page }) => {
    await page.goto(ROUTES.home)

    // Verificar elementos básicos de la página
    await expect(page).toHaveURL(ROUTES.home)
    await expect(page.locator(SELECTORS.header.loginButton)).toBeVisible()
  })

  /**
   * Test 2: Navegación a Info
   */
  test('should navigate to info page', async ({ page }) => {
    await page.goto(ROUTES.home)

    // Click en link Info
    await page.click('a:has-text("Info")')

    // Verificar navegación
    await expect(page).toHaveURL(ROUTES.info)
  })

  /**
   * Test 3: Acceso a Dashboard autenticado
   */
  test('should access dashboard when authenticated', async ({ page }) => {
    await page.goto(ROUTES.home)

    // Login usando helper centralizado
    await loginUser(page)

    // Verificar que está en dashboard
    await expect(page).toHaveURL(ROUTES.dashboard)

    // Verificar que hay contenido del dashboard (título de bienvenida o panel)
    await expect(
      page.getByText(/bienvenido|panel de control|perfil/i)
    ).toBeVisible({
      timeout: TIMEOUTS.apiResponse,
    })
  })

  /**
   * Test 4: Header muestra estado de autenticación
   */
  test('should show correct auth state in header', async ({ page }) => {
    await page.goto(ROUTES.home)

    // Sin autenticar - muestra Login
    await expect(page.locator(SELECTORS.header.loginButton)).toBeVisible()
    await expect(page.locator(SELECTORS.header.logoutButton)).not.toBeVisible()

    // Autenticar usando helper centralizado
    await loginUser(page)

    // Autenticado - muestra Logout
    await expect(page.locator(SELECTORS.header.logoutButton)).toBeVisible()
    await expect(page.locator(SELECTORS.header.loginButton)).not.toBeVisible()
  })
})
