# 🔐 React Supabase Auth Starter

> **A production-ready authentication template** built with React 19 + TypeScript + Supabase, following Staff Engineer standards. Secure auth flows, i18n, comprehensive testing, automated CI/CD with security auditing, and enforced code quality — ready to deploy in minutes.

[![Live Demo](https://img.shields.io/badge/Demo-Live-success?style=for-the-badge&logo=vercel)](https://react-supabase-auth-starter.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![CI Pipeline](https://img.shields.io/github/actions/workflow/status/jjmendezrodriguez/react-supabase-auth-starter/ci.yml?branch=main&style=for-the-badge&label=CI&logo=githubactions)](https://github.com/jjmendezrodriguez/react-supabase-auth-starter/actions)
[![React](https://img.shields.io/badge/React-19.1-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-2.76-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjjmendezrodriguez%2Freact-supabase-auth-starter&env=VITE_SUPABASE_URL,VITE_SUPABASE_ANON_KEY&envDescription=Supabase%20credentials%20needed%20for%20authentication.%20Get%20them%20from%20your%20Supabase%20project%20dashboard.&envLink=https%3A%2F%2Fsupabase.com%2Fdashboard%2Fproject%2F_%2Fsettings%2Fapi&project-name=react-supabase-auth-starter&root-directory=frontEnd)

---

## 🎯 What is This?

This is not just another auth boilerplate. It's a **complete foundation** for production web apps, designed with the same standards used at companies like Google, Meta, and Stripe. Every decision — from folder structure to CI pipeline — follows Staff Engineer-level practices documented in 3000+ lines of coding standards.

**🚀 Live Demo:** [https://react-supabase-auth-starter.vercel.app/](https://react-supabase-auth-starter.vercel.app/)

### 📸 Screenshots

|                Home Page                |                   Login Modal                    |                    Signup Modal                    |
| :-------------------------------------: | :----------------------------------------------: | :------------------------------------------------: |
| ![Home Page](docs/screenshots/home.png) | ![Login Modal](docs/screenshots/login-modal.png) | ![Signup Modal](docs/screenshots/signup-modal.png) |

|                     Forgot Password                      |                     Dashboard - Profile                      |                      Dashboard - Settings                      |
| :------------------------------------------------------: | :----------------------------------------------------------: | :------------------------------------------------------------: |
| ![Forgot Password](docs/screenshots/forgot-password.png) | ![Dashboard Profile](docs/screenshots/dashboard-profile.png) | ![Dashboard Settings](docs/screenshots/dashboard-settings.png) |

|                      Language Switcher                       |                 Home (Light On)                  |                  Info Page                   |
| :----------------------------------------------------------: | :----------------------------------------------: | :------------------------------------------: |
| ![Language Switcher](docs/screenshots/language-switcher.png) | ![Home Active](docs/screenshots/home-active.png) | ![Info Page](docs/screenshots/info-page.png) |

---

## ✨ Key Features

### 🔐 Complete Authentication System

- ✅ Email/Password login with real-time validation
- ✅ Google OAuth integration (extensible to GitHub, Apple, etc.)
- ✅ Password reset flow with email recovery
- ✅ Account creation with email verification
- ✅ Change email, change password, delete account
- ✅ Protected routes with Zustand state management
- ✅ Session persistence and automatic token refresh
- ✅ Client-side rate limiter with exponential backoff

### 🎨 Modern UI/UX

- ✅ Clean, responsive design with Tailwind CSS v4
- ✅ Smooth animations (animated tabs, modal transitions)
- ✅ Interactive home page (light switch, rain, wind effects)
- ✅ Password strength indicator with visual feedback
- ✅ Loading states, error handling, and confirmation modals

### 🌍 Internationalization (i18n)

- ✅ Full English and Spanish support
- ✅ Easy to add new languages (JSON-based)
- ✅ Persistent language selection (localStorage)
- ✅ Real-time translation without page reload

### 🔒 Security (Staff Engineer Level)

- ✅ TypeScript strict mode — zero implicit `any`
- ✅ Input sanitization and validation (email, password strength)
- ✅ Client-side rate limiter with exponential backoff (brute-force protection)
- ✅ Security headers via Vercel (CSP, HSTS, X-Frame-Options, Referrer-Policy)
- ✅ RLS (Row Level Security) policies on Supabase
- ✅ Environment variables for all secrets (zero hardcoded keys)
- ✅ Automated vulnerability scanning (audit-ci in CI pipeline)
- ✅ Dependabot for weekly dependency updates
- ✅ SECURITY.md with vulnerability reporting process

### 🧪 Comprehensive Testing

- ✅ **Unit tests** — Vitest + Testing Library (utils, hooks, components)
- ✅ **E2E tests** — Playwright across 3 browsers (Chromium, Firefox, WebKit)
- ✅ Test coverage reporting with @vitest/coverage-v8
- ✅ Dedicated test fixtures and helpers

### 🚀 CI/CD & DevOps

- ✅ **GitHub Actions** — Lint → Test → Build → Security Audit (every PR)
- ✅ **Playwright CI** — E2E tests in 3 browsers with artifact uploads
- ✅ **Dependency caching** — 85% faster CI builds
- ✅ **Branch protection** — PR required, code owner review, status checks
- ✅ **CODEOWNERS** — Automatic review assignment for critical paths
- ✅ **PR Template** — Standardized PR descriptions with security checklist
- ✅ **Dependabot** — Automated weekly dependency scanning
- ✅ **Vercel deployment** — Automatic preview deploys on PRs

### 📖 Professional Documentation

- ✅ **AGENTS.md** — 3000+ lines of coding standards (Security, Architecture, Testing, CI/CD, Performance)
- ✅ **PROJECT_STRUCTURE.md** — File organization guide with migration paths
- ✅ **SECURITY.md** — Vulnerability reporting and security practices
- ✅ **CONTRIBUTING.md** — Contribution guidelines and PR standards
- ✅ **JSDoc comments** — All exported functions documented
- ✅ **Inline comments** — Code explains "why", not just "what"

---

## 🛠 Tech Stack

| Category         | Technologies                                        |
| ---------------- | --------------------------------------------------- |
| **Frontend**     | React 19, TypeScript 5.9, Vite 7, SWC               |
| **Styling**      | Tailwind CSS v4 (via Vite plugin)                   |
| **State**        | Zustand 5 (auth + UI stores)                        |
| **Backend/Auth** | Supabase (Auth, PostgreSQL, RLS, Edge Functions)    |
| **Runtime**      | Bun (package manager + task runner)                 |
| **Unit Testing** | Vitest, Testing Library, jsdom                      |
| **E2E Testing**  | Playwright (Chromium, Firefox, WebKit)              |
| **CI/CD**        | GitHub Actions (lint, test, build, audit)           |
| **Deployment**   | Vercel (with security headers)                      |
| **Code Quality** | ESLint, Prettier, Husky, lint-staged                |
| **Security**     | audit-ci, Dependabot, CODEOWNERS, branch protection |
| **i18n**         | react-i18next, i18next                              |

---

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- Supabase account (free tier available)

### Installation

```bash
# Clone the repository
git clone https://github.com/jjmendezrodriguez/react-supabase-auth-starter.git
cd react-supabase-auth-starter

# Navigate to frontend
cd frontEnd

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Start development server
bun dev
```

Visit `http://localhost:5174` 🎉

---

## 📁 Project Structure

```files
frontEnd/
├── src/
│   ├── components/          # React components
│   │   ├── auth/           # Authentication modals
│   │   └── dashboard/      # User dashboard
│   ├── hooks/              # Custom React hooks
│   ├── services/           # External integrations
│   │   └── supabase/       # Supabase client
│   ├── stores/             # Zustand state stores
│   ├── utils/              # Pure utility functions
│   ├── pages/              # Route pages
│   └── locales/            # i18n translations
├── e2e/                    # Playwright E2E tests
├── test/                   # Vitest unit tests
├── docs/                   # Documentation
└── .github/workflows/      # CI/CD pipelines
```

See [PROJECT_STRUCTURE.md](frontEnd/PROJECT_STRUCTURE.md) for detailed organization.

---

## 📚 Documentation

This project is thoroughly documented — not just code comments, but full engineering guides:

| Document                                                  | Purpose                                                                                            |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **[AGENTS.md](frontEnd/AGENTS.md)**                       | 3000+ lines of coding standards — security, architecture, testing, CI/CD, performance, scalability |
| **[PROJECT_STRUCTURE.md](frontEnd/PROJECT_STRUCTURE.md)** | File organization guide with Type-based → Feature-based migration path                             |
| **[SECURITY.md](SECURITY.md)**                            | Security practices, vulnerability reporting, and incident response                                 |
| **[CONTRIBUTING.md](CONTRIBUTING.md)**                    | Contribution guidelines, PR standards, and code review process                                     |
| **[E2E_TESTING_GUIDE.md](frontEnd/E2E_TESTING_GUIDE.md)** | Playwright E2E testing guide with patterns and best practices                                      |
| **[Frontend README](frontEnd/README.md)**                 | Detailed frontend architecture, Supabase setup, and component docs                                 |

---

## 💡 Why This Template?

Most auth templates give you a login form and call it done. This one gives you the **full engineering foundation**:

```txt
❌ Typical auth template:           ✅ This template:
─────────────────────────          ─────────────────────────
Login form                         Complete auth system (7 flows)
No tests                           Unit + E2E tests (3 browsers)
No CI/CD                           GitHub Actions pipeline (4 stages)
No security                        Rate limiting, CSP, HSTS, audit-ci
No docs                            3000+ lines of engineering standards
"Works on my machine"              Vercel deploy in 2 minutes
```

**Time saved:** ~3-4 weeks of setup and security hardening for every new project.

---

## 🧪 Available Scripts

```bash
# Development
bun dev              # Start development server
bun build            # Build for production
bun lint             # Run ESLint
bun preview          # Preview production build

# Unit Tests (Vitest)
bun test             # Run tests in watch mode
bun test:run         # Run tests once
bun test:coverage    # Generate coverage report
bun test:ui          # Open Vitest UI

# E2E Tests (Playwright)
bun test:e2e         # Run all E2E tests
bun test:e2e:headed  # Run with visible browser
bun test:e2e:ui      # Open Playwright UI
bun test:e2e:debug   # Debug mode
bun test:e2e:report  # View last HTML report
bun test:e2e:codegen # Record new tests
```

---

## 🔧 Environment Setup

Create a `.env` file in `frontEnd/` (or copy the example):

```bash
cp frontEnd/.env.example frontEnd/.env
```

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Get your Supabase credentials from: **[Supabase Dashboard → Settings → API](https://supabase.com/dashboard/project/_/settings/api)**

---

## 🗄️ Database Setup

### 1. Create `profiles` table

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

### 2. Enable Row Level Security (RLS)

```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

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

### 3. Create Database Triggers

These triggers keep profiles in sync with Supabase Auth:

- **`on_auth_user_created`** — Auto-creates a profile row when a new user signs up
- **`on_auth_user_email_updated`** — Syncs email changes from auth to profiles
- **`on_profile_name_updated`** — Syncs name changes from profiles to auth.users metadata

### 4. Deploy Edge Function (optional)

The `delete-user` Edge Function handles privileged account deletion:

```bash
supabase functions deploy delete-user
```

> **See:** [frontEnd/README.md](frontEnd/README.md#supabase-database-setup) for detailed SQL and trigger definitions.

---

## 📧 Email Templates

Supabase sends automatic emails for authentication events. To customize them:

1. Go to **Supabase Dashboard → Authentication → Email Templates**
2. Edit these templates to match your brand:

   | Template           | When it's sent                        |
   | ------------------ | ------------------------------------- |
   | **Confirm signup** | After user creates an account         |
   | **Reset password** | When user requests password recovery  |
   | **Magic link**     | When using passwordless login         |
   | **Change email**   | When user updates their email address |
   | **Invite user**    | When you invite users via dashboard   |

3. _(Optional)_ Configure custom SMTP for branded email delivery under **Project Settings → Auth → SMTP Settings**

> **Docs:** [Supabase Email Templates](https://supabase.com/docs/guides/auth/auth-email-templates) · [Custom SMTP](https://supabase.com/docs/guides/auth/auth-smtp)

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and development process.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Jose Mendez** — Software Engineer  
Building production-grade tools with Staff Engineer standards.

💼 [LinkedIn](https://linkedin.com/in/jjmendezrodriguez) · 🐙 [GitHub](https://github.com/jjmendezrodriguez)

---

## 🌟 Show Your Support

If this template saved you time or taught you something, give it a ⭐️ on GitHub!

**Found a bug?** [Open an issue](https://github.com/jjmendezrodriguez/react-supabase-auth-starter/issues) · **Want to contribute?** Read [CONTRIBUTING.md](CONTRIBUTING.md)
