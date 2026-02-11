# 🧱 PROJECT_STRUCTURE.md

## 📁 Estructura del Proyecto — Guía Oficial de Organización

> **Propósito:**  
> Este documento define **dónde debe ubicarse cada archivo o módulo**, según su responsabilidad en el proyecto.  
> Garantiza orden, escalabilidad y colaboración entre varios desarrolladores o IAs (Copilot, ChatGPT, etc.).

---

## 🧩 1️⃣ Estructura Principal

| Caso o propósito                               | Archivo recomendado                          | Carpeta             |
| ---------------------------------------------- | -------------------------------------------- | ------------------- |
| Función o clase reutilizable interna           | `lib/formatDate.ts`                          | `lib/`              |
| Funciones pequeñas sin dependencias de negocio | `utils/validateForm.ts`                      | `utils/`            |
| Lógica central del negocio (reglas)            | `core/auth.ts`                               | `core/`             |
| Integración con servicios externos             | `services/supabase_service.ts`               | `services/`         |
| Manejo de eventos o acciones del usuario       | `handlers/login_handler.ts`                  | `handlers/`         |
| Controladores o capa intermedia (MVC)          | `controllers/userController.ts`              | `controllers/`      |
| Modelos de datos o esquemas                    | `models/User.ts`                             | `models/`           |
| Interfaces visuales o páginas JSX              | `views/Home.tsx` o `pages/Home.tsx`          | `views/` / `pages/` |
| Hooks personalizados                           | `hooks/useAuth.ts`                           | `hooks/`            |
| Middlewares (autenticación, validación)        | `middlewares/session.ts`                     | `middlewares/`      |
| Configuración global o variables de entorno    | `config/env.ts`                              | `config/`           |
| Componentes UI reutilizables                   | `components/Button.tsx`                      | `components/`       |
| Recursos estáticos (imágenes, fuentes, íconos) | `assets/logo.png`, `assets/fonts/Roboto.ttf` | `assets/`           |
| Archivos públicos (favicon, manifest, etc.)    | `public/index.html`, `public/robots.txt`     | `public/`           |

---

## 🧠 2️⃣ Principios Fundamentales de Organización

### 🔹 Separation of Concerns (SoC)

Cada carpeta debe tener **una única responsabilidad clara**.  
Ejemplo: `utils/` no debe contener lógica de negocio, y `core/` no debe tener funciones de UI.

### 🔹 Feature vs Type

- Usa **type-based** (`components/`, `hooks/`, `utils/`) en proyectos pequeños o individuales.
- Usa **feature-based** (`auth/`, `dashboard/`, `profile/`) cuando haya múltiples desarrolladores o el proyecto crezca.

> **Regla:**  
> “Un buen ingeniero sabe cuándo migrar de una estructura por tipo a una basada en features.”

---

## 🧩 3️⃣ Reglas de Escalabilidad y Refactorización

| Señal de alerta                       | Acción recomendada                                      |
| ------------------------------------- | ------------------------------------------------------- |
| Más de **10 archivos** en una carpeta | Dividir por feature o submódulo                         |
| Código duplicado entre features       | Extraer a `shared/` o `lib/`                            |
| Archivos de +300 líneas               | Separar según la guía en `AGENTS.md → Code Style Rules` |
| Dificultad para encontrar archivos    | Revisar naming y `PROJECT_STRUCTURE.md`                 |

> **Senior Rule:**  
> “Refactoriza la estructura progresivamente, manteniendo carpetas alineadas con los dominios del negocio y evitando capas redundantes.”

---

## ⚙️ 4️⃣ Archivos de Configuración

Los archivos de configuración deben estar **aislados por entorno** y **nunca contener secretos**.

| Entorno    | Archivo                           | Propósito                              |
| ---------- | --------------------------------- | -------------------------------------- |
| Desarrollo | `.env.development`                | Variables locales                      |
| Producción | `.env.production`                 | Variables de despliegue                |
| Testing    | `.env.test`                       | Variables temporales para pruebas      |
| General    | `vite.config.ts`, `tsconfig.json` | Configuración del compilador y bundler |
| Aplicación | `src/config/`                     | Constantes globales no sensibles       |

