import { motion } from 'framer-motion';
import './Price.css';

const Price = () => {
  const pricePlans = [
    {
      id: 1,
      title: 'Individual English',
      price: '3 450 000',
      currency: 'UZS',
      description: "Aynan siz uchun individual va maxsus dastur tuziladi",
      features: [
        '12 ta dars',
        "Ustoz bilan 1 ga 1 mashg'ulotlar",
        "Student's Book va Grammar book",
        "Universitetlar imtihonidan ozod qiluvchi sertifikat",
        "Sunday Events va Speaking mashgulotlari"
      ],
      buttonText: "Individual o'qish"
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
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
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
                YANGI DARAJADAGI MASOFAVIY TA'LIM!
              </motion.h2>
              <motion.div 
                className="price-description"
                variants={containerVariants}
              >
                <motion.p 
                  className="price-intro"
                  variants={itemVariants}
                >
                  Siz uchun yangi imkoniyat! Endilikda ingliz tilini o'rganishga masofa, vaqt, sharoit yoki pul muammo emas!
                </motion.p>
                <motion.ul 
                  className="price-features-list"
                  variants={containerVariants}
                >
                  {[
                    "Birgina smartfon yoki kompyuter bilan istalgan joydan ingliz tilini o'rganing",
                    "Ustozlarimiz CELTA va IELTS 9.0 sertifikatiga ega malakali mutaxassislar",
                    "Student App orqali qulay va to'liq nazoratdagi darslar",
                    "Online ta'lim formati offlayn ta'lim sifati darajasida",
                    "Qat'iy nazorat va barqaror qo'llab-quvvatlash"
                  ].map((text, index) => (
                    <motion.li key={index} variants={itemVariants}>
                      <span className="feature-icon">✓</span>
                      {text}
                    </motion.li>
                  ))}
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
                  ease: "easeInOut"
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
                  ease: "easeInOut",
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
                  ease: "easeInOut",
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
                <div className="price-card-header">
                  <h3 className="price-card-title">{plan.title}</h3>
                </div>
                <div className="price-card-body">
                  <div className="price-amount">
                    <span className="price-value">{plan.price}</span>
                    <span className="price-currency">{plan.currency}</span>
                  </div>
                  <p className="price-card-description">{plan.description}</p>
                  <ul className="price-card-features">
                    {plan.features.map((feature, index) => (
                      <li key={index}>
                        <span className="feature-bullet">⚡</span>
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
