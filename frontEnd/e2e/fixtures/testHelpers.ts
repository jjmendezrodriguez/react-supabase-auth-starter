/**
 * Test Helpers
 *
 * Funciones reutilizables para tests E2E.
 * Encapsulan acciones comunes y reducen código duplicado.
 * Incluye health check para Supabase (skip tests si no disponible).
 */
import { type Page, expect } from '@playwright/test'
import { TEST_USERS, SELECTORS, TIMEOUTS } from './testData'

/**
 * Cached result of Supabase availability check.
 * Avoids hitting the API repeatedly across multiple tests.
 */
let supabaseAvailable: boolean | null = null

/**
 * Check if Supabase is reachable
 *
 * Pings the Supabase REST endpoint to verify the project is active.
 * Result is cached so it only runs once per test suite execution.
 * Returns false if Supabase is paused, unreachable, or env vars are missing.
 *
 * @returns true if Supabase responds, false otherwise
 */
export async function checkSupabaseAvailable(): Promise<boolean> {
  // Return cached result if already checked
  if (supabaseAvailable !== null) return supabaseAvailable

  const supabaseUrl = process.env.VITE_SUPABASE_URL

  // No env var = no Supabase connection possible
  if (!supabaseUrl) {
    supabaseAvailable = false
    return false
  }

  try {
    // Ping the Supabase REST health endpoint with a short timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'HEAD',
      headers: {
        apikey: process.env.VITE_SUPABASE_ANON_KEY || '',
      },
      signal: controller.signal,
    })

    clearTimeout(timeoutId)
    supabaseAvailable = response.ok || response.status === 400
    return supabaseAvailable
  } catch {
    // Network error, timeout, or Supabase paused
    supabaseAvailable = false
    return false
  }
}

/**
 * Login Helper
 *
 * Realiza login completo y verifica que fue exitoso.
 * Reutilizable en múltiples tests que requieren autenticación.
 *
 * @param page - Página de Playwright
 * @param email - Email del usuario
 * @param password - Contraseña del usuario
 *
 * @example
 * await loginUser(page, TEST_USERS.valid.email, TEST_USERS.valid.password)
 */
export async function loginUser(
  page: Page,
  email: string = TEST_USERS.valid.email,
  password: string = TEST_USERS.valid.password
) {
  // 1. Click en botón de login
  await page.click(SELECTORS.header.loginButton)

  // 2. Esperar que el modal se abra completamente
  await page.waitForSelector(SELECTORS.loginModal.emailInput, {
    state: 'visible',
    timeout: TIMEOUTS.modalOpen,
  })

  // 3. Llenar formulario
  await page.fill(SELECTORS.loginModal.emailInput, email)
  await page.fill(SELECTORS.loginModal.passwordInput, password)

  // 4. Esperar que el botón submit esté listo (no disabled)
  await page.waitForSelector(SELECTORS.loginModal.submitButton, {
    state: 'visible',
    timeout: TIMEOUTS.modalOpen,
  })

  // 5. Submit
  await page.click(SELECTORS.loginModal.submitButton)

  // 6. Verificar login exitoso - esperar redirección automática a dashboard
  await expect(page).toHaveURL(/\/user/, { timeout: TIMEOUTS.apiResponse })

  // 7. Verificar que botón Logout aparece (confirma sesión activa)
  await expect(page.locator(SELECTORS.header.logoutButton)).toBeVisible({
    timeout: TIMEOUTS.navigation,
  })
}

/**
 * Logout Helper
 *
 * Cierra sesión y verifica que redirigió a home.
 *
 * @param page - Página de Playwright
 */
export async function logoutUser(page: Page) {
  // Click en logout
  await page.click(SELECTORS.header.logoutButton)

  // Verificar que volvió a home
  await expect(page).toHaveURL('/', { timeout: TIMEOUTS.navigation })

  // Verificar que botón de login es visible (no autenticado)
  await expect(page.locator(SELECTORS.header.loginButton)).toBeVisible()
}

/**
 * Signup Helper
 *
 * Registra un nuevo usuario y verifica que fue exitoso.
 *
 * @param page - Página de Playwright
 * @param email - Email del nuevo usuario
 * @param password - Contraseña del nuevo usuario
 */
export async function signupUser(page: Page, email: string, password: string) {
  // 1. Click en botón de login (abre modal)
  await page.click(SELECTORS.header.loginButton)

  // 2. Esperar que el modal de login se abra completamente
  await page.waitForSelector(SELECTORS.loginModal.emailInput, {
    state: 'visible',
    timeout: TIMEOUTS.modalOpen,
  })

  // 3. Click en "Create account" para cambiar a modo signup
  await page.click(SELECTORS.loginModal.switchToSignup)

  // 4. Esperar inputs del formulario de signup (el modal cambia de contenido)
  await page.waitForSelector(SELECTORS.signupModal.firstNameInput, {
    state: 'visible',
    timeout: TIMEOUTS.modalOpen,
  })

  // 5. Llenar formulario completo
  await page.fill(SELECTORS.signupModal.firstNameInput, 'Test')
  await page.fill(SELECTORS.signupModal.lastNameInput, 'User')
  await page.fill(SELECTORS.signupModal.emailInput, email)
  await page.fill(SELECTORS.signupModal.passwordInput, password)
  await page.fill(SELECTORS.signupModal.confirmPasswordInput, password)

  // 6. Esperar que el botón submit esté listo
  await page.waitForSelector(SELECTORS.signupModal.submitButton, {
    state: 'visible',
    timeout: TIMEOUTS.modalOpen,
  })

  // 7. Submit
  await page.click(SELECTORS.signupModal.submitButton)

  // 8. Verificar éxito - muestra mensaje de confirmación de email
  // (Supabase requiere verificación de email antes de permitir login)
  await expect(
    page.getByText(/revisa tu email|verifica tu cuenta/i)
  ).toBeVisible({ timeout: TIMEOUTS.apiResponse })
}

/**
 * Wait for Network Idle
 *
 * Espera a que todas las requests de red terminen.
 * Útil después de acciones que disparan múltiples API calls.
 *
 * @param page - Página de Playwright
 * @param timeout - Tiempo máximo de espera
 */
export async function waitForNetworkIdle(
  page: Page,
  timeout: number = TIMEOUTS.apiResponse
) {
  await page.waitForLoadState('networkidle', { timeout })
}

/**
 * Clear Browser Data
 *
 * Limpia cookies, localStorage y sessionStorage.
 * Útil para resetear estado entre tests.
 *
 * @param page - Página de Playwright
 */
export async function clearBrowserData(page: Page) {
  await page.context().clearCookies()
  await page.evaluate(() => {
    localStorage.clear()
    sessionStorage.clear()
  })
}

/**
 * Take Screenshot with Name
 *
 * Captura screenshot con nombre descriptivo.
 * Solo en modo debug, no en CI.
 *
 * @param page - Página de Playwright
 * @param name - Nombre del screenshot
 */
export async function takeDebugScreenshot(page: Page, name: string) {
  if (!process.env.CI) {
    await page.screenshot({ path: `test-results/${name}.png`, fullPage: true })
  }
}
