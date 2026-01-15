# WebApp - React Frontend

> A modern, full-featured web application built with React 19, TypeScript, Vite, Supabase, and Tailwind CSS v4.

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.11-646CFF?logo=vite)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.15-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-2.76.0-3ECF8E?logo=supabase)](https://supabase.com/)

---

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [Environment Setup](#-environment-setup)
- [Code Standards](#-code-standards)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun dev

# Build for production
bun build

# Run linter
bun lint
```

Visit `http://localhost:5173` to see the app running.

---

## ✨ Features

### 🔐 Authentication System

- **Sign up** with email validation
- **Login** with secure password handling
- **Forgot Password** flow with email recovery
- **OAuth** ready (Google, GitHub - prepared)
- **Session management** with automatic token refresh

### 👤 User Dashboard

- **Animated Tabs** component (Profile & Settings)
- **Profile Management**: Edit name, bio, avatar
- **Account Security**:
  - Change email (with password confirmation)
  - Change password (with strength validation)
  - Delete account (with double confirmation)
- **Settings**: Language switcher (ES/EN), Theme selector (prepared)

### 🎨 Interactive Home Page

- **Light Switch Effect** - Turn house lights on/off with glow effect
- **Rain Effect** - Professional water drops animation
- **Wind Effect** - Random flying objects (leaves, emojis, nature elements)
- **Animated Background** - SVG wind paths with smooth transitions

### 🌐 Internationalization (i18n)

- **Full support** for Spanish and English
- **Language switcher** with gear icon (Header) and globe icon (Dashboard)
- **Persistent preference** stored in localStorage
- **Real-time translation** without page reload

### 🛡️ Security Features

- **RLS Policies** on Supabase (Row Level Security)
- **Edge Functions** for privileged operations (user deletion)
- **Password validation** (8+ chars, uppercase, number)
- **Bidirectional sync** between profiles and auth.users
- **Input sanitization** and validation

### 🎭 UI/UX Components

- **AlertModal** - Reusable confirmation/error modal
- **AnimatedTabs** - Smooth tab transitions (ScrollXUI style)
- **PasswordInput** - Toggle visibility with eye icon
- **LanguageSwitcher** - Two variants (Header & Dashboard)
- **Protected Routes** - Authentication-based navigation

---

## 🛠️ Tech Stack

### Core

- **React 19.1.1** - UI library with latest features
- **TypeScript 5.6.2** - Type-safe development
- **Vite 7.1.11** - Lightning-fast build tool with SWC
- **React Router 7.9.4** - Client-side routing

### Styling

- **Tailwind CSS 4.1.15** - Utility-first CSS framework
- **Custom animations** - Keyframes for wind, rain, confetti effects

### Backend & Database

- **Supabase 2.76.0** - PostgreSQL database with real-time features
- **Edge Functions** - Serverless functions for admin operations
- **RLS Policies** - Row-level security for data protection
- **Database Triggers** - Automatic sync between tables

### Internationalization

- **react-i18next 16.1.4** - i18n framework
- **i18next 24.2.2** - Translation management

### Development Tools

- **ESLint** - Code linting with TypeScript rules
- **Bun** - Fast JavaScript runtime and package manager
- **Prettier** (via formatter) - Code formatting

---

## 📁 Project Structure

```
frontEnd/
├── src/
│   ├── assets/          # Static assets (images, icons)
│   ├── components/      # Reusable UI components
│   │   ├── auth/        # Auth-related modals (Login, Signup, ForgotPassword)
│   │   ├── dashboard/   # Dashboard tabs (ProfileTab, SettingsTab, modals)
│   │   ├── AnimatedTabs.tsx
│   │   ├── Header.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   ├── LanguageSwitcherDashboard.tsx
│   │   └── ProtectedRoute.tsx
│   ├── context/         # React contexts (AuthContext)
│   ├── hooks/           # Custom hooks (useAuth, useProfile)
│   ├── locales/         # i18n translations (es.json, en.json)
│   ├── pages/           # Page components (Home, Dashboard, Info)
│   ├── services/        # API services (Supabase client, profile service)
│   ├── utils/           # Utility functions (validators)
│   ├── App.tsx          # Root component with Outlet
│   ├── main.tsx         # Entry point with routing
│   └── index.css        # Global styles & animations
├── public/              # Public static files
├── AGENTS.md            # AI & coding standards (DO NOT EDIT)
├── PROJECT_STRUCTURE.md # File organization guide (DO NOT EDIT)
└── README.md            # This file
```

> **Note:** See `PROJECT_STRUCTURE.md` for detailed file placement guidelines.

---

## 📜 Available Scripts

### Development & Build

| Command       | Description                          |
| ------------- | ------------------------------------ |
| `bun install` | Install all dependencies             |
| `bun dev`     | Start development server (port 5173) |
| `bun build`   | Build for production                 |
| `bun preview` | Preview production build locally     |
| `bun lint`    | Run ESLint to check code quality     |

### Unit & Integration Testing (Vitest)

| Command             | Description                              |
| ------------------- | ---------------------------------------- |
| `bun test`          | Run unit tests in watch mode             |
| `bun test:ui`       | Open Vitest UI (interactive test runner) |
| `bun test:run`      | Run tests once (for CI/CD)               |
| `bun test:coverage` | Generate coverage report                 |

### E2E Testing (Playwright)

| Command                 | Description                                   |
| ----------------------- | --------------------------------------------- |
| `bun test:e2e`          | Run E2E tests (headless, all browsers)        |
| `bun test:e2e:ui`       | Interactive UI mode (debugging & development) |
| `bun test:e2e:headed`   | Show browser while running tests              |
| `bun test:e2e:debug`    | Step-by-step debugging mode                   |
| `bun test:e2e:report`   | Open last HTML report (screenshots & videos)  |
| `bun test:e2e:chromium` | Run tests only in Chromium                    |
| `bun test:e2e:firefox`  | Run tests only in Firefox                     |
| `bun test:e2e:webkit`   | Run tests only in WebKit (Safari)             |
| `bun test:e2e:codegen`  | Record interactions and generate test code    |

---

## 🔧 Environment Setup

### 1. Create `.env` file

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Optional: Other API keys
# VITE_GOOGLE_OAUTH_CLIENT_ID=your-google-client-id
```

### 2. Supabase Database Setup

1. **Create `profiles` table:**

   ```sql
   CREATE TABLE profiles (
     id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
     first_name TEXT,
     last_name TEXT,
     email TEXT,
     avatar_url TEXT,
     bio TEXT,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```

2. **Enable RLS (Row Level Security):**

   ```sql
   ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
   ```

3. **Create policies:**

   ```sql
   -- Users can view their own profile
   CREATE POLICY "Users can view own profile"
     ON profiles FOR SELECT
     USING (auth.uid() = id);

   -- Users can update their own profile
   CREATE POLICY "Users can update own profile"
     ON profiles FOR UPDATE
     USING (auth.uid() = id);

   -- Users can insert their own profile
   CREATE POLICY "Users can insert own profile"
     ON profiles FOR INSERT
     WITH CHECK (auth.uid() = id);
   ```

4. **Deploy Edge Function** (`delete-user`):
   - Follow Supabase CLI instructions to deploy the function
   - Located in `/supabase/functions/delete-user/`

5. **Create Database Triggers:**
   - `on_auth_user_created` - Auto-create profile on signup
   - `on_auth_user_email_updated` - Sync email changes
   - `on_profile_name_updated` - Sync name to auth.users metadata

> **See:** `src/services/supabase/README.md` for detailed schema and queries.

---

## 🧪 Testing

This project includes comprehensive testing at multiple levels:

### Unit & Integration Tests (Vitest + Testing Library)

**Coverage: 80%+** for critical utils and hooks

```bash
# Run tests in watch mode
bun test

# Open interactive UI
bun test:ui

# Generate coverage report
bun test:coverage
```

**What's tested:**

- ✅ `utils/validators.ts` - Email, password validation
- ✅ `utils/passwordStrength.ts` - Strength calculation
- ✅ `hooks/useAuth.ts` - Authentication logic
- ✅ `hooks/useAuthForm.ts` - Form state management
- ✅ `context/authContext.ts` - Context providers

### E2E Tests (Playwright)

**Multi-browser testing:** Chrome, Firefox, Safari (WebKit)

```bash
# Run all E2E tests (headless)
bun test:e2e

# Open Playwright UI (interactive debugging)
bun test:e2e:ui

# Show browser while running
bun test:e2e:headed

# Step-by-step debugging
bun test:e2e:debug

# View HTML report (screenshots, videos, traces)
bun test:e2e:report
```

**What's tested:**

#### Authentication Flow (`e2e/auth.spec.ts`)

- ✅ Login with valid credentials
- ✅ Login failure with invalid credentials
- ✅ Email format validation
- ✅ Signup flow with validation
- ✅ Password strength requirements
- ✅ Password confirmation matching
- ✅ Logout and session cleanup
- ✅ Session persistence after refresh

#### Protected Routes & Dashboard (`e2e/dashboard.spec.ts`)

- ✅ Redirect to home when not authenticated
- ✅ Dashboard access when authenticated
- ✅ Navigation between Profile and Settings tabs
- ✅ Change password modal and validation
- ✅ Change email functionality
- ✅ Account deletion confirmation flow
- ✅ Language switcher
- ✅ Responsive layout (mobile/desktop)

### Test Organization

```
frontEnd/
├── e2e/                       # E2E tests with Playwright
│   ├── auth.spec.ts           # Authentication tests
│   ├── dashboard.spec.ts      # Dashboard & protected routes
│   └── fixtures/              # Reusable test helpers
│       ├── testData.ts        # Test users, selectors, constants
│       └── testHelpers.ts     # Login, logout, common actions
├── src/test/                  # Unit test setup
│   └── setup.ts               # Vitest configuration
└── playwright.config.ts       # Playwright configuration
```

### CI/CD Integration

Tests run automatically on:

- ✅ Every push to `main` or `develop`
- ✅ Every Pull Request

**GitHub Actions workflow:**

- Runs in 3 browsers (Chromium, Firefox, WebKit)
- Generates HTML reports with screenshots
- Uploads artifacts (videos, traces) on failure
- Blocks merge if tests fail

See workflow: `.github/workflows/playwright.yml`

### Writing New Tests

**Unit tests:**

```typescript
// src/utils/__tests__/myUtil.test.ts
import { describe, it, expect } from 'vitest'
import { myUtil } from '../myUtil'

describe('myUtil', () => {
  it('should return expected value', () => {
    expect(myUtil('input')).toBe('output')
  })
})
```

**E2E tests:**

```typescript
// e2e/myFeature.spec.ts
import { test, expect } from '@playwright/test'
import { loginUser } from './fixtures/testHelpers'

test('should test my feature', async ({ page }) => {
  await loginUser(page)
  await page.click('button:has-text("My Feature")')
  await expect(page).toHaveURL('/my-feature')
})
```

### Test Generator (Codegen)

Generate test code by recording interactions:

```bash
bun test:e2e:codegen
```

This opens:

1. Browser window (interact with your app)
2. Code window (generates test code automatically)

**Use cases:**

- Learn Playwright syntax
- Find correct selectors
- Generate boilerplate quickly

---

## 📐 Code Standards

This project follows strict coding standards defined in `AGENTS.md`:

- **TypeScript strict mode** - No implicit `any`
- **Single quotes, no semicolons**
- **camelCase** for functions and variables
- **Comments required** - JSDoc for exported functions
- **Max file size:** ~300 lines (split if exceeds)
- **One function = one responsibility**
- **Early returns** over nested ifs

### File Splitting Guideline

Split files when:

- Component exceeds 200-300 lines
- Contains significant business logic
- Manages complex state
- Needs reusable/testable hooks

**Pattern:**

```
ComponentName/
├── ComponentName.tsx         # UI + JSX
├── useComponentName.ts       # Hook with state/handlers
├── componentName.service.ts  # API calls
└── index.ts                  # Re-export
```

> **Read `AGENTS.md` for complete standards.**

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### 1. Fork & Clone

```bash
git clone https://github.com/jjmendezrodriguez/webApp.git
cd webApp/frontEnd
```

### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 3. Follow Code Standards

- Read `AGENTS.md` before coding
- Use TypeScript strictly
- Add comments and JSDoc
- Write descriptive commit messages

### 4. Commit Convention

```bash
git commit -m "feat: add user avatar upload"
git commit -m "fix: resolve login modal close issue"
git commit -m "docs: update README with new features"
git commit -m "chore: update dependencies"
```

### 5. Push & Create PR

```bash
git push origin feature/your-feature-name
```

Then open a Pull Request with:

- Clear description of changes
- Reference to related issues
- Screenshots (if UI changes)

### 6. Code Review

- All PRs require review before merging
- Address feedback promptly
- Keep PRs focused (one feature/fix per PR)

---

## 📄 License

**© 2025 Mendez Tech. All rights reserved.**

This project is **private and proprietary**. Unauthorized copying, distribution, modification, or use of this software is strictly prohibited.

For licensing inquiries, contact: [contact@mendeztech.com](mailto:contact@mendeztech.com)

---

## 🙏 Acknowledgments

- **Supabase** - Backend infrastructure and database
- **Vite Team** - Lightning-fast build tool
- **React Team** - Modern UI framework
- **Tailwind Labs** - Utility-first CSS framework
- **ScrollXUI** - Inspiration for animated components

---

## 📞 Support

For questions or issues:

- **GitHub Issues:** [Create an issue](https://github.com/jjmendezrodriguez/webApp/issues)
- **Email:** support@mendeztech.com
- **Documentation:** See `AGENTS.md` and `PROJECT_STRUCTURE.md`

---

**Built with ❤️ by Mendez Tech**
