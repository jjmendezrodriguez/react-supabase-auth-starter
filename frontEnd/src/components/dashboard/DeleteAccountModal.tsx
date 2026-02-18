// DeleteAccountModal component
// Modal for deleting user account with DELETE confirmation
// Supports both email/password and OAuth (Google) users

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { supabase } from '@/services/supabase/db'
import { PasswordInput } from '@/components/auth'
import AlertModal from '@/components/AlertModal'
import { logger } from '@/utils/logger'

interface DeleteAccountModalProps {
  isOpen: boolean
  onClose: () => void
  userEmail: string
}

/**
 * DeleteAccountModal component
 * Allows user to delete their account permanently
 * Email users: password + typing "DELETE"
 * OAuth users: only typing "DELETE" (identity verified via session JWT)
 * @param isOpen - Controls modal visibility
 * @param onClose - Callback when modal closes
 * @param userEmail - Current user email for verification
 */
export default function DeleteAccountModal({
  isOpen,
  onClose,
  userEmail,
}: DeleteAccountModalProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmText, setConfirmText] = useState('')
  const [loading, setLoading] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isOAuthUser, setIsOAuthUser] = useState(false)

  // Detect if user signed in via OAuth (Google, etc.)
  useEffect(() => {
    const checkProvider = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const provider = user.app_metadata?.provider
        setIsOAuthUser(provider !== 'email')
      }
    }

    if (isOpen) {
      checkProvider()
    }
  }, [isOpen])

  // Check if delete button should be enabled
  // OAuth users only need "DELETE" confirmation, email users also need password
  const isDeleteEnabled = isOAuthUser
    ? confirmText === 'DELETE' && !loading
    : password.length >= 8 && confirmText === 'DELETE' && !loading

  /**
   * Handle account deletion
   * Email users: verifies password then deletes via Edge Function
   * OAuth users: skips password check, uses existing session JWT
   */
  const handleDelete = async () => {
    setLoading(true)

    try {
      // Validate DELETE confirmation
      if (confirmText !== 'DELETE') {
        setErrorMessage(t('dashboard.deleteAccount.confirmationMismatch'))
        setShowError(true)
        setLoading(false)
        return
      }

      // For email users, verify password before proceeding
      if (!isOAuthUser) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: userEmail,
          password,
        })

        if (signInError) {
          setErrorMessage(t('dashboard.deleteAccount.invalidPassword'))
          setShowError(true)
          setLoading(false)
          return
        }
      }

      // Get current session token (valid for both email and OAuth users)
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.access_token) {
        setErrorMessage(t('dashboard.deleteAccount.error'))
        setShowError(true)
        setLoading(false)
        return
      }

      // Call Edge Function to delete user (has admin privileges)
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/rapid-endpoint`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        setErrorMessage(t('dashboard.deleteAccount.error'))
        setShowError(true)
        setLoading(false)
        return
      }

      // Sign out locally (session is already invalid on server)
      await supabase.auth.signOut()

      // Navigate to home
      navigate('/')
    } catch (err) {
      logger.error('Delete account error', err)
      setErrorMessage(t('dashboard.deleteAccount.error'))
      setShowError(true)
      setLoading(false)
    }
  }

  /**
   * Handle close
   * Resets form and closes modal
   */
  const handleClose = () => {
    setPassword('')
    setConfirmText('')
    setErrorMessage('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      <div
        className="bg-opacity-50 fixed inset-0 z-40 flex items-center justify-center bg-black p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) handleClose()
        }}
      >
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          <h2 className="mb-2 text-2xl font-bold text-red-600">
            {t('dashboard.deleteAccount.title')}
          </h2>

          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-800">
              ⚠️ {t('dashboard.deleteAccount.warning')}
            </p>
          </div>

          <div className="space-y-4">
            {/* OAuth user info banner */}
            {isOAuthUser && (
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                <p className="text-sm text-blue-800">
                  {t('dashboard.deleteAccount.oauthInfo')}
                </p>
              </div>
            )}

            {/* Password input - only for email users */}
            {!isOAuthUser && (
              <div>
                <PasswordInput
                  label={t('dashboard.deleteAccount.enterPassword')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            )}

            {/* DELETE confirmation */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {t('dashboard.deleteAccount.typeDelete')}
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="DELETE"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:outline-none"
                required
              />
              {confirmText && (
                <p
                  className={`mt-1 text-xs ${confirmText === 'DELETE' ? 'text-green-600' : 'text-red-600'}`}
                >
                  {confirmText === 'DELETE'
                    ? '✓ Confirmed'
                    : '✗ Must type "DELETE" exactly'}
                </p>
              )}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={handleDelete}
                className={`flex-1 rounded-lg px-4 py-2 font-medium transition-all ${
                  isDeleteEnabled
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'cursor-not-allowed bg-gray-300 text-gray-500'
                }`}
                disabled={!isDeleteEnabled}
              >
                {loading ? '...' : t('dashboard.deleteAccount.deleteButton')}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="btn flex-1"
                disabled={loading}
              >
                {t('dashboard.deleteAccount.cancel')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      <AlertModal
        isOpen={showError}
        onClose={() => setShowError(false)}
        title={errorMessage}
        message=""
        shadowColor="shadow-red-500"
        extraButton={
          <button onClick={() => setShowError(false)} className="btn font-bold">
            Close
          </button>
        }
      />
    </>
  )
}
