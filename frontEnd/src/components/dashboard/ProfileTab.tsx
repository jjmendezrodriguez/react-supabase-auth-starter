// ProfileTab component
// Profile section with personal info, security, and danger zone

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useTranslation } from "react-i18next";
import AlertModal from "@/components/ui/AlertModal";
import ChangeEmailModal from "@/components/dashboard/ChangeEmailModal";
import ChangePasswordModal from "@/components/dashboard/ChangePasswordModal";
import DeleteAccountModal from "@/components/dashboard/DeleteAccountModal";

export default function ProfileTab() {
  const { user } = useAuth();
  const { profile, updating, updateProfile } = useProfile();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  // Modals state
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");

  /**
   * Start editing mode
   * Populate form with current profile data
   */
  const handleStartEdit = () => {
    setFirstName(profile?.first_name || user?.firstName || "");
    setLastName(profile?.last_name || user?.lastName || "");
    setBio(profile?.bio || "");
    setIsEditing(true);
  };

  /**
   * Cancel editing mode
   * Reset form and exit edit mode
   */
  const handleCancelEdit = () => {
    setIsEditing(false);
    setFirstName("");
    setLastName("");
    setBio("");
  };

  /**
   * Save profile changes
   * Validate and submit to database
   */
  const handleSaveChanges = async () => {
    // Validate required fields
    if (!firstName.trim() || !lastName.trim()) {
      setShowErrorAlert(true);
      return;
    }

    // Update profile
    const success = await updateProfile({
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      bio: bio.trim() || undefined,
    });

    if (success) {
      setIsEditing(false);
      setShowSuccessAlert(true);
    } else {
      setShowErrorAlert(true);
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Personal Information Section */}
        <div className="border-b border-gray-200 pb-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {t("dashboard.profile.title")}
              </h3>
              <p className="text-sm text-gray-600">
                {t("dashboard.profile.subtitle")}
              </p>
            </div>
            {!isEditing && (
              <button
                onClick={handleStartEdit}
                className="btn active:inset-shadow-sm active:inset-shadow-blue-500/50"
              >
                {t("dashboard.editProfile")}
              </button>
            )}
          </div>

          {!isEditing ? (
            // View Mode
            <div className="space-y-3 text-gray-600">
              <p>
                <span className="font-medium">{t("dashboard.userEmail")}:</span>{" "}
                {user?.email}
              </p>
              {profile?.first_name && (
                <p>
                  <span className="font-medium">
                    {t("dashboard.firstName")}:
                  </span>{" "}
                  {profile.first_name}
                </p>
              )}
              {profile?.last_name && (
                <p>
                  <span className="font-medium">
                    {t("dashboard.lastName")}:
                  </span>{" "}
                  {profile.last_name}
                </p>
              )}
              {profile?.bio && (
                <p>
                  <span className="font-medium">{t("dashboard.bio")}:</span>{" "}
                  {profile.bio}
                </p>
              )}
            </div>
          ) : (
            // Edit Mode
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveChanges();
              }}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  {t("dashboard.firstName")} *
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                  disabled={updating}
                  required
                  minLength={2}
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  {t("dashboard.lastName")} *
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                  disabled={updating}
                  required
                  minLength={2}
                />
              </div>

              <div>
                <label
                  htmlFor="bio"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  {t("dashboard.bio")}
                </label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  placeholder={t("dashboard.bioPlaceholder")}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                  disabled={updating}
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                  disabled={updating}
                >
                  {updating ? "Guardando..." : t("dashboard.saveChanges")}
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="btn flex-1"
                  disabled={updating}
                >
                  {t("dashboard.cancel")}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Account Security Section */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            {t("dashboard.profile.accountSecurity")}
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => setShowChangeEmail(true)}
              className="btn mb-8 w-full rounded-lg border border-gray-300 px-4 py-3 text-left transition-colors hover:bg-gray-50"
            >
              <span className="font-medium">
                {t("dashboard.profile.changeEmail")}
              </span>
              <p className="mt-1 text-sm text-gray-600">
                {t("dashboard.userEmail")}: {user?.email}
              </p>
            </button>

            <button
              onClick={() => setShowChangePassword(true)}
              className="btn w-full rounded-lg border border-gray-300 px-4 py-3 text-left transition-colors hover:bg-gray-50"
            >
              <span className="font-medium">
                {t("dashboard.profile.changePassword")}
              </span>
              <p className="mt-1 text-sm text-gray-600">••••••••</p>
            </button>
          </div>
        </div>

        {/* Danger Zone Section */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-red-600">
            {t("dashboard.profile.dangerZone")}
          </h3>
          <button
            onClick={() => setShowDeleteAccount(true)}
            className="btn w-full rounded-lg border-2 border-red-300 px-4 py-3 text-left transition-colors hover:bg-red-50"
          >
            <span className="font-medium text-red-600">
              {t("dashboard.profile.deleteAccount")}
            </span>
            <p className="mt-1 text-sm text-red-500">
              {t("dashboard.profile.deleteAccountWarning")}
            </p>
          </button>
        </div>
      </div>

      {/* Modals */}
      <ChangeEmailModal
        isOpen={showChangeEmail}
        onClose={() => setShowChangeEmail(false)}
        currentEmail={user?.email || ""}
      />

      <ChangePasswordModal
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
        userEmail={user?.email || ""}
      />

      <DeleteAccountModal
        isOpen={showDeleteAccount}
        onClose={() => setShowDeleteAccount(false)}
        userEmail={user?.email || ""}
      />

      {/* Success Alert */}
      <AlertModal
        isOpen={showSuccessAlert}
        onClose={() => setShowSuccessAlert(false)}
        title={t("dashboard.updateSuccess")}
        message=""
        shadowColor="shadow-green-500"
        extraButton={
          <button
            onClick={() => setShowSuccessAlert(false)}
            className="btn font-bold"
          >
            Close
          </button>
        }
      />

      {/* Error Alert */}
      <AlertModal
        isOpen={showErrorAlert}
        onClose={() => setShowErrorAlert(false)}
        title={t("dashboard.updateError")}
        message=""
        shadowColor="shadow-red-500"
        extraButton={
          <button
            onClick={() => setShowErrorAlert(false)}
            className="btn font-bold"
          >
            Close
          </button>
        }
      />
    </>
  );
}
