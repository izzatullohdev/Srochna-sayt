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
          So'zda emas, hujjatda: O'zDJTU rektorining rasmiy kafolati
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
            <motion.p 
              className="certificate-text-title"
              variants={itemVariants}
            >
              Biz va'da bermaymiz, biz kafolatlaymiz. Yon tomonda ko'rib turganingiz — O'zbekiston davlat jahon tillari universiteti rektori I. To'xtasinov tomonidan imzolangan rasmiy kafolat xatidir.
            </motion.p>
            <motion.p 
              className="certificate-intro"
              variants={itemVariants}
            >
              Ushbu hujjatga ko'ra:
            </motion.p>
            <motion.ul 
              className="certificate-features"
              variants={containerVariants}
            >
              {[
                "Unicum Foundation tinglovchilari universitetning hamkorlik dasturiga kiritilgan.",
                "CEFR B1 darajasidagi ingliz tili sertifikatiga hamda 21-asr ko'nikmalari bo'yicha maxsus bilimga ega bo'lgan bitiruvchilarimiz O'zDJTUga to'g'ridan-to'g'ri talabalikka qabul qilinadilar.",
                "Ushbu dastur doirasida 400 nafar o'rin ajratilgan.",
                "Bu shunchaki kurs emas, bu sizning Xitoy, Rossiya, Belarus va boshqa davlatlardagi nufuzli oliygohlar bilan hamkorlikdagi dasturga kirishingiz uchun qonuniy asosdir."
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
              Eslatma: Talabalikka qabul qilish O'zDJTU tomonidan belgilangan tartibda amalga oshiriladi. Ta'lim jarayoni, kontrakt narxlari va o'qish muddati bilan bog'liq barcha savollar yuzasidan bevosita O'zDJTU qabul komissiyasiga murojaat qilishingizni so'raymiz.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Certificate;
