import { useEffect } from 'react'
import { HiCheck } from 'react-icons/hi'
import { useTranslation } from '../i18n'
import './ThankYou.css'

const ThankYou = () => {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = t('thankYou.metaTitle')
    
  }, [t])

  return (
    <main className="thank-you">
      <div className="thank-you-bg">
        <span className="thank-you-corner thank-you-corner-left" />
        <span className="thank-you-corner thank-you-corner-right" />
        <div className="thank-you-surface">
          <div className="thank-you-icon">
            <HiCheck />
          </div>
          <h1>{t('thankYou.title')}</h1>
          <p>{t('thankYou.subtitle')}</p>
          <p className="thank-you-subtitle">{t('thankYou.telegramPrompt')}</p>

          <div className="thank-you-actions">
            <div className="thank-you-action-card">
              <a
                className="thank-you-button"
                href="https://unicum.uz/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('thankYou.cta')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ThankYou
