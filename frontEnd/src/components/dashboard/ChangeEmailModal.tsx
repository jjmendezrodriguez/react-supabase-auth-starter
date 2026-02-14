// ChangeEmailModal component
// Modal for changing user email with password confirmation

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/services/supabase/db";
import { AuthInput, PasswordInput } from "@/components/auth";
import AlertModal from "@/components/AlertModal";

interface ChangeEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentEmail: string;
}

/**
 * ChangeEmailModal component
 * Allows user to change their email with password confirmation
 * @param isOpen - Controls modal visibility
 * @param onClose - Callback when modal closes
 * @param currentEmail - Current user email for reference
 */
export default function ChangeEmailModal({
  isOpen,
  onClose,
  currentEmail,
}: ChangeEmailModalProps) {
  const { t } = useTranslation();
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Handle email change
   * Validates password and updates email
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First, verify password by attempting to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: currentEmail,
        password,
      });

      if (signInError) {
        setErrorMessage(t("dashboard.changeEmail.invalidPassword"));
        setShowError(true);
        setLoading(false);
        return;
      }

      // Update email
      const { error: updateError } = await supabase.auth.updateUser({
        email: newEmail,
      });

      if (updateError) {
        setErrorMessage(t("dashboard.changeEmail.error"));
        setShowError(true);
      } else {
        setShowSuccess(true);
        setNewEmail("");
        setPassword("");
      }
    } catch {
      setErrorMessage(t("dashboard.changeEmail.error"));
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle close
   * Resets form and closes modal
   */
  const handleClose = () => {
    setNewEmail("");
    setPassword("");
    setErrorMessage("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="bg-opacity-50 fixed inset-0 z-40 flex items-center justify-center bg-black p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) handleClose();
        }}
      >
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          <h2 className="mb-2 text-2xl font-bold">
            {t("dashboard.changeEmail.title")}
          </h2>
          <p className="mb-4 text-sm text-gray-600">
            {t("dashboard.userEmail")}:{" "}
            <span className="font-medium">{currentEmail}</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AuthInput
              type="email"
              label={t("dashboard.changeEmail.newEmail")}
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
            />

            <PasswordInput
              label={t("dashboard.changeEmail.currentPassword")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="mt-6 flex gap-3">
              <button
                type="submit"
                className="btn btn-primary flex-1"
                disabled={loading}
              >
                {loading ? "..." : t("dashboard.changeEmail.submit")}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="btn flex-1"
                disabled={loading}
              >
                {t("dashboard.changeEmail.cancel")}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Alert */}
      <AlertModal
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          handleClose();
        }}
        title={t("dashboard.changeEmail.success")}
        message=""
        shadowColor="shadow-green-500"
        extraButton={
          <button
            onClick={() => {
              setShowSuccess(false);
              handleClose();
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
  );
}
