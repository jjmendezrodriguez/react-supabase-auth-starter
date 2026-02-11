// SettingsTab component
// Settings section with language and theme preferences

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcherDashboard from '@/components/LanguageSwitcherDashboard'
import AlertModal from '@/components/AlertModal'
import { useUIStore } from '@/stores/uiStore'
import type { ThemeType } from '@/stores/uiStore'

export default function SettingsTab() {
  const { t } = useTranslation()
  const theme = useUIStore((s) => s.theme)
  const setTheme = useUIStore((s) => s.setTheme)
  const [showSuccess, setShowSuccess] = useState(false)

  /**
   * Handle save settings
   * In future, save to user preferences in database
   */
  const handleSaveSettings = () => {
    // For now, just show success
    // TODO: Save to database when user preferences table is created
    setShowSuccess(true)
  }

  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            {t('dashboard.settings.title')}
          </h3>
          <p className="text-sm text-gray-600">
            {t('dashboard.settings.subtitle')}
          </p>
        </div>

        {/* Language Setting */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {t('dashboard.settings.language')}
          </label>
          <LanguageSwitcherDashboard />
        </div>

        {/* Theme Setting (prepared for future dark mode) */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {t('dashboard.settings.theme')}
          </label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as ThemeType)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          >
            <option value="light">{t('dashboard.settings.light')}</option>
            <option value="dark">
              {t('dashboard.settings.dark')} (Coming soon)
            </option>
          </select>
        </div>

        {/* Save Button */}
        <div>
          <button
            onClick={handleSaveSettings}
            className="btn btn-primary w-full"
          >
            {t('dashboard.settings.saveSettings')}
          </button>
        </div>
      </div>

      {/* Success Alert */}
      <AlertModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title={t('dashboard.settings.settingsSaved')}
        message=""
        shadowColor="shadow-green-500"
        extraButton={
          <button
            onClick={() => setShowSuccess(false)}
            className="btn font-bold"
          >
            Close
          </button>
        }
      />
    </>
  )
}
