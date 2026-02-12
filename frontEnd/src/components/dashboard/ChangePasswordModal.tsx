// ChangePasswordModal component
// Modal for changing user password

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { supabase } from '@/services/supabase/db'
import { PasswordInput } from '@/components/auth'
import AlertModal from '@/components/AlertModal'
import { validatePassword } from '@/utils/validators'

interface ChangePasswordModalProps {
  isOpen: boolean
  onClose: () => void
  userEmail: string
}

/**
 * ChangePasswordModal component
 * Allows user to change their password
 * @param isOpen - Controls modal visibility
 * @param onClose - Callback when modal closes
 * @param userEmail - Current user email for verification
 */
export default function ChangePasswordModal({
  isOpen,
  onClose,
  userEmail,
}: ChangePasswordModalProps) {
  const { t } = useTranslation()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  /**
   * Handle password change
   * Validates current password and updates to new password
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setErrorMessage(t('dashboard.changePassword.passwordsDontMatch'))
      setShowError(true)
      setLoading(false)
      return
    }

    // Validate password strength (same as signup)
    const passwordValidation = validatePassword(newPassword)
    if (!passwordValidation.isValid) {
      if (!passwordValidation.hasMinLength) {
        setErrorMessage(t('auth.errors.passwordTooShort'))
      } else if (!passwordValidation.hasUppercase) {
        setErrorMessage(t('auth.errors.passwordNoUppercase'))
      } else if (!passwordValidation.hasNumber) {
        setErrorMessage(t('auth.errors.passwordNoNumber'))
      }
      setShowError(true)
      setLoading(false)
      return
    }

    try {
      // First, verify current password by attempting to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: currentPassword,
      })

      if (signInError) {
        setErrorMessage(t('dashboard.changePassword.error'))
        setShowError(true)
        setLoading(false)
        return
      }

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (updateError) {
        setErrorMessage(t('dashboard.changePassword.error'))
        setShowError(true)
      } else {
        setShowSuccess(true)
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      }
    } catch {
      setErrorMessage(t('dashboard.changePassword.error'))
      setShowError(true)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Handle close
   * Resets form and closes modal
   */
  const handleClose = () => {
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
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
          <h2 className="mb-4 text-2xl font-bold">
            {t('dashboard.changePassword.title')}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <PasswordInput
                label={t('dashboard.changePassword.currentPassword')}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <PasswordInput
                label={t('dashboard.changePassword.newPassword')}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
              />
              {newPassword && (
                <div className="mt-2 space-y-1 text-xs">
                  <p
                    className={
                      validatePassword(newPassword).hasMinLength
                        ? 'text-green-600'
                        : 'text-gray-500'
                    }
                  >
                    {validatePassword(newPassword).hasMinLength ? '✓' : '○'}{' '}
                    {t('auth.signup.requirement8Chars')}
                  </p>
                  <p
                    className={
                      validatePassword(newPassword).hasUppercase
                        ? 'text-green-600'
                        : 'text-gray-500'
                    }
                  >
                    {validatePassword(newPassword).hasUppercase ? '✓' : '○'}{' '}
                    {t('auth.signup.requirementUppercase')}
                  </p>
                  <p
                    className={
                      validatePassword(newPassword).hasNumber
                        ? 'text-green-600'
                        : 'text-gray-500'
                    }
                  >
                    {validatePassword(newPassword).hasNumber ? '✓' : '○'}{' '}
                    {t('auth.signup.requirementNumber')}
                  </p>
                </div>
              )}
            </div>

            <PasswordInput
              label={t('dashboard.changePassword.confirmPassword')}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
            />

            <div className="mt-6 flex gap-3">
              <button
                type="submit"
                className="btn btn-primary flex-1"
                disabled={loading}
              >
                {loading ? '...' : t('dashboard.changePassword.submit')}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="btn flex-1"
                disabled={loading}
              >
                {t('dashboard.changePassword.cancel')}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Alert */}
      <AlertModal
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false)
          handleClose()
        }}
        title={t('dashboard.changePassword.success')}
        message=""
        shadowColor="shadow-green-500"
        extraButton={
          <button
            onClick={() => {
              setShowSuccess(false)
              handleClose()
            }}
            className="btn font-bold"
          >
            Close
          </button>
        }
      />

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
