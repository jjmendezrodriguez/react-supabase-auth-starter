// LoginModal component
// Modal for user authentication with email/password and Google OAuth

import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { supabase } from '@/services/supabase/db'
import { AuthInput, PasswordInput, OAuthButton } from '@/components/auth'
import useAuthForm from '@/hooks/useAuthForm'
import AlertModal from '@/components/AlertModal'
import { useState } from 'react'
import { createBackdropClickHandler } from '@/utils/modalHelpers'
import { logger } from '@/utils/logger'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLoginSuccess: (
    userId: string,
    userName: string,
    userEmail: string,
    firstName?: string,
    lastName?: string
  ) => void
  onSwitchToSignup?: () => void
  onSwitchToForgotPassword?: () => void
}

/**
 * LoginModal component
 * Provides authentication UI with email/password and Google OAuth
 * @param isOpen - Controls modal visibility
 * @param onClose - Callback when modal closes
 * @param onLoginSuccess - Callback when login succeeds with user data
 * @param onSwitchToSignup - Optional callback to switch to signup modal
 * @param onSwitchToForgotPassword - Optional callback to switch to forgot password modal
 */
export default function LoginModal({
  isOpen,
  onClose,
  onLoginSuccess,
  onSwitchToSignup,
  onSwitchToForgotPassword,
}: LoginModalProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [showInvalidCredentialsAlert, setShowInvalidCredentialsAlert] =
    useState(false)

  // Use auth form hook for form state and validation
  const {
    formState,
    handleSubmit,
    handleEmailChange,
    handlePasswordChange,
    setGeneralError,
    resetForm,
  } = useAuthForm({
    onSubmit: async ({ email, password }) => {
      try {
        // Authenticate with Supabase
        const { data, error: authError } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          })

        if (authError) {
          // Check if error is invalid credentials
          if (
            authError.message.includes('Invalid') ||
            authError.message.includes('credentials')
          ) {
            setShowInvalidCredentialsAlert(true)
          } else {
            setGeneralError('auth.errors.loginError')
          }
          return
        }

        if (data.user) {
          // Success - call callback with user data
          const firstName = data.user.user_metadata?.firstName
          const lastName = data.user.user_metadata?.lastName
          const displayName =
            data.user.user_metadata?.display_name ||
            data.user.email ||
            'Usuario'
          const email = data.user.email || ''

          onLoginSuccess(data.user.id, displayName, email, firstName, lastName)
          onClose()

          // Redirect to user dashboard after successful login
          navigate('/user')
        }
      } catch (err) {
        setGeneralError('auth.errors.loginError')
        logger.error('Login error', err)
      }
    },
  })

  /**
   * Handle Google OAuth login
   * Redirects to Google authentication flow
   */
  const handleGoogleLogin = async () => {
    try {
      // Use production domain if available, otherwise use current origin
      const redirectUrl = import.meta.env.PROD
        ? `${window.location.origin}/user`
        : `${window.location.origin}/user`

      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
        },
      })

      if (authError) {
        setGeneralError('auth.errors.loginError')
      }
      // OAuth redirects automatically, no need to handle success here
    } catch (err) {
      setGeneralError('auth.errors.loginError')
      logger.error('Google login error', err)
    }
  }

  // Create backdrop click handler using utility
  const handleBackdropClick = createBackdropClickHandler(
    formState.loading,
    onClose
  )

  /**
   * Handle switch to signup
   * Closes login modal and opens signup modal
   */
  const handleSwitchToSignup = () => {
    resetForm()
    onClose()
    if (onSwitchToSignup) {
      onSwitchToSignup()
    }
  }

  /**
   * Handle switch to forgot password
   * Closes login modal and opens forgot password modal
   */
  const handleSwitchToForgotPassword = () => {
    resetForm()
    onClose()
    if (onSwitchToForgotPassword) {
      onSwitchToForgotPassword()
    }
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
          aria-labelledby="login-modal-title"
        >
          <h2
            id="login-modal-title"
            className="mb-4 text-center text-xl font-bold sm:mb-6 sm:text-2xl"
          >
            {t('auth.login.title')}
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
              id="email"
              type="email"
              labelKey="auth.login.email"
              label="Email"
              value={formState.email}
              onChange={(e) => handleEmailChange(e.target.value)}
              error={formState.emailError}
              placeholder="tu@email.com"
              disabled={formState.loading}
            />

            <PasswordInput
              id="password"
              labelKey="auth.login.password"
              label="Contraseña"
              value={formState.password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              error={formState.passwordError}
              placeholder="••••••••"
              disabled={formState.loading}
            />

            <button
              type="submit"
              className="btn w-full"
              disabled={formState.loading}
            >
              {formState.loading
                ? t('auth.login.loading')
                : t('auth.login.submit')}
            </button>
          </form>

          {/* Forgot password and create account links */}
          <div className="mb-4 flex items-center justify-between text-sm">
            <button
              type="button"
              onClick={handleSwitchToForgotPassword}
              className="cursor-pointer text-blue-600 hover:text-blue-800 hover:underline"
              disabled={formState.loading}
            >
              {t('auth.login.forgotPassword')}
            </button>
            <button
              type="button"
              onClick={handleSwitchToSignup}
              className="cursor-pointer text-blue-600 hover:text-blue-800 hover:underline"
              disabled={formState.loading}
            >
              {t('auth.login.createAccount')}
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
            onClick={handleGoogleLogin}
          >
            <span className="font-medium">Sign in with Google</span>
          </OAuthButton>

          {/* Cancel button */}
          <button
            type="button"
            onClick={onClose}
            className="btn mt-4 w-full"
            disabled={formState.loading}
          >
            {t('auth.login.cancel')}
          </button>
        </div>
      </div>

      {/* Invalid credentials alert */}
      <AlertModal
        isOpen={showInvalidCredentialsAlert}
        onClose={() => setShowInvalidCredentialsAlert(false)}
        title={t('auth.errors.invalidCredentials')}
        message={
          <div>
            <p className="mb-3">{t('auth.errors.invalidCredentialsMessage')}</p>
            <p>
              {t('auth.errors.noAccount')}{' '}
              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-blue-600 hover:text-blue-800 hover:underline"
              >
                {t('auth.errors.createAccountLink')}
              </a>
            </p>
          </div>
        }
        shadowColor="shadow-red-500"
        closeOnBackdropClick={true}
      />
    </>
  )
}
