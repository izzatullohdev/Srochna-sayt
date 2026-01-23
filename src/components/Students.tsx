import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import './Students.css';

const Students = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Boborajabova Nozanin',
      specialization: "Xorijiy til va adabiyot yo'nalishi talabasi",
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
    },
    {
      id: 2,
      name: 'Jalilov Abdulbosit',
      specialization: "Xorijiy til va adabiyot yo'nalishi talabasi",
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
    },
    {
      id: 3,
      name: 'Saydaliyeva Mubina',
      specialization: "Turizm va mehmondo'stlik yo'nalishi talabasi",
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop',
    },
    {
      id: 4,
      name: 'Soatova Hilola',
      specialization: "Iqtisodiyot yo'nalishi talabasi",
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const }
    }
  };

  return (
    <motion.section 
      id="reviews"
      className="students-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="students-container">
        <motion.div 
          className="students-header"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="students-title"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Talabalar fikri
          </motion.h2>
          <motion.p 
            className="students-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Bu yerga talabalardan "Otziv" olib, videoni YouTube'ga va havolasini saytga joylimiz.
          </motion.p>
        </motion.div>
        <motion.div 
          className="students-slider-wrapper"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={4}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            className="students-swiper"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <motion.div 
                  className="testimonial-card"
                  variants={cardVariants}
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="video-thumbnail">
                    <motion.img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="thumbnail-image"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="play-button-overlay">
                      <motion.div 
                        className="play-button"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="12" fill="rgba(255, 255, 255, 0.9)"/>
                          <path d="M10 8l6 4-6 4V8z" fill="#333"/>
                        </svg>
                      </motion.div>
                    </div>
                    <div className="card-overlay">
                      <div className="card-name">{testimonial.name}</div>
                      <div className="card-specialization">{testimonial.specialization}</div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Students;
