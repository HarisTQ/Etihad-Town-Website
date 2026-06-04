import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight, MapPin } from 'lucide-react';
import hero2 from '../assets/hero2.jpg';
import hero3 from '../assets/hero3.jpg';
import hero4 from '../assets/hero4.png';

const heroImages = [hero4, hero2, hero3];
const SLIDE_INTERVAL_MS = 10000;
const SLIDE_TRANSITION_SECONDS = 2.4;

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image slider */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <motion.img
            key={image}
            src={image}
            alt={`Etihad Town Lahore - ${index + 1}`}
            initial={false}
            animate={{
              opacity: currentImageIndex === index ? 1 : 0,
              scale: currentImageIndex === index ? 1 : 1.025,
              filter: currentImageIndex === index
                ? 'brightness(1) saturate(1)'
                : 'brightness(0.82) saturate(0.94)',
            }}
            transition={{ duration: SLIDE_TRANSITION_SECONDS, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        ))}
      </div>

      {/* Overlay for legibility */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/85 via-[#0B1220]/45 to-[#0B1220]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220]/40 to-transparent" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 site-container pt-28 pb-20 md:pt-32 md:pb-24 flex flex-col justify-center text-center lg:text-left min-h-screen">
        <div className="max-w-3xl w-full mx-auto lg:mx-0">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="section-tag !bg-black/30 !text-white !border-white/30">
              <MapPin size={11} className="inline mr-1" />
              Lahore's Most Premium Development
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mt-4 mb-4"
          >
            Etihad Town
            <br />
            <span className="bg-gradient-to-r from-[#5DBB63] via-[#7dd882] to-[#5DBB63] bg-clip-text text-transparent">
              Lahore
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/75 text-lg md:text-xl font-light leading-relaxed mt-5 max-w-xl"
          >
            Where visionary architecture meets timeless living. Explore every phase of Lahore's most anticipated residential community on Main Raiwind Road.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start w-full sm:w-auto mt-10"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('contact')}
              className="btn-primary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 shadow-lg shadow-[#003B73]/20 w-full sm:w-auto justify-center"
            >
              Book Your Plot Now
              <ArrowRight size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('phases')}
              className="btn-outline text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto justify-center !text-white !border-white/70 hover:!bg-white/10"
            >
              Explore Phases
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo('features')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors group"
        aria-label="Scroll down"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ChevronDown size={22} />
        </motion.div>
      </motion.button>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[2]"
        style={{
          height: '12rem',
          background: 'linear-gradient(to top, #021C3C 0%, rgba(2, 28, 60, 0.92) 24%, rgba(2, 28, 60, 0.5) 52%, rgba(2, 28, 60, 0) 100%)',
        }}
      />
    </section>
  );
}
