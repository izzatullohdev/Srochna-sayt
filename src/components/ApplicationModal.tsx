import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';
import { useModal } from '../context/ModalContext';
import { addContactToBitrix24, parseFullName } from '../utils/bitrix24';
import { formatPhoneNumber, cleanPhoneNumber, validatePhoneNumber } from '../utils/phoneUtils';
import { countries } from '../utils/phoneUtils';
import './Header.css';

const ApplicationModal = () => {
  const { isModalOpen, closeModal } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const selectedCountry = countries[0]; // O'zbekiston - default davlat
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    parentPhone: '',
    region: '',
    englishLevel: '',
    hasCertificate: ''
  });

  // O'zbekiston viloyatlari ro'yxati
  const regions = [
    'Andijon viloyati',
    'Buxoro viloyati',
    'Farg\'ona viloyati',
    'Jizzax viloyati',
    'Qashqadaryo viloyati',
    'Navoiy viloyati',
    'Namangan viloyati',
    'Samarqand viloyati',
    'Sirdaryo viloyati',
    'Surxondaryo viloyati',
    'Toshkent viloyati',
    'Xorazm viloyati',
    'Toshkent shahri',
    'Qoraqalpog\'iston Respublikasi'
  ];

  // Ingliz tili darajalari
  const englishLevels = [
    'Beginner',
    'Elementary',
    'Pre-intermediate',
    'Intermediate'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone' || name === 'parentPhone') {
      // Faqat raqamlarni qoldirish (harflar va maxsus belgilar olib tashlanadi)
      const digits = value.replace(/\D/g, '');
      
      // Formatlash
      const formatted = formatPhoneNumber(digits, selectedCountry);
      
      setFormData(prev => ({
        ...prev,
        [name]: formatted
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // Ism va familiyani ajratish
      const { name, lastName } = parseFullName(formData.fullName);
      
      // Telefon raqamini tozalash va tekshirish
      if (!validatePhoneNumber(formData.phone, selectedCountry)) {
        throw new Error('Iltimos, to\'g\'ri telefon raqamini kiriting');
      }
      
      const cleanPhone = cleanPhoneNumber(formData.phone, selectedCountry);
      const cleanParentPhone = formData.parentPhone ? cleanPhoneNumber(formData.parentPhone, selectedCountry) : '';

      // Telefon raqamlari ro'yxatini yaratish
      const phones = [
        {
          VALUE: cleanPhone,
          VALUE_TYPE: 'WORK'
        }
      ];

      // Agar ota-onaning telefon raqami bo'lsa, qo'shamiz
      if (cleanParentPhone) {
        phones.push({
          VALUE: cleanParentPhone,
          VALUE_TYPE: 'HOME'
        });
      }

      // Bitrix24'ga contact qo'shish - aniq format
      const contactData = {
        NAME: name || formData.fullName,
        LAST_NAME: lastName || '',
        PHONE: phones,
        COMMENTS: `Ota-onaning telefon raqami: ${cleanParentPhone || 'Kiritilmagan'}\nYashash hududi: ${formData.region || 'Kiritilmagan'}\nIngliz tili darajasi: ${formData.englishLevel || 'Kiritilmagan'}\nSertifikat: ${formData.hasCertificate || 'Kiritilmagan'}`,
        SOURCE_ID: 'WEB'
      };

      const response = await addContactToBitrix24(contactData);

      if (response.result) {
        // Muvaffaqiyatli yuborildi
        console.log('✅ Contact Bitrix24\'ga qo\'shildi. ID:', response.result);
        
        // Modal'ni yopish
        closeModal();
        
        // Muvaffaqiyat xabarini ko'rsatish
        setSubmitSuccess(true);
        
        // Formani tozalash
        setFormData({ 
          fullName: '', 
          phone: '', 
          parentPhone: '', 
          region: '', 
          englishLevel: '', 
          hasCertificate: '' 
        });
      } else {
        throw new Error('Javob olinmadi');
      }
    } catch (error) {
      console.error('❌ Bitrix24 xatosi:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.';
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    closeModal();
    setFormData({ 
      fullName: '', 
      phone: '', 
      parentPhone: '', 
      region: '', 
      englishLevel: '', 
      hasCertificate: '' 
    });
    setSubmitError(null);
    setSubmitSuccess(false);
    setIsSubmitting(false);
  };

  // Muvaffaqiyat xabarini 5 soniyadan keyin yopish
  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000); // 5 soniya

      return () => clearTimeout(timer);
    }
  }, [submitSuccess]);

  return (
    <>
      {/* Application Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="application-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <motion.div 
              className="application-modal"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="modal-close-button"
                onClick={handleClose}
                aria-label="Close modal"
              >
                <HiX className="close-icon" />
              </button>
              
              <div className="modal-content">
                <h2 className="modal-title">Ariza topshirish</h2>
                <p className="modal-subtitle">Ma'lumotlaringizni kiriting va biz siz bilan bog'lanamiz</p>
                
                <form onSubmit={handleSubmit} className="application-form">
                  {submitError && (
                    <div className="form-error" style={{
                      padding: '0.75rem',
                      marginBottom: '1rem',
                      backgroundColor: '#fee',
                      border: '1px solid #fcc',
                      borderRadius: '8px',
                      color: '#c33',
                      fontSize: '0.9rem'
                    }}>
                      {submitError}
                    </div>
                  )}

                  <div className="form-group">
                    <label htmlFor="fullName" className="form-label">
                      Ism va familiya
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Ism va familiyangizni kiriting"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      Telefon raqamingiz
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onKeyDown={(e) => {
                        const allowedKeys = [
                          'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 
                          'ArrowUp', 'ArrowDown', 'Tab', 'Escape', 'Enter'
                        ];
                        const isNumber = /[0-9]/.test(e.key);
                        const isAllowedKey = allowedKeys.includes(e.key);
                        
                        if (!isNumber && !isAllowedKey) {
                          e.preventDefault();
                        }
                      }}
                      onPaste={(e) => {
                        e.preventDefault();
                        const pastedText = e.clipboardData.getData('text');
                        const digits = pastedText.replace(/\D/g, '');
                        const formatted = formatPhoneNumber(digits, selectedCountry);
                        setFormData(prev => ({
                          ...prev,
                          phone: formatted
                        }));
                      }}
                      className="form-input"
                      placeholder={selectedCountry.placeholder}
                      required
                      disabled={isSubmitting}
                      inputMode="numeric"
                      maxLength={20}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="parentPhone" className="form-label">
                      Ota-onangizni telefon raqami
                    </label>
                    <input
                      type="tel"
                      id="parentPhone"
                      name="parentPhone"
                      value={formData.parentPhone}
                      onChange={handleInputChange}
                      onKeyDown={(e) => {
                        const allowedKeys = [
                          'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 
                          'ArrowUp', 'ArrowDown', 'Tab', 'Escape', 'Enter'
                        ];
                        const isNumber = /[0-9]/.test(e.key);
                        const isAllowedKey = allowedKeys.includes(e.key);
                        
                        if (!isNumber && !isAllowedKey) {
                          e.preventDefault();
                        }
                      }}
                      onPaste={(e) => {
                        e.preventDefault();
                        const pastedText = e.clipboardData.getData('text');
                        const digits = pastedText.replace(/\D/g, '');
                        const formatted = formatPhoneNumber(digits, selectedCountry);
                        setFormData(prev => ({
                          ...prev,
                          parentPhone: formatted
                        }));
                      }}
                      className="form-input"
                      placeholder={selectedCountry.placeholder}
                      disabled={isSubmitting}
                      inputMode="numeric"
                      maxLength={20}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="region" className="form-label">
                      Yashash hududingiz
                    </label>
                    <select
                      id="region"
                      name="region"
                      value={formData.region}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                      disabled={isSubmitting}
                    >
                      <option value="">Viloyatni tanlang</option>
                      {regions.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="englishLevel" className="form-label">
                      Ingliz tilini bilish darajangiz
                    </label>
                    <select
                      id="englishLevel"
                      name="englishLevel"
                      value={formData.englishLevel}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                      disabled={isSubmitting}
                    >
                      <option value="">Darajani tanlang</option>
                      {englishLevels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Chet tili sertifikatingiz bormi?
                    </label>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="hasCertificate"
                          value="Bor"
                          checked={formData.hasCertificate === 'Bor'}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                          style={{ cursor: 'pointer' }}
                        />
                        <span>Bor</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="hasCertificate"
                          value="Yo'q"
                          checked={formData.hasCertificate === 'Yo\'q'}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                          style={{ cursor: 'pointer' }}
                        />
                        <span>Yo'q</span>
                      </label>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    className="submit-button"
                    disabled={isSubmitting}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    style={{
                      opacity: isSubmitting ? 0.7 : 1,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {isSubmitting ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{
                          width: '16px',
                          height: '16px',
                          border: '2px solid rgba(255,255,255,0.3)',
                          borderTop: '2px solid white',
                          borderRadius: '50%',
                          animation: 'spin 0.6s linear infinite',
                          display: 'inline-block'
                        }}></span>
                        Yuborilmoqda...
                      </span>
                    ) : (
                      'Yuborish'
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification - Muvaffaqiyat xabari */}
      <AnimatePresence>
        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              zIndex: 10000,
              padding: '1rem 1.5rem',
              backgroundColor: '#d4edda',
              border: '1px solid #c3e6cb',
              borderRadius: '12px',
              color: '#155724',
              fontSize: '0.95rem',
              fontWeight: 500,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
              maxWidth: '400px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>✅</span>
            <span>Arizangiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ApplicationModal;
