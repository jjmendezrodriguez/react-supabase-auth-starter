// AlertModal component
// Reusable modal for alerts, confirmations, and notifications

import type { ReactNode } from "react";

interface AlertModalProps {
  isOpen: boolean;
  onClose?: () => void;
  shadowColor?: string;
  title: string;
  message: string | ReactNode;
  extraButton?: ReactNode;
  closeOnBackdropClick?: boolean;
}

/**
 * AlertModal component for displaying alerts and notifications
 * @param isOpen - Controls modal visibility
 * @param onClose - Callback when modal closes
 * @param shadowColor - Tailwind shadow color class (default: shadow-violet-500)
 * @param title - Modal title text
 * @param message - Modal body content (string or React node)
 * @param extraButton - Optional additional button or content
 * @param closeOnBackdropClick - Allow closing by clicking backdrop (default: true)
 */
export default function AlertModal({
  isOpen,
  onClose,
  shadowColor = "shadow-violet-500",
  title,
  message,
  extraButton = null,
  closeOnBackdropClick = true,
}: AlertModalProps) {
  // Early return if modal is not open
  if (!isOpen) return null;

  /**
   * Handles backdrop click events
   * Closes modal only if closeOnBackdropClick is enabled
   */
  const handleBackdropClick = () => {
    if (closeOnBackdropClick && onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Modal content */}
      <div
        className={`z-10 rounded-lg bg-white p-6 text-center shadow-[1px_1px_50px] ${shadowColor}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <h2 id="modal-title" className="mb-4 text-xl font-bold">
          {title}
        </h2>

        <div className="mb-6">{message}</div>

        {/* Extra button section */}
        {extraButton && (
          <div className="flex justify-center gap-4">
            <div className="text-sm">{extraButton}</div>
          </div>
        )}
      </div>
    </div>
  );
}
