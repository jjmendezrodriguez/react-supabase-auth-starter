import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { supabase } from '@/services/supabase/db'

/**
 * AuthCallback
 * Route target for OAuth redirects. Reads session via Supabase, then
 * navigates to a clean URL (no tokens in hash) regardless of result.
 */
export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()

        // Check both error AND null session (getSession returns null session without error)
        const hasValidSession = !error && data?.session

        // Redirect to app route: valid session -> /user, otherwise -> home with error
        navigate(hasValidSession ? '/user' : '/?error=auth_failed', {
          replace: true,
        })
      } catch (err) {
        // If something goes wrong, still navigate cleanly
        navigate('/?error=auth_failed', { replace: true })
      }
    }

    handleCallback()
  }, [navigate])

  return (
    <div className="flex min-h-screen items-center justify-center">
      Autenticando...
    </div>
  )
}
