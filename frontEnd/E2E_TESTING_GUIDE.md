# 🧪 E2E Testing Guide - Playwright

Quick reference guide for running and writing E2E tests with Playwright.

---

## 🚀 Quick Start

```bash
# Install dependencies (includes Playwright)
bun install

# Install browsers (one-time setup)
bunx playwright install

# Run all tests (headless)
bun test:e2e

# Open interactive UI (recommended for development)
bun test:e2e:ui
```

---

## 📋 Common Commands

### Running Tests

```bash
# All tests in all browsers
bun test:e2e

# Specific browser only
bun test:e2e:chromium
bun test:e2e:firefox
bun test:e2e:webkit

# Specific test file
bunx playwright test e2e/auth.spec.ts

# Specific test by name
bunx playwright test -g "should login successfully"

# Show browser while running (headed mode)
bun test:e2e:headed

# Debug mode (step-by-step)
bun test:e2e:debug
```

### Viewing Results

```bash
# Open last HTML report
bun test:e2e:report

# Reports include:
# - Test results summary
# - Screenshots on failure
# - Videos of failed tests
# - Execution traces
```

### Debugging

```bash
# Interactive UI mode (BEST for debugging)
bun test:e2e:ui

# Step-by-step debugging
bun test:e2e:debug

# Run with browser visible
bun test:e2e:headed
```

---

## 🎬 Test Generator (Codegen)

Record interactions and generate test code automatically:

```bash
bun test:e2e:codegen
```

**How it works:**

1. Opens browser + code window
2. You interact with the app (click, type, navigate)
3. Playwright generates test code in real-time
4. Copy generated code to your test file
5. Refactor to use helpers and best practices

**Example workflow:**

```bash
# Start codegen
bun test:e2e:codegen

# Actions in browser:
# 1. Click "Iniciar Sesión"
# 2. Fill email: "test@example.com"
# 3. Fill password: "Password123!"
# 4. Click "Entrar"

# Generated code:
await page.click('button:has-text("Iniciar Sesión")')
await page.fill('input[type="email"]', 'test@example.com')
await page.fill('input[type="password"]', 'Password123!')
await page.click('button[type="submit"]')
```

---

## ✍️ Writing Tests

### Basic Structure

```typescript
// e2e/myFeature.spec.ts
import { test, expect } from '@playwright/test'

test('should do something', async ({ page }) => {
  // 1. Navigate to page
  await page.goto('/')

  // 2. Interact with elements
  await page.click('button:has-text("Click Me")')

  // 3. Assert expected result
  await expect(page).toHaveURL('/new-page')
})
```

### Using Helpers

```typescript
import { loginUser } from './fixtures/testHelpers'
import { TEST_USERS } from './fixtures/testData'

test('should access dashboard after login', async ({ page }) => {
  // Use helper instead of repeating login steps
  await loginUser(page)

  // Now in dashboard, continue testing
  await expect(page).toHaveURL(/\/dashboard/)
})
```

### Locator Strategies (Best to Worst)

```typescript
// ✅ BEST: User-facing attributes
page.getByRole('button', { name: 'Submit' })
page.getByLabel('Email')
page.getByText('Welcome')

// ✅ GOOD: Test IDs (add data-testid in your components)
page.locator('[data-testid="submit-button"]')

// ⚠️ OK: CSS selectors (fragile if UI changes)
page.locator('button.submit')
page.locator('#submit-btn')

// ❌ AVOID: Complex CSS selectors
page.locator('div > form > div:nth-child(2) > button')
```

### Assertions

```typescript
// URL
await expect(page).toHaveURL('/dashboard')
await expect(page).toHaveURL(/\/dashboard/) // Regex

// Element visibility
await expect(page.locator('h1')).toBeVisible()
await expect(page.locator('.modal')).not.toBeVisible()

// Text content
await expect(page.locator('h1')).toHaveText('Welcome')
await expect(page.locator('.error')).toContainText('Invalid')

// Attributes
await expect(page.locator('button')).toBeDisabled()
await expect(page.locator('input')).toHaveValue('test@example.com')
```

---

## 🔍 Selectors Reference

All selectors are centralized in `e2e/fixtures/testData.ts`:

```typescript
import { SELECTORS } from './fixtures/testData'

// Usage
await page.click(SELECTORS.header.loginButton)
await page.fill(SELECTORS.loginModal.emailInput, 'email@example.com')
```

**Why centralized?**

- Change selector once, applies to all tests
- Easier maintenance when UI changes
- Consistent naming across tests

---

## 🧩 Test Data

Test users and constants are in `e2e/fixtures/testData.ts`:

```typescript
import { TEST_USERS, ROUTES, TIMEOUTS } from './fixtures/testData'

// Use predefined test users
const { email, password } = TEST_USERS.valid

// Use route constants
await page.goto(ROUTES.dashboard)

// Use timeouts
await expect(modal).toBeVisible({ timeout: TIMEOUTS.modalOpen })
```

