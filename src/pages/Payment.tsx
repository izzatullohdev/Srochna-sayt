import { useEffect, useRef, useState } from 'react'
import { useTranslation } from '../i18n'
import { cleanPhoneNumber, countries, formatPhoneNumber } from '../utils/phoneUtils'
import paymeLogo from '../assets/payme.png'
import './Payment.css'

const Payment = () => {
  const { language, setLanguage, t } = useTranslation()
  const paymeFormRef = useRef<HTMLFormElement | null>(null)
  const contractInputRef = useRef<HTMLInputElement | null>(null)
  const [paymeFullName, setPaymeFullName] = useState('')
  const [paymePini, setPaymePini] = useState('')
  const [paymeContract, setPaymeContract] = useState('')
  const [paymePhone, setPaymePhone] = useState('')
  const [paymeAmount, setPaymeAmount] = useState('')
  const [isAmountOpen, setIsAmountOpen] = useState(false)
  const uzbekistan = countries.find((country) => country.code === 'UZ') ?? countries[0]

  useEffect(() => {
    document.title = t('payme.pageTitle')
  }, [t])

  const amountOptions = [
    { value: '150000', label: `To'lov summasi: 150 000 - 10%` },
    { value: '1500000', label: `1 500 000 - 1 oylik` },
    { value: '7200000', label: `7 200 000 - 6 oylik` }
  ]

  const selectedAmountLabel =
    amountOptions.find((option) => option.value === paymeAmount)?.label ?? t('payme.amountPlaceholder')

  const formatUzbekPhone = (value: string) => {
    let digits = value.replace(/\D/g, '')
    if (digits.startsWith('998')) {
      digits = digits.slice(3)
    }
    return formatPhoneNumber(digits.slice(0, 9), uzbekistan)
  }

  const isUzbekPhoneComplete = (value: string) => {
    let digits = value.replace(/\D/g, '')
    if (digits.startsWith('998')) {
      digits = digits.slice(3)
    }
    return digits.length === 9
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (
      !paymeFullName.trim() ||
      !paymePini.trim() ||
      !paymeContract.trim() ||
      !isUzbekPhoneComplete(paymePhone) ||
      !paymeAmount.trim()
    ) {
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
          <input
            type="hidden"
            name="amount"
            value={paymeAmount ? String(Number(paymeAmount) * 100) : ''}
          />
          <input type="hidden" name="account[name]" value={paymeFullName} />
          <input type="hidden" name="account[pini]" value={paymePini} />
          <input type="hidden" name="account[contract]" value={paymeContract} />
          <input type="hidden" name="account[phone_number]" value={cleanPhoneNumber(paymePhone, uzbekistan).replace(/\D/g, '')} />

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
            onChange={(event) => {
              const onlyDigits = event.target.value.replace(/\D/g, '').slice(0, 14)
              setPaymePini(onlyDigits)

              if (onlyDigits.length === 14) {
                contractInputRef.current?.focus()
              }
            }}
            inputMode="numeric"
            maxLength={14}
          />
          <input
            type="text"
            placeholder={t('payme.contractPlaceholder')}
            value={paymeContract}
            onChange={(event) => setPaymeContract(event.target.value)}
            ref={contractInputRef}
          />
          <input
            type="text"
            placeholder={t('payme.phonePlaceholder')}
            value={paymePhone}
            onFocus={() => {
              if (!paymePhone) {
                setPaymePhone(uzbekistan.phoneCode)
              }
            }}
            onChange={(event) => setPaymePhone(formatUzbekPhone(event.target.value))}
            inputMode="numeric"
            maxLength={19}
          />
          <div className="payme-select">
            <button
              type="button"
              className="payme-select-trigger"
              onClick={() => setIsAmountOpen((open) => !open)}
              aria-expanded={isAmountOpen}
            >
              <span className="payme-select-label">{selectedAmountLabel}</span>
              <span className="payme-select-icon" aria-hidden="true">▾</span>
            </button>
            <div className={`payme-select-menu${isAmountOpen ? ' is-open' : ''}`}>
              {amountOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setPaymeAmount(option.value)
                    setIsAmountOpen(false)
                  }}
                >
                  {option.label}
                </button>
              ))}
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
