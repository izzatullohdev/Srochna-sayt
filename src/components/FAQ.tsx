import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPlus, HiMinus } from 'react-icons/hi';
import { useTranslation } from '../i18n';
import './FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useTranslation();

  const faqItems = [
    {
      id: 1,
      question: t('faq.q1'),
      answer: t('faq.a1')
    },
    {
      id: 2,
      question: t('faq.q2'),
      answer: t('faq.a2')
    },
    {
      id: 3,
      question: t('faq.q3'),
      answer: t('faq.a3')
    },
    {
      id: 4,
      question: t('faq.q4'),
      answer: t('faq.a4')
    },
    {
      id: 5,
      question: t('faq.q5'),
      answer: t('faq.a5')
    },
    {
      id: 6,
      question: t('faq.q6'),
      answer: t('faq.a6')
    },
    {
      id: 7,
      question: t('faq.q7'),
      answer: t('faq.a7')
    },
    {
      id: 8,
      question: t('faq.q8'),
      answer: t('faq.a8')
    },
    {
      id: 9,
      question: t('faq.q9'),
      answer: t('faq.a9')
    }
  ];

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  const answerVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      marginTop: 0,
      marginBottom: 0
    },
    visible: {
      opacity: 1,
      height: "auto",
      marginTop: "0.5rem",
      marginBottom: "1.5rem",
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      marginTop: 0,
      marginBottom: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    }
  };

  const iconVariants = {
    closed: {
      rotate: 0,
      scale: 1
    },
    open: {
      rotate: 180,
      scale: 1.1
    }
  };

  return (
    <motion.section 
      id="faq"
      className="faq-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="faq-container">
        <motion.h2 
          className="faq-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t('faq.title')}
        </motion.h2>
        <motion.div 
          className="faq-items"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {faqItems.map((item, index) => (
            <motion.div 
              key={item.id} 
              className={`faq-item ${openIndex === index ? 'open' : ''}`}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                className="faq-question"
                onClick={() => toggleItem(index)}
                whileTap={{ scale: 0.98 }}
              >
                <span className="faq-question-text">{item.question}</span>
                <motion.span 
                  className="faq-icon"
                  variants={iconVariants}
                  animate={openIndex === index ? "open" : "closed"}
                  transition={{ duration: 0.3 }}
                >
                  {openIndex === index ? <HiMinus /> : <HiPlus />}
                </motion.span>
              </motion.div>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div 
                    className="faq-answer"
                    variants={answerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <p>{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FAQ;
