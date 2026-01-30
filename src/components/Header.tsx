import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { AdvancedVideo } from '@cloudinary/react';
import { cld } from '../config/cloudinary';
import { useTranslation } from '../i18n';
import LanguageSwitcher from './LanguageSwitcher';
import './Header.css';
import logoImage from '../assets/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



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
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }}
      >
        <motion.div 
          className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}
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
              <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')}>{t('header.nav.about')}</a>
            </li>
            <li className="nav-item">
              <a href="#certificate" onClick={(e) => handleSmoothScroll(e, 'certificate')}>{t('header.nav.certificate')}</a>
            </li>
            <li className="nav-item">
              <a href="#reviews" onClick={(e) => handleSmoothScroll(e, 'reviews')}>{t('header.nav.reviews')}</a>
            </li>
            <li className="nav-item">
              <a href="#prices" onClick={(e) => handleSmoothScroll(e, 'prices')}>{t('header.nav.prices')}</a>
            </li>
            <li className="nav-item">
              <a href="#faq" onClick={(e) => handleSmoothScroll(e, 'faq')}>{t('header.nav.faq')}</a>
            </li>
          </ul>

          <div className="navbar-right">
            <LanguageSwitcher />
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
            {t('header.hero.title')}
          </motion.h1>
          <motion.p 
            className="hero-description"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            {t('header.hero.description')}
          </motion.p>
          <motion.a
            href="https://b24-zouffe.bitrix24.site/crm_form_pfddk"
            className="cta-button"
            initial={{ y: 30, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('common.apply')}
          </motion.a>
        </motion.div>
      </motion.div>

    </header>
  );
};

export default Header;
