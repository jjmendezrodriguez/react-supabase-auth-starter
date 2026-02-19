// LanguageSwitcherDashboard component
// Dropdown language selector with globe icon and "Idioma" label for Dashboard

import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * LanguageSwitcherDashboard component
 * Provides a dropdown menu with globe icon and label to switch between ES and EN languages
 * Dropdown appears on the left side, optimized for Dashboard/Settings view
 * Language preference is persisted in localStorage
 */
export default function LanguageSwitcherDashboard() {
  const { i18n, t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const languages = [
    { code: 'es', label: 'Español', flag: '🇵🇷' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
  ]

  /**
   * Change language and persist in localStorage
   */
  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode)
    localStorage.setItem('preferred-language', languageCode)
    setIsOpen(false)
  }

  /**
   * Close dropdown when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Globe icon button with label */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="font-medium">{t('languageSwitcher.label')}</span>
        <svg
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown menu - aligned to left */}
      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-1 w-40 rounded-lg border border-gray-200 bg-white shadow-lg">
          {/* Language options */}
          {languages.map((lang, idx) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-gray-50 ${
                lang.code === i18n.language
                  ? 'bg-blue-50 font-medium text-blue-600'
                  : 'text-gray-700'
              } ${idx === 0 ? 'rounded-t-lg' : ''} ${idx === languages.length - 1 ? 'rounded-b-lg' : ''}`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.label}</span>
              {lang.code === i18n.language && (
                <svg
                  className="ml-auto h-4 w-4 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