> **Senior Rule:**  
> “Mantén configuraciones separadas por entorno y nunca compartas datos sensibles entre módulos.”

---

## 🧱 5️⃣ Organización Avanzada (para proyectos grandes)

Cuando el proyecto supere las 30+ componentes o 3+ features principales, migra a **Feature-based Structure**:

### 🔹 Type-based (Actual - Proyectos pequeños)

```extructure
src/
├── components/
│   ├── Button.tsx
│   ├── Modal.tsx
│   ├── LoginForm.tsx
│   ├── ProfileCard.tsx
│   └── DashboardStats.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useProfile.ts
│   └── useAnalytics.ts
├── services/
│   ├── authService.ts
│   ├── profileService.ts
│   └── analyticsService.ts
└── pages/
    ├── Login.tsx
    ├── Profile.tsx
    └── Dashboard.tsx
```

**Ventajas:**

- ✅ Simple para equipos pequeños (1-5 devs)
- ✅ Fácil de entender al inicio
- ✅ Menos carpetas

**Desventajas:**

- ❌ Difícil encontrar archivos relacionados (Login está en 4 carpetas)
- ❌ Imports largos entre features
- ❌ Difícil aislar features para testing

---

### 🔹 Feature-based (Avanzado - Proyectos grandes)

```structure
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   └── SignupModal.tsx
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   ├── services/
│   │   │   └── authService.ts
│   │   ├── types/
│   │   │   └── auth.types.ts
│   │   └── index.ts  (public API)
│   │
│   ├── profile/
│   │   ├── components/
│   │   │   ├── ProfileCard.tsx
│   │   │   └── ProfileSettings.tsx
│   │   ├── hooks/
│   │   │   └── useProfile.ts
│   │   ├── services/
│   │   │   └── profileService.ts
│   │   └── index.ts
│   │
│   └── dashboard/
│       ├── components/
│       │   └── DashboardStats.tsx
│       ├── hooks/
│       │   └── useAnalytics.ts
│       └── index.ts
│
├── shared/  (código compartido entre features)
│   ├── components/
│   │   ├── Button.tsx
│   │   └── Modal.tsx
│   ├── hooks/
│   │   └── useDebounce.ts
│   └── utils/
│       └── validators.ts
│
└── pages/  (solo routing)
    ├── Login.tsx       → import from features/auth
    ├── Profile.tsx     → import from features/profile
    └── Dashboard.tsx   → import from features/dashboard
```

**Ventajas:**

- ✅ Todo relacionado con "auth" en una carpeta
- ✅ Fácil de encontrar y modificar features completas
- ✅ Ideal para testing (mock toda la feature)
- ✅ Equipos pueden trabajar en features separadas
- ✅ Fácil de eliminar features (borrar carpeta)

**Desventajas:**

- ⚠️ Más carpetas (puede parecer complejo al inicio)
- ⚠️ Requiere disciplina en imports

---

### 🔹 Cuándo migrar Type → Feature

| Señal                                   | Type-based | Feature-based |
| --------------------------------------- | ---------- | ------------- |
| Menos de 20 componentes                 | ✅         | ❌            |
| 1-5 desarrolladores                     | ✅         | ⚠️            |
| Más de 30 componentes                   | ❌         | ✅            |
| 5+ desarrolladores                      | ❌         | ✅            |
| Features independientes (auth, billing) | ❌         | ✅            |
| Dificultad para encontrar archivos      | ❌         | ✅            |
| Necesitas eliminar features completas   | ❌         | ✅            |

---

### 🔹 Cómo migrar (paso a paso)

**Paso 1: Identificar features principales**

```txt
Ejemplo:
- Authentication (login, signup, password recovery)
- Profile (settings, avatar, preferences)
- Dashboard (analytics, stats, reports)
```

**Paso 2: Crear estructura de carpetas**

```bash
mkdir -p src/features/{auth,profile,dashboard}/{components,hooks,services}
mkdir -p src/shared/{components,hooks,utils}
```

**Paso 3: Mover archivos por feature** (uno a la vez)

