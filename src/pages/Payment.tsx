import { useEffect, useRef, useState } from 'react'
import { useTranslation } from '../i18n'
import paymeLogo from '../assets/payme.png'
import './Payment.css'

const Payment = () => {
  const { language, setLanguage, t } = useTranslation()
  const paymeFormRef = useRef<HTMLFormElement | null>(null)
  const [paymeFullName, setPaymeFullName] = useState('')
  const [paymePini, setPaymePini] = useState('')
  const [paymeContract, setPaymeContract] = useState('')
  const [paymeAmount, setPaymeAmount] = useState('')
  const [isAmountOpen, setIsAmountOpen] = useState(false)

  useEffect(() => {
    document.title = t('payme.pageTitle')
  }, [t])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!paymeFullName.trim() || !paymePini.trim() || !paymeContract.trim() || !paymeAmount.trim()) {
      return
    }

    paymeFormRef.current?.submit()
  }

  return (
    <main className="payme-page">
      <div className="payme-modal">
        <img className="payme-modal-logo" src={paymeLogo} alt="Payme" />
        <form
          method="POST"
          action="https://checkout.paycom.uz"
          ref={paymeFormRef}
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="merchant" value="6981d980a15c110cdb64dd86" />
          <input type="hidden" name="amount" value={paymeAmount} />
          <input type="hidden" name="account[name]" value={paymeFullName} />
          <input type="hidden" name="account[pini]" value={paymePini} />
          <input type="hidden" name="account[contract]" value={paymeContract} />

          <input
            type="text"
            placeholder={t('payme.fullNamePlaceholder')}
            value={paymeFullName}
            onChange={(event) => setPaymeFullName(event.target.value)}
          />
          <input
            type="text"
            placeholder={t('payme.pinflPlaceholder')}
            value={paymePini}
            onChange={(event) => setPaymePini(event.target.value)}
          />
          <input
            type="text"
            placeholder={t('payme.contractPlaceholder')}
            value={paymeContract}
            onChange={(event) => setPaymeContract(event.target.value)}
          />
          <div className="payme-select">
            <button
              type="button"
              className="payme-select-trigger"
              onClick={() => setIsAmountOpen((open) => !open)}
              aria-expanded={isAmountOpen}
            >
              <span className="payme-select-label">
                {paymeAmount
                  ? paymeAmount === '150000'
                    ? `To'lov summasi: 150 000 - 10%`
                    : paymeAmount === '1500000'
                      ? `1 500 000 - 1 oylik`
                      : `7 200 000 - 6 oylik`
                  : t('payme.amountPlaceholder')}
              </span>
              <span className="payme-select-icon" aria-hidden="true">▾</span>
            </button>
            <div className={`payme-select-menu${isAmountOpen ? ' is-open' : ''}`}>
              <button
                type="button"
                onClick={() => {
                  setPaymeAmount('150000')
                  setIsAmountOpen(false)
                }}
              >
                {`To'lov summasi: 150 000 - 10%`}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPaymeAmount('1500000')
                  setIsAmountOpen(false)
                }}
              >
                {`1 500 000 - 1 oylik`}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPaymeAmount('7200000')
                  setIsAmountOpen(false)
                }}
              >
                {`7 200 000 - 6 oylik`}
              </button>
            </div>
          </div>

          <div className="payme-modal-actions">
            <button
              type="button"
              className="payme-language"
              onClick={() => setLanguage(language === 'uz' ? 'ru' : 'uz')}
            >
              {language === 'uz' ? 'RU' : 'UZ'}
            </button>
            <button type="submit" className="payme-confirm">
              {t('payme.confirm')}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Payment
