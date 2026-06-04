import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Wallet, ShieldCheck, TrendingUp } from 'lucide-react';

const features = [
  {
    title: 'Prime Location',
    description: 'Main Raiwind Road location with quick access to Ring Road, Airport, and DHA.',
    color: '#003B73',
    icon: MapPin,
  },
  {
    title: 'Easy Installments',
    description: 'Flexible 3-year plan with 20% down payment and affordable options.',
    color: '#5DBB63',
    icon: Wallet,
  },
  {
    title: 'Secure Investment',
    description: 'LDA-approved project with clear legal documentation and transparent dealing.',
    color: '#003B73',
    icon: ShieldCheck,
  },
  {
    title: 'High ROI',
    description: 'Past phases appreciated strongly, making this a solid long-term investment.',
    color: '#5DBB63',
    icon: TrendingUp,
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
    <section id="features" className="section relative overflow-hidden bg-page">
      <div className="site-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold leading-tight text-ink md:text-5xl">
            Why Etihad Town ?
          </h2>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-6 lg:grid-cols-4 lg:gap-8"
        >
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                className="card flex h-full min-h-[160px] flex-col items-start rounded-2xl p-3.5 text-left sm:min-h-[240px] sm:items-center sm:p-8 sm:text-center"
              >
                <div
                  className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-lg sm:mb-5 sm:h-12 sm:w-12 sm:rounded-xl"
                  style={{ background: `${feat.color}14`, color: feat.color }}
                >
                  <Icon size={20} strokeWidth={1.8} />
                </div>
                <h3 className="mb-1.5 text-[15px] font-semibold leading-tight text-ink-2 sm:mb-4 sm:text-lg md:text-xl">
                  {feat.title}
                </h3>
                <p className="text-[12.5px] leading-5 text-body sm:text-base sm:leading-relaxed md:text-lg">
                  {feat.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
