import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';
import { useTranslation } from '../i18n';
import './Certificate.css';
import pdfImage from '../assets/pdf.png';
import unicumPdf from '../assets/Unicum.pdf';

const Certificate = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }
    }
  };

  return (
    <motion.section 
      id="certificate"
      className="certificate-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="certificate-container">
        <motion.h2 
          className="certificate-main-title"
          variants={itemVariants}
        >
          <span style={{ color: '#ff8c00' }}>{t('certificate.title')}</span><br />
          {t('certificate.subtitle')}
        </motion.h2>
        
        <div className="certificate-content">
          <motion.div 
            className="certificate-image-wrapper"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div 
              className="certificate-frame"
              onClick={openModal}
              style={{ cursor: 'pointer' }}
            >
              <motion.img
                src={pdfImage}
                alt="Unicum Foundation Certificate"
                className="certificate-image"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
            </div>
          </motion.div>

          <motion.div 
            className="certificate-text"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.p 
              className="certificate-text-title"
              variants={itemVariants}
            >
              {t('certificate.intro')}
            </motion.p>
            <motion.p 
              className="certificate-intro"
              variants={itemVariants}
            >
              {t('certificate.documentTitle')}
            </motion.p>
            <motion.ul 
              className="certificate-features"
              variants={containerVariants}
            >
              {[
                t('certificate.feature1'),
                t('certificate.feature2'),
                t('certificate.feature3'),
                t('certificate.feature4')
              ].map((text, index) => (
                <motion.li key={index} variants={itemVariants}>
                  <span className="feature-icon">✓</span>
                  {text}
                </motion.li>
              ))}
            </motion.ul>
            <motion.p 
              className="certificate-conclusion"
              variants={itemVariants}
              style={{ fontStyle: 'italic' }}
            >
              {t('certificate.note')}
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* PDF Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="certificate-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div 
              className="certificate-modal"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="certificate-modal-close-button"
                onClick={closeModal}
                aria-label="Close modal"
              >
                <HiX className="close-icon" />
              </button>
              
              <iframe
                src={unicumPdf}
                className="certificate-pdf-viewer"
                title="Unicum Foundation Certificate PDF"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Certificate;
