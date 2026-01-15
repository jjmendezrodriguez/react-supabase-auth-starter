// Info page component
// Information and about page

import { useTranslation } from 'react-i18next'

export default function Info() {
  const { t } = useTranslation()

  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-2xl font-bold">{t('info.underConstruction')}</h1>
    </div>
  )
}
