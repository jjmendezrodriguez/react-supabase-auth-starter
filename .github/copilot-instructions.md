# Copilot Instructions - react-supabase-auth-starter

**Project:** React 19 + TypeScript + Vite + Supabase + Tailwind CSS  
**Package Manager:** Bun  
**Última actualización:** 2025-10-31

## 🎯 Core Principles (CRITICAL - Read First)

- **Always follow instructions** - Never assume unknown or undefined behavior before writing code
- **Verify first, code second** - Check inputs, data types, and logic flow before implementation
- **Ask when uncertain** - If information is missing, ask before proceeding
- **Security by default** - Every decision must consider security implications
- **Modularity first** - Keep environment-specific configurations isolated
- **Each module exposes its own public interface** - Never import logic from unrelated features or layers
- **Check MPC server requirements** - Verify if the project requires connection to an MPC server before implementation

## Inicio Rápido

```bash
cd frontEnd          # Navigate to frontend folder
bun install          # Instalar dependencias
bun dev              # Iniciar servidor de desarrollo
bun run build        # Build para producción
bun run lint         # Ejecutar ESLint
```

## Arquitectura del Proyecto

- **Frontend:** `/frontEnd/` - React 19 SPA con Vite + SWC
- **Database:** Cliente Supabase en `src/services/supabase/db.ts`
- **Routing:** React Router v7
- **Styling:** Tailwind CSS v4 (vía Vite plugin)
- **Config:** Carpeta `/config/` para settings centralizados (crear cuando sea necesario)

> **Nota:** Este es un proyecto nuevo, muchas features están en desarrollo.

## Estilo de Código (CRÍTICO - Lee `frontEnd/AGENTS.md` para reglas completas)

### TypeScript

- **Strict mode activado** - no usar `any` implícito
- **Single quotes, SIN semicolons**
- **camelCase** para functions y variables
- Orden de imports: React → third-party → local
- **Max file size: ~300 lines** (split if exceeds)

### 🔹 File Splitting Guideline

Si un componente supera ~200-300 líneas o se vuelve difícil de leer, **separar UI y lógica**.

**Cuándo dividir:**

- Componente crece más de 200-300 líneas
- Contiene lógica de negocio significativa (fetching, transforms, validación)
- Maneja estado complejo (múltiples `useState`, `useEffect`, timers)
- Necesita hooks reutilizables o testeables

**Patrón recomendado:**

```
pages/Home/
  ├── Home.tsx         # UI + composición
  ├── useHome.ts       # hook con state y handlers
  ├── home.service.ts  # llamadas a API/Supabase (opcional)
  └── index.ts         # export { default } from './Home'
```

> Consulta `frontEnd/PROJECT_STRUCTURE.md` para ubicación exacta según propósito

### Comments (OBLIGATORIO)

```typescript
// ✅ SIEMPRE iniciar archivos con comment explicando su propósito
// This component handles user authentication flow

/**
 * Validates user credentials and returns auth token.
 * @param email - User email address
 * @param password - Plain text password (hashed internally)
 */
function authenticateUser(email: string, password: string) {
  // Validate inputs before processing
  // ...
}
```

- Dejar **blank line antes de comments** (separación visual)
- Usar **JSDoc** para todas las functions exportadas
- Comentar transiciones de state: `// Switch to loading state`

### Naming

- `getUserData()` ✅ NO `gud()` ❌
- Variables descriptivas: `isAuthenticated` no `auth`
- Siempre en inglés

### Estructura

- Una function = una responsabilidad
- Flujo natural: **read → validate → process → respond**
- Evitar nested ifs (preferir early returns)
- **Declarar funciones fuera del JSX** (fuera del `return`)

### Estructura de Componentes

**Componentes simples** (un solo archivo):

- Componentes sin estado complejo: `Header.tsx`, `Button.tsx`
- Menos de 300 líneas
- Solo UI y props, sin lógica de negocio

**Componentes complejos** (carpeta):

```
ComponentName/
  ├── ComponentName.tsx         # UI + JSX
  ├── useComponentName.ts       # hook con state/handlers
  ├── componentName.service.ts  # API calls (opcional)
  └── index.ts                  # re-export
```

