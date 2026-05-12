import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  TrendingUp,
  Building2,
  Star,
  Users,
  Target,
  Lock,
} from 'lucide-react';

const benefits = [
  {
    icon: TrendingUp,
    title: 'Future Growth',
    description: 'Raiwind Road corridor is experiencing explosive appreciation. Early investors are already seeing 30–50% capital gains.',
    color: '#5DBB63',
  },
  {
    icon: Building2,
    title: 'Modern Infrastructure',
    description: 'State-of-the-art roads, underground utilities, fiber optic network, and 24/7 water & electricity supply.',
    color: '#003B73',
  },
  {
    icon: Star,
    title: 'Trusted Investment',
    description: 'Backed by a decade of successful real estate development with thousands of satisfied families across Pakistan.',
    color: '#5DBB63',
  },
  {
    icon: Users,
    title: 'Premium Community',
    description: 'An elite, gated residential community with international schools, hospitals, parks, and lifestyle centers nearby.',
    color: '#003B73',
  },
  {
    icon: Target,
    title: 'Strategic Location',
    description: "Unbeatable access to CPEC routes, industrial zones, and Lahore's key commercial hubs.",
    color: '#5DBB63',
  },
  {
    icon: Lock,
    title: 'Safe Investment',
    description: 'LDA-approved with complete legal documentation, title deeds, and transparent registration process.',
    color: '#003B73',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};

export default function Benefits() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="benefits" className="py-16 md:py-24 relative overflow-hidden">
      {/* Dark BG variant */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1220] via-[#0d1a2e] to-[#0B1220]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#003B73]/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#5DBB63]/30 to-transparent" />

      <div className="relative z-10 site-container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-tag">Why Invest Now</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 leading-tight">
            Investment
            <span className="text-gradient-green"> Benefits</span>
          </h2>
          <p className="text-white/55 mt-4 max-w-xl mx-auto text-base leading-relaxed">
            Every rupee invested in Etihad Town Phase 4 is backed by solid fundamentals and a proven track record.
          </p>
          <div className="section-divider mx-auto mt-6" />
        </motion.div>

        {/* Benefits grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            const isGreen = benefit.color === '#5DBB63';
            return (
              <motion.div
                key={benefit.title}
                variants={itemVariants}
                className="glass rounded-2xl px-6 py-5 md:px-8 md:py-6 card-hover group cursor-default relative overflow-hidden"
              >
                {/* Background glow blob */}
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl"
                  style={{ background: benefit.color }}
                />

                <div className="flex items-start gap-5 relative z-10">
                  <div
                    className="w-13 h-13 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${benefit.color}18`,
                      border: `1px solid ${benefit.color}40`,
                    }}
                  >
                    <Icon size={22} style={{ color: benefit.color }} strokeWidth={1.7} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-base mb-2">{benefit.title}</h3>
                    <p className="text-white/55 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </div>

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${benefit.color}, transparent)` }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 glass-blue rounded-2xl p-8 text-center"
        >
          <h3 className="text-white font-bold text-2xl mb-2">Ready to Secure Your Plot?</h3>
          <p className="text-white/60 text-sm mb-6 max-w-md mx-auto">
            Limited plots available. Contact our sales team today for exclusive offers and early investor benefits.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
            <motion.a
              href="tel:+923001234567"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn-green text-sm px-7 py-3.5 w-full sm:w-auto justify-center"
            >
              Call Now: +92 300 1234567
            </motion.a>
            <motion.a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn-outline text-sm px-7 py-3.5 w-full sm:w-auto justify-center"
            >
              WhatsApp Us
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
