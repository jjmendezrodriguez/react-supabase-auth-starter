// Auth store - Zustand
// Manages authentication state with Supabase integration

import { create } from 'zustand'
import { supabase } from '@/services/supabase/db'
import { logger } from '@/utils/logger'

/**
 * User object shape stored in auth state
 */
export interface AuthUser {
  id: string
  name: string
  email: string
  firstName?: string
  lastName?: string
}

/**
 * Auth store state and actions
 */
interface AuthState {
  isAuthenticated: boolean
  user: AuthUser | null
  loading: boolean
}

interface AuthActions {
  login: (
    userId: string,
    userName: string,
    userEmail: string,
    firstName?: string,
    lastName?: string
  ) => void
  logout: () => Promise<void>
  setLoading: (loading: boolean) => void
  initializeAuth: () => () => void
}

/**
 * Zustand auth store
 * Replaces AuthContext + AuthProvider with a simpler, performant store
 *
 * Usage:
 *   const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
 *   const login = useAuthStore((s) => s.login)
 *
 * Or via the bridge hook:
 *   const { isAuthenticated, login } = useAuth()
 */
export const useAuthStore = create<AuthState & AuthActions>()((set) => ({
  // State
  isAuthenticated: false,
  user: null,
  loading: true,

  /**
   * Login user - updates local state
   * Actual auth is handled by LoginModal via Supabase
   * @param userId - User ID from Supabase
   * @param userName - Display name or email
   * @param userEmail - User email address
   * @param firstName - Optional first name
   * @param lastName - Optional last name
   */
  login: (
    userId: string,
    userName: string,
    userEmail: string,
    firstName?: string,
    lastName?: string
  ) => {
    set({
      isAuthenticated: true,
      user: {
        id: userId,
        name: userName,
        email: userEmail,
        firstName,
        lastName,
      },
    })
  },

  /**
   * Logout user
   * Signs out from Supabase and clears local state
   */
  logout: async () => {
    try {
      await supabase.auth.signOut()
      set({ isAuthenticated: false, user: null })
    } catch (error) {
      logger.error('Error logging out', error)
    }
  },

  /**
   * Set loading state
   * Used during initial session check
   */
  setLoading: (loading: boolean) => set({ loading }),

  /**
   * Initialize auth - check session and subscribe to auth changes
   * Call once at app boot. Returns cleanup function for the subscription.
   * @returns Cleanup function to unsubscribe from auth state changes
   */
  initializeAuth: () => {
    // Check active session on initialization
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          const meta = session.user.user_metadata
          set({
            isAuthenticated: true,
            user: {
              id: session.user.id,
              name:
                meta?.display_name ||
                session.user.email ||
                'Usuario',
              email: session.user.email || '',
              firstName: meta?.firstName || meta?.given_name,
              lastName: meta?.lastName || meta?.family_name,
            },
          })
        }
      } catch (error) {
        logger.error('Error checking session', error)
      } finally {
        set({ loading: false })
      }
    }

    checkSession()

    // Listen for auth state changes (login, logout, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const meta = session.user.user_metadata
        set({
          isAuthenticated: true,
          user: {
            id: session.user.id,
            email: session.user.email || '',
            name:
              meta?.display_name ||
              session.user.email ||
              'Usuario',
            firstName: meta?.firstName || meta?.given_name,
            lastName: meta?.lastName || meta?.family_name,
          },
        })
      } else {
        set({ isAuthenticated: false, user: null })
      }
      set({ loading: false })
    })

    // Return cleanup function
    return () => {
      subscription.unsubscribe()
    }
  },
}))
