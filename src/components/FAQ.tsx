import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPlus, HiMinus } from 'react-icons/hi';
import './FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = [
    {
      id: 1,
      question: "Siz beradigan sertifikat bilan qaysi universitetlarga imtihonsiz kirish mumkin?",
      answer: "Ushbu sertifikat bilan O'zDJTUning Xitoy Xalq Respublikasi, Rossiya Federatsiyasi hamda Belarus Respublikasi oliy ta'lim muassasalari bilan tashkil etgan qo'shma ta'lim dasturlariga imtiyozli asosda kirishingiz mumkin."
    },
    {
      id: 2,
      question: "O'qishga kirishga 100% kafolat berasizlarmi?",
      answer: "Kafolat shundan iboratki, CEFR B1 darajasidagi ingliz tili sertifikatiga ega bo'lgan 400 nafar o'quvchilarimiz to'g'ridan-to'g'ri talabalikka qabul qilinadi."
    },
    {
      id: 3,
      question: "Ingliz tilini umuman bilmayman. Dasturda qatnasha olamanmi?",
      answer: "Yo'q, dastur ingliz tili bo'yicha boshlang'ich va asosiy bilimlarga ega bo'lgan o'quvchilarga mo'ljallangan."
    },
    {
      id: 4,
      question: "Darslar onlayn bo'ladimi yoki oflayn?",
      answer: "Ta'lim to'liq masofaviy (onlayn) shaklda bo'lib, siz smartfon yoki kompyuter orqali o'zingizga qulay joyda o'qishingiz mumkin."
    },
    {
      id: 5,
      question: "Kurs narxini bo'lib to'lasam bo'ladimi?",
      answer: "Ha, to'lovni to'liq (100%) amalga oshirish yoki summani 3 ga va 6 ga bo'lib to'lash imkoniyatlari mavjud."
    },
    {
      id: 6,
      question: "Darslardan tashqari AI (Sun'iy intellekt)ni o'rganish majburiymi?",
      answer: "Bu majburiyat emas, balki imkoniyatdir. Dastur davomida sizga o'qish va kelajakdagi ish jarayonlarida kerak bo'ladigan Sun'iy intellekt vositalari bilan ishlash ko'nikmalari o'rgatiladi."
    },
    {
      id: 7,
      question: "Agar kurs oxirida B1 darajasini ololmasam, nima bo'ladi?",
      answer: "Kurs oxirida CEFR B1 sertifikatini olomasangiz, to'lagan pulingiz sizga 100% miqdorda qaytariladi."
    },
    {
      id: 8,
      question: "Darslarni kimlar o'tadi? O'qituvchilarning malakasi qanaqa?",
      answer: "Darslarni xalqaro toifadagi sertifikatlarga ega bo'lgan yuqori malakali mutaxassislar olib boradilar."
    },
    {
      id: 9,
      question: "Bu dastur O'zDJTUning o'ziga kirishga yordam beradimi yoki faqat qo'shma dasturlargami?",
      answer: "Ushbu dastur va imtiyozlar faqat O'zDJTUning xorijiy hamkorlar bilan tashkil etgan Qo'shma ta'lim dasturlariga qabul jarayoni uchun amal qiladi."
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
          FAQ
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