---

## 🎯 Best Practices

### 1. Use beforeEach for Setup

```typescript
test.beforeEach(async ({ page }) => {
  // Clean state before each test
  await page.goto('/')
  await clearBrowserData(page)
})
```

### 2. Make Tests Independent

```typescript
// ❌ BAD: Test 2 depends on Test 1
test('login user', async ({ page }) => {
  /* ... */
})
test('view profile', async ({ page }) => {
  // Assumes already logged in - FAILS if run alone
})

// ✅ GOOD: Each test is self-contained
test('view profile', async ({ page }) => {
  await loginUser(page) // Login in this test
  await page.goto('/profile')
})
```

### 3. Use Descriptive Test Names

```typescript
// ❌ BAD
test('test 1', async ({ page }) => {
  /* ... */
})

// ✅ GOOD
test('should redirect to home when accessing dashboard without auth', async ({
  page,
}) => {
  /* ... */
})
```

### 4. Wait for Network Idle

```typescript
import { waitForNetworkIdle } from './fixtures/testHelpers'

test('should load user data', async ({ page }) => {
  await loginUser(page)

  // Wait for API calls to finish
  await waitForNetworkIdle(page)

  // Now safe to assert data is loaded
  await expect(page.locator('.user-email')).toBeVisible()
})
```

### 5. Handle Dynamic Content

```typescript
// ❌ BAD: Hardcoded waits
await page.waitForTimeout(5000)

// ✅ GOOD: Wait for specific condition
await expect(page.locator('.data-loaded')).toBeVisible()
await page.waitForLoadState('networkidle')
```

---

## 🚨 Troubleshooting

### Test fails only in CI

**Problem:** Test passes locally but fails in GitHub Actions

**Solutions:**

1. Increase timeouts (CI is slower):

   ```typescript
   await expect(element).toBeVisible({ timeout: 10000 })
   ```

2. Wait for network idle:

   ```typescript
   await waitForNetworkIdle(page)
   ```

3. Download CI artifacts:
   - Go to GitHub Actions → Failed workflow
   - Download "test-results-chromium.zip"
   - Open screenshots/videos to see what happened

### Element not found

**Problem:** `locator.click: Target closed` or `element not found`

**Solutions:**

1. Wait for element to be visible first:

   ```typescript
   await page.waitForSelector('button', { state: 'visible' })
   await page.click('button')
   ```

2. Use more specific selector:

   ```typescript
   // ❌ Ambiguous
   await page.click('button')

   // ✅ Specific
   await page.click('button:has-text("Submit")')
   ```

### Flaky tests (pass/fail randomly)

**Problem:** Test sometimes passes, sometimes fails

**Solutions:**

1. Add proper waits:

   ```typescript
   await expect(element).toBeVisible()
   await waitForNetworkIdle(page)
   ```

2. Use retries (already configured in `playwright.config.ts`):

   ```typescript
   retries: process.env.CI ? 2 : 0
   ```

3. Avoid hardcoded timeouts:

   ```typescript
   // ❌ BAD
   await page.waitForTimeout(2000)

   // ✅ GOOD
   await expect(element).toBeVisible()
   ```

---

## 📊 Test Coverage

Current E2E test coverage:

### Authentication (`e2e/auth.spec.ts`)

- ✅ 9 tests
- ✅ Login flow (success, failure, validation)
- ✅ Signup flow (validation, confirmation)
- ✅ Logout and session management

### Dashboard (`e2e/dashboard.spec.ts`)

- ✅ 16 tests
- ✅ Protected routes
- ✅ Tab navigation
- ✅ Change password flow
- ✅ Profile management
- ✅ Account deletion
- ✅ Responsive layout

**Total:** 25+ E2E tests across 3 browsers = 75+ test executions

---

## 🎓 Learning Resources

- **Official Docs:** https://playwright.dev/docs/intro
- **Best Practices:** https://playwright.dev/docs/best-practices
- **Locators:** https://playwright.dev/docs/locators
- **Assertions:** https://playwright.dev/docs/test-assertions
- **CI/CD:** https://playwright.dev/docs/ci

---

## 💡 Tips for Interview

When discussing E2E testing in your interview:

1. **Explain WHY you chose Playwright:**
   - Multi-browser support (Chrome, Firefox, Safari)
   - Auto-wait (less flaky tests)
   - Great debugging tools (UI mode, traces)
   - Fast execution

2. **Show your test organization:**
   - Centralized selectors (`testData.ts`)
   - Reusable helpers (`testHelpers.ts`)
   - Independent tests (no dependencies)

3. **Demonstrate CI/CD integration:**
   - Tests run on every PR
   - Multi-browser matrix
   - Artifacts uploaded on failure
   - Blocks merge if tests fail

4. **Discuss trade-offs:**
   - E2E tests slower than unit tests
   - Require running server
   - More maintenance (UI changes)
   - But provide highest confidence

---

**Happy Testing! 🚀**