```bash
# Migrar auth
mv src/components/LoginForm.tsx src/features/auth/components/
mv src/hooks/useAuth.ts src/features/auth/hooks/
mv src/services/authService.ts src/features/auth/services/

# Actualizar imports en cada archivo movido
```

**Paso 4: Crear public API para cada feature**

```typescript
// src/features/auth/index.ts
export { LoginForm, SignupModal } from './components'
export { useAuth } from './hooks'
export { authService } from './services'
export type { User, AuthState } from './types'
```

**Paso 5: Actualizar imports en pages**

```typescript
// Antes
import { LoginForm } from '@/components/LoginForm'
import { useAuth } from '@/hooks/useAuth'

// Después
import { LoginForm, useAuth } from '@/features/auth'
```

**Paso 6: Mover componentes compartidos a `shared/`**

```bash
mv src/components/Button.tsx src/shared/components/
mv src/components/Modal.tsx src/shared/components/
```

**Tiempo estimado:** 2-4 horas para proyecto de 30 componentes

---

### 🔹 Estructura actual de react-supabase-auth-starter (Type-based)

**Tu proyecto actualmente usa Type-based structure:**

```extructure
frontEnd/
├── src/
│   ├── components/          # UI components
│   │   ├── auth/           # Auth-specific components
│   │   │   ├── LoginModal.tsx
│   │   │   ├── SignupModal.tsx
│   │   │   ├── ForgotPasswordModal.tsx
│   │   │   └── index.ts
│   │   ├── dashboard/      # Dashboard-specific components
│   │   │   ├── ProfileTab.tsx
│   │   │   ├── SettingsTab.tsx
│   │   │   └── ChangePasswordModal.tsx
│   │   ├── Header.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── LanguageSwitcher.tsx
│   │
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useAuthForm.ts
│   │   └── useProfile.ts
│   │
│   ├── services/           # External integrations
│   │   └── supabase/
│   │       ├── db.ts
│   │       ├── config.ts
│   │       ├── profileService.ts
│   │       └── types.ts
│   │
│   ├── stores/             # Zustand state stores
│   │   ├── authStore.ts
│   │   ├── uiStore.ts
│   │   └── index.ts
│   │
│   ├── utils/              # Pure utility functions
│   │   ├── validators.ts
│   │   ├── passwordStrength.ts
│   │   └── modalHelpers.ts
│   │
│   ├── pages/              # Route pages
│   │   ├── Home.tsx
│   │   ├── Dashboard.tsx
│   │   └── Info.tsx
│   │
│   ├── locales/            # i18n translations
│   │   ├── en.json
│   │   ├── es.json
│   │   └── i18n.ts
│   │
│   └── assets/             # Static files
│
├── public/                 # Public static files
└── ...config files

Total: ~25 componentes, 5 hooks, 3 pages
Estado: Type-based (apropiado para este tamaño)
```

**¿Por qué Type-based es correcto para este proyecto?**

- ✅ Proyecto pequeño (~25 componentes total)
- ✅ Equipo pequeño (1-2 devs)
- ✅ Features simples (auth, profile, dashboard)
- ✅ Fácil de navegar actualmente

**¿Cuándo migrar a Feature-based?**

Considera migrar cuando:

- ⚠️ Superes 30+ componentes
- ⚠️ Agregues features complejas (billing, admin panel, messaging)
- ⚠️ Equipo crezca a 3+ developers
- ⚠️ Componentes en `components/auth/` y `components/dashboard/` sigan creciendo

**Señales de que estás listo:**

```files
components/auth/        → 8+ archivos
components/dashboard/   → 10+ archivos
hooks/                  → 8+ hooks mezclando features diferentes
```

En ese punto, migra a:

```estructure
features/auth/
features/dashboard/
features/profile/
shared/components/
```

---

## � 5.1 Import Rules & Module Boundaries

**Reglas de importación para mantener arquitectura limpia:**

### ✅ **CORRECTO: Imports permitidos**

