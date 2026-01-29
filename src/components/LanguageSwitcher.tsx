import { motion } from 'framer-motion';
import { useTranslation } from '../i18n';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === 'uz' ? 'ru' : 'uz');
  };

  return (
    <motion.button
      className="language-switcher"
      onClick={toggleLanguage}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${language === 'uz' ? 'Russian' : 'Uzbek'}`}
      title={`Switch to ${language === 'uz' ? 'Russian' : 'Uzbek'}`}
    >
      <span className="language-flag">
        {language === 'uz' ? '🇺🇿' : '🇷🇺'}
      </span>
    </motion.button>
  );
};

export default LanguageSwitcher;
