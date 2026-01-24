import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import './Header.css';
import bgImage from '../assets/bg.jpg';
import logoImage from '../assets/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Bu yerda formani yuborish logikasi bo'ladi
    console.log('Form data:', formData);
    // Modal'ni yopish
    setIsModalOpen(false);
    // Formani tozalash
    setFormData({ fullName: '', phone: '' });
    // Muvaffaqiyatli yuborilgan xabar (keyinroq qo'shish mumkin)
    alert('Arizangiz muvaffaqiyatli yuborildi!');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ fullName: '', phone: '' });
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
  return (
    <header className="header" style={{ backgroundImage: `url(${bgImage})` }}>
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
                      className="form-input"
                      placeholder="+998 (__) ___ __ __"
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="submit-button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Yuborish
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
