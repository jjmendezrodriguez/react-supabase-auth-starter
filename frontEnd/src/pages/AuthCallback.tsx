// AuthCallback page
// Handles OAuth redirect from Supabase (PKCE flow: exchanges code for session)

import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { supabase } from '@/services/supabase/db'
import { logger } from '@/utils/logger'

/** Max time (ms) to wait for Supabase to process the OAuth callback */
const AUTH_TIMEOUT_MS = 10_000

/**
 * AuthCallback
 *
 * Route target for OAuth provider redirects (/auth/callback).
 *
 * PKCE flow: Supabase redirects here with `?code=xxx` in the query string.
 * This component explicitly exchanges the code for a session via
 * `exchangeCodeForSession()`, then navigates to a clean URL.
 *
 * Fallback: If `detectSessionInUrl` already exchanged the code before this
 * component mounts, `onAuthStateChange` or `getSession()` will catch it.
 *
 * Implicit flow safety net: If tokens arrive in the URL hash (legacy),
 * they are cleaned before navigating away.
 *
 * A timeout ensures the user is never stuck on this page.
 */
export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    let redirected = false

    /**
     * Redirect helper — navigates once and cleans any remaining hash/query.
     * Uses `redirected` flag to prevent duplicate navigations.
     */
    const redirectClean = (path: string) => {
      if (redirected) return
      redirected = true

      // Remove hash if present (safety net for implicit flow fallback)
      if (window.location.hash) {
        window.history.replaceState(
          null,
          '',
          `${window.location.origin}${window.location.pathname}`
        )
      }
      navigate(path, { replace: true })
    }

    // Timeout: if nothing fires within AUTH_TIMEOUT_MS, redirect to home with error
    const timeoutId = setTimeout(() => {
      logger.warn('Auth callback timed out waiting for session')
      redirectClean('/?error=auth_timeout')
    }, AUTH_TIMEOUT_MS)

    // 1. Listen for auth state change (SIGNED_IN after code exchange)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        clearTimeout(timeoutId)
        redirectClean('/user')
      }
    })

    // 2. Explicitly handle PKCE code exchange or check existing session
    const handleCallback = async () => {
      try {
        // Check for PKCE authorization code in the URL
        const params = new URLSearchParams(window.location.search)
        const code = params.get('code')

        if (code) {
          // Exchange the PKCE code for a session (this also fires onAuthStateChange)
          const { error } = await supabase.auth.exchangeCodeForSession(code)

          if (error) {
            // Code may already have been exchanged by detectSessionInUrl —
            // check if a valid session exists before treating as failure
            const { data: sessionData } = await supabase.auth.getSession()
            if (sessionData?.session) {
              clearTimeout(timeoutId)
              redirectClean('/user')
              return
            }

            // Session not ready yet — detectSessionInUrl may still be processing.
            // Don't redirect to error; let onAuthStateChange listener or timeout handle it.
            logger.warn('Code exchange failed, waiting for session via listener', {
              error: error.message,
            })
            return
          }

          // onAuthStateChange will handle the redirect to /user
          return
        }

        // No code in URL — check if session already exists (e.g. page reload)
        const { data } = await supabase.auth.getSession()
        if (data?.session) {
          clearTimeout(timeoutId)
          redirectClean('/user')
        }
      } catch {
        // Will be handled by timeout
      }
    }

    handleCallback()

    // Cleanup
    return () => {
      clearTimeout(timeoutId)
      subscription.unsubscribe()
    }
  }, [navigate])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        <p className="text-lg text-gray-600">Autenticando...</p>
      </div>
    </div>
  )
}
