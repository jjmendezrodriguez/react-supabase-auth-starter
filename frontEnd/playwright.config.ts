/**
 * Playwright Configuration
 *
 * Configuración para tests E2E (End-to-End) que simulan usuarios reales
 * interactuando con la aplicación en navegadores reales.
 *
 * @see https://playwright.dev/docs/test-configuration
 */
import { defineConfig, devices } from '@playwright/test'

/**
 * baseURL - URL base de la aplicación en desarrollo
 * Se puede override con variable de entorno para testing en staging/production
 */
const baseURL = process.env.BASE_URL || 'http://localhost:5173'

export default defineConfig({
  // 📁 Directorio donde están los tests E2E
  testDir: './e2e',

  // ⏱️ Timeout global para cada test (30 segundos)
  // Previene tests colgados que nunca terminan
  timeout: 30 * 1000,

  // 🔄 Configuración de reintentos
  // En CI: 2 reintentos (reduce flaky tests)
  // Local: 0 reintentos (feedback rápido)
  fullyParallel: true,
  forbidOnly: !!process.env.CI, // Falla si hay .only en CI
  retries: process.env.CI ? 2 : 0,

  // 🧵 Cuántos tests ejecutar en paralelo
  // CI: 1 worker (evita sobrecarga)
  // Local: undefined (usa todos los cores disponibles)
  workers: process.env.CI ? 1 : undefined,

  // 📊 Reporteros - Cómo mostrar resultados
  reporter: [
    ['html'], // Reporte HTML interactivo en playwright-report/
    ['list'], // Lista en terminal (para CI)
    ['json', { outputFile: 'test-results/results.json' }], // JSON para análisis
  ],

  // ⚙️ Configuración compartida para todos los proyectos
  use: {
    // URL base - todos los tests empiezan aquí
    baseURL,

    // 🎬 Capturar trazas solo en fallos (debugging)
    // Incluye screenshots, network requests, console logs
    trace: 'on-first-retry',

    // 📸 Screenshots automáticos en fallos
    screenshot: 'only-on-failure',

    // 🎥 Videos solo en reintentos (evidencia de bugs)
    video: 'retain-on-failure',

    // ⏳ Timeouts específicos
    actionTimeout: 10 * 1000, // Clicks, fills, etc.
    navigationTimeout: 30 * 1000, // page.goto()
  },

  // 🌐 Proyectos - Cada uno es un navegador diferente
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Configuración específica de Chromium si es necesaria
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },

    // 🔧 OPCIONAL: Tests en móviles (descomentar si necesitas)
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],

  // 🚀 Web Server - Inicia la app antes de los tests
  // Solo si no está corriendo ya
  webServer: {
    command: 'bun dev',
    url: baseURL,
    reuseExistingServer: !process.env.CI, // En local reutiliza servidor
    timeout: 120 * 1000, // 2 minutos para iniciar
    stdout: 'ignore', // No mostrar logs del servidor en tests
    stderr: 'pipe', // Mostrar errores críticos
  },
})
