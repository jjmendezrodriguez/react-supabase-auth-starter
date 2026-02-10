/**
 * Authentication E2E Tests
 *
 * Tests esenciales para el flujo de autenticación.
 * Enfocados en los casos más críticos del sistema.
 */
import { test, expect } from '@playwright/test'
import { TEST_USERS, SELECTORS, TIMEOUTS } from './fixtures/testData'
import { loginUser, checkSupabaseAvailable } from './fixtures/testHelpers'

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  /**
   * Test 1: Login exitoso
   * Verifica que un usuario válido puede iniciar sesión
   * Skipped when Supabase is paused/unreachable
   */
  test('should login successfully with valid credentials', async ({ page }) => {
    test.skip(!(await checkSupabaseAvailable()), 'Supabase is not available (paused or unreachable)')
    // Usar helper centralizado para login
    await loginUser(page)

    // Verificar que el botón Login ya no está visible
    await expect(page.locator(SELECTORS.header.loginButton)).not.toBeVisible()
  })

  /**
   * Test 2: Login falla con credenciales inválidas
   * Verifica que se muestra error con datos incorrectos
   * Skipped when Supabase is paused/unreachable
   */
  test('should show error with invalid credentials', async ({ page }) => {
    test.skip(!(await checkSupabaseAvailable()), 'Supabase is not available (paused or unreachable)')
    // Click en botón Login
    await page.click(SELECTORS.header.loginButton)

    // Esperar modal
    await page.waitForSelector(SELECTORS.loginModal.emailInput, {
      state: 'visible',
    })

    // Llenar con credenciales inválidas
    await page.fill(
      SELECTORS.loginModal.emailInput,
      TEST_USERS.nonExistent.email
    )
    await page.fill(
      SELECTORS.loginModal.passwordInput,
      TEST_USERS.nonExistent.password
    )

    // Submit
    await page.click(SELECTORS.loginModal.submitButton)

    // Verificar que aparece modal de error ("Credenciales Inválidas")
    await expect(
      page.getByRole('heading', { name: /credenciales inválidas/i })
    ).toBeVisible({
      timeout: TIMEOUTS.apiResponse,
    })

    // Verificar que NO redirigió (sigue en home)
    await expect(page).toHaveURL('/')
  })

  /**
   * Test 3: Logout exitoso
   * Verifica que el usuario puede cerrar sesión
   * Skipped when Supabase is paused/unreachable
   */
  test('should logout successfully', async ({ page }) => {
    test.skip(!(await checkSupabaseAvailable()), 'Supabase is not available (paused or unreachable)')
    // Primero hacer login usando helper
    await loginUser(page)

    // Hacer logout
    await page.click(SELECTORS.header.logoutButton)

    // Verificar que vuelve a aparecer botón Login
    await expect(page.locator(SELECTORS.header.loginButton)).toBeVisible({
      timeout: TIMEOUTS.navigation,
    })
  })

  /**
   * Test 4: Modal de login se abre y cierra correctamente
   * Verifica la interacción básica del modal
   */
  test('should open and close login modal', async ({ page }) => {
    // Verificar que el modal no está visible inicialmente
    await expect(
      page.locator(SELECTORS.loginModal.emailInput)
    ).not.toBeVisible()

    // Abrir modal
    await page.click(SELECTORS.header.loginButton)

    // Verificar que el modal se abre
    await expect(page.locator(SELECTORS.loginModal.emailInput)).toBeVisible()
    await expect(page.locator(SELECTORS.loginModal.passwordInput)).toBeVisible()

    // Cerrar modal (click en Cancelar)
    await page.click('button:has-text("Cancelar")')

    // Verificar que el modal se cerró
    await expect(
      page.locator(SELECTORS.loginModal.emailInput)
    ).not.toBeVisible()
  })
})