## React Router

### Configuración de Rutas

**Inline en `main.tsx`** (actual):

- ✅ Proyectos con 3-5 rutas simples
- ✅ Sin loaders/actions/error boundaries
- ✅ Prototipado rápido

**Archivo `routes.tsx` separado** (migrar cuando):

- Más de 5 rutas o rutas anidadas complejas
- Necesitas loaders/actions (data router)
- Implementas lazy loading (`React.lazy()`)
- Route guards o autenticación
- Menús generados dinámicamente

### Layout Components

- `Header`, `Footer`, `Sidebar` → en `src/components/`
- Integrar en `App.tsx` con `<Outlet />`:

```tsx
function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
```

## Integración con Supabase

```typescript
// Import desde el client centralizado
import { supabase } from '@/services/supabase/db'

// Example query
const { data, error } = await supabase.from('table_name').select('*')
```

**Archivos importantes:**

- `src/services/supabase/db.ts` - Cliente de Supabase
- `src/services/supabase/config.ts` - Configuración y validación
- `src/services/supabase/README.md` - Schema y queries comunes

**Environment variables** (en `.env`):

```env
VITE_SUPABASE_URL=your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Seguridad:** NUNCA hardcodear keys - siempre usar `import.meta.env.VITE_*`

## 🔒 Security Rules (CRITICAL)

### Security Flow (Apply to ALL critical operations)

```txt
Authentication → Authorization → Validation → Secure Logging
```

**Golden Rules:**

1. ✅ **Validate ALL external data** before processing
2. ❌ **NEVER interpolate unsanitized variables** in SQL, HTML, or shell commands
3. ❌ **NEVER log sensitive data** (passwords, tokens, credit cards, API keys)
4. ✅ **Always use environment variables** for secrets (`.env`)
5. ✅ **Mark sensitive values clearly** with `// 🔒 SECURITY: Do NOT expose publicly`

### Secrets Management

```typescript
// ❌ NEVER DO THIS
const API_KEY = 'sk-1234567890abcdef'

// ✅ ALWAYS DO THIS
const API_KEY = import.meta.env.VITE_API_KEY

// 🔒 SECURITY: Do NOT expose publicly
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
```

### Logging Rules (CRITICAL)

```typescript
// ❌ NEVER use console.log in production
console.log('User data:', user)
console.error('Payment failed:', paymentData)

// ✅ ALWAYS use logger (when implemented)
import { logger } from '@/utils/logger'

logger.info('User logged in', { userId: user.id })
logger.error('Payment failed', {
  orderId: payment.orderId,
  error: error.message,
  // ❌ NEVER log: password, creditCard, apiKey
})
```

**What NEVER to log:**

- ❌ Passwords (plain or hashed)
- ❌ API keys or tokens
- ❌ Credit card numbers
- ❌ SSN or personal identifiers
- ❌ Full request/response bodies (may contain sensitive data)

**What to log:**

- ✅ User IDs (non-sensitive identifiers)
- ✅ Action performed (login, logout, update)
- ✅ Timestamp and duration
- ✅ Error messages (sanitized)
- ✅ Request metadata (method, path, status code)

## Tailwind CSS

- **Approach principal** - clases inline de Tailwind
- Usar **CSS custom properties** si se repite 3+ veces
- Referir a `/config/` para design tokens globales (crear cuando sea necesario)
- Patrón ejemplo de `App.tsx`:
  ```tsx
  <div className="flex min-h-screen flex-col items-center">
  ```

## Module Boundaries & Import Rules

### ✅ CORRECT: Allowed imports

```typescript
// ✅ GOOD: Import from services
import { supabase } from '@/services/supabase/db'

// ✅ GOOD: Import from utils
import { validateEmail } from '@/utils/validators'

// ✅ GOOD: Import from same feature
import { LoginForm } from './LoginForm'
import { useAuth } from '../hooks/useAuth'

// ✅ GOOD: Import from shared/common components
import { Button } from '@/components/Button'
import { useDebounce } from '@/hooks/useDebounce'
```

