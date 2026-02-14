// useProfile hook
// Handles profile data fetching and updates

import { useState, useEffect } from "react";
import {
  getProfile,
  updateProfile,
  type Profile,
  type ProfileUpdate,
} from "@/services/supabase/profileService";
import { useAuthStore } from "@/stores/authStore";
import { logger } from "@/utils/logger";

/**
 * useProfile hook
 * Manages profile state and provides update functionality
 */
export const useProfile = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch user profile when authenticated
   */
  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [isAuthenticated]);

  /**
   * Fetch profile from database
   */
  const fetchProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getProfile();
      setProfile(data);
    } catch (err) {
      setError("Error loading profile");
      logger.error("Error fetching profile", err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update profile in database
   * @param updates - Profile fields to update
   * @returns true if successful, false otherwise
   */
  const handleUpdateProfile = async (
    updates: ProfileUpdate,
  ): Promise<boolean> => {
    setUpdating(true);
    setError(null);

    try {
      const updatedProfile = await updateProfile(updates);

      if (updatedProfile) {
        setProfile(updatedProfile);
        return true;
      } else {
        setError("Failed to update profile");
        return false;
      }
    } catch (err) {
      setError("Error updating profile");
      logger.error("Error updating profile", err);
      return false;
    } finally {
      setUpdating(false);
    }
  };

  return {
    profile,
    loading,
    updating,
    error,
    updateProfile: handleUpdateProfile,
    refetch: fetchProfile,
  };
};
