import { motion } from 'framer-motion';
import { HiFire } from 'react-icons/hi';
import { useModal } from '../context/ModalContext';
import { useTranslation } from '../i18n';
import './Price.css';

const Price = () => {
  const { openModal } = useModal();
  const { t } = useTranslation();
  const pricePlans = [
    {
      id: 1,
      title: t('price.plan.title'),
      price: t('price.plan.price'),
      currency: t('price.plan.currency'),
      description: t('price.plan.description'),
      features: [
        t('price.plan.feature1'),
        t('price.plan.feature2'),
        t('price.plan.feature3'),
        t('price.plan.feature4'),
        t('price.plan.feature5'),
        t('price.plan.feature6'),
        t('price.plan.feature7')
      ],
      buttonText: t('price.plan.button')
    }
  ];

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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }
    }
  };

  return (
    <motion.section 
      id="prices"
      className="price-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="price-container">
        <div className="price-content">
          <motion.div 
            className="price-text"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div 
              className="price-text-wrapper"
              variants={containerVariants}
            >
              <motion.h2 
                className="price-title"
                variants={itemVariants}
              >
                {t('price.title')}
              </motion.h2>
              <motion.div 
                className="price-description"
                variants={containerVariants}
              >
                <motion.p 
                  className="price-intro"
                  variants={itemVariants}
                >
                  {t('price.intro')}
                </motion.p>
                <motion.ul 
                  className="price-features-list"
                  variants={containerVariants}
                >
                  {[
                    t('price.feature1'),
                    t('price.feature2'),
                    t('price.feature3'),
                    t('price.feature4'),
                    t('price.feature5'),
                    t('price.feature6'),
                    t('price.feature7')
                  ].map((text, index) => {
                    const parts = text.split(':');
                    const label = parts[0];
                    const description = parts.slice(1).join(':');
                    return (
                      <motion.li key={index} variants={itemVariants}>
                        <span className="feature-icon">✓</span>
                        <span className="feature-text">
                          <strong>{label}:</strong>{description}
                        </span>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </motion.div>
            </motion.div>
            <motion.div 
              className="price-decorative-shapes"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.div 
                className="shape shape-1"
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: [0.25, 0.1, 0.25, 1] as const
                }}
              />
              <motion.div 
                className="shape shape-2"
                animate={{ 
                  y: [0, 15, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: [0.25, 0.1, 0.25, 1] as const,
                  delay: 0.5
                }}
              />
              <motion.div 
                className="shape shape-3"
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 3, 0]
                }}
                transition={{ 
                  duration: 3.5,
                  repeat: Infinity,
                  ease: [0.25, 0.1, 0.25, 1] as const,
                  delay: 1
                }}
              />
            </motion.div>
          </motion.div>

          <motion.div 
            className="price-cards"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {pricePlans.map((plan) => (
              <motion.div 
                key={plan.id} 
                className="price-card"
                variants={cardVariants}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="price-card-body">
                  <div className="price-amount">
                    <span className="price-value">{plan.price}</span>
                    <span className="price-currency">{plan.currency}</span>
                  </div>
                  <p className="price-card-description">{plan.description}</p>
                  <ul className="price-card-features">
                    {plan.features.map((feature, index) => (
                      <li key={index}>
                        <span className="feature-bullet">
                          <HiFire />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="price-card-footer">
                  <motion.button 
                    className="price-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openModal}
                  >
                    {plan.buttonText}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

    </motion.section>
  );
};

export default Price;
