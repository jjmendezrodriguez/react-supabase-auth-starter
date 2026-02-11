/**
 * Test Data Fixtures
 *
 * Datos de prueba centralizados para tests E2E.
 * Evita hardcodear datos en cada test (DRY principle).
 *
 * 🔒 IMPORTANTE: NUNCA usar datos reales de usuarios
 * Estos datos son para ambiente de testing únicamente.
 */

/**
 * Usuarios de prueba para diferentes escenarios
 */
export const TEST_USERS = {
  // Usuario válido para happy path tests
  valid: {
    email: 'test@playwright.dev',
    password: 'TestUser2026!',
    name: 'Test User',
  },

  // Usuario con email inválido para validation tests
  invalidEmail: {
    email: 'invalid-email',
    password: 'TestPassword123!',
  },

  // Usuario con contraseña débil
  weakPassword: {
    email: 'weak@playwright.dev',
    password: '123', // Falla validación
  },

  // Usuario que no existe (para login failures)
  nonExistent: {
    email: 'nonexistent@playwright.dev',
    password: 'WrongPassword123!',
  },

  // Usuario para test de cambio de contraseña
  passwordChange: {
    email: 'changepass@playwright.dev',
    currentPassword: 'OldPassword123!',
    newPassword: 'NewPassword456!',
  },
} as const

/**
 * Selectores CSS/data-testid comunes
 * Centralizados para fácil mantenimiento
 */
export const SELECTORS = {
  // Header
  header: {
    loginButton: 'button:has-text("Login")',
    userMenu: '[data-testid="user-menu"]',
    logoutButton: 'button:has-text("Logout")',
  },

  // Modales de autenticación
  loginModal: {
    emailInput: 'input#email',
    passwordInput: 'input#password',
    submitButton: 'form >> button[type="submit"]',
    cancelButton: '[data-testid="cancel-button"]',
    forgotPasswordLink: 'button:has-text("¿Olvidaste tu contraseña?")',
    switchToSignup: 'button:has-text("Crear cuenta")',
  },

  signupModal: {
    firstNameInput: 'input#firstName',
    lastNameInput: 'input#lastName',
    emailInput: 'input#email',
    passwordInput: 'input#password',
    confirmPasswordInput: 'input#confirmPassword',
    submitButton: 'form >> button[type="submit"]',
    switchToLogin: 'button:has-text("Iniciar sesión")',
  },

  // Dashboard
  dashboard: {
    profileTab: 'button:has-text("Perfil")',
    settingsTab: 'button:has-text("Configuración")',
    changePasswordButton: 'button:has-text("Cambiar Contraseña")',
    deleteAccountButton: 'button:has-text("Eliminar Cuenta")',
  },
} as const

/**
 * Mensajes de error esperados
 * Útil para validar feedback al usuario
 */
export const ERROR_MESSAGES = {
  invalidEmail: /email inválido/i,
  passwordTooShort: /al menos 8 caracteres/i,
  passwordMismatch: /las contraseñas no coinciden/i,
  loginFailed: /credenciales inválidas|incorrecta/i,
  emailAlreadyExists: /ya está registrado|ya existe/i,
} as const

/**
 * URLs de la aplicación
 */
export const ROUTES = {
  home: '/',
  dashboard: '/user',
  info: '/info',
} as const

/**
 * Timeouts personalizados para diferentes acciones
 */
export const TIMEOUTS = {
  navigation: 5000, // Navegación entre páginas
  modalOpen: 2000, // Esperar que modal se abra
  apiResponse: 10000, // Llamadas a API/Supabase
  animation: 500, // Animaciones CSS
} as const
