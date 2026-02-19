// ForgotPasswordModal component
// Modal for password reset via email

import { useTranslation } from 'react-i18next'
import { supabase } from '@/services/supabase/db'
import { AuthInput } from '@/components/auth'
import { useState, type FormEvent } from 'react'
import { getValidationError } from '@/utils/validators'
import AlertModal from '@/components/ui/AlertModal'
import { createBackdropClickHandler } from '@/utils/modalHelpers'
import { logger } from '@/utils/logger'
import { useUIStore } from '@/stores/uiStore'

interface ForgotPasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * ForgotPasswordModal component
 * Sends password reset email to user
 * Uses Zustand UI store for modal switching
 * @param isOpen - Controls modal visibility
 * @param onClose - Callback when modal closes
 */
export default function ForgotPasswordModal({
  isOpen,
  onClose,
}: ForgotPasswordModalProps) {
  const switchToLogin = useUIStore((s) => s.switchToLogin)
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  /**
   * Validate email field
   * @returns true if valid, false otherwise
   */
  const validateForm = (): boolean => {
    setEmailError(null)
    setError(null)

    const emailValidationError = getValidationError('email', email)
    if (emailValidationError) {
      setEmailError(emailValidationError)
      return false
    }

    return true
  }

  /**
   * Handle form submission
   * Sends password reset email via Supabase
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/reset-password`,
        }
      )

      if (resetError) {
        setError('auth.errors.loginError')
        setLoading(false)
        return
      }

      // Success - show confirmation
      setShowSuccessAlert(true)
    } catch (err) {
      setError('auth.errors.loginError')
      logger.error('Password reset error', err)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Handle email input change
   * Clears error on change
   */
  const handleEmailChange = (value: string) => {
    setEmail(value)
    if (emailError) setEmailError(null)
  }

  // Create backdrop click handler using utility
  const handleBackdropClick = createBackdropClickHandler(loading, onClose)

  /**
   * Handle success alert close
   * Closes modal and resets form
   */
  const handleSuccessAlertClose = () => {
    setShowSuccessAlert(false)
    setEmail('')
    setEmailError(null)
    setError(null)
    onClose()
  }

  /**
   * Handle switch to login
   * Switches via UI store (single enum, no close-then-open needed)
   */
  const handleSwitchToLogin = () => {
    setEmail('')
    setEmailError(null)
    setError(null)
    switchToLogin()
  }

  // Early return if modal is not open
  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={handleBackdropClick}
          aria-hidden="true"
        />

        {/* Modal content - Responsive */}
        <div
          className="z-10 w-full max-w-md rounded-lg bg-white p-4 shadow-[1px_1px_50px] shadow-blue-500 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="forgot-password-modal-title"
        >
          <h2
            id="forgot-password-modal-title"
            className="mb-4 text-center text-xl font-bold sm:mb-6 sm:text-2xl"
          >
            {t('auth.forgotPassword.title')}
          </h2>

          <p className="mb-4 text-center text-sm text-gray-600">
            {t('auth.forgotPassword.description')}
          </p>

          {/* General error message */}
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {t(error)}
            </div>
          )}

          {/* Email form */}
          <form onSubmit={handleSubmit} noValidate className="mb-4 space-y-4">
            <AuthInput
              id="reset-email"
              type="email"
              labelKey="auth.login.email"
              label="Email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              error={emailError}
              placeholder="tu@email.com"
              disabled={loading}
            />

            <button type="submit" className="btn w-full" disabled={loading}>
              {loading
                ? t('auth.forgotPassword.loading')
                : t('auth.forgotPassword.submit')}
            </button>
          </form>

          {/* Back to login link */}
          <div className="text-center text-sm">
            <button
              type="button"
              onClick={handleSwitchToLogin}
              className="cursor-pointer text-blue-600 hover:text-blue-800 hover:underline"
              disabled={loading}
            >
              {t('auth.forgotPassword.backToLogin')}
            </button>
          </div>

          {/* Cancel button */}
          <button
            type="button"
            onClick={onClose}
            className="btn mt-4 w-full"
            disabled={loading}
            data-testid="cancel-button"
          >
            {t('auth.login.cancel')}
          </button>
        </div>
      </div>

      {/* Success alert */}
      <AlertModal
        isOpen={showSuccessAlert}
        onClose={handleSuccessAlertClose}
        title={t('auth.forgotPassword.successTitle')}
        message={t('auth.forgotPassword.successMessage')}
        shadowColor="shadow-green-500"
        closeOnBackdropClick={false}
        extraButton={
          <button
            onClick={handleSuccessAlertClose}
            className="btn font-bold"
          >
            {t('auth.forgotPassword.close')}
          </button>
        }
      />
    </>
  )
}
