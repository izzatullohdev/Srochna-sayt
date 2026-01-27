import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './About.css';

const About = () => {
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

  const aboutItems = [
    {
      id: 1,
      image: getYouTubeThumbnail('https://www.youtube.com/shorts/tHm6ve1tffs', 'maxresdefault'), // YouTube'dan thumbnail
      videoUrl: 'https://www.youtube.com/shorts/tHm6ve1tffs', // YouTube shorts URL
      name: 'Alimbekova Zulhumor',
      position: "Psixologiya yo'nalishi talabasi",
      title: "Siz uchun yangi imkoniyat!",
      description: "Endilikda ingliz tilini o'rganishga masofa, vaqt, sharoit yoki pul muammo emas!",
      features: [
        "Birgina smartfon yoki kompyuter bilan istalgan joydan ingliz tilini o'rganing",
        "Ustozlarimiz CELTA va IELTS 9.0 sertifikatiga ega malakali mutaxassislar",
        "Student App orqali qulay va to'liq nazoratdagi darslar",
        "Online ta'lim formati offlayn ta'lim sifati darajasida",
        "Qat'iy nazorat va barqaror qo'llab-quvvatlash"
      ],
      conclusion: "Endi ingliz tilini o'rganish imkoniyati hamma uchun ochiq! Bu - erkinlik, zamonaviy ta'lim va INTER NATION sifati!"
    },
    {
      id: 2,
      image: getYouTubeThumbnail('https://www.youtube.com/embed/dQw4w9WgXcQ', 'maxresdefault'), // YouTube'dan thumbnail
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // YouTube video URL
      name: 'Karimov Aziz',
      position: "Informatika yo'nalishi talabasi",
      title: "Zamonaviy texnologiyalar bilan ta'lim!",
      description: "Bizning platformamiz eng so'nggi texnologiyalar bilan jihozlangan va qulay interfeysga ega.",
      features: [
        "Real vaqtda video konferensiya darslar",
        "Interaktiv materiallar va mashqlar",
        "Shaxsiy progress kuzatuvchi tizim",
        "24/7 qo'llab-quvvatlash xizmati",
        "Sertifikat va natijalar bilan ta'minlash"
      ],
      conclusion: "Biz bilan ingliz tilini o'rganish oson va qiziqarli bo'ladi!"
    },
    {
      id: 3,
      image: getYouTubeThumbnail('https://www.youtube.com/embed/dQw4w9WgXcQ', 'maxresdefault'), // YouTube'dan thumbnail
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // YouTube video URL
      name: 'Toshmatova Malika',
      position: "Iqtisodiyot yo'nalishi talabasi",
      title: "Karyera uchun ingliz tili!",
      description: "Ingliz tili bilimlaringizni oshirib, karyerangizni keyingi bosqichga olib chiqing.",
      features: [
        "Biznes ingliz tili kurslari",
        "IELTS va TOEFL tayyorgarlik",
        "Xalqaro sertifikatlar",
        "Karyera maslahatlari",
        "Taniqli o'qituvchilar bilan darslar"
      ],
      conclusion: "Karyerangizni rivojlantirish uchun INTER NATION bilan boshlang!"
    }
  ];

  const handlePlayClick = (videoUrl: string) => {
    // YouTube shorts URL'ni embed formatiga o'tkazish
    const embedUrl = convertToEmbedUrl(videoUrl);
    console.log('🎬 Video bosildi!');
    console.log('📹 Original URL:', videoUrl);
    console.log('✅ Converted URL:', embedUrl);
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
        staggerChildren: 0.2
      }
    }
  };

  return (
    <>
      <motion.section 
        className="about-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="about-container">
          {aboutItems.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={item.id} 
                className={`about-item ${isEven ? 'image-left' : 'image-right'}`}
                initial={{ 
                  opacity: 0, 
                  x: index % 2 === 0 ? -100 : 100,
                  scale: 0.9
                }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0,
                  scale: 1
                }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                <div className="about-content">
                  <motion.div 
                  className={`about-media ${isEven ? 'order-1' : 'order-2'}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="video-thumbnail">
                      <motion.img 
                        src={item.image} 
                        alt={item.name}
                        className="thumbnail-image"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/600x800?text=Image+Not+Found';
                        }}
                      />
                      <motion.div 
                        className="play-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayClick(item.videoUrl);
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                      >
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <linearGradient id={`playGradient-${item.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#ff8c00" />
                              <stop offset="100%" stopColor="#ffa500" />
                            </linearGradient>
                          </defs>
                          <circle cx="30" cy="30" r="30" fill="rgba(255, 255, 255, 0.9)"/>
                          <path d="M24 18L42 30L24 42V18Z" fill={`url(#playGradient-${item.id})`}/>
                        </svg>
                      </motion.div>
                      <div className="video-overlay">
                        <div className="video-name">{item.name}</div>
                        <div className="video-position">{item.position}</div>
                      </div>
                    </div>
                  </motion.div>

                <motion.div 
                  className={`about-text ${isEven ? 'order-2' : 'order-1'}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <motion.h2 
                    className="about-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    {item.title}
                  </motion.h2>
                  <motion.p 
                    className="about-description"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {item.description}
                  </motion.p>
                  <motion.ul 
                    className="about-features"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                  >
                    {item.features.map((feature, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                      >
                        <span className="feature-icon">✓</span>
                        {feature}
                      </motion.li>
                    ))}
                  </motion.ul>
                  <p className="about-conclusion">{item.conclusion}</p>
                </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

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
    </>
  );
};

export default About;
