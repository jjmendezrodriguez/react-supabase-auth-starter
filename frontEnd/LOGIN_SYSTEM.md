# Sistema de Login con Supabase Auth

## 📋 Resumen

Sistema completo de autenticación con Supabase Auth, soporte para email/password y Google OAuth.

## 🔐 Componentes del Sistema

### 1. LoginModal (`src/components/LoginModal.tsx`)

Modal de autenticación con dos métodos:

**Email/Password Login:**

- Formulario con validación personalizada (noValidate)
- Validación en tiempo real con feedback visual
- Inputs con borde rojo cuando hay errores
- Mensajes de error específicos ("Invalid value" o "Invalid email")
- Integración directa con `supabase.auth.signInWithPassword()`
- Manejo de errores en español
- Estados de loading durante autenticación
- Toggle de visibilidad de contraseña con íconos SVG

**Google OAuth:**

- Botón con logo de Google
- Usa `supabase.auth.signInWithOAuth({ provider: 'google' })`
- Redirección automática a `/user` después de autenticar
- Manejo de errores de conexión

**Features:**

- ✅ Validación personalizada (noValidate en el form)
- ✅ Validación de email con regex
- ✅ Inputs con borde rojo cuando hay errores
- ✅ Mensajes de error debajo de cada input
- ✅ Limpieza automática de errores al escribir
- ✅ Toggle de visibilidad de contraseña (ojo abierto/cerrado)
- ✅ AlertModal para credenciales inválidas
- ✅ Enlaces a "¿Olvidaste tu contraseña?" y "Crear cuenta"
- ✅ Mensajes de error descriptivos
- ✅ Loading states en botones
- ✅ Backdrop click para cerrar (si no está loading)
- ✅ Botón de cancelar
- ✅ Diseño responsive

**Validaciones Implementadas:**

```tsx
// Validación de email
validateEmail(email: string): boolean {
  if (!email.trim()) {
    setEmailError("Invalid value");
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setEmailError("Invalid email");
    return false;
  }
  return true;
}

// Validación de contraseña
validatePassword(password: string): boolean {
  if (!password.trim()) {
    setPasswordError("Invalid value");
    return false;
  }
  return true;
}
```

### 2. AuthContext Actualizado

**Ubicación:** `src/context/AuthContext.tsx`

**Nuevas funcionalidades:**

```tsx
// Verificación de sesión al cargar la app
useEffect(() => {
  checkSession(); // Verifica si hay sesión activa

  // Listener para cambios de auth state
  supabase.auth.onAuthStateChange((event, session) => {
    // Actualiza estado automáticamente
  });
}, []);
```

**Métodos:**

- `login(userId, userName)` - Actualiza estado local después de auth exitosa
- `logout()` - Cierra sesión en Supabase y limpia estado
- `checkSession()` - Verifica sesión existente (persistencia)

**Loading State:**

- Muestra "Cargando..." mientras verifica sesión inicial
- Previene flash de contenido no autenticado

### 3. Header Actualizado

**Cambios:**

- Botón "Login" abre `LoginModal` (elimina demo login)
- Botón "Logout" cierra sesión real de Supabase
- Callback `handleLoginSuccess` para actualizar UI después de login

## 🔧 Configuración de Supabase

### Requisitos Previos

**1. Configurar Google OAuth en Supabase Dashboard:**

```txt
1. Ir a Authentication > Providers
2. Habilitar Google provider
3. Configurar OAuth credentials:
   - Client ID (de Google Cloud Console)
   - Client Secret
   - Redirect URL: https://your-project.supabase.co/auth/v1/callback
```

**2. Variables de Entorno (`.env`):**

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**3. Configurar Site URL en Supabase:**

```txt
Authentication > URL Configuration
- Site URL: http://localhost:5173 (dev)
- Redirect URLs: http://localhost:5173/user
```

### Crear Usuario de Prueba

#### **Opción 1: Desde Supabase Dashboard**

```txt
Authentication > Users > Add User
- Email: test@example.com
- Password: (generar o ingresar)
- Email Confirm: activar automáticamente
```

#### **Opción 2: Signup programático (agregar más adelante)**

```tsx
const { data, error } = await supabase.auth.signUp({
  email: "user@example.com",
  password: "password123",
});
```

## 🚀 Flujo de Autenticación

### Login con Email/Password

```mermaid
Usuario → Click "Login" → LoginModal abre
  → Ingresa email/password → Submit form
  → Supabase Auth valida → Success
  → AuthContext actualiza → Modal cierra
  → Usuario autenticado → Puede acceder a /user
```

### Login con Google

```mermaid
Usuario → Click "Google" → Redirección a Google
  → Usuario autoriza → Google redirect
  → Supabase crea sesión → AuthContext detecta cambio
  → Usuario autenticado → Redirect a /user
```

### Persistencia de Sesión

```mermaid
Usuario cierra app → Sesión guardada en Supabase
  → Usuario reabre app → AuthContext.checkSession()
  → Sesión válida → Auto-login
  → Usuario sigue autenticado
```

