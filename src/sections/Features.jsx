import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';


const features = [
  {
    title: 'Prime Location',
    description: 'Strategically located on Main Raiwind Road, Lahore — minutes from Ring Road, Airport, and DHA.',
    color: '#003B73',
    glow: 'rgba(0, 59, 115, 0.35)',
  },
  {
    title: 'Easy Installments',
    description: 'Flexible 3-year installment plan with only 20% down payment. Affordable plots for every budget.',
    color: '#5DBB63',
    glow: 'rgba(93, 187, 99, 0.35)',
  },
  {
    title: 'Secure Investment',
    description: 'LDA-approved development with full legal documentation. 100% transparent and trusted process.',
    color: '#003B73',
    glow: 'rgba(0, 59, 115, 0.35)',
  },
  {
    title: 'High ROI',
    description: 'Property values in Etihad Town have appreciated over 40% in past phases. Smart investment for your future.',
    color: '#5DBB63',
    glow: 'rgba(93, 187, 99, 0.35)',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};



export default function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="features" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background decoration */}


      <div className="site-container relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-tag">Why Etihad Town Phase 4</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 leading-tight">
            Built for the Elite
            <span className="block text-gradient-blue">Accessible to All</span>
          </h2>


        </motion.div>

        {/* Cards grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-16"
        >
          {features.map((feat) => (
            <motion.div
              key={feat.title}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="glass rounded-[40px] px-8 py-8 md:px-12 md:py-12 flex flex-col h-full min-h-[240px] justify-center items-center text-center"
            >
              {/* Content */}
              <h3 className="text-white font-bold text-xl md:text-2xl mb-4 leading-tight">{feat.title}</h3>
              <p className="text-white/60 text-base md:text-lg leading-relaxed">{feat.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
