// useAuth hook
// Bridge hook for backward compatibility with Zustand auth store

import { useAuthStore } from '@/stores/authStore'

/**
 * Return type for useAuth hook
 * Matches the previous AuthContextType interface for backward compatibility
 */
export interface UseAuthReturn {
  isAuthenticated: boolean
  user: {
    id: string
    name: string
    email: string
    firstName?: string
    lastName?: string
  } | null
  login: (
    userId: string,
    userName: string,
    userEmail: string,
    firstName?: string,
    lastName?: string
  ) => void
  logout: () => Promise<void>
}

/**
 * useAuth hook
 * Bridge hook that provides the same API as the previous Context-based hook
 * Components can use this or access the store directly for selective re-renders
 * @returns Authentication state and methods
 */
export function useAuth(): UseAuthReturn {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const user = useAuthStore((s) => s.user)
  const login = useAuthStore((s) => s.login)
  const logout = useAuthStore((s) => s.logout)

  return { isAuthenticated, user, login, logout }
}
