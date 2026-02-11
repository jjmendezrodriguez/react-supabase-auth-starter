// UI store - Zustand
// Manages UI state: auth modals and theme preference

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Active auth modal type
 * Single enum prevents impossible states (two modals open at once)
 */
export type AuthModalType = 'login' | 'signup' | 'forgotPassword' | null

/**
 * Theme preference
 */
export type ThemeType = 'light' | 'dark' | 'system'

/**
 * UI store state and actions
 */
interface UIState {
  activeAuthModal: AuthModalType
  theme: ThemeType
}

interface UIActions {
  openLoginModal: () => void
  openSignupModal: () => void
  openForgotPasswordModal: () => void
  closeAuthModal: () => void
  switchToLogin: () => void
  switchToSignup: () => void
  switchToForgotPassword: () => void
  setTheme: (theme: ThemeType) => void
}

/**
 * Zustand UI store
 * Centralizes auth modal orchestration and theme preference
 *
 * Benefits over previous pattern:
 * - Single enum vs 3 booleans (impossible states eliminated)
 * - No prop drilling for modal switching callbacks
 * - Theme persisted via localStorage
 *
 * Usage:
 *   const activeModal = useUIStore((s) => s.activeAuthModal)
 *   const openLogin = useUIStore((s) => s.openLoginModal)
 */
export const useUIStore = create<UIState & UIActions>()(
  persist(
    (set) => ({
      // State
      activeAuthModal: null,
      theme: 'light',

      // Auth modal actions
      openLoginModal: () => set({ activeAuthModal: 'login' }),
      openSignupModal: () => set({ activeAuthModal: 'signup' }),
      openForgotPasswordModal: () => set({ activeAuthModal: 'forgotPassword' }),
      closeAuthModal: () => set({ activeAuthModal: null }),

      /**
       * Switch between auth modals
       * Replaces the manual close-then-open pattern in Header
       */
      switchToLogin: () => set({ activeAuthModal: 'login' }),
      switchToSignup: () => set({ activeAuthModal: 'signup' }),
      switchToForgotPassword: () => set({ activeAuthModal: 'forgotPassword' }),

      // Theme actions
      setTheme: (theme: ThemeType) => set({ theme }),
    }),
    {
      name: 'ui-preferences',

      // Only persist theme, not modal state
      partialize: (state) => ({ theme: state.theme }),
    }
  )
)
