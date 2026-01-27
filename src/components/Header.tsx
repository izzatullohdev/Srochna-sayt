import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { AdvancedVideo } from '@cloudinary/react';
import { cld } from '../config/cloudinary';
import { addLeadToBitrix24, parseFullName } from '../utils/bitrix24';
import { formatPhoneNumber, cleanPhoneNumber, validatePhoneNumber } from '../utils/phoneUtils';
import { countries } from '../utils/phoneUtils';
import './Header.css';
import logoImage from '../assets/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const selectedCountry = countries[0]; // O'zbekiston - default davlat
  const [formData, setFormData] = useState({
    fullName: '',
    phone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
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
      const { name } = parseFullName(formData.fullName);
      
      // Telefon raqamini tozalash va tekshirish
      if (!validatePhoneNumber(formData.phone, selectedCountry)) {
        throw new Error('Iltimos, to\'g\'ri telefon raqamini kiriting');
      }
      
      const cleanPhone = cleanPhoneNumber(formData.phone, selectedCountry);

      // Bitrix24'ga lead qo'shish - aniq format
      const leadData = {
        TITLE: formData.fullName || 'Yangi ariza',
        NAME: name || formData.fullName,
        PHONE: [
          {
            VALUE: cleanPhone,
            VALUE_TYPE: 'WORK'
          }
        ]
      };

      const response = await addLeadToBitrix24(leadData);

      if (response.result) {
        // Muvaffaqiyatli yuborildi
        console.log('✅ Lead Bitrix24\'ga qo\'shildi. ID:', response.result);
        
        // Modal'ni ochiq qoldirish va muvaffaqiyat xabarini ko'rsatish
        setSubmitSuccess(true);
        
        // Formani tozalash
        setFormData({ fullName: '', phone: '' });
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

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ fullName: '', phone: '' });
    setSubmitError(null);
    setSubmitSuccess(false);
    setIsSubmitting(false);
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 100; // Navbar balandligi uchun offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false); // Menu'ni yopish
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Cloudinary video yaratish
  // 'sample' o'rniga Cloudinary'dagi video public ID ni kiriting
  // Masalan: 'videos/hero-background' yoki 'background-video'
  const backgroundVideo = cld.video('gf_zgqpgq');

  return (
    <header className="header">
      {/* Background Video */}
      <div className="header-video-wrapper">
        <AdvancedVideo
          cldVid={backgroundVideo}
          autoPlay
          loop
          muted
          playsInline
          className="header-background-video"
        />
      </div>
      <motion.nav 
        className="navbar"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }}
      >
        <motion.div 
          className="navbar-container"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="navbar-brand">
            <img 
              src={logoImage} 
              alt="Inter Nation Logo" 
              className="navbar-logo"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>

          <button 
            className="hamburger-menu"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <HiX className="hamburger-icon" />
            ) : (
              <HiMenu className="hamburger-icon" />
            )}
          </button>

          <ul className={`navbar-menu ${isMenuOpen ? 'menu-open' : ''}`}>
            <li className="nav-item">
              <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')}>Biz haqimizda</a>
            </li>
            <li className="nav-item">
              <a href="#certificate" onClick={(e) => handleSmoothScroll(e, 'certificate')}>Kafolat</a>
            </li>
            <li className="nav-item">
              <a href="#reviews" onClick={(e) => handleSmoothScroll(e, 'reviews')}>Talabalar fikri</a>
            </li>
            <li className="nav-item">
              <a href="#prices" onClick={(e) => handleSmoothScroll(e, 'prices')}>Narx</a>
            </li>
            <li className="nav-item">
              <a href="#faq" onClick={(e) => handleSmoothScroll(e, 'faq')}>FAQ</a>
            </li>
          </ul>

          <div className="navbar-right">
            <a href="tel:+998781138838" className="phone-contact">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122L9.65 12.2a.678.678 0 0 1-.64-.19l-2.743-2.743a.678.678 0 0 1-.19-.64l.5-2.307a.678.678 0 0 0-.122-.58L3.654 1.328z" fill="currentColor"/>
              </svg>
              <span>+998 (78) 113 88 38</span>
            </a>
          </div>
        </motion.div>
      </motion.nav>

      <motion.div 
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.div 
          className="hero-content"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.h1 
            className="hero-title"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            UNICUM FOUNDATION
          </motion.h1>
          <motion.p 
            className="hero-description"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            Oʻzbekiston davlat jahon tillari universitetining qo'shma ta'lim dasturlariga imtiyozli asosda imtihonsiz qabul qilinadigan 400 ta talabadan biri bo'lish imkoniyatini qo'lga kiriting!
          </motion.p>
          <motion.button 
            className="cta-button"
            initial={{ y: 30, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
          >
            Ariza topshirish
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Application Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="application-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
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
                onClick={closeModal}
                aria-label="Close modal"
              >
                <HiX className="close-icon" />
              </button>
              
              <div className="modal-content">
                <h2 className="modal-title">Ariza topshirish</h2>
                <p className="modal-subtitle">Ma'lumotlaringizni kiriting va biz siz bilan bog'lanamiz</p>
                
                <form onSubmit={handleSubmit} className="application-form">
                  {submitSuccess && (
                    <div className="form-success" style={{
                      padding: '1rem',
                      marginBottom: '1rem',
                      backgroundColor: '#d4edda',
                      border: '1px solid #c3e6cb',
                      borderRadius: '8px',
                      color: '#155724',
                      fontSize: '0.9rem',
                      textAlign: 'center'
                    }}>
                      ✅ Arizangiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz.
                    </div>
                  )}
                  
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
                      Telefon raqami
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onKeyDown={(e) => {
                        // Faqat raqamlar, Backspace, Delete, Arrow keys, Tab, Escape qabul qilish
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
    </header>
  );
};

export default Header;
