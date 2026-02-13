/**
 * Playwright Configuration
 *
 * Configuración para tests E2E (End-to-End) que simulan usuarios reales
 * interactuando con la aplicación en navegadores reales.
 *
 * @see https://playwright.dev/docs/test-configuration
 */
import { defineConfig, devices } from '@playwright/test'
import { loadEnv } from 'vite'

// Load VITE_* env vars from .env so Playwright tests can access them
// These are publishable keys (already exposed in the frontend bundle)
const env = loadEnv('', process.cwd(), 'VITE_')
Object.assign(process.env, env)

const isCI = !!process.env.CI

// En CI: build de producción (preview en puerto 4173)
// En local: dev server (puerto 5173)
const baseURL =
  process.env.BASE_URL ||
  (isCI ? 'http://localhost:4173' : 'http://localhost:5173')

export default defineConfig({
  testDir: './e2e',
  outputDir: './test-results',

  // Timeout global para cada test (30 segundos)
  timeout: 30 * 1000,

  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,

  // CI: 1 worker (evita sobrecarga) | Local: usa todos los cores
  workers: isCI ? 1 : undefined,

  // CI: todos los reporters | Local: solo terminal
  reporter: isCI
    ? [
        ['list'],
        ['html'],
        ['json', { outputFile: 'test-results/results.json' }],
      ]
    : [['list']],

  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
  },

  // CI: 3 navegadores | Local: solo chromium
  projects: isCI
    ? [
        {
          name: 'chromium',
          use: { ...devices['Desktop Chrome'] },
        },
        {
          name: 'firefox',
          use: { ...devices['Desktop Firefox'] },
        },
        {
          name: 'webkit',
          use: { ...devices['Desktop Safari'] },
        },
      ]
    : [
        {
          name: 'chromium',
          use: { ...devices['Desktop Chrome'] },
        },
      ],

  // CI: testea contra build de producción | Local: dev server
  webServer: {
    command: isCI ? 'bun run build && bun run preview' : 'bun dev',
    url: baseURL,
    reuseExistingServer: !isCI,
    timeout: 120 * 1000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
})
