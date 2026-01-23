import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import './Online.css';

const Online = () => {
  const slides = [
    {
      id: 1,
      participants: [
        { name: 'Teacher', position: 'top-left' },
        { name: 'Student 1', position: 'top-right' },
        { name: 'Student 2', position: 'bottom-left' },
        { name: 'Student 3', position: 'bottom-right' },
      ]
    },
    {
      id: 2,
      participants: [
        { name: 'Teacher', position: 'top-left' },
        { name: 'Student 1', position: 'top-right' },
        { name: 'Student 2', position: 'bottom-left' },
        { name: 'Student 3', position: 'bottom-right' },
      ]
    },
    {
      id: 3,
      participants: [
        { name: 'Teacher', position: 'top-left' },
        { name: 'Student 1', position: 'top-right' },
        { name: 'Student 2', position: 'bottom-left' },
        { name: 'Student 3', position: 'bottom-right' },
      ]
    },
  ];

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
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }
    }
  };

  const sliderVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }
    }
  };

  return (
    <motion.section 
      id="about"
      className="online-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="online-container">
        <div className="online-content">
          <motion.div 
            className="online-text"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.h2 
              className="online-title"
              variants={itemVariants}
            >
              YANGI DARAJADAGI MASOFAVIY TA'LIM!
            </motion.h2>
            <motion.p 
              className="online-intro"
              variants={itemVariants}
            >
              Masofa, vaqt, sharoit va mablag' muammosiz ingliz tilini o'rganish imkoniyati!
            </motion.p>
            <motion.ul 
              className="online-features"
              variants={containerVariants}
            >
              {[
                "Smartfon yoki kompyuter orqali istalgan joydan ingliz tilini o'rganing",
                "O'qituvchilar - CELTA va IELTS 9.0 sertifikatiga ega malakali mutaxassislar",
                "Qulay va to'liq nazorat qilinadigan darslar Student App orqali",
                "Online ta'lim sifati offline ta'lim darajasida",
                "Qat'iy nazorat va barqaror yordam"
              ].map((text, index) => (
                <motion.li key={index} variants={itemVariants}>
                  <span className="feature-icon">✓</span>
                  {text}
                </motion.li>
              ))}
            </motion.ul>
            <motion.p 
              className="online-conclusion"
              variants={itemVariants}
            >
              Ingliz tilini o'rganish imkoniyati endi hamma uchun ochiq! Bu - erkinlik, zamonaviy ta'lim va INTER NATION sifati.
            </motion.p>
          </motion.div>

          <motion.div 
            className="online-slider-wrapper"
            variants={sliderVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="slider-header">
              <h3 className="slider-brand">INTER NATION</h3>
              <h4 className="slider-online">ONLINE</h4>
            </div>
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              className="online-swiper"
            >
              {slides.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <div className="laptop-container">
                    <div className="laptop-screen">
                      <div className="video-conference">
                        {slide.participants.map((participant, index) => (
                          <div key={index} className={`participant ${participant.position}`}>
                            <div className="participant-avatar">
                              <div className="avatar-circle"></div>
                            </div>
                            <div className="participant-name">{participant.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Online;
