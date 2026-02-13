// useAuthForm hook
// Shared form logic for authentication (login and signup)

import { useState, type FormEvent } from 'react'
import { getValidationError } from '@/utils/validators'
import { logger } from '@/utils/logger'

interface UseAuthFormOptions {
  // onSubmit may return a result (e.g. API response) or throw an error.
  // The hook will now capture thrown errors and expose a general error message.
  onSubmit: (data: AuthFormData) => Promise<unknown>
  requireConfirmPassword?: boolean
  requireNames?: boolean
}

interface AuthFormData {
  email: string
  password: string
  confirmPassword?: string
  firstName?: string
  lastName?: string
}

interface AuthFormState {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  emailError: string | null
  passwordError: string | null
  confirmPasswordError: string | null
  firstNameError: string | null
  lastNameError: string | null
  loading: boolean
  error: string | null
}

/**
 * useAuthForm hook
 * Handles form state, validation, and submission for auth forms
 * @param options - Configuration options
 * @param options.onSubmit - Async function called on successful validation
 * @param options.requireConfirmPassword - Enable password confirmation field
 * @param options.requireNames - Enable first name and last name fields
 * @returns Form state and handlers
 */
export default function useAuthForm({
  onSubmit,
  requireConfirmPassword = false,
  requireNames = false,
}: UseAuthFormOptions) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null)
  const [firstNameError, setFirstNameError] = useState<string | null>(null)
  const [lastNameError, setLastNameError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Validate all form fields
   * @returns true if all fields are valid, false otherwise
   */
  const validateForm = (): boolean => {
    // Reset errors
    setEmailError(null)
    setPasswordError(null)
    setConfirmPasswordError(null)
    setFirstNameError(null)
    setLastNameError(null)
    setError(null)

    let isValid = true

    // Validate names if required
    if (requireNames) {
      const firstNameValidationError = getValidationError(
        'firstName',
        firstName
      )
      if (firstNameValidationError) {
        setFirstNameError(firstNameValidationError)
        isValid = false
      }

      const lastNameValidationError = getValidationError('lastName', lastName)
      if (lastNameValidationError) {
        setLastNameError(lastNameValidationError)
        isValid = false
      }
    }

    // Validate email
    const emailValidationError = getValidationError('email', email)
    if (emailValidationError) {
      setEmailError(emailValidationError)
      isValid = false
    }

    // Validate password
    const passwordValidationError = getValidationError('password', password)
    if (passwordValidationError) {
      setPasswordError(passwordValidationError)
      isValid = false
    }

    // Validate confirm password if required
    if (requireConfirmPassword) {
      const confirmPasswordValidationError = getValidationError(
        'confirmPassword',
        confirmPassword,
        password
      )
      if (confirmPasswordValidationError) {
        setConfirmPasswordError(confirmPasswordValidationError)
        isValid = false
      }
    }

    return isValid
  }

  /**
   * Handle form submission
   * Validates fields and calls onSubmit callback
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      // Call onSubmit callback with form data
      await onSubmit({
        email,
        password,
        confirmPassword: requireConfirmPassword ? confirmPassword : undefined,
        firstName: requireNames ? firstName : undefined,
        lastName: requireNames ? lastName : undefined,
      })
    } catch (err) {
      // Capture and expose errors thrown by onSubmit so the UI can display them
      logger.error('Form submission error', err)
      try {
        const msg = err instanceof Error ? err.message : JSON.stringify(err)
        setError(msg)
      } catch {
        setError('An unexpected error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  /**
   * Handle email input change
   * Clears email error on change
   */
  const handleEmailChange = (value: string) => {
    setEmail(value)
    if (emailError) setEmailError(null)
  }

  /**
   * Handle password input change
   * Clears password error on change
   */
  const handlePasswordChange = (value: string) => {
    setPassword(value)
    if (passwordError) setPasswordError(null)
  }

  /**
   * Handle confirm password input change
   * Clears confirm password error on change
   */
  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value)
    if (confirmPasswordError) setConfirmPasswordError(null)
  }

  /**
   * Handle first name input change
   * Clears first name error on change
   */
  const handleFirstNameChange = (value: string) => {
    setFirstName(value)
    if (firstNameError) setFirstNameError(null)
  }

  /**
   * Handle last name input change
   * Clears last name error on change
   */
  const handleLastNameChange = (value: string) => {
    setLastName(value)
    if (lastNameError) setLastNameError(null)
  }

  /**
   * Set general error message
   * Used for API errors or other non-field errors
   */
  const setGeneralError = (errorMessage: string | null) => {
    setError(errorMessage)
  }

  /**
   * Reset all form fields and errors
   */
  const resetForm = () => {
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setFirstName('')
    setLastName('')
    setEmailError(null)
    setPasswordError(null)
    setConfirmPasswordError(null)
    setFirstNameError(null)
    setLastNameError(null)
    setError(null)
    setLoading(false)
  }

  return {
    // Form state
    formState: {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      emailError,
      passwordError,
      confirmPasswordError,
      firstNameError,
      lastNameError,
      loading,
      error,
    } as AuthFormState,

    // Handlers
    handleSubmit,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleFirstNameChange,
    handleLastNameChange,
    setGeneralError,
    resetForm,
  }
}
