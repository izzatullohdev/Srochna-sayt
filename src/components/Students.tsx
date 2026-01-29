import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { useTranslation } from '../i18n';
import './Students.css';

const Students = () => {
  const { t } = useTranslation();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // YouTube URL'dan video ID ni olish funksiyasi
  const getYouTubeVideoId = (url: string): string | null => {
    if (!url) return null;
    
    // Agar allaqachon embed formatida bo'lsa
    if (url.includes('youtube.com/embed/')) {
      const match = url.match(/embed\/([a-zA-Z0-9_-]+)/);
      return match ? match[1] : null;
    }
    
    // YouTube shorts URL formatini tekshirish
    if (url.includes('/shorts/')) {
      const match = url.match(/\/shorts\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        return match[1].split('?')[0];
      }
    } 
    // youtu.be format
    else if (url.includes('youtu.be/')) {
      const match = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        return match[1].split('?')[0];
      }
    } 
    // watch?v= format
    else if (url.includes('watch?v=')) {
      const match = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        return match[1].split('&')[0];
      }
    }
    
    return null;
  };

  // YouTube shorts URL'ni embed formatiga o'tkazish funksiyasi
  const convertToEmbedUrl = (url: string): string => {
    if (!url) return '';
    
    // Agar allaqachon embed formatida bo'lsa, qaytaradi
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    
    const videoId = getYouTubeVideoId(url);
    
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // Agar hech qanday format topilmasa, asl URL'ni qaytaradi
    return url;
  };

  // YouTube video'dan thumbnail URL olish funksiyasi
  const getYouTubeThumbnail = (url: string, quality: 'maxresdefault' | 'hqdefault' | 'mqdefault' | 'sddefault' = 'maxresdefault'): string => {
    const videoId = getYouTubeVideoId(url);
    
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
    }
    
    // Agar video ID topilmasa, default rasm qaytaradi
    return 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=800&fit=crop';
  };

  const testimonials = [
    {
      id: 1,
      name: 'Boborajabova Nozanin',
      specialization: "Xorijiy til va adabiyot yo'nalishi talabasi",
      image: getYouTubeThumbnail('https://youtube.com/shorts/ZsMRk3n-_6g', 'maxresdefault'),
      videoUrl: 'https://youtube.com/shorts/ZsMRk3n-_6g',
    },
    {
      id: 2,
      name: 'Jalilov Abdulbosit',
      specialization: "Xorijiy til va adabiyot yo'nalishi talabasi",
      image: getYouTubeThumbnail('https://youtube.com/shorts/BnQxNp49sEY', 'maxresdefault'),
      videoUrl: 'https://youtube.com/shorts/BnQxNp49sEY',
    },
    {
      id: 3,
      name: 'Saydaliyeva Mubina',
      specialization: "Turizm va mehmondo'stlik yo'nalishi talabasi",
      image: getYouTubeThumbnail('https://youtube.com/shorts/bDBGtCOeUMQ', 'maxresdefault'),
      videoUrl: 'https://youtube.com/shorts/bDBGtCOeUMQ',
    },
    {
      id: 4,
      name: 'Soatova Hilola',
      specialization: "Iqtisodiyot yo'nalishi talabasi",
      image: getYouTubeThumbnail('https://youtube.com/shorts/3qzpAiJoOSo', 'maxresdefault'),
      videoUrl: 'https://youtube.com/shorts/3qzpAiJoOSo',
    },
  ];

  const handlePlayClick = (videoUrl: string) => {
    // YouTube shorts URL'ni embed formatiga o'tkazish
    const embedUrl = convertToEmbedUrl(videoUrl);
    if (!embedUrl) {
      console.error('❌ URL konvertatsiya qilinmadi!');
      return;
    }
    setSelectedVideo(embedUrl);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

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
            {t('students.title')}
          </motion.h2>
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
              480: {
                slidesPerView: 1,
                spaceBetween: 15,
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
                     
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        console.error('❌ YouTube thumbnail yuklanmadi:', testimonial.name, testimonial.image);
                        // Fallback rasm
                        target.src = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop';
                      }}
                    />
                    <div className="play-button-overlay">
                      <motion.div 
                        className="play-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayClick(testimonial.videoUrl);
                        }}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                      >
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="12" fill="rgba(255, 255, 255, 0.9)"/>
                          <path d="M10 8l6 4-6 4V8z" fill="#333"/>
                        </svg>
                      </motion.div>
                    </div>
                    {/* <div className="card-overlay">
                      <div className="card-name">{testimonial.name}</div>
                      <div className="card-specialization">{testimonial.specialization}</div>
                    </div> */}
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            className="video-modal" 
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="video-modal-content" 
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button 
                className="video-modal-close" 
                onClick={closeModal}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close video modal"
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ display: 'block', flexShrink: 0 }}
                >
                  <path 
                    d="M18 6L6 18M6 6l12 12" 
                    stroke="white" 
                    strokeWidth="2.5" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
              <div className="video-modal-iframe-wrapper video-modal-iframe-wrapper-shorts">
                {selectedVideo && (
                  <iframe
                    src={`${selectedVideo}?autoplay=1&rel=0&modestbranding=1`}
                    title="Video Player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="video-modal-iframe video-modal-iframe-shorts"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none'
                    }}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Students;
