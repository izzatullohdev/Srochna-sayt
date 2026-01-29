import { motion } from 'framer-motion';
import { HiFire } from 'react-icons/hi';
import { useModal } from '../context/ModalContext';
import './Price.css';

const Price = () => {
  const { openModal } = useModal();
  const pricePlans = [
    {
      id: 1,
      title: 'Individual English',
      price: '7 200 000',
      currency: 'UZS',
      description: "To'lovni birdaniga yoki bo'lib to'lash orqali amalga oshiring:",
      features: [
        "Qulay bo'lib to'lash: 3 oyga: oyiga 2 400 000 so'mdan, 6 oyga: oyiga 1 200 000 so'mdan",
        "Narxga nimalar kiradi?",
        "Ingliz tili (B1+ daraja)",
        "AI va Soft Skills darslari",
        "Barcha o'quv qo'llanmalar",
        "Mock exams (Sinov imtihonlari)",
        "O'zDJTU qo'shma dasturiga yo'llanma (Sertifikat)"
      ],
      buttonText: "Kursga yozilish"
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
                Oliy ta'limga kafolatlangan investitsiya
              </motion.h2>
              <motion.div 
                className="price-description"
                variants={containerVariants}
              >
                <motion.p 
                  className="price-intro"
                  variants={itemVariants}
                >
                  Biz shunchaki ingliz tilini o'rgatmaymiz, biz abituriyentni talaba bo'lishga tayyorlaymiz. To'lov summasiga nafaqat muvaffaqiyatli o'qish uchun barcha zaruriy narsalar, balki zamonaviy dunyo talablariga to'liq javob beradigan ko'nikmalar ham kiritilgan:
                </motion.p>
                <motion.ul 
                  className="price-features-list"
                  variants={containerVariants}
                >
                  {[
                    "To'liq o'quv kursi: 0 dan B1 darajasigacha bo'lgan intensiv dastur.",
                    "AI savodxonligi: O'qish va ishda sun'iy intellekt (ChatGPT, Google Gemini va h.k.) dan samarali foydalanishni o'rgatamiz.",
                    "21-asr ko'nikmalari: Tanqidiy fikrlash, muammo yechish va liderlik qobiliyatlarini shakllantirish.",
                    "Professional ustozlar: Yuqori darajaga ega va abituriyentlar bilan ishlash tajribasiga ega mutaxassislar.",
                    "O'quv materiallari: Barcha kitoblar, qo'llanmalar va audio-video materiallar bepul beriladi.",
                    "Doimiy nazorat: Ota-onalar uchun o'zlashtirish ko'rsatkichlari bo'yicha hisobotlar.",
                    "Yakuniy imtihon va sertifikat: O'zDJTU hamkor dasturlariga imtiyozli kirish huquqini beruvchi hujjat."
                  ].map((text, index) => {
                    const parts = text.split(':');
                    const label = parts[0];
                    const description = parts.slice(1).join(':');
                    return (
                      <motion.li key={index} variants={itemVariants}>
                        <span className="feature-icon">✓</span>
                        <strong>{label}:</strong>{description}
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
