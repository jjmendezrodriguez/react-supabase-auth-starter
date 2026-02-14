// SignupModal component
// Modal for user registration with email verification

import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { supabase } from '@/services/supabase/db'
import { AuthInput, PasswordInput, OAuthButton } from '@/components/auth'
import useAuthForm from '@/hooks/useAuthForm'
import AlertModal from '@/components/AlertModal'
import { useState } from 'react'
import { validatePassword } from '@/utils/validators'
import { createBackdropClickHandler } from '@/utils/modalHelpers'
import { logger } from '@/utils/logger'
import { useUIStore } from '@/stores/uiStore'

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * SignupModal component
 * Provides user registration UI with email verification
 * Uses Zustand UI store for modal switching
 * @param isOpen - Controls modal visibility
 * @param onClose - Callback when modal closes
 */
export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const switchToLogin = useUIStore((s) => s.switchToLogin)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  // Use auth form hook with password confirmation and names
  const {
    formState,
    handleSubmit,
    handleFirstNameChange,
    handleLastNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    setGeneralError,
    resetForm,
  } = useAuthForm({
    onSubmit: async ({ email, password, firstName, lastName }) => {
      try {
        // Sign up with Supabase
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
            data: {
              firstName,
              lastName,
              display_name: `${firstName} ${lastName}`,
            },
          },
        })

        if (signUpError) {
          setGeneralError('auth.errors.signupError')
          return
        }

        // Success - show verification message
        setShowSuccessAlert(true)
      } catch (err) {
        setGeneralError('auth.errors.signupError')
        logger.error('Signup error', err)
      }
    },
    requireConfirmPassword: true,
    requireNames: true,
  })

  /**
   * Handle Google OAuth signup
   * Redirects to Google authentication flow
   */
  const handleGoogleSignup = async () => {
    try {
      // Redirect to /auth/callback to handle tokens securely
      const redirectUrl = `${window.location.origin}/auth/callback`

      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
        },
      })

      if (authError) {
        setGeneralError('auth.errors.signupError')
      }
      // OAuth redirects automatically
    } catch (err) {
      setGeneralError('auth.errors.signupError')
      logger.error('Google signup error', err)
    }
  }

  // Create backdrop click handler using utility
  const handleBackdropClick = createBackdropClickHandler(
    formState.loading,
    onClose
  )

  /**
   * Handle success alert close
   * Closes both modals, resets form, and redirects to home
   */
  const handleSuccessAlertClose = () => {
    setShowSuccessAlert(false)
    onClose() // Close signup modal
    resetForm()
    // Small delay to ensure modals close before navigation
    setTimeout(() => {
      navigate('/')
    }, 100)
  }

  /**
   * Handle switch to login
   * Switches via UI store (single enum, no close-then-open needed)
   */
  const handleSwitchToLogin = () => {
    resetForm()
    switchToLogin()
  }

  // Get password validation details for requirements display
  const passwordValidation = validatePassword(formState.password)

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
          aria-labelledby="signup-modal-title"
        >
          <h2
            id="signup-modal-title"
            className="mb-4 text-center text-xl font-bold sm:mb-6 sm:text-2xl"
          >
            {t('auth.signup.title')}
          </h2>

          {/* General error message */}
          {formState.error && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {t(formState.error)}
            </div>
          )}

          {/* Email/Password form */}
          <form onSubmit={handleSubmit} noValidate className="mb-4 space-y-4">
            <AuthInput
              id="firstName"
              type="text"
              labelKey="auth.signup.firstName"
              label="First Name"
              value={formState.firstName}
              onChange={(e) => handleFirstNameChange(e.target.value)}
              error={formState.firstNameError}
              placeholder="Solo Letras"
              disabled={formState.loading}
            />

            <AuthInput
              id="lastName"
              type="text"
              labelKey="auth.signup.lastName"
              label="Last Name"
              value={formState.lastName}
              onChange={(e) => handleLastNameChange(e.target.value)}
              error={formState.lastNameError}
              placeholder="Solo Letras"
              disabled={formState.loading}
            />

            <AuthInput
              id="email"
              type="email"
              labelKey="auth.signup.email"
              label="Email"
              value={formState.email}
              onChange={(e) => handleEmailChange(e.target.value)}
              error={formState.emailError}
              placeholder="tu@email.com"
              disabled={formState.loading}
            />

            <PasswordInput
              id="password"
              labelKey="auth.signup.password"
              label="Contraseña"
              value={formState.password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              error={formState.passwordError}
              placeholder="••••••••"
              disabled={formState.loading}
              showStrengthMeter={true}
            />

            {/* Password requirements checklist */}
            {formState.password.length > 0 && (
              <div className="rounded-lg bg-gray-50 p-3 text-sm">
                <p className="mb-2 font-medium text-gray-700">
                  {t('auth.signup.passwordRequirements')}
                </p>
                <ul className="space-y-1">
                  <li
                    className={
                      passwordValidation.hasMinLength
                        ? 'text-green-600'
                        : 'text-gray-500'
                    }
                  >
                    {passwordValidation.hasMinLength ? '✓' : '○'}{' '}
                    {t('auth.signup.requirement8Chars')}
                  </li>
                  <li
                    className={
                      passwordValidation.hasUppercase
                        ? 'text-green-600'
                        : 'text-gray-500'
                    }
                  >
                    {passwordValidation.hasUppercase ? '✓' : '○'}{' '}
                    {t('auth.signup.requirementUppercase')}
                  </li>
                  <li
                    className={
                      passwordValidation.hasNumber
                        ? 'text-green-600'
                        : 'text-gray-500'
                    }
                  >
                    {passwordValidation.hasNumber ? '✓' : '○'}{' '}
                    {t('auth.signup.requirementNumber')}
                  </li>
                </ul>
              </div>
            )}

            <PasswordInput
              id="confirmPassword"
              labelKey="auth.signup.confirmPassword"
              label="Confirmar Contraseña"
              value={formState.confirmPassword}
              onChange={(e) => handleConfirmPasswordChange(e.target.value)}
              error={formState.confirmPasswordError}
              placeholder="••••••••"
              disabled={formState.loading}
            />

            <button
              type="submit"
              className="btn w-full"
              disabled={formState.loading}
            >
              {formState.loading
                ? t('auth.signup.loading')
                : t('auth.signup.submit')}
            </button>
          </form>

          {/* Switch to login link */}
          <div className="mb-4 text-center text-sm">
            <span className="text-gray-600">
              {t('auth.signup.alreadyHaveAccount')}{' '}
            </span>
            <button
              type="button"
              onClick={handleSwitchToLogin}
              className="cursor-pointer text-blue-600 hover:text-blue-800 hover:underline"
              disabled={formState.loading}
            >
              {t('auth.signup.login')}
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                {t('auth.login.orContinueWith')}
              </span>
            </div>
          </div>

          {/* Google OAuth button */}
          <OAuthButton
            provider="google"
            loading={formState.loading}
            onClick={handleGoogleSignup}
          >
            Google
          </OAuthButton>

          {/* Cancel button */}
          <button
            type="button"
            data-testid="cancel-button"
            onClick={onClose}
            className="btn mt-4 w-full"
            disabled={formState.loading}
          >
            {t('auth.login.cancel')}
          </button>
        </div>
      </div>

      {/* Success alert - email verification */}
      <AlertModal
        isOpen={showSuccessAlert}
        onClose={handleSuccessAlertClose}
        title={t('auth.success.accountCreated')}
        message={t('auth.success.checkEmail')}
        shadowColor="shadow-green-500"
        closeOnBackdropClick={false}
        extraButton={
          <button onClick={handleSuccessAlertClose} className="btn font-bold">
            Close
          </button>
        }
      />
    </>
  )
}
