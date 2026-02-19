// Header component
// Main navigation bar with logo, nav links, language switcher and auth button

import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import { useProfile } from '@/hooks/useProfile'
import { LoginModal, SignupModal, ForgotPasswordModal } from '@/components/auth'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import { useUIStore } from '@/stores/uiStore'

export default function Header() {
  const { isAuthenticated, logout, user } = useAuth()
  const { profile } = useProfile()
  const navigate = useNavigate()
  const location = useLocation()

  // UI store for auth modal orchestration
  const activeAuthModal = useUIStore((s) => s.activeAuthModal)
  const openLoginModal = useUIStore((s) => s.openLoginModal)
  const closeAuthModal = useUIStore((s) => s.closeAuthModal)

  // Local state for mobile menu (component-specific)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  /**
   * Get user's full name from profile or user metadata
   */
  const getUserName = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name} ${profile.last_name}`
    }
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`
    }
    return user?.name || 'User'
  }

  /**
   * Check if current route is active
   */
  const isActiveRoute = (path: string) => {
    return location.pathname === path
  }

  /**
   * Handle authentication button click
   * Opens login modal if not authenticated, logout if authenticated
   * Navigates to home before logout to prevent AlertModal from showing
   */
  const handleAuthClick = () => {
    if (isAuthenticated) {
      navigate('/')
      logout()
    } else {
      openLoginModal()
    }
  }

  return (
    <>
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          {/* Logo / Brand name - Left side */}
          <div className="text-xl font-bold">
            <Link to="/" className="hover:text-gray-600">
              AuthStarter
            </Link>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden gap-6 md:flex">
            <Link
              to="/"
              className={`transition-colors hover:text-gray-600 ${
                isActiveRoute('/') ? 'border-b-2 border-blue-600 pb-1' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/info"
              className={`transition-colors hover:text-gray-600 ${
                isActiveRoute('/info') ? 'border-b-2 border-blue-600 pb-1' : ''
              }`}
            >
              Info
            </Link>
            {isAuthenticated && (
              <Link
                to="/user"
                className={`font-medium transition-colors hover:text-gray-600 ${
                  isActiveRoute('/user')
                    ? 'border-b-2 border-blue-600 pb-1'
                    : 'text-gray-700'
                }`}
              >
                {getUserName()}
              </Link>
            )}
          </nav>

          {/* Desktop Auth button and Language Switcher - Hidden on mobile */}
          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher />
            <button className="btn" onClick={handleAuthClick}>
              {isAuthenticated ? 'Logout' : 'Login'}
            </button>
          </div>

          {/* Mobile Hamburger Menu Button - Visible only on mobile */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu - Visible when open */}
        {mobileMenuOpen && (
          <div className="border-t bg-white md:hidden">
            <nav className="flex flex-col px-4 py-2">
              <Link
                to="/"
                className={`py-2 transition-colors hover:text-gray-600 ${
                  isActiveRoute('/') ? 'font-semibold text-blue-600' : ''
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/info"
                className={`py-2 transition-colors hover:text-gray-600 ${
                  isActiveRoute('/info') ? 'font-semibold text-blue-600' : ''
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Info
              </Link>
              {isAuthenticated && (
                <Link
                  to="/user"
                  className={`py-2 transition-colors hover:text-gray-600 ${
                    isActiveRoute('/user')
                      ? 'font-semibold text-blue-600'
                      : 'text-gray-700'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {getUserName()}
                </Link>
              )}
              <div className="my-2 border-t"></div>
              <div className="py-2">
                <LanguageSwitcher />
              </div>
              <button
                className="btn mt-2"
                onClick={() => {
                  handleAuthClick()
                  setMobileMenuOpen(false)
                }}
              >
                {isAuthenticated ? 'Logout' : 'Login'}
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Login Modal */}
      <LoginModal
        isOpen={activeAuthModal === 'login'}
        onClose={closeAuthModal}
      />

      {/* Signup Modal */}
      <SignupModal
        isOpen={activeAuthModal === 'signup'}
        onClose={closeAuthModal}
      />

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={activeAuthModal === 'forgotPassword'}
        onClose={closeAuthModal}
      />
    </>
  )
}
