import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, MapPin } from 'lucide-react';
import hero2 from '../assets/hero2.jpg';
import hero3 from '../assets/hero3.jpg';
import hero4 from '../assets/hero4.png';

const heroImages = [hero2, hero3, hero4];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={heroImages[currentImageIndex]}
            alt={`Etihad Town Phase 4 - ${currentImageIndex + 1}`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="w-full h-full object-cover object-center"
          />
        </AnimatePresence>
      </div>

      {/* Multi-layer overlay */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/10 via-[#0B1220]/50 to-[#0B1220]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#003B73]/10 via-transparent to-transparent" />
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
            <span className="section-tag">
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
              Phase 4
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/75 text-lg md:text-xl font-light leading-relaxed mt-5 max-w-xl"
          >
            Where visionary architecture meets timeless living. Secure your future in Lahore's most anticipated luxury residential community.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 mt-8 mb-10 justify-center lg:justify-start"
          >
            {[
              { label: 'Plot Sizes', value: '3, 5, 10 Marla' },
              { label: 'Installments', value: '3 Years' },
              { label: 'Booking', value: '20% Down' },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left flex-1 min-w-[120px]">
                <div className="text-lg sm:text-xl font-bold text-white">{stat.value}</div>
                <div className="text-white/50 text-xs uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start w-full sm:w-auto"
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
              onClick={() => scrollTo('payment-plan')}
              className="btn-outline text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto justify-center"
            >
              Explore Payment Plan
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
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B1220] to-transparent z-[2]" />
    </section>
  );
}