```typescript
// ✅ GOOD: Import from services
import { supabase } from '@/services/supabase/db'

// ✅ GOOD: Import from utils
import { validateEmail } from '@/utils/validators'

// ✅ GOOD: Import from same feature
import { LoginForm } from './LoginForm'
import { useAuth } from '../hooks/useAuth'

// ✅ GOOD: Import from shared/common
import { Button } from '@/components/Button'
import { useDebounce } from '@/hooks/useDebounce'

// ✅ GOOD: Import public API (feature-based)
import { useAuth, LoginForm } from '@/features/auth'
```

### ❌ **INCORRECTO: Cross-feature imports**

```typescript
// ❌ BAD: Importing from another feature directly
import { getUserData } from '@/features/admin/services/userService'
// Problema: Dependencia entre features (auth → admin)

// ❌ BAD: Importing UI from services
import { LoginModal } from '@/services/authService'
// Problema: Services no deben tener UI

// ❌ BAD: Importing business logic from pages
import { validateUser } from '@/pages/Login'
// Problema: Pages son routing, no business logic

// ❌ BAD: Deep imports bypassing public API
import { loginUser } from '@/features/auth/services/authService'
// Problema: Debe usar index.ts (public API)
```

### 🔧 **Cómo corregir cross-feature imports:**

**Opción 1: Mover a shared/**

```typescript
// Si ambas features necesitan la función
mv src/features/admin/services/userService.ts src/shared/services/

// Ahora ambas pueden importar
import { getUserData } from '@/shared/services/userService'
```

**Opción 2: Usar public API**

```typescript
// features/admin/index.ts
export { getUserData } from './services/userService'

// Otras features importan del public API
import { getUserData } from '@/features/admin'
```

**Opción 3: Crear servicio común**

```typescript
// Si la lógica es realmente compartida, extraer a services/
// services/userService.ts
export const getUserData = async (userId: string) => { ... }

// Ambas features importan del servicio central
import { getUserData } from '@/services/userService'
```

---

## �📚 6️⃣ Interacción con IAs (Copilot, ChatGPT, Claude)

1. **La IA debe leer primero:**
   - `.github/copilot-instructions.md`
   - `PROJECT_STRUCTURE.md`
   - `AGENTS.md`

2. **Antes de crear carpetas o archivos nuevos:**
   - Debe **preguntar y esperar aprobación**.
   - No puede modificar estructuras sin confirmación.

3. **Referencias cruzadas:**
   - Si la IA detecta una inconsistencia (por ejemplo, función duplicada), debe sugerir refactor, **no hacerlo automáticamente**.

4. **Import validation:**
   - La IA debe verificar que los imports sigan las reglas de Module Boundaries
   - Si detecta cross-feature import, debe sugerir moverlo a `shared/` o crear public API

---

## 🧩 7️⃣ Relación con otros archivos

> 🔗 **Relacionado:**
>
> - **`AGENTS.md` → Code Style Rules** (nombres, comentarios, límites de líneas)
>   - Sección 2.2: Project Structure Rules (resumen de carpetas)
>   - Sección 2.3: File Splitting Rules (cuándo dividir archivos)
>   - Sección 2.4: Module Boundaries (imports correctos)
> - **`DEVELOPMENT_WORKFLOW.md` → Setup inicial y CI/CD**
>   - Cómo iniciar el proyecto
>   - Configuración de entorno
> - **`SECURITY.md` → Checklist de seguridad y manejo de .env**
>   - Donde ubicar archivos sensibles
>   - Reglas de .gitignore

**Diferencia clave:**

- **`PROJECT_STRUCTURE.md`** (este archivo) → **DÓNDE** colocar archivos
- **`AGENTS.md`** → **CÓMO** escribir el código dentro de esos archivos

---

## ✅ 8️⃣ Resumen Final

- 📘 `PROJECT_STRUCTURE.md` = **Mapa del sistema**
- ⚙️ `AGENTS.md` = **Reglas de estilo y buenas prácticas**
- 🧩 `DEVELOPMENT_WORKFLOW.md` = **Flujo completo del proyecto**

> **Meta:**  
> Que cualquier persona (humana o IA) pueda entender y contribuir al proyecto sin romper su estructura ni su lógica.
