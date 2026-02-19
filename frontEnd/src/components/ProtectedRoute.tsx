// ProtectedRoute component
// Route wrapper that requires authentication

import { useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import AlertModal from "@/components/ui/AlertModal";

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * ProtectedRoute component
 * Wraps routes that require authentication
 * Shows alert modal and redirects if user is not authenticated
 * @param children - Protected content to render if authenticated
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Check authentication on mount and when it changes
    if (!isAuthenticated) {
      setShowAlert(true);
    }
  }, [isAuthenticated]);

  /**
   * Handle modal close
   * Redirects to home page when user closes the alert
   */
  const handleCloseAlert = () => {
    setShowAlert(false);
    navigate("/");
  };

  // Show alert modal for unauthenticated users
  if (!isAuthenticated) {
    return (
      <AlertModal
        isOpen={showAlert}
        onClose={handleCloseAlert}
        title="Acceso Denegado"
        message="Debes iniciar sesión para acceder a esta página."
        shadowColor="shadow-red-500"
        closeOnBackdropClick={false}
        extraButton={
          <button onClick={handleCloseAlert} className="btn font-bold">
            Close
          </button>
        }
      />
    );
  }

  // Render protected content if authenticated
  return <>{children}</>;
}