### ❌ INCORRECT: Cross-feature imports

```typescript
// ❌ BAD: Importing from another feature directly
import { getUserData } from '@/features/admin/services/userService'
// Problem: Creates feature dependency (auth → admin)

// ❌ BAD: Importing UI from services
import { LoginModal } from '@/services/authService'
// Problem: Services should not contain UI

// ❌ BAD: Importing business logic from pages
import { validateUser } from '@/pages/Login'
// Problem: Pages are for routing, not business logic
```

**Fix:** Move shared code to `utils/`, `services/`, or `shared/` folder

## Configuration Files

Crear carpeta `/frontEnd/src/config/` para:

- `apiConfig.ts` → API routes, endpoints, versions
- `systemSettings.ts` → nombre de la app, version, environment
- `globals.ts` → opcional, para exportar todas las config centralizadas
- Marcar valores sensibles: `// 🔒 Do NOT expose publicly`

**Reglas de configuración:**

- NUNCA hardcodear claves API, tokens o contraseñas
- Usar variables de entorno (`.env`) para datos sensibles
- Cada variable debe tener comentario indicando si es editable o no
- No modificar valores globales desde otros archivos (editar en `/config/`)

## Security Checklist

Before committing any code:

- [ ] All external inputs validated and sanitized
- [ ] No hardcoded secrets or credentials
- [ ] Environment variables used for sensitive data
- [ ] No sensitive information in error messages
- [ ] No `console.log()` statements (use logger when implemented)
- [ ] Sensitive data not logged (passwords, tokens, cards)
- [ ] SQL queries use parameterized statements (Supabase handles this)
- [ ] Authentication + authorization implemented where needed
- [ ] Execute `bun audit` before deploy

## Git Workflow

Nombres de branches: `feature/login-ui`, `fix/api-timeout`, `refactor/db-model`

Convención de commits:

- `feat:` nueva feature
- `fix:` corrección de bug
- `docs:` cambios en documentación
- `chore:` tareas de mantenimiento

## Testing (Not Yet Configured - Future Enhancement)

**Current status:** Testing setup pending

**When implemented, follow:**

- Unit tests (Vitest + Testing Library)
- Coverage mínimo 70%+
- Test priority: Utils → Hooks → Components
- Mockear servicios externos (Supabase, API calls)
- Nombres descriptivos: `should return error when email is invalid`

## Archivos Clave

- `frontEnd/AGENTS.md` - **Estándares completos de código (LEER PRIMERO)**
- `frontEnd/PROJECT_STRUCTURE.md` - **Ubicación de archivos por propósito**
- `src/services/supabase/db.ts` - Cliente de database
- `vite.config.ts` - Configuración de build (React SWC + Tailwind)
- `eslint.config.js` - Reglas de linting

## AI Guidelines

- Seguir reglas de `AGENTS.md` estrictamente
- No generar código sin comentarios ni estructura lógica
- Antes de crear nuevas carpetas o módulos, **preguntar y esperar aprobación**
- Consultar `PROJECT_STRUCTURE.md` para saber dónde ubicar nuevos archivos
- Priorizar modularidad, rendimiento y seguridad

---

## 📚 Related Documentation

This file is a **summary** of the complete coding standards. For full details:

- **`frontEnd/AGENTS.md`** - Complete coding standards (3000+ lines)
  - Security best practices
  - Testing guidelines
  - CI/CD pipeline setup
  - Performance optimization
  - Scalability patterns

- **`frontEnd/PROJECT_STRUCTURE.md`** - File organization guide
  - Where to place each file type
  - Type-based vs Feature-based structure
  - Module boundaries and import rules

**Priority order for reading:**

1. This file (quick reference)
2. `AGENTS.md` sections 1-2 (Security & Architecture) 🔴
3. `PROJECT_STRUCTURE.md` (file placement rules)
4. `AGENTS.md` remaining sections (as needed)

## Licencia

© 2025 Mendez Tech. Propiedad privada. Copia no autorizada prohibida.