## 🛡️ Seguridad Implementada

### Protección de Rutas

✅ `ProtectedRoute` verifica `isAuthenticated` antes de renderizar  
✅ Redirección automática si no autenticado  
✅ AlertModal con mensaje claro de acceso denegado

### Validación de Inputs

✅ Campos email/password requeridos  
✅ Type="email" para validación de formato  
✅ Type="password" para ocultar contraseña  
✅ Sanitización automática por Supabase

### Manejo de Errores

✅ Mensajes de error en español  
✅ Errores de Supabase capturados y mostrados  
✅ Loading states para prevenir doble submit  
✅ Console.error para debugging

### Session Management

✅ Token JWT manejado por Supabase (httpOnly cookies)  
✅ Refresh automático de tokens  
✅ Listener de auth state para sincronización  
✅ Logout limpia sesión de Supabase

## 📝 Ejemplo de Uso

### Flujo Completo

**1. Usuario no autenticado intenta acceder a `/user`:**

```txt
→ ProtectedRoute detecta !isAuthenticated
→ Muestra AlertModal "Acceso Denegado"
→ Redirect a "/"
```

**2. Usuario hace click en "Login":**

```txt
→ LoginModal abre
→ Ingresa credenciales
→ Click "Iniciar Sesión"
→ Supabase valida → Success
→ AuthContext.login() actualiza estado
→ Modal cierra
```

**3. Usuario ahora puede acceder a `/user`:**

```txt
→ ProtectedRoute detecta isAuthenticated
→ Renderiza <Dashboard />
→ Usuario ve contenido protegido
```

**4. Usuario cierra y reabre la app:**

```txt
→ AuthProvider.checkSession() corre
→ Encuentra sesión activa en Supabase
→ Auto-login → Usuario sigue autenticado
```

## 🧪 Testing

### Pruebas Manuales

**1. Login con Email:**

```bash
bun dev
# Navegar a http://localhost:5173
# Click "Login"
# Ingresar: test@example.com / password123
# Verificar: sesión iniciada, nombre en Header
```

**2. Login con Google:**

```bash
# Click "Login" > "Google"
# Autorizar en Google
# Verificar: redirect a /user, sesión activa
```

**3. Protección de Ruta:**

```bash
# Sin login, navegar a /user
# Verificar: AlertModal "Acceso Denegado"
# Click "Volver al Inicio"
# Verificar: redirect a /
```

**4. Logout:**

```bash
# Con sesión activa, click "Logout"
# Verificar: sesión cerrada, botón cambia a "Login"
# Intentar acceder /user
# Verificar: acceso denegado
```

**5. Persistencia:**

```bash
# Login exitoso
# Cerrar pestaña/navegador
# Reabrir http://localhost:5173
# Verificar: sesión sigue activa
```

### Casos de Error

**Email inválido:**

```txt
Input: "not-an-email"
Resultado: Validación HTML5 previene submit
```

**Credenciales incorrectas:**

```txt
Input: email válido, password incorrecto
Resultado: Error "Invalid login credentials"
```

**Google OAuth cancelado:**

```txt
Usuario cancela en pantalla de Google
Resultado: Redirect de vuelta, no se crea sesión
```

## 📂 Archivos Modificados

```txt
Creados:
✓ src/components/LoginModal.tsx

Modificados:
✓ src/context/AuthContext.tsx (integración Supabase)
✓ src/components/Header.tsx (LoginModal en vez de demo)
✓ frontEnd/LOGIN_SYSTEM.md (esta documentación)

Sin cambios:
- src/components/ProtectedRoute.tsx
- src/hooks/useAuth.ts
- src/components/AlertModal.tsx
```

## 🚧 Próximos Pasos (Opcionales)

### 1. Agregar Página de Signup

```tsx
// src/components/SignupModal.tsx
const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    emailRedirectTo: `${window.location.origin}/user`,
  },
});
```

### 2. Password Reset

```tsx
const { error } = await supabase.auth.resetPasswordForEmail(email, {
  redirectTo: `${window.location.origin}/reset-password`,
});
```

### 3. Email Verification

```tsx
// Configurar en Supabase Dashboard
Authentication > Email Templates
- Customize confirmation email
```

### 4. OAuth Adicionales

```tsx
// Facebook, GitHub, etc.
await supabase.auth.signInWithOAuth({
  provider: "github",
});
```

### 5. Magic Link (Passwordless)

```tsx
await supabase.auth.signInWithOtp({
  email,
  options: {
    emailRedirectTo: `${window.location.origin}/user`,
  },
});
```

## ⚠️ Notas Importantes

- **Demo login eliminado:** Ya no existe login instantáneo sin credenciales
- **Usuarios reales requeridos:** Solo usuarios creados en Supabase pueden autenticarse
- **Google OAuth requiere configuración:** Client ID/Secret en Dashboard
- **Sesión persistente:** Usuarios permanecen logueados entre recargas
- **Tokens en cookies:** Manejados automáticamente por Supabase (seguro)

## 🔗 Referencias

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Google OAuth Setup](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/auth-signinwithpassword)
