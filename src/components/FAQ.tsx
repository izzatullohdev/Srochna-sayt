import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = [
    {
      id: 1,
      question: "Individual darslar va guruhli darslar qaysi vaqtlarda bo'ladi?",
      answer: "Individual darslar va guruhli darslar hafta davomida turli vaqtlarda tashkil etiladi. Individual darslar sizning qulay vaqtingizga moslashtiriladi, guruhli darslar esa haftada 3 marta, 2 soatdan o'tkaziladi. Batafsil ma'lumot uchun biz bilan bog'laning."
    },
    {
      id: 2,
      question: "Qaysi filialda eng yaxshi ustoz bor?",
      answer: "INTER NATION SCHOOL'ning barcha filiallarida CELTA va IELTS 9.0 sertifikatiga ega malakali o'qituvchilar ishlaydi. Har bir filialda yuqori malakali mutaxassislar mavjud. Sizga eng qulay filialni tanlash imkoniyatini beramiz."
    },
    {
      id: 3,
      question: "Yoshga oid chegaralar mavjudmi?",
      answer: "Ha, bizning kurslarimiz turli yosh guruhlari uchun mo'ljallangan. 7 yoshdan boshlab bolalar, o'smirlar va kattalar uchun alohida dasturlar mavjud. Har bir yosh guruhi uchun maxsus o'quv materiallari va metodikalar ishlatiladi."
    },
    {
      id: 4,
      question: "O'zim xohlagan darajada o'qishni boshlashim uchun nima qilishim kerak?",
      answer: "O'zingiz xohlagan darajada o'qishni boshlash uchun avval bepul daraja aniqlash testidan o'tishingiz kerak. Test natijasiga ko'ra sizga mos daraja va dastur tavsiya etiladi. Testdan o'tish uchun biz bilan bog'laning yoki onlayn ariza qoldiring."
    },
    {
      id: 5,
      question: "INTER NATION SCHOOL'da o'qishni boshlasam, kitob va daftar sotib olishim kerakmi?",
      answer: "Yo'q, sizga qo'shimcha kitob va daftar sotib olish shart emas. Bizning barcha o'quv materiallari (Student's Book, Grammar Book va boshqalar) kurs narxiga kiritilgan. Siz faqat darslarga qatnashishingiz kifoya."
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
        ease: "easeOut"
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
        ease: "easeInOut"
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      marginTop: 0,
      marginBottom: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
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
                  {openIndex === index ? '−' : '+'}
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
