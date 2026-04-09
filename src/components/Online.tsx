import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { useTranslation } from '../i18n';
import './Online.css';
import onlineImage1 from '../assets/2-rasm.png';
import onlineImage2 from '../assets/2-r.png';

const Online = () => {
  const { t } = useTranslation();
  const slides = [
    {
      id: 1,
      image: onlineImage1,
    },
    {
      id: 2,
      image: onlineImage2,
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
              {t('online.title')}
            </motion.h2>
            <motion.p 
              className="online-intro"
              variants={itemVariants}
            >
              {t('online.intro1')}
            </motion.p>
            <motion.p 
              className="online-intro"
              variants={itemVariants}
            >
              {t('online.intro2')}
            </motion.p>
            <motion.p 
              className="online-intro"
              variants={itemVariants}
            >
              {t('online.intro3')}
            </motion.p>
            <motion.p 
              className="online-conclusion"
              variants={itemVariants}
            >
              {t('online.conclusion')}
            </motion.p>
          </motion.div>

          <motion.div 
            className="online-slider-wrapper"
            variants={sliderVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* <div className="slider-header">
              <h3 className="slider-brand">INTER NATION</h3>
              <h4 className="slider-online">ONLINE</h4>
            </div> */}
            <Swiper
              modules={[Scrollbar, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              scrollbar={{
                hide: true,
              }}
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
                      <div className="video-conference has-image">
                        <img 
                          src={slide.image} 
                          alt="Video conference" 
                          className="conference-image"
                          
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            console.error('❌ Image failed to load:', slide.image);
                            console.error('Error event:', e);
                            target.style.display = 'none';
                          }}
                        />
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
