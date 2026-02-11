// Application entry point
// Configures React Router with routes and Zustand auth initialization
/* eslint-disable react-refresh/only-export-components */

import { StrictMode, lazy, Suspense, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import '@/index.css'
import '@/locales/i18n'
import App from '@/App'
import { useAuthStore } from '@/stores/authStore'
import ProtectedRoute from '@/components/ProtectedRoute'

// Lazy load pages for better initial load performance
const Home = lazy(() => import('@/pages/Home'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Info = lazy(() => import('@/pages/Info'))

// Loading component for Suspense fallback
const LoadingFallback = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="text-lg">Cargando...</div>
  </div>
)

/**
 * AuthInitializer component
 * Initializes Supabase auth session and listener on app boot
 * Shows loading state while checking existing session
 */
function AuthInitializer({ children }: { children: React.ReactNode }) {
  const loading = useAuthStore((s) => s.loading)
  const initializeAuth = useAuthStore((s) => s.initializeAuth)

  useEffect(() => {
    // Initialize auth and get cleanup function for subscription
    const cleanup = initializeAuth()
    return cleanup
  }, [initializeAuth])

  // Show loading state while checking session
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Cargando...</div>
      </div>
    )
  }

  return <>{children}</>
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthInitializer>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route
                path="user"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="info" element={<Info />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthInitializer>
  </StrictMode>
)
