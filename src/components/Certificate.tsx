import { motion } from 'framer-motion';
import './Certificate.css';

const Certificate = () => {
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
          O'zbekiston davlat jahon tillari universitetining kafolat xati
        </motion.h2>
        
        <div className="certificate-content">
          <motion.div 
            className="certificate-image-wrapper"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="certificate-frame">
              <motion.img 
                src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&h=1000&fit=crop" 
                alt="IELTS Certificate" 
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
            <motion.h3 
              className="certificate-text-title"
              variants={itemVariants}
            >
              Siz uchun yangi imkoniyat! Endilikda ingliz tilini o'rganishga masofa, vaqt, sharoit yoki pul muammo emas!
            </motion.h3>
            <motion.ul 
              className="certificate-features"
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
            <motion.p 
              className="certificate-conclusion"
              variants={itemVariants}
            >
              Endi ingliz tilini o'rganish imkoniyati hamma uchun ochiq! Bu - erkinlik, zamonaviy ta'lim va INTER NATION sifati!
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Certificate;
