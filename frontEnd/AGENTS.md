# AGENTS.md

**Version:** v3.1  
**Last updated by:** JM ✍️  
**Last updated:** 2025-10-30

---

## 🤖 About This Document

> **Purpose:** This file defines coding standards, best practices, and architectural guidelines for AI-assisted development.

### Why AI Coding Standards?

This document serves as a **framework for maximizing development efficiency** while maintaining professional code quality. It's designed to:

- ✅ **Accelerate development** - AI tools (GitHub Copilot, ChatGPT, Claude) can follow consistent patterns
- ✅ **Ensure quality** - Enforces security, testing, and maintainability standards
- ✅ **Enable collaboration** - Human developers and AI assistants work from the same rulebook
- ✅ **Show professionalism** - Demonstrates mastery of modern development practices

**🎯 Key Point:** AI is a **productivity multiplier**, not a replacement for developer expertise. This file showcases:

- Deep understanding of software engineering principles
- Ability to architect scalable systems
- Security-first mindset
- Professional development workflows

Think of it as "linting rules for AI" - just as ESLint enforces code style, this document ensures AI-generated code meets enterprise standards.

---

## 📖 Table of Contents (Priority Order for AI)

### 🔴 Critical Sections (Must Read First)

1. **[🔒 Security](#1--security)** 🔴
   - [1.1 Base Principles](#11-base-principles)
   - [1.2 Secrets Management](#12-secrets-management)
   - [1.3 Secure Code Checklist](#13-secure-code-checklist)
   - [1.4 Security & Logging Best Practices](#14-security--logging-best-practices)
   - [1.5 Security Documentation](#15-security-documentation)
   - [1.6 Security Automation](#16-security-automation)
   - [1.7 Security Flow Example](#17-security-flow-example-complete)

2. **[🧠 Architecture & Structure](#2--architecture--structure)** 🔴
   - [2.1 Tech Stack](#21-tech-stack)
   - [2.2 Project Structure Rules](#22-project-structure-rules)
   - [2.3 File Splitting Rules](#23-file-splitting-rules)
   - [2.4 Module Boundaries](#24-module-boundaries)
   - [2.5 Path Aliases Configuration](#25-path-aliases-configuration)

<!-- markdownlint-disable MD029 -->

### � Important Sections (Core Development)

3. **[💻 Language & Best Practices](#3--language--best-practices)** 🟡
   - [3.1 Code Style](#31-code-style)
   - [3.2 Naming Conventions](#32-naming-conventions)
   - [3.3 Function Rules](#33-function-rules)
   - [3.4 Code Flow Best Practices](#34-code-flow-best-practices)

4. **[🧩 Maintainability](#4--maintainability)** 🟡
   - [4.1 File Organization Rules](#41-file-organization-rules)
   - [4.2 Comments & Documentation](#42-comments--documentation-style)
   - [4.3 Global Variables & Configuration](#43-global-variables--configuration)
   - [4.4 CSS / Styling Rules](#44-css--styling-rules)

5. **[🧪 Testing](#5--testing)** 🟡
   - [5.1 Test Types & When to Use](#51-test-types--when-to-use)
   - [5.2 Test Structure & Location](#52-test-structure--location)
   - [5.3 Testing Best Practices](#53-testing-best-practices)
   - [5.4 Backend Testing Checklist](#54-backend-testing-checklist)
   - [5.5 Testing Tools](#55-testing-tools)
   - [5.6 Frontend Testing Guidelines](#56-frontend-testing-guidelines)

### 🟢 Preferred Sections (Optimization & Scale)

6. **[⚡ Performance](#6--performance)** 🟢
   - [6.1 Database Optimization](#61-database-optimization)
   - [6.2 Frontend Performance](#62-frontend-performance)
   - [6.3 API Performance](#63-api-performance)
   - [6.4 Frontend Optimization Patterns](#64-frontend-optimization-patterns)
   - [6.5 Performance Monitoring](#65-performance-monitoring)

7. **[📈 Scalability](#7--scalability)** 🟢
   - [7.1 Architecture Patterns](#71-architecture-patterns)
   - [7.2 Database Scalability](#72-database-scalability)
   - [7.3 Horizontal vs Vertical Scaling](#73-horizontal-vs-vertical-scaling)

8. **[📊 Observability & Logging](#8--observability--logging)** 🟢
   - [8.1 Recommended Logging Libraries](#81-recommended-logging-libraries)
   - [8.2 Error Tracking & Monitoring](#82-error-tracking--monitoring)
   - [8.3 Monitoring Best Practices](#83-monitoring-best-practices)
   - [8.4 When NOT to Log](#84-when-not-to-log)
   - [8.5 Log Sampling for High Traffic](#85-log-sampling-for-high-traffic)

9. **[☁️ DevOps & Infrastructure](#9-️-devops--infrastructure)** 🟢
   - [9.1 Setup & Development Commands](#91-setup--development-commands)
   - [9.2 Environment Management](#92-environment-management)
   - [9.3 CI/CD Pipeline](#93-cicd-pipeline)
     - [9.3.1 Pipeline Structure](#931-pipeline-structure-minimum-professional-standard)
     - [9.3.2 CI Optimization](#932-ci-optimization-85-faster-builds)
     - [9.3.3 Branching Strategy](#933-branching-strategy-github-flow)
     - [9.3.4 When CI Fails](#934-when-ci-fails)
     - [9.3.5 Deployment Strategies](#935-deployment-strategies)
   - [9.4 Docker & Containerization](#94-docker--containerization)

10. **[🎯 Usability (UX/UI)](#10--usability-uxui)** 🟢
    - [10.1 Accessibility (a11y)](#101-accessibility-a11y)
    - [10.2 User Feedback & Loading States](#102-user-feedback--loading-states)

11. **[👥 Collaboration & Version Control](#11--collaboration--version-control)** 🟢
    - [11.1 Git Workflow](#111-git-workflow)
    - [11.2 Pull Request Guidelines](#112-pull-request-guidelines)
    - [11.3 Why Small PRs Are CRITICAL](#113-why-small-prs-are-critical)
    - [11.4 Code Review Standards](#114-code-review-standards)
    - [11.5 Branch Protection Rules](#115-branch-protection-rules)

<!-- markdownlint-enable MD029 -->

### 📑 Quick Access Sections

- [📖 How to Use This Template](#-how-to-use-this-template)
- [🎯 Core Principles](#-core-principles-read-this-first)
- [⚡ Quick Start Checklist](#-quick-start-checklist)
- [🚨 When to Break the Rules](#-when-to-break-the-rules)
- [🔧 Common Issues & Solutions](#-common-issues--solutions)
- [🛠 Recommended Tools](#-recommended-tools)
- [📚 License & Code Ownership](#-license--code-ownership)
- [🎯 Quick Reference Card](#-quick-reference-card)
- [🤖 AI Instructions](#-ai-instructions)

---

## 📖 How to Use This Template

**Priority: CRITICAL 🔴**

This AGENTS.md serves as your **master coding standards template** for ALL projects.

### 🔧 **Before Starting a New Project:**

1. **Copy this file** to your new project's root
2. **Update Section 2.1 (Tech Stack)** with your actual technologies
3. **Adapt code examples** if using different frameworks:
   - Supabase → Firebase/Auth0/Passport.js
   - React → Vue/Angular/Svelte
   - Vite → Webpack/Next.js/Remix
4. **Keep all principles intact** (Security, Testing, CI/CD are universal)

### ✅ **What's Universal (Don't Change):**

- ✅ Security flow (Auth → Validate → Process → Log)
- ✅ Testing best practices (coverage, priority order)
- ✅ CI/CD pipeline (Lint → Test → Build → Audit)
- ✅ Git workflow (branch naming, PRs <400 lines)
- ✅ Logging principles (no sensitive data, sampling)
- ✅ Code style (naming, comments, file splitting)

### 🔄 **What's Customizable:**

- 🔄 Tech stack (Section 2.1)
- 🔄 Code examples (adapt to your frameworks)
- 🔄 Tools mentioned (Vitest → Jest, Pino → Winston)

---

## 🎯 Core Principles (Read This First)

### Priority: CRITICAL 🔴

- **Always follow instructions** - Never assume unknown or undefined behavior before writing code
- **Verify first, code second** - Check inputs, data types, and logic flow before implementation
- **Ask when uncertain** - If information is missing, ask before proceeding
- **Security by default** - Every decision must consider security implications
- **Modularity first** - Keep environment-specific configurations isolated
- **Each module exposes its own public interface** - Never import logic from unrelated features or layers
- **Check MPC server requirements** - Verify if the project requires connection to an MPC server before implementation

---

## ⚡ Quick Start Checklist

**Priority: CRITICAL 🔴**

Before starting ANY new project, ensure these are in place:

### Project Setup

- [ ] **README.md** exists with project overview
- [ ] **LICENSE** file added (MIT/GPL/Proprietary)
- [ ] **.gitignore** configured (node_modules, .env, dist)
- [ ] **.env.example** created with required variables
- [ ] **package.json** has all necessary scripts

### Code Quality

- [ ] **Testing** setup (Vitest + Testing Library)
- [ ] **Logger** created (`utils/logger.ts`)
- [ ] **Path aliases** configured (tsconfig + vite/webpack)
- [ ] **ESLint** + **Prettier** configured
- [ ] **Pre-commit hooks** (Husky + lint-staged)

### CI/CD & DevOps

- [ ] **GitHub Actions** workflow (`.github/workflows/ci.yml`)
- [ ] **Security headers** configured (vercel.json/netlify.toml)
- [ ] **Environment variables** documented

### Documentation

- [ ] **AGENTS.md** present (coding standards)
- [ ] **PROJECT_STRUCTURE.md** present (file organization)
- [ ] **SECURITY.md** present (security checklist)

**Time to complete:** ~30 minutes  
**Impact:** Prevents 90% of common project issues

---

## 1. 🔒 Security

**Priority: CRITICAL 🔴**

### 1.1 Base Principles

```txt
Authentication → Authorization → Validation → Secure Logging
```

- Validate all external data before processing
- Never interpolate unsanitized variables in SQL, HTML, or shell commands
- Don't expose internal paths, structures, or sensitive error messages
- Always use environment variables for private data (`.env`)

---

### 1.2 Secrets Management

```typescript
// ❌ NEVER DO THIS
const API_KEY = 'sk-1234567890abcdef'

// ✅ ALWAYS DO THIS
const API_KEY = process.env.API_KEY
```

**Rules:**

- Never write API keys, tokens, or passwords directly in code
- Use environment variables (`.env`) or local files outside version control
- Mark sensitive values clearly:

```typescript
// 🔒 SECURITY: Do NOT expose publicly
export const API_KEY = process.env.API_KEY
```

---

### 1.3 Secure Code Checklist

Before committing any code:

- [ ] All external inputs validated and sanitized
- [ ] No hardcoded secrets or credentials
- [ ] Environment variables used for sensitive data
- [ ] No sensitive information in error messages
- [ ] SQL queries use parameterized statements
- [ ] File paths sanitized (prevent directory traversal)
- [ ] Authentication + authorization implemented
- [ ] CORS properly configured
- [ ] Rate limiting on endpoints

---

### 1.4 Security & Logging Best Practices

#### Never use console.log in production

```typescript
// ❌ NEVER DO THIS in production
console.log('User data:', user)
console.error('Payment failed:', paymentData)

// ✅ ALWAYS use a logger
import { logger } from '@/utils/logger'

logger.info('User logged in', { userId: user.id })
logger.error('Payment failed', {
  orderId: payment.orderId,
  error: error.message,
})
```

**Why loggers over console:**

- **Security:** Console logs can expose sensitive data in production
- **Structure:** Loggers provide consistent formatting (JSON, timestamps)
- **Levels:** debug, info, warn, error - easier to filter
- **Persistence:** Can route to files, services (Sentry, DataDog)
- **Performance:** Can be disabled in production
- **Context:** Attach metadata (user ID, request ID, environment)

#### Logging Rules

```typescript
// ✅ GOOD: Structured logging
logger.info('API request completed', {
  method: req.method,
  path: req.path,
  duration: elapsed,
  statusCode: res.statusCode,
  userId: req.user?.id, // Only non-sensitive data
})

// ❌ BAD: Logging sensitive data
logger.info('User login', {
  password: user.password, // NEVER log passwords
  creditCard: user.creditCard, // NEVER log financial data
  apiKey: user.apiKey, // NEVER log secrets
})

// ✅ GOOD: Log errors with context
try {
  await processPayment(order)
} catch (error) {
  logger.error('Payment processing failed', {
    orderId: order.id,
    amount: order.total,
    error: error.message,
    stack: error.stack,
  })
  throw error
}
```

#### Logger Configuration Example

```typescript
// /utils/logger.ts
import pino from 'pino'

const isDevelopment = process.env.NODE_ENV === 'development'

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',

  // Pretty print in development
  transport: isDevelopment
    ? {
        target: 'pino-pretty',
        options: { colorize: true },
      }
    : undefined,

  // Redact sensitive fields
  redact: {
    paths: ['password', 'token', 'apiKey', 'creditCard', 'ssn'],
    remove: true,
  },

  // Add context to all logs
  base: {
    env: process.env.NODE_ENV,
    app: 'my-app',
  },
})
```

#### Log Levels Guide

- **DEBUG** - Detailed info for diagnosing issues (disabled in production)
  - Example: "Database query: SELECT \* FROM users WHERE id = ?"
- **INFO** - General informational messages
  - Example: "User logged in", "Payment processed successfully"
- **WARN** - Warning messages (not errors, but attention needed)
  - Example: "API rate limit approaching", "Deprecated feature used"
- **ERROR** - Error events (but application continues)
  - Example: "Payment failed", "External API timeout"
- **FATAL** - Critical errors (application may crash)
  - Example: "Database connection lost", "Out of memory"

#### Logging Checklist

Before committing code:

- [ ] No `console.log()` statements in production code
- [ ] Logger imported and used correctly
- [ ] No sensitive data in log messages (passwords, tokens, cards)
- [ ] Appropriate log level used (debug/info/warn/error)
- [ ] Errors logged with context (not just error message)
- [ ] Request ID or correlation ID included in logs (for tracing)

#### Integration with Error Tracking

```typescript
// ✅ GOOD: Combine logger with error tracking
import { logger } from '@/utils/logger'
import * as Sentry from '@sentry/node'

try {
  await riskyOperation()
} catch (error) {
  // Log for internal debugging
  logger.error('Operation failed', {
    operation: 'riskyOperation',
    error: error.message,
    stack: error.stack,
  })

  // Send to error tracking service
  Sentry.captureException(error)

  throw error
}
```

#### Exception: Development Console Logs

```typescript
// ✅ ACCEPTABLE: Temporary debug logs (must be removed)
if (process.env.NODE_ENV === 'development') {
  console.log('🐛 DEBUG:', someVariable) // TODO: Remove before commit
}

// ✅ BETTER: Use debug level
logger.debug('Variable state', { someVariable })
```

---

### 1.5 Security Documentation

Every critical function must include security comments:

```typescript
/**
 * Validates and sanitizes user input
 * Prevents SQL Injection and XSS attacks
 *
 * @security Critical - Input validation required
 * @param input - Raw user input
 * @returns Sanitized string or null if invalid
 */
```

---

### 1.6 Security Automation

- Configure ESLint with security rules
- Use Husky or pre-commit hooks to verify code before commit
- Run audits: `bun audit` or similar tools
- Protect endpoints with Helmet.js, controlled CORS, and rate limits

---

### 1.7 Security Flow Example (Complete)

> **📝 Note:** This example uses Supabase for authentication.  
> Adapt the auth provider calls (`supabase.auth.getUser()`, `updateUser()`) to your stack:
>
> - Firebase: `firebase.auth().currentUser`
> - Auth0: `auth0.getUser()`
> - Passport.js: `req.user`
> - Custom: Your auth service

**Real-world example: Change Password endpoint**

```typescript
/**
 * Changes user password with full security flow
 *
 * @security Critical - Follows Auth → Validate → Process → Log pattern
 */
const changePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean }> => {
  try {
    // 1. AUTHENTICATION - Verify user identity and current password
    const user = await supabase.auth.getUser()
    if (!user) {
      throw new Error('Unauthorized')
    }

    const isValidPassword = await verifyPassword(user.id, currentPassword)
    if (!isValidPassword) {
      logger.warn('Failed password change attempt', {
        userId: user.id,
        reason: 'incorrect_current_password',
      })
      throw new Error('Current password is incorrect')
    }

    // 2. VALIDATION - Validate new password before processing
    if (newPassword.length < 8) {
      throw new Error('Password must be at least 8 characters')
    }
    if (!/[A-Z]/.test(newPassword)) {
      throw new Error('Password must contain uppercase letter')
    }
    if (!/[0-9]/.test(newPassword)) {
      throw new Error('Password must contain number')
    }
    if (currentPassword === newPassword) {
      throw new Error('New password must be different from current')
    }

    // 3. PROCESS - Update password in database
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) {
      throw error
    }

    // 4. LOG - Record successful action (no sensitive data)
    logger.info('Password changed successfully', {
      userId: user.id,
      timestamp: new Date().toISOString(),
      ipAddress: request.ip,
      userAgent: request.headers['user-agent'],
    })

    // Optional: Send notification email
    await sendPasswordChangedEmail(user.email)

    return { success: true }
  } catch (error) {
    // Log error without sensitive data
    logger.error('Password change failed', {
      userId: user?.id,
      error: error.message,
      // ❌ NEVER log: currentPassword, newPassword
    })
    throw error
  }
}
```

**Key security principles applied:**

1. ✅ **Auth first** - No processing without verification
2. ✅ **Validate before DB** - Fail fast, prevent invalid data
3. ✅ **Atomic operation** - All or nothing (transaction)
4. ✅ **Log after success** - Accurate audit trail
5. ✅ **No sensitive data in logs** - Never log passwords
6. ✅ **User notification** - Alert on security-critical actions

**This pattern applies to all critical operations:**

- Create/delete account
- Update email
- File uploads
- Payment processing
- Admin actions

---

## 2. 🧠 Architecture & Structure

**Priority: CRITICAL 🔴**

### 2.1 Tech Stack

> **📝 Note:** This section should be customized per project.  
> Replace with your actual tech stack before starting.

**Current Project Example:**

```txt
Frontend: React 19 + TypeScript Strict + Tailwind CSS
Runtime: Bun (modern ES6+)
Languages: TypeScript (strict mode), Python (only when requested)
Styling: Tailwind CSS (utility-first)
Database: Supabase (PostgreSQL + Auth)
```

**Template for new projects:**

```txt
Frontend: [Framework] + [Language] + [Styling]
Backend: [Runtime/Framework] + [Language]
Database: [Database type + ORM]
Testing: [Test framework]
CI/CD: [Platform]
Deployment: [Platform]
```

**Common stacks:**

- **MERN:** MongoDB + Express + React + Node.js
- **PERN:** PostgreSQL + Express + React + Node.js
- **T3:** Next.js + tRPC + Prisma + TypeScript
- **Django Full:** Django + PostgreSQL + React/Vue
- **Laravel:** Laravel + MySQL + Vue/React
- **Go Full:** Go + Gin + PostgreSQL + React

---

### 2.2 Project Structure Rules

```folder
/config/          → Global configurations (API, system settings)
/components/      → React components (UI)
/hooks/           → Custom React hooks (reusable logic)
/utils/           → Pure utility functions
/services/        → API calls and external integrations
/types/           → TypeScript type definitions
/tests/           → All test files
```

**Importation Rules:**

- Only import from `/config/`, `/utils/`, `/services/`, or direct parent modules
- Never import logic from unrelated features
- Each module must expose its own public interface

**For detailed structure guidance, see:**

- `PROJECT_STRUCTURE.md` → Full folder organization guide
  - Section 5: Type-based vs Feature-based structures
  - Section 5.1: Import rules & module boundaries
  - Your current project structure (Type-based)
  - When and how to migrate to Feature-based

---

### 2.3 File Splitting Rules

**When to split a file:**

```script
IF file > 300 lines AND has_multiple_responsibilities
THEN → Split into focused modules

IF file > 300 lines BUT single_cohesive_purpose
THEN → Keep together (schemas, route configs, complex components)
```

**Examples of acceptable large files:**

- Database schema definitions (Prisma/TypeORM models)
- Route configuration files
- Complex UI components with single responsibility
- API endpoint collections for one resource

**How to split:**

1. **Separate UI from logic** (components vs hooks)
2. **Extract business logic** to `/services/` or `/utils/`
3. **Create custom hooks** for complex state management
4. **Move types** to `/types/` if shared across files

**Example:**

```script
UserDashboard.tsx (350 lines) →
  ├── UserDashboard.tsx (UI only, 150 lines)
  ├── useUserData.ts (custom hook, 100 lines)
  └── userService.ts (API logic, 100 lines)
```

---

### 2.4 Module Boundaries

```typescript
// ❌ BAD: Cross-feature import
import { getUserData } from '@/features/admin/services/userService'

// ✅ GOOD: Through public API
import { getUserData } from '@/services/userService'
```

---

### 2.5 Path Aliases Configuration

**Priority: CRITICAL 🔴**

> **📝 Note:** Examples show Vite/Webpack/Next.js configurations.  
> Adapt to your bundler (Parcel, Rollup, esbuild, etc.)

Always use path aliases instead of relative imports for better maintainability.

#### Why Path Aliases?

```typescript
// ❌ BAD: Relative imports (hard to maintain)
import { supabase } from '../../../services/supabase/db'
import { validateEmail } from '../../../../utils/validators'
import { useAuth } from '../../hooks/useAuth'

// ✅ GOOD: Path aliases (clean and scalable)
import { supabase } from '@/services/supabase/db'
import { validateEmail } from '@/utils/validators'
import { useAuth } from '@/hooks/useAuth'
```

**Benefits:**

- Easy to move files without breaking imports
- Easier to read and understand
- Autocomplete works better
- No counting `../` levels

#### Configuration

**TypeScript (`tsconfig.json` or `tsconfig.app.json`):**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Vite (`vite.config.ts`):**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

**Webpack (`webpack.config.js`):**

```javascript
module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
}
```

**Next.js (`tsconfig.json`):**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/utils/*": ["./src/utils/*"]
    }
  }
}
```

#### Usage Rules

- Always use `@/` for imports from `src/`
- Update all relative imports when setting up new project
- Configure in both TypeScript and bundler (Vite/Webpack)
- Test that autocomplete works in your IDE

**Setup time:** 5 minutes  
**Time saved:** Hours over project lifetime

---

## 3. 💻 Language & Best Practices

**Priority: IMPORTANT 🟡**

### 3.1 Code Style

```typescript
// TypeScript Strict Mode
// Single quotes, no semicolons
// Modern ES6+ syntax

const getUserData = async (userId: string) => {
  const response = await fetch(`/api/users/${userId}`)
  return response.json()
}
```

**Rules:**

- TypeScript strict mode enabled
- Single quotes for strings
- No semicolons
- Modern ES6+ features (arrow functions, async/await, destructuring)
- React 19+ patterns

---

### 3.2 Naming Conventions

```typescript
// ✅ Descriptive names in English, camelCase
const getUserData = () => {}
const isAuthenticated = true
const MAX_RETRY_ATTEMPTS = 3

// ❌ Avoid cryptic abbreviations
const gud = () => {} // Bad
const auth = true // Bad (unless widely known)
```

**Rules:**

- Functions: `camelCase`, verb-based (`getUserData`, `validateInput`)
- Variables: `camelCase`, descriptive (`isLoading`, `userData`)
- Constants: `UPPER_SNAKE_CASE` (`API_BASE_URL`, `MAX_TIMEOUT`)
- Components: `PascalCase` (`UserDashboard`, `LoginForm`)
- Types/Interfaces: `PascalCase` (`User`, `ApiResponse`)

---

### 3.3 Function Rules

Every function must have JSDoc comments:

```typescript
/**
 * Fetches user data from the API
 *
 * @param userId - The unique user identifier
 * @returns User object with profile information
 * @throws {ApiError} When user not found or network fails
 */
const getUserData = async (userId: string): Promise<User> => {
  // Implementation
}
```

**Rules:**

- One function = one responsibility
- Small functions (max 20-30 lines)
- Clear input/output (typed parameters and return values)
- Error handling explicit

---

### 3.4 Code Flow Best Practices

```typescript
// ✅ GOOD: Linear, easy to follow
const processPayment = async (amount: number) => {
  // 1. Validate
  if (amount <= 0) throw new Error('Invalid amount')

  // 2. Process
  const result = await paymentService.charge(amount)

  // 3. Return
  return result
}

// ❌ BAD: Multiple early returns, nested ifs
const processPayment = async (amount: number) => {
  if (amount > 0) {
    if (user.isVerified) {
      if (balance >= amount) {
        return await charge(amount)
      } else {
        return null
      }
    }
  }
  return null
}
```

**Rules:**

- Keep functions small and focused
- Avoid deep nesting (max 2-3 levels)
- Use early returns for validation
- Comment important transitions
- Follow natural order: Read → Validate → Process → Respond

---

## 4. 🧩 Maintainability

**Priority: IMPORTANT 🟡**

### 4.1 File Organization Rules

Flexible file size approach:

```script
IF file > 300 lines AND has_multiple_responsibilities
THEN → Split into focused modules

IF file > 300 lines BUT single_cohesive_purpose
THEN → Keep together (schemas, route configs, complex components)
```

**Examples of acceptable large files:**

- Database schema definitions (Prisma/TypeORM models)
- Route configuration files
- Complex UI components with single responsibility
- API endpoint collections for one resource

---

### 4.2 Comments & Documentation Style

**File header format:**

```typescript
/**
 * UserDashboard Component
 *
 * Main dashboard view for authenticated users.
 * Displays user stats, recent activity, and quick actions.
 *
 * Used in: /app/dashboard route
 * Dependencies: useUserData hook, StatsCard component
 */
```

**Comment rules:**

- First lines of every file explain its purpose and role in the project
- Leave 1+ blank lines before comments or new code blocks
- Use language-specific comment formats:
  - JavaScript/TypeScript: `//` (single), `/* */` (multi-line)
  - Python: `#` (single), `"""` (multi-line)

**Function documentation:**

```typescript
/**
 * Validates user email format and domain
 *
 * @param email - User email address
 * @returns true if valid, false otherwise
 * @example
 * validateEmail('user@example.com') // true
 * validateEmail('invalid') // false
 */
const validateEmail = (email: string): boolean => {
  // Implementation
}
```

---

### 4.3 Global Variables & Configuration

**Structure:**

```folder
/config/
  ├── api.config.ts        → API endpoints, versions
  ├── system.config.ts     → App name, version, environment
  ├── database.config.ts   → DB connections, pools
  └── index.ts             → Re-exports all configs
```

**Configuration documentation:**

```typescript
/**
 * API Configuration
 *
 * ✅ Editable: Change BASE_URL per environment
 * ⚠️ Protected: API_VERSION should not change without backend approval
 * 🔒 Sensitive: API_KEY must use environment variables
 */

export const API_CONFIG = {
  BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000',
  VERSION: 'v1', // ⚠️ Coordinate changes with backend team
  TIMEOUT: 30000,
}

// 🔒 SECURITY: Never expose publicly
export const API_KEY = process.env.API_KEY
```

**Import rules:**

```typescript
// ✅ GOOD: Import only what you need
import { API_CONFIG } from '@/config'

// ❌ BAD: Don't modify config values outside /config/
API_CONFIG.BASE_URL = 'https://new-url.com' // Never do this
```

---

### 4.4 CSS / Styling Rules

**Priority: Tailwind first**

```tsx
// ✅ GOOD: Tailwind utility classes
<div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-md">
  <h1 className="text-2xl font-bold text-gray-900">Title</h1>
</div>

// ⚠️ ACCEPTABLE: Custom CSS for complex layouts (ask first)
<div className="custom-grid-layout">
  {/* Complex grid that's hard with Tailwind */}
</div>
```

**Custom Properties for repetition:**

**IMPORTANT:** If the same value is used **3+ times**, create a CSS variable.

```css
/* ✅ GOOD: Reusable CSS variables */
:root {
  --primary-color: #3b82f6;
  --spacing-unit: 0.25rem;
  --border-radius-default: 0.5rem;
}

.button {
  background: var(--primary-color);
  border-radius: var(--border-radius-default);
}

/* ❌ BAD: Repeating values */
.button {
  background: #3b82f6;
}
.card {
  background: #3b82f6;
}
.badge {
  background: #3b82f6;
}
```

---

## 5. 🧪 Testing

**Priority: IMPORTANT 🟡**

### 5.1 Test Types & When to Use

```txt
Unit Tests       → Individual functions, pure logic
Integration      → Module interactions, DB queries
E2E              → Complete user flows (API + DB + UI)
Contract         → API contracts between services
Security         → Vulnerability detection (injections, XSS)
Performance      → Load testing, stress testing
Smoke            → Basic "does it run?" checks
Regression       → Ensure fixes don't break existing features
```

---

### 5.2 Test Structure & Location

```folder
/tests/
  ├── unit/              → Function-level tests
  │   └── utils.test.ts
  ├── integration/       → Module interaction tests
  │   └── api.test.ts
  └── e2e/              → Full flow tests
      └── checkout.test.ts

OR (alternative)

/components/
  ├── Button.tsx
  └── Button.test.tsx   → Co-located tests
```

**Naming convention:**

- Use `*.test.ts` or `*.spec.ts` (choose one, be consistent)
- Test files mirror source structure

---

### 5.3 Testing Best Practices

```typescript
// ✅ GOOD: Descriptive test names
describe('validateEmail', () => {
  it('should return true for valid email addresses', () => {
    expect(validateEmail('user@example.com')).toBe(true)
  })

  it('should return false when email missing @ symbol', () => {
    expect(validateEmail('invalid-email')).toBe(false)
  })

  it('should return false for null or undefined input', () => {
    expect(validateEmail(null)).toBe(false)
  })
})

// ❌ BAD: Vague test names
it('works', () => {
  /* test */
})
it('test 1', () => {
  /* test */
})
```

**Testing rules:**

- **Isolation:** Mock external services (email, payments, APIs)
- **Test database:** Use SQLite in-memory or test containers
- **Order independence:** Tests must run in any sequence
- **Seed & teardown:** Clean database between tests
- **Minimal data:** Use only necessary data for each test
- **CI/CD integration:** Run tests on PR and main branch

---

### 5.4 Backend Testing Checklist

Before merging backend code:

- [ ] Unit tests for new business logic
- [ ] Integration tests for new endpoints
- [ ] Input validation and sanitization tested
- [ ] Environment variables used (no hardcoded secrets)
- [ ] Regression test added if fixing a bug
- [ ] CI/CD runs tests automatically
- [ ] Test coverage ≥ 80%

---

### 5.5 Testing Tools

**JavaScript/TypeScript:** Jest, Vitest  
**Python:** pytest  
**E2E:** Playwright, Cypress  
**API Testing:** Supertest, Postman  
**Coverage:** Istanbul, c8

---

### 5.6 Frontend Testing Guidelines

**Priority: IMPORTANT 🟡**

Frontend testing has different priorities than backend. Follow this order:

#### Testing Priority (Easiest → Hardest)

**1. Utils & Validators (START HERE)** ⭐

- Pure functions without dependencies
- Fastest to write and run
- Highest ROI

```typescript
// src/utils/__tests__/validators.test.ts
import { describe, it, expect } from 'vitest'
import { validateEmail, validatePassword } from '../validators'

describe('validateEmail', () => {
  it('should accept valid emails', () => {
    expect(validateEmail('user@example.com')).toBe(true)
  })

  it('should reject invalid emails', () => {
    expect(validateEmail('invalid')).toBe(false)
    expect(validateEmail('no@domain')).toBe(false)
  })
})
```

**2. Custom Hooks (MEDIUM)**

- Business logic separated from UI
- Reusable across components

```typescript
// src/hooks/__tests__/useAuth.test.ts
import { renderHook, waitFor } from '@testing-library/react'
import { useAuth } from '../useAuth'

describe('useAuth', () => {
  it('should start as not authenticated', () => {
    const { result } = renderHook(() => useAuth())
    expect(result.current.isAuthenticated).toBe(false)
  })
})
```

**3. Components (HARDER)**

- User interactions and rendering
- Requires more setup

```typescript
// src/components/__tests__/LoginModal.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import LoginModal from '../LoginModal'

describe('LoginModal', () => {
  it('should show error for invalid email', async () => {
    render(<LoginModal isOpen={true} onClose={() => {}} />)

    const emailInput = screen.getByLabelText(/email/i)
    fireEvent.change(emailInput, { target: { value: 'invalid' } })

    const submitButton = screen.getByRole('button', { name: /submit/i })
    fireEvent.click(submitButton)

    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument()
  })
})
```

#### Frontend Testing Stack

**Required:**

- **Vitest** - Fast test runner (replacement for Jest)
- **Testing Library** - Test components like users use them
- **jsdom** - Browser environment simulation

**Optional:**

- **MSW** (Mock Service Worker) - Mock API calls
- **Playwright** - E2E testing
- **@testing-library/user-event** - Better user interactions

#### Setup Example

```bash
# Install dependencies
bun add -d vitest @testing-library/react @testing-library/jest-dom jsdom
```

**vitest.config.ts:**

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
```

**src/test/setup.ts:**

```typescript
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

afterEach(() => {
  cleanup()
})
```

#### Coverage Goals

**Minimum for production:**

- **Utils/Validators:** 90%+ (easy to achieve)
- **Hooks:** 70%+
- **Components:** 60%+
- **Overall:** 70%+

**What NOT to test:**

- Third-party libraries (already tested)
- Trivial getters/setters
- Styles and CSS (use visual regression instead)

#### Testing Checklist

Before merging frontend code:

- [ ] Utils and validators have tests
- [ ] Custom hooks have tests
- [ ] Critical components have tests (auth, forms)
- [ ] All tests pass locally
- [ ] Coverage meets minimum (70%)
- [ ] No hardcoded test data (use factories/fixtures)

---

## 6. ⚡ Performance

**Priority: PREFERRED 🟢**

### 6.1 Database Optimization

```typescript
// ❌ BAD: N+1 query problem
const users = await db.users.findMany()
for (const user of users) {
  user.posts = await db.posts.findMany({ where: { userId: user.id } })
}

// ✅ GOOD: Single query with join
const users = await db.users.findMany({
  include: { posts: true },
})
```

**Rules:**

- Avoid N+1 queries (use joins or eager loading)
- Index frequently queried columns
- Use pagination for large datasets
- Cache expensive queries (Redis, in-memory)

---

### 6.2 Frontend Performance

```tsx
// ✅ GOOD: Lazy loading heavy components
const HeavyChart = lazy(() => import('./HeavyChart'))

const Dashboard = () => (
  <Suspense fallback={<Spinner />}>
    <HeavyChart data={data} />
  </Suspense>
)

// ✅ GOOD: Memoization for expensive computations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data)
}, [data])
```

**Image Optimization:**

```tsx
// ✅ GOOD: Optimized images with Next.js
import Image from 'next/image'

<Image
  src="/hero.jpg"
  width={1200}
  height={600}
  loading="lazy"
  alt="Hero image"
  placeholder="blur"
/>

// ✅ GOOD: Manual optimization
<img
  src="/hero.webp"
  loading="lazy"
  alt="Hero"
  width="1200"
  height="600"
/>
```

**CDN for Static Assets:**

```typescript
// ✅ GOOD: Use CDN for static files
const CDN_URL = process.env.CDN_URL || 'https://cdn.example.com'

export const getAssetUrl = (path: string) => {
  return `${CDN_URL}${path}`
}

// Usage
<img src={getAssetUrl('/images/logo.png')} alt="Logo" />
```

**Rules:**

- Lazy load non-critical components
- Memoize expensive computations (`useMemo`, `useCallback`)
- Debounce search inputs and API calls
- Optimize images (WebP, lazy loading, proper sizing)
- Use CDN for static assets (images, fonts, CSS)
- Code splitting for large bundles
- Use image optimization tools (sharp, next/image)

---

### 6.3 API Performance

```typescript
// ✅ GOOD: Response caching
app.get('/api/stats', cache('5 minutes'), async (req, res) => {
  const stats = await getStats()
  res.json(stats)
})

// ✅ GOOD: Compression
app.use(compression())

// ✅ GOOD: Rate limiting
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }))
```

**Rules:**

- Cache static/slow-changing responses
- Use compression (gzip, brotli)
- Implement rate limiting
- Optimize payload size (send only needed fields)
- Use HTTP/2 when possible

---

### 6.4 Frontend Optimization Patterns

**Priority: CRITICAL 🔴 - Choose the right pattern for each scenario**

#### 🎯 **The Problem: Too Many API Calls**

User types "react" in search input → 5 keystrokes = 5 API calls ❌

**Solutions:** Debounce, Throttle, or useMemo? **Each has different use cases.**

---

#### ✅ **Debounce (Search Inputs, Forms)**

**Use when:** You want to wait until user STOPS typing

```typescript
import { useState, useEffect } from 'react'

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    // Debounce: Wait 300ms after last keystroke
    const timeoutId = setTimeout(async () => {
      if (searchTerm.length > 2) {
        const data = await searchAPI(searchTerm)
        setResults(data)
      }
    }, 300) // ✅ Only 1 request after user stops typing

    // Cleanup: Cancel previous timeout
    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  )
}
```

**Result:**

- User types "react" (5 keystrokes) → **1 API call** ✅
- Reduction: 80-95%

**Use for:**

- ✅ Search inputs
- ✅ Autocomplete
- ✅ Form validation (while typing)
- ✅ Text editors (auto-save)

---

#### ⚡ **Throttle (Scroll Events, Window Resize)**

**Use when:** You want updates WHILE something is happening (but rate-limited)

```typescript
import { useEffect } from 'react'

const InfiniteScroll = () => {
  useEffect(() => {
    let lastCall = 0

    const handleScroll = () => {
      const now = Date.now()

      // Throttle: Max 1 call every 200ms
      if (now - lastCall >= 200) {
        lastCall = now

        // Check if near bottom
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
          loadMoreItems()
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return <div>...</div>
}
```

**Result:**

- User scrolls for 2 seconds → **10 checks** (instead of 100+) ✅
- Smooth experience without overwhelming the system

**Use for:**

- ✅ Scroll events (infinite scroll, parallax)
- ✅ Window resize handlers
- ✅ Mouse move tracking
- ✅ Real-time dashboards (chart updates)

---

#### 🧠 **useMemo (Heavy Computations)**

**Use when:** You have EXPENSIVE calculations that depend on props/state

```typescript
import { useMemo } from 'react'

const ProductList = ({ products, filters }) => {
  // ❌ BAD: Recalculates on EVERY render
  const sortedProducts = products
    .filter(p => p.category === filters.category)
    .sort((a, b) => b.price - a.price)

  // ✅ GOOD: Only recalculates when products or filters change
  const sortedProducts = useMemo(() => {
    return products
      .filter(p => p.category === filters.category)
      .sort((a, b) => b.price - a.price)
  }, [products, filters]) // Dependencies

  return <div>{sortedProducts.map(...)}</div>
}
```

**Result:**

- Component re-renders 10 times → **1 calculation** (instead of 10) ✅
- Only recalculates when dependencies change

**Use for:**

- ✅ Sorting/filtering large arrays
- ✅ Complex calculations (math, formatting)
- ✅ Derived state (computations from props)
- ❌ NOT for API calls (use debounce)

---

#### 📊 **Comparison Table**

| Pattern      | Use Case           | Reduces Calls? | Updates During Action?        |
| ------------ | ------------------ | -------------- | ----------------------------- |
| **Debounce** | Search inputs      | ✅ 80-95%      | ❌ No (waits until done)      |
| **Throttle** | Scroll events      | ✅ 50-90%      | ✅ Yes (periodic updates)     |
| **useMemo**  | Heavy calculations | ✅ N/A         | N/A (prevents re-calculation) |

---

#### 🔧 **Using a Library (Recommended)**

```bash
bun add use-debounce
```

```typescript
import { useDebounce } from 'use-debounce'

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedValue] = useDebounce(searchTerm, 300)

  useEffect(() => {
    if (debouncedValue.length > 2) {
      searchAPI(debouncedValue) // ✅ Clean and simple
    }
  }, [debouncedValue])

  return <input onChange={(e) => setSearchTerm(e.target.value)} />
}
```

---

#### 🎯 **Decision Tree**

```txt
Need to optimize?
│
├─ API calls from user input?
│  └─ Use DEBOUNCE (wait until user stops)
│
├─ Updates during continuous action (scroll, resize)?
│  └─ Use THROTTLE (periodic updates)
│
└─ Expensive calculation from props/state?
   └─ Use USEMEMO (cache result)
```

---

#### 💰 **Real-World Impact**

**Example: Search feature with 1000 daily users**

```txt
Without debounce:
1000 users × 10 searches/day × 8 keystrokes avg = 80,000 API calls/day
Cost: $80/day ($2,400/month)

With debounce:
1000 users × 10 searches/day × 1 final request = 10,000 API calls/day
Cost: $10/day ($300/month)

Savings: $2,100/month ✅
```

---

### 6.5 Performance Monitoring

**Tools:**

- Lighthouse (web vitals)
- Bundle analyzers (webpack-bundle-analyzer)
- APM tools (New Relic, Datadog)
- Database query profiling

---

## 7. 📈 Scalability

**Priority: PREFERRED 🟢**

### 7.1 Architecture Patterns

```typescript
// ✅ GOOD: Service layer pattern (separation of concerns)
// controller.ts
export const createUser = async (req, res) => {
  const user = await userService.create(req.body)
  res.json(user)
}

// userService.ts
export const create = async (userData) => {
  const validated = validateUser(userData)
  return await db.users.create(validated)
}
```

**Patterns to consider:**

- Service layer (business logic separation)
- Repository pattern (data access abstraction)
- Event-driven architecture (for microservices)
- Message queues (for async tasks)

---

### 7.2 Database Scalability

**Read Replicas Configuration Example:**

```typescript
// ✅ GOOD: Primary-replica setup
import { Sequelize } from 'sequelize'

const primary = new Sequelize(process.env.DATABASE_URL_PRIMARY, {
  pool: { max: 10, min: 2, idle: 10000 },
})

const replica = new Sequelize(process.env.DATABASE_URL_REPLICA, {
  pool: { max: 20, min: 5, idle: 10000 },
  replication: {
    read: [{ host: 'replica1.db.com' }, { host: 'replica2.db.com' }],
    write: { host: 'primary.db.com' },
  },
})

// Use replica for read operations
const users = await replica.models.User.findAll()

// Use primary for writes
await primary.models.User.create(userData)
```

**Best Practices:**

- Use connection pooling
- Implement read replicas for heavy read workloads
- Partition large tables when needed
- Archive old data periodically
- Monitor query performance regularly

---

### 7.3 Horizontal vs Vertical Scaling

```txt
Vertical: Increase server resources (CPU, RAM)
Horizontal: Add more servers (load balancing)

Prefer horizontal scaling for:
- Web servers (stateless)
- API gateways
- Background workers

Consider vertical for:
- Databases (initial scaling)
- Legacy monoliths
```

---

## 8. 📊 Observability & Logging

**Priority: PREFERRED 🟢**

### 8.1 Recommended Logging Libraries

**JavaScript/TypeScript:**

- `pino` - Fast, low overhead (recommended)
- `winston` - Feature-rich, highly configurable
- `bunyan` - JSON logging, great for services

**Python:**

- `loguru` - Simple, powerful (recommended)
- `structlog` - Structured logging
- Built-in `logging` module (for basic needs)

---

### 8.2 Error Tracking & Monitoring

**Tools:**

- **Sentry** - Error tracking & performance monitoring
- **Rollbar** - Error tracking
- **Bugsnag** - Error monitoring
- **LogRocket** - Session replay with error tracking
- **DataDog** - Full observability platform
- **New Relic** - APM and monitoring

---

### 8.3 Monitoring Best Practices

```typescript
// ✅ GOOD: Request tracing with correlation ID
import { v4 as uuidv4 } from 'uuid'

app.use((req, res, next) => {
  req.correlationId = uuidv4()
  logger.info('Request started', {
    correlationId: req.correlationId,
    method: req.method,
    path: req.path,
  })
  next()
})
```

**Key metrics to monitor:**

- Response times (p50, p95, p99)
- Error rates
- Request throughput
- Database query performance
- Memory usage
- CPU utilization

---

### 8.4 When NOT to Log

**❌ NEVER log in these scenarios:**

```typescript
// ❌ BAD: High-frequency loops
for (let i = 0; i < 10000; i++) {
  logger.debug('Processing item', { index: i }) // 10,000 logs = crash
  processItem(items[i])
}

// ✅ GOOD: Log only start, end, and errors
logger.info('Starting batch processing', { totalItems: items.length })

for (let i = 0; i < items.length; i++) {
  try {
    processItem(items[i])
  } catch (error) {
    logger.error('Item processing failed', { index: i, error: error.message })
  }
}

logger.info('Batch processing complete', {
  totalItems: items.length,
  duration: Date.now() - startTime,
})
```

**When NOT to log:**

- ❌ Inside high-frequency loops (>100 iterations/second)
- ❌ Every websocket message
- ❌ Every array iteration
- ❌ Every database query in a batch operation
- ❌ Every keystroke or mouse movement
- ✅ Only log: start, end, errors, and milestones

---

### 8.5 Log Sampling for High Traffic

**For applications with >10,000 requests/second:**

```typescript
// ✅ GOOD: Sample successful requests, log ALL errors
const shouldLog = (isError: boolean): boolean => {
  if (isError) return true // Always log errors
  return Math.random() < 0.01 // Log 1% of successful requests
}

app.use((req, res, next) => {
  const startTime = Date.now()

  res.on('finish', () => {
    const duration = Date.now() - startTime
    const isError = res.statusCode >= 400

    if (shouldLog(isError)) {
      logger.info('Request completed', {
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        duration,
        sampled: !isError, // Indicates if this is a sample
        timestamp: new Date().toISOString(),
      })
    }
  })

  next()
})
```

**Sampling strategy:**

```typescript
// Configuration by environment
const SAMPLE_RATES = {
  development: 1.0, // 100% - log everything
  staging: 0.1, // 10% - sample for testing
  production: 0.01, // 1% - minimize cost and performance impact
}

const sampleRate = SAMPLE_RATES[process.env.NODE_ENV] || 0.01

const shouldSample = (isError: boolean, isWarning: boolean): boolean => {
  if (isError) return true // 100% of errors
  if (isWarning) return true // 100% of warnings
  return Math.random() < sampleRate // Sample % of info logs
}
```

**Benefits:**

- 💰 **Cost reduction:** 100k requests/sec → 1k logs/sec = 99% cost savings
- ⚡ **Performance:** Minimal I/O overhead
- 🔍 **Observability:** Still see all errors + representative sample
- 📊 **Analytics:** Sample is statistically significant for trends

**When to use sampling:**

- ✅ High-traffic APIs (>10k requests/second)
- ✅ Microservices with heavy inter-service communication
- ✅ Real-time data processing pipelines
- ❌ Don't sample: Errors, warnings, or security events

---

## 9. ☁️ DevOps & Infrastructure

**Priority: PREFERRED 🟢**

### 9.1 Setup & Development Commands

```bash
# Install dependencies
bun install

# Development server
bun dev

# Run tests
bun test

# Build for production
bun run build

# Security audit
bun audit
```

---

### 9.2 Environment Management

```bash
# .env.example (committed to repo)
API_BASE_URL=http://localhost:3000
DATABASE_URL=postgresql://localhost:5432/mydb
API_KEY=your_key_here

# .env (NOT committed, in .gitignore)
API_KEY=sk-real-secret-key-12345
```

**Rules:**

- Maintain `.env.example` with dummy values
- Never commit `.env` to version control
- Document all required environment variables
- Use different `.env` files per environment (`.env.local`, `.env.production`)

---

### 9.3 CI/CD Pipeline

**Priority: CRITICAL 🔴**

---

#### 9.3.1 Pipeline Structure (Minimum Professional Standard)

**Required steps in order:**

```txt
1. Lint      → Code style and formatting
2. Tests     → Unit + Integration tests
3. Build     → Verify compilation (TypeScript, Vite)
4. Audit     → Security vulnerabilities check
```

**Complete GitHub Actions example:**

```yaml
# .github/workflows/ci.yml
name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  ci:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install --frozen-lockfile

      # 1. Lint
      - name: Lint code
        run: bun run lint

      # 2. Tests
      - name: Run tests
        run: bun test --coverage

      # 3. Build (CRITICAL - verify TypeScript compilation)
      - name: Build project
        run: bun run build

      # 4. Security Audit
      - name: Security audit
        run: bun audit
        continue-on-error: false
```

**Why each step matters:**

- **Lint** (3s): Catches style errors, missing semicolons, unused imports
- **Tests** (30-60s): Prevents bugs, validates business logic
- **Build** (10-15s): Catches TypeScript errors, missing dependencies
- **Audit** (5s): Blocks vulnerable dependencies (CVEs)

**Total time:** ~60 seconds (without cache)

---

#### 9.3.2 CI Optimization (85% Faster Builds)

**Problem:** Fresh installs take 5-7 minutes on every CI run.

**Solution:** Cache dependencies

```yaml
# .github/workflows/ci.yml
name: CI Pipeline (Optimized)

on: [push, pull_request]

jobs:
  ci:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Bun
        uses: oven-sh/setup-bun@v1

      # ✅ KEY: Cache dependencies
      - name: Cache Bun dependencies
        uses: actions/cache@v3
        with:
          path: |
            ~/.bun/install/cache
            node_modules
          key: ${{ runner.os }}-bun-${{ hashFiles('**/bun.lockb') }}
          restore-keys: |
            ${{ runner.os }}-bun-

      - name: Install dependencies
        run: bun install --frozen-lockfile

      - name: Lint
        run: bun run lint

      - name: Test
        run: bun test

      - name: Build
        run: bun run build

      - name: Security Audit
        run: bun audit
```

**Performance improvement:**

```txt
Without cache: 6-8 minutes
With cache:    50-60 seconds
Improvement:   85-90% faster
```

---

#### 9.3.3 Branching Strategy (GitHub Flow)

**Recommended for teams of 2-20 people:**

```git
main (production-ready, always deployable)
  ↑
  ├── feature/login-modal     (PR #1)
  ├── fix/api-timeout         (PR #2)
  └── feature/dashboard       (PR #3)
```

**Workflow:**

1. Create branch from `main`: `git checkout -b feature/new-feature`
2. Develop and commit regularly
3. Open Pull Request to `main`
4. CI runs automatically (lint, test, build, audit)
5. Code review (1+ approval required)
6. Merge to `main` → Auto-deploy to production

**Branch naming conventions:**

```bash
feature/user-authentication    # New features
fix/api-timeout-error         # Bug fixes
hotfix/security-patch         # Critical fixes
refactor/database-schema      # Code improvements
docs/update-readme            # Documentation
chore/update-dependencies     # Maintenance
```

**Why GitHub Flow over Git Flow:**

| Feature        | Git Flow                       | GitHub Flow                        |
| -------------- | ------------------------------ | ---------------------------------- |
| Complexity     | High (5 branch types)          | Low (2 branch types)               |
| Speed          | Slow (weekly releases)         | Fast (deploy daily)                |
| Ideal for      | 50+ people, scheduled releases | 2-20 people, continuous deployment |
| Learning curve | 2 weeks                        | 1 day                              |

---

#### 9.3.4 When CI Fails

**Golden Rule: Never Break Main**

```txt
❌ NEVER: Merge when CI is red
❌ NEVER: Disable failing checks
❌ NEVER: "I'll fix it later"

✅ ALWAYS: Fix locally → Push → Wait for green CI → Then merge
```

**Correct workflow when CI fails:**

```bash
# 1. CI reports error
❌ Build failed: TypeScript error on line 23

# 2. Reproduce locally
bun run build
# Error: Type 'string' is not assignable to 'number'

# 3. Fix the error
# Edit file and correct the type

# 4. Verify locally BEFORE push
bun run lint && bun test && bun run build && bun audit

# 5. Commit and push
git add .
git commit -m "fix: correct TypeScript type on line 23"
git push origin feature/login-modal

# 6. CI runs again automatically
# Wait for green checkmark ✅

# 7. NOW you can merge
```

**Pre-commit hooks (prevent CI failures):**

```bash
# .husky/pre-commit
#!/bin/sh
bun run lint
bun test

# Prevents committing broken code
# CI failures reduced by 80%
```

---

#### 9.3.5 Deployment Strategies

**Manual Deployment (Simple, for startups):**

```yaml
# Deploy only on manual trigger
on:
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        run: vercel deploy --prod
```

**Automatic Deployment (Continuous Deployment):**

```yaml
# Auto-deploy when merged to main
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to production
        run: vercel deploy --prod
```

**Blue-Green Deployment (Zero Downtime):**

```flow
┌─────────────┐
│   USERS     │
└──────┬──────┘
       │
   ┌───▼────┐
   │ Router │ ← Instant switch
   └───┬────┘
       │
   ┌───┴────────┐
   │            │
┌──▼──┐      ┌──▼──┐
│BLUE │      │GREEN│
│ v1  │      │ v2  │
└─────┘      └─────┘
```

**Features:**

- ✅ Zero downtime (1ms switch)
- ✅ Instant rollback (switch back to Blue)
- ✅ Test with real traffic before full rollout
- 💰 Cost: 2x infrastructure (temporary)

**When to use each:**

- **Manual:** Small teams, low-risk apps, infrequent deploys
- **Automatic:** CI/CD mature, high test coverage (90%+), feature flags
- **Blue-Green:** High-traffic apps, zero-downtime critical, enterprise

---

**Pipeline checklist:**

- [ ] Automated tests run on every PR
- [ ] Linting enforced
- [ ] Build step included (verify compilation)
- [ ] Security audit before deployment
- [ ] Dependencies cached (85% faster builds)
- [ ] Branch protection rules enabled
- [ ] Pre-commit hooks installed

---

### 9.4 Docker & Containerization

```dockerfile
# Dockerfile example for Bun
FROM oven/bun:1 as base
WORKDIR /app

# Install dependencies
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --production

# Copy application code
COPY . .

# Build (if needed)
RUN bun run build

# Expose port
EXPOSE 3000

# Start application
CMD ["bun", "run", "start"]
```

**Docker Compose Example:**

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://db:5432/myapp
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_PASSWORD=secret
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

## 10. 🎯 Usability (UX/UI)

**Priority: PREFERRED 🟢**

### 10.1 Accessibility (a11y)

```tsx
// ✅ GOOD: Semantic HTML + ARIA
<button
  aria-label="Close modal"
  onClick={handleClose}
  className="p-2 rounded hover:bg-gray-100"
>
  <CloseIcon aria-hidden="true" />
</button>

// ✅ GOOD: Keyboard navigation support
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  onClick={handleClick}
>
  Click me
</div>
```

**Rules:**

- Use semantic HTML (`<button>`, `<nav>`, `<main>`)
- Provide alt text for images
- Support keyboard navigation
- Maintain color contrast ratios (WCAG AA minimum)
- Test with screen readers

---

### 10.2 User Feedback & Loading States

```tsx
// ✅ GOOD: Clear loading and error states
const { data, isLoading, error } = useQuery('users', fetchUsers)

if (isLoading) return <Spinner />
if (error) return <ErrorMessage error={error} />

return <UserList users={data} />
```

**Rules:**

- Show loading indicators for async operations
- Display clear error messages (user-friendly, not technical)
- Provide success feedback for actions
- Implement optimistic UI updates when appropriate

---

## 11. 👥 Collaboration & Version Control

**Priority: PREFERRED 🟢**

### 11.1 Git Workflow

**Branch naming:**

```bash
feature/user-authentication
fix/api-timeout-error
refactor/database-schema
docs/update-readme
chore/update-dependencies
```

**Commit conventions:**

```bash
feat: add user login functionality
fix: resolve API timeout on slow connections
docs: update installation instructions
chore: update dependencies to latest versions
refactor: simplify database query logic
test: add unit tests for auth service
```

---

### 11.2 Pull Request Guidelines

**PR checklist:**

- [ ] Descriptive title following commit conventions
- [ ] Clear description of changes
- [ ] Reference to related issue (Closes #123)
- [ ] All tests pass
- [ ] Code reviewed by at least one team member
- [ ] No merge conflicts
- [ ] Updated documentation if needed

**PR template:**

```markdown
## Description

Brief explanation of changes

## Type of change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Unit tests added/updated
- [ ] Integration tests pass
- [ ] Manually tested

## Related Issues

Closes #123
```

---

### 11.3 Why Small PRs Are CRITICAL

**Priority: CRITICAL 🔴**

Small PRs aren't just "nice to have" - they're **critical for quality and velocity**.

#### 🚨 **The Problem: Large PRs (1000+ lines)**

**1. Impossible to Review Correctly**

```txt
Time per line of review: ~5 seconds
1,200 lines × 5s = 6,000 seconds = 1.7 hours

Reality:
- Reviewer fatigues after 20 minutes
- Starts skimming (superficial review)
- Bugs go undetected
- Approves without truly understanding
```

**2. Merge Conflicts Guaranteed**

```txt
18 files modified + 1,200 lines =
Conflict probability with other PRs: ~80%

While in review (2-3 days):
- Other devs modify same files
- Merge conflicts inevitable
- "Merge hell" (as learned in CI/CD)
```

**3. Cannot Isolate Issues**

```txt
Mixed PR:
- New feature (login)
- Refactor (rename variables)
- Bug fix (API timeout)
- Dependency update (React 18→19)

If CI fails or production bug:
Which part broke? ❌ Impossible to isolate
```

**4. Difficult to Revert**

```txt
Critical bug in production → need to revert

Small PR:
git revert <commit-hash> ✅ (2 minutes)

Large PR:
- Revert ALL (feature + refactor + fix)
- OR cherry-pick manually (2 hours)
- OR partial hotfix (3 hours + risk)
```

---

#### ✅ **The Solution: Split into Small, Focused PRs**

**Example: 1,200 line PR → 4 focused PRs**

```txt
🔴 PR #1: Dependency Update (1 file, 50 lines)
   Title: "chore: upgrade React 18.2 → 19.1"
   Files: package.json, breaking changes
   Review time: 10 minutes ✅

🟡 PR #2: Bug Fix (2 files, 100 lines)
   Title: "fix: resolve API timeout on slow connections"
   Files: api/client.ts, utils/retry.ts
   Review time: 15 minutes ✅

🟢 PR #3: Refactor (8 files, 400 lines)
   Title: "refactor: rename getUserData → fetchUserProfile"
   Files: services/, components/, tests/
   Review time: 30 minutes ✅

🔵 PR #4: New Feature (7 files, 650 lines)
   Title: "feat: add OAuth authentication"
   Files: LoginModal, authService, hooks, tests
   Review time: 45 minutes ✅

Total: 1h 40m (with quality attention)
vs 1h 40m (superficial review of giant PR)
```

---

#### 📊 **Industry Data: Bug Detection Rates**

**Google Engineering Study (2019):**

| PR Size        | Review Time | Bug Detection | Merge Conflicts | Approval Quality |
| -------------- | ----------- | ------------- | --------------- | ---------------- |
| <200 lines     | 15-30 min   | 85% ✅        | 5%              | Thorough         |
| 200-400 lines  | 45-60 min   | 60% ⚠️        | 25%             | Good             |
| 400-1000 lines | 1-2 hours   | 35% ❌        | 60%             | Superficial      |
| 1000+ lines    | 2+ hours    | 15% ❌❌      | 80%             | Rubber stamp     |

**Key finding:**

> "PRs over 400 lines are approved quickly not because they're good, but because reviewers give up reading carefully."

---

#### 🎯 **PR Size Guidelines**

```txt
Ideal:     50-200 lines   ✅ Sweet spot
Good:      200-400 lines  ✅ Acceptable
Avoid:     400-1000 lines ⚠️ Split if possible
Never:     1000+ lines    ❌ Always split
```

**Exceptions:**

- Generated code (migrations, types)
- Massive refactors (with feature flags)
- Emergency hotfixes (must create follow-up PRs)

---

#### 🔧 **How to Keep PRs Small**

**1. Plan Before Coding**

```txt
Task: "Add user authentication"

❌ Bad approach:
- Code everything in one branch (login + signup + OAuth + tests)
- 1,500 lines PR

✅ Good approach:
1. PR: Setup auth service (150 lines)
2. PR: Login UI (200 lines)
3. PR: Signup UI (180 lines)
4. PR: OAuth integration (220 lines)
5. PR: Tests (150 lines)

Total: 900 lines across 5 reviewable PRs
```

**2. Use Feature Flags**

```typescript
// Merge incomplete features behind flags
const showNewDashboard = process.env.FEATURE_NEW_DASHBOARD === 'true'

return showNewDashboard ? <NewDashboard /> : <OldDashboard />

// Benefits:
// - Small PRs can be merged to main
// - No long-lived branches
// - Enable in production when ready
```

**3. Atomic Commits**

```bash
# Each commit = one logical change
git commit -m "feat: add login form UI"
git commit -m "feat: connect login to auth service"
git commit -m "test: add login form tests"

# Easy to cherry-pick or revert individual changes
```

---

#### 💰 **Real Cost of Large PRs**

**Scenario: Team of 5 developers**

```txt
With large PRs (800+ lines):
- Review time: 2 hours/PR
- Merge conflicts: 60% of PRs
- Time fixing conflicts: 1 hour/PR
- Bugs missed: 65%
- Total: 3 hours/PR × 20 PRs/week = 60 hours/week

With small PRs (200 lines):
- Review time: 30 min/PR
- Merge conflicts: 5% of PRs
- Time fixing conflicts: 10 min/PR
- Bugs missed: 15%
- Total: 40 min/PR × 20 PRs/week = 13 hours/week

Savings: 47 hours/week = 1.2 full-time developers ✅
```

---

#### 🎓 **Principle: Structure > Tests > Documentation**

**When reviewing a giant PR, what's most important?**

```txt
Priority 1: STRUCTURE (size, focus) 🔴
- Is it split properly?
- Can I review it in <1 hour?
- Is it focused on ONE thing?

Priority 2: TESTS (coverage) 🟡
- Are critical paths tested?
- Coverage ≥70%?

Priority 3: DOCUMENTATION (title, desc) 🟢
- Clear title?
- Good description?

Why: A well-documented 1,200-line PR is still unreviewable ❌
A poorly documented 150-line PR is still reviewable ✅
```

---

#### 🏆 **Best Practices Summary**

**DO:**

- ✅ Plan PRs before coding
- ✅ One PR = one type of change (feat, fix, refactor)
- ✅ Aim for 50-200 lines
- ✅ Use feature flags for incomplete work
- ✅ Merge to main frequently

**DON'T:**

- ❌ Mix feature + refactor + fix in one PR
- ❌ Wait weeks to open PR
- ❌ "I'll split it later" (split NOW)
- ❌ Disable CI checks to merge
- ❌ Merge when CI is red

**Remember:** "The best PR is a small PR."

---

### 11.4 Code Review Standards

**As a reviewer:**

- Check for security issues first
- Verify tests exist and are meaningful
- Look for code duplication opportunities
- Ensure naming conventions followed
- Provide constructive feedback

**As an author:**

- Keep PRs small and focused (<400 lines when possible)
- Respond to all comments
- Don't take feedback personally
- Update PR based on feedback

---

### 11.5 Branch Protection Rules

**main/master branch:**

- Require PR before merging
- Require at least 1 approval
- Require status checks to pass (CI/CD)
- Require up-to-date branches
- No direct pushes allowed

**develop branch:**

- Require PR before merging
- Status checks must pass
- Can merge without approval (for solo projects)

---

## 🚨 When to Break the Rules

**Priority: CRITICAL 🔴 - Read carefully**

Rules are guidelines, not laws. Here's when exceptions are acceptable:

### Acceptable Rule-Breaking

**✅ Prototyping/POC:**

- Ok to skip detailed comments temporarily
- Ok to use quick-and-dirty solutions
- Must add TODO comments for cleanup
- Must refactor before production

**✅ Critical hotfixes:**

- Ok to merge without full test coverage if emergency
- Ok to bypass PR review if production is down
- MUST create follow-up issue immediately
- MUST add proper tests within 24 hours

**✅ Large file exceptions:**

- Schema definitions can exceed 300 lines
- Complex UI components with single responsibility
- Generated code or configuration files
- Route definitions for large APIs

**✅ Learning/experimentation:**

- Ok to try different patterns in feature branches
- Ok to deviate from style guide in spike branches
- Must follow rules before merging to main

---

### Never Break These Rules

**❌ Security rules** - No exceptions, ever  
**❌ Input validation** - Always required  
**❌ Environment variables for secrets** - Always required  
**❌ Version control** - Always commit regularly  
**❌ Code review for production** - Always required (except emergencies)

---

### Rule-breaking template

```typescript
// 🚨 RULE BREAK: [Why this breaks the rule]
// TODO: [What needs to be fixed] - Issue #123
// Expected fix date: [Date]
const quickHotfix = () => {
  // Temporary solution
}
```

---

## 🔧 Common Issues & Solutions

### Development Environment

**Error: `bun dev` doesn't start**

- → Check `.env` file exists and has required variables
- → Verify ports 3000/5432 aren't already in use
- → Run `bun install` to ensure dependencies installed

**Error: Module not found**

- → Check import paths use correct aliases (@/)
- → Verify tsconfig.json paths configuration
- → Clear cache: `rm -rf node_modules .next` and reinstall

**Error: Type errors after update**

- → Restart TypeScript server in IDE
- → Check for breaking changes in updated packages
- → Run `bun install` to update type definitions

---

### Testing Issues

**Tests pass locally but fail in CI**

- → Check environment variables in CI configuration
- → Verify timezone settings (use UTC in tests)
- → Check for race conditions in async tests

**Tests are slow**

- → Use in-memory database for unit tests
- → Mock external API calls
- → Run tests in parallel
- → Use test-specific optimizations

---

### Database Issues

**Connection pool exhausted**

- → Increase pool size in config
- → Check for unclosed connections
- → Implement connection timeout

**Slow queries**

- → Run EXPLAIN ANALYZE on query
- → Add indexes on frequently queried columns
- → Consider query optimization or caching

---

## 🛠 Recommended Tools

### Development & Code Quality

**Linting & Formatting:**

- ESLint (with TypeScript rules)
- Prettier (code formatting)

**Testing:**

- Jest / Vitest (unit & integration)
- Playwright / Cypress (E2E)
- Supertest (API testing)

**Security:**

- Snyk (dependency scanning)
- bun audit / npm audit
- OWASP ZAP (security testing)

**Documentation:**

- JSDoc / TSDoc
- TypeDoc (API documentation generation)
- Storybook (component documentation)

---

### Logging & Monitoring

**Logging:**

- Pino (Node.js - fast & efficient)
- Winston (Node.js - feature-rich)
- Loguru (Python)

**Error Tracking:**

- Sentry (errors & performance)
- Rollbar
- Bugsnag

**Log Management:**

- DataDog
- New Relic
- LogRocket (with session replay)

---

### Monitoring & Performance

**Performance:**

- Lighthouse (web vitals)
- webpack-bundle-analyzer
- Chrome DevTools Performance tab

**Monitoring:**

- Sentry (error tracking)
- LogRocket (session replay)
- New Relic / Datadog (APM)

**Database:**

- pgAdmin / TablePlus (GUI)
- Query analyzers
- Connection pooling monitors

---

### Productivity

**Git:**

- GitHub CLI (gh)
- GitLens (VS Code extension)
- Conventional Commits extension

**API Development:**

- Postman / Insomnia (API testing)
- Swagger / OpenAPI (API documentation)

**Database:**

- Prisma Studio
- DBeaver (universal DB tool)

---

## 📚 License & Code Ownership

**Priority: CRITICAL 🔴**

### Code Ownership Rules

- All code created within Mendez Tech projects belongs to the original author unless otherwise agreed in writing
- Third-party collaborators (freelancers, partners) must sign:
  - Non-disclosure agreement (NDA)
  - Partial or full rights assignment (depending on project)
- No collaborator may share, sell, or reuse code without prior written authorization

---

### Licensing Guidelines

Every project must specify its license in the root directory:

**This project uses the MIT License** — open-source and community-friendly.

**Open-source projects:**

- Use MIT (default), Apache 2.0, or GPL 3.0 (based on project needs)

**Private/Commercial projects:**

- Use Proprietary License when applicable (not this project)

**MIT License reference:**

```txt
© 2026 Jose Mendez. Licensed under the MIT License.
See LICENSE file for full terms.
```

---

### Third-Party Dependencies

```bash
# Check licenses of installed packages
npx license-checker --summary

# Audit for vulnerabilities
bun audit
```

**Rules:**

- Review licenses before including libraries
- Avoid GPL in commercial projects (copyleft restrictions)
- Document critical dependencies in CREDITS.md
- Run license audits regularly

---

### Distribution Rules

Before distributing binaries or executables:

- [ ] Include project license
- [ ] List all authors and credits
- [ ] Add copyright notice
- [ ] Sign NDA with clients/collaborators if sharing code
- [ ] Never upload private keys or dependencies to public repos

---

## 🎯 Quick Reference Card

### Before every commit

**Security Checklist:**

- [ ] No `console.log()` or debug code in production
- [ ] No hardcoded secrets or credentials
- [ ] Input validation added where needed
- [ ] Error messages don't expose internals
- [ ] Sensitive data not logged (passwords, tokens, cards)

**Code Quality:**

- [ ] Follows naming conventions
- [ ] JSDoc comments on functions
- [ ] No TODO comments without issue reference
- [ ] File under 300 lines or has single responsibility

**Testing:**

- [ ] Tests added/updated
- [ ] All tests pass locally
- [ ] Coverage maintained or improved

**Git:**

- [ ] Commit message follows conventions
- [ ] Branch named correctly
- [ ] No merge conflicts

---

## 🤖 AI Instructions

**📌 This is a UNIVERSAL template - Adapt to each project:**

1. **First:** Read Section 2.1 (Tech Stack) and customize for current project
2. **Adapt examples:** Replace Supabase/React/Vite with project's actual stack
3. **Keep principles:** Security, testing, CI/CD rules apply to ALL projects

**When coding:**

1. Follow this guide in **priority order** (Security → Collaboration)
2. When uncertain, **ask before implementing**
3. Never assume undefined behavior
4. Always **verify before writing code**
5. Apply **security principles** to every decision
6. Use **logger instead of console.log** in all code
7. Check if project requires **MPC server connection** before starting
8. Create **CSS variables** if a value is repeated 3+ times

**When reviewing code:**

- Security checklist FIRST (Section 1.3)
- PR size <400 lines (Section 11.3)
- Tests exist (Section 5.4/5.6)
- No hardcoded secrets (Section 1.2)

**Decision-making:**

- Debounce vs Throttle? → Section 6.4 decision tree
- Large file ok? → Section 2.3 (cohesive purpose)
- Break a rule? → Section 🚨 (only if justified)

## 🔍 Document Self-Check

Before using this document, verify:

- [ ] Section 2.1 matches YOUR project's tech stack
- [ ] All internal references point to existing sections
- [ ] Section numbers are sequential (no duplicates)
- [ ] Table of Contents anchors work
- [ ] Code examples use YOUR frameworks (not hardcoded Supabase)

---
