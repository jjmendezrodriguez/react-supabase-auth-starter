/**
 * Screenshot Generation Script
 *
 * Generates all 9 screenshots for the repository README.
 * Run with: bunx playwright test e2e/screenshots.spec.ts --project=chromium
 *
 * Screenshots saved to: docs/screenshots/
 * Does NOT require Supabase for most screenshots.
 * Dashboard screenshots require authentication (skipped if unavailable).
 */
import { test, expect } from '@playwright/test'
import { SELECTORS, TIMEOUTS } from './fixtures/testData'
import { loginUser, checkSupabaseAvailable } from './fixtures/testHelpers'

const SCREENSHOT_DIR = '../docs/screenshots'

// Shared viewport for consistent screenshots
const VIEWPORT = { width: 1280, height: 720 }

test.describe('Generate Repository Screenshots', () => {
  test.use({ viewport: VIEWPORT })

  /**
   * Screenshot 1: Home page (light off - default state)
   */
  test('screenshot: home', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Small delay for animations to settle
    await page.waitForTimeout(500)

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/home.png`,
      fullPage: false,
    })
  })

  /**
   * Screenshot 2: Home page (light on + effects active)
   */
  test('screenshot: home-active', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Turn on the light
    const lightButton = page.getByText(/prender luz|turn on light/i)
    if (await lightButton.isVisible()) {
      await lightButton.click()
      await page.waitForTimeout(300)
    }

    // Trigger rain
    const rainButton = page.getByText(/lluvia|rain/i)
    if (await rainButton.isVisible()) {
      await rainButton.click()
      await page.waitForTimeout(800)
    }

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/home-active.png`,
      fullPage: false,
    })
  })

  /**
   * Screenshot 3: Login modal
   */
  test('screenshot: login-modal', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Open login modal
    await page.click(SELECTORS.header.loginButton)
    await page.waitForSelector(SELECTORS.loginModal.emailInput, {
      state: 'visible',
      timeout: TIMEOUTS.modalOpen,
    })

    // Small delay for modal animation
    await page.waitForTimeout(300)

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/login-modal.png`,
      fullPage: false,
    })
  })

  /**
   * Screenshot 4: Signup modal
   */
  test('screenshot: signup-modal', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Open login modal first
    await page.click(SELECTORS.header.loginButton)
    await page.waitForSelector(SELECTORS.loginModal.emailInput, {
      state: 'visible',
      timeout: TIMEOUTS.modalOpen,
    })

    // Switch to signup
    await page.click(SELECTORS.loginModal.switchToSignup)
    await page.waitForSelector(SELECTORS.signupModal.firstNameInput, {
      state: 'visible',
      timeout: TIMEOUTS.modalOpen,
    })

    // Small delay for transition
    await page.waitForTimeout(300)

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/signup-modal.png`,
      fullPage: false,
    })
  })

  /**
   * Screenshot 5: Forgot password modal
   */
  test('screenshot: forgot-password', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Open login modal first
    await page.click(SELECTORS.header.loginButton)
    await page.waitForSelector(SELECTORS.loginModal.emailInput, {
      state: 'visible',
      timeout: TIMEOUTS.modalOpen,
    })

    // Click forgot password link
    await page.click(SELECTORS.loginModal.forgotPasswordLink)

    // Wait for forgot password modal content
    await page.waitForSelector('input#reset-email', {
      state: 'visible',
      timeout: TIMEOUTS.modalOpen,
    })

    // Small delay for transition
    await page.waitForTimeout(300)

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/forgot-password.png`,
      fullPage: false,
    })
  })

  /**
   * Screenshot 6: Language switcher dropdown open
   */
  test('screenshot: language-switcher', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Open language dropdown (gear icon)
    const langButton = page.locator('button[aria-label="Change language"]')
    await langButton.click()

    // Wait for dropdown to appear
    await page.waitForTimeout(300)

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/language-switcher.png`,
      fullPage: false,
    })
  })

  /**
   * Screenshot 7: Dashboard - Profile tab
   * Requires Supabase authentication
   */
  test('screenshot: dashboard-profile', async ({ page }) => {
    test.skip(
      !(await checkSupabaseAvailable()),
      'Supabase is not available - cannot generate dashboard screenshots'
    )

    await page.goto('/')
    await loginUser(page)

    // Should be on dashboard after login
    await expect(page).toHaveURL(/\/user/, { timeout: TIMEOUTS.apiResponse })

    // Click profile tab if not already active
    const profileTab = page.getByText(/perfil|profile/i).first()
    if (await profileTab.isVisible()) {
      await profileTab.click()
    }

    await page.waitForTimeout(500)

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/dashboard-profile.png`,
      fullPage: false,
    })
  })

  /**
   * Screenshot 8: Dashboard - Settings tab
   * Requires Supabase authentication
   */
  test('screenshot: dashboard-settings', async ({ page }) => {
    test.skip(
      !(await checkSupabaseAvailable()),
      'Supabase is not available - cannot generate dashboard screenshots'
    )

    await page.goto('/')
    await loginUser(page)

    // Should be on dashboard after login
    await expect(page).toHaveURL(/\/user/, { timeout: TIMEOUTS.apiResponse })

    // Click settings tab
    const settingsTab = page.getByText(/configuración|settings/i).first()
    await settingsTab.click()

    await page.waitForTimeout(500)

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/dashboard-settings.png`,
      fullPage: false,
    })
  })

  /**
   * Screenshot 9: Info page
   */
  test('screenshot: info-page', async ({ page }) => {
    await page.goto('/info')
    await page.waitForLoadState('networkidle')

    await page.waitForTimeout(500)

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/info-page.png`,
      fullPage: false,
    })
  })
})
