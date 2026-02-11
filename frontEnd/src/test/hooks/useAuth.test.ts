// Tests for useAuth hook
// Validates Zustand-based auth state management

import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAuth } from '@/hooks/useAuth'
import { useAuthStore } from '@/stores/authStore'

describe('useAuth', () => {
  // Reset store state before each test
  beforeEach(() => {
    useAuthStore.setState({
      isAuthenticated: false,
      user: null,
      loading: false,
    })
  })

  it('should return initial unauthenticated state', () => {
    const { result } = renderHook(() => useAuth())

    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.user).toBeNull()
    expect(result.current.login).toBeDefined()
    expect(result.current.logout).toBeDefined()
  })

  it('should update state after login', () => {
    const { result } = renderHook(() => useAuth())

    act(() => {
      result.current.login(
        'user-123',
        'Test User',
        'test@email.com',
        'Test',
        'User'
      )
    })

    expect(result.current.isAuthenticated).toBe(true)
    expect(result.current.user).toEqual({
      id: 'user-123',
      name: 'Test User',
      email: 'test@email.com',
      firstName: 'Test',
      lastName: 'User',
    })
  })

  it('should work without provider wrapping (Zustand does not require providers)', () => {
    // Zustand stores work anywhere - no provider needed
    const { result } = renderHook(() => useAuth())

    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.user).toBeNull()
  })
})
