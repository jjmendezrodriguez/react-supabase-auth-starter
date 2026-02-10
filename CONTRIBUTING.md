# Contributing to React Supabase Auth Starter

First off, thank you for considering contributing to React Supabase Auth Starter! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Commit Messages](#commit-messages)

---

## Code of Conduct

This project follows professional engineering standards. Please be respectful and constructive in all interactions.

---

## Getting Started

### Prerequisites

- Bun (recommended) or Node.js 18+
- Git
- Supabase account (for database features)

### Setup

```bash
# Fork the repository
# Clone your fork
git clone https://github.com/YOUR_USERNAME/react-supabase-auth-starter.git
cd react-supabase-auth-starter

# Add upstream remote
git remote add upstream https://github.com/jjmendezrodriguez/react-supabase-auth-starter.git

# Install dependencies
cd frontEnd
bun install
```

---

## Development Workflow

### Branch Naming

Follow this convention:

```bash
feature/add-dark-mode
fix/login-validation-bug
refactor/auth-service
docs/update-readme
chore/upgrade-dependencies
```

### Create a Feature Branch

```bash
# Update main branch
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name
```

### Make Changes

1. Write clean, readable code
2. Follow the coding standards (see [AGENTS.md](frontEnd/AGENTS.md))
3. Add tests for new features
4. Update documentation if needed

### Test Locally

```bash
# Run linter
bun run lint

# Run tests
bun test:run

# Build project
bun run build
```

---

## Pull Request Process

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] All tests pass (`bun test:run`)
- [ ] Linter passes (`bun run lint`)
- [ ] Build succeeds (`bun run build`)
- [ ] Updated documentation if needed
- [ ] Added tests for new features

### Submitting PR

1. **Push your branch**

   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open Pull Request** on GitHub
   - Use descriptive title: `feat: add dark mode toggle`
   - Fill out PR template
   - Link related issues: `Closes #123`

3. **PR Title Format**

   ```txt
   type: brief description

   Examples:
   feat: add user profile settings page
   fix: resolve password validation bug
   docs: update installation instructions
   refactor: improve auth service structure
   test: add unit tests for validators
   ```

4. **Wait for Review**
   - CI/CD must pass ✅
   - At least 1 approval required
   - Address review feedback promptly

### PR Size Guidelines

- **Ideal:** 50-200 lines
- **Max:** 400 lines
- **If larger:** Split into multiple PRs

---

## Coding Standards

### TypeScript

- Use TypeScript strict mode
- No `any` types (use `unknown` or proper types)
- Document complex functions with JSDoc

### React

- Functional components only
- Use hooks properly (no hooks in loops/conditions)
- Extract business logic to custom hooks

### Naming

- **Variables:** `camelCase`
- **Functions:** `camelCase` (verb-based: `getUserData`)
- **Components:** `PascalCase`
- **Constants:** `UPPER_SNAKE_CASE`

### File Organization

- Max 300 lines per file
- Split UI from logic (component + hook)
- One component per file

**See [AGENTS.md](frontEnd/AGENTS.md) for complete standards.**

---

## Testing Guidelines

### Test Coverage

- **Utils:** 90%+ coverage required
- **Hooks:** 70%+ coverage
- **Components:** 60%+ coverage

### Test Structure

```typescript
// utils.test.ts
import { describe, it, expect } from 'vitest'
import { validateEmail } from '../validators'

describe('validateEmail', () => {
  it('should accept valid email addresses', () => {
    expect(validateEmail('user@example.com')).toBe(true)
  })

  it('should reject invalid emails', () => {
    expect(validateEmail('invalid')).toBe(false)
  })
})
```

### Run Tests

```bash
# Watch mode
bun test

# Single run
bun test:run

# With coverage
bun test:coverage
```

---

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```txt
type(scope): subject

Examples:
feat(auth): add Google OAuth login
fix(validation): resolve email regex bug
docs(readme): update installation steps
refactor(hooks): simplify useAuth hook
test(utils): add validators test coverage
chore(deps): upgrade React to v19
```

### Types

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

---

## Questions?

- Open an issue for bugs or feature requests
- Check existing issues before creating new ones
- Tag issues appropriately: `bug`, `enhancement`, `question`

---

## Recognition

Contributors will be listed in [CONTRIBUTORS.md](CONTRIBUTORS.md) (coming soon).

Thank you for contributing! 🚀
