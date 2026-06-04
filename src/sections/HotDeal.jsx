import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, ZoomIn } from 'lucide-react';
import paymentPlanP4 from '../assets/payment-plan-p4.png';

export default function HotDeal() {
  const [zoom, setZoom] = useState(null);

  useEffect(() => {
    document.body.style.overflow = zoom ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [zoom]);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    window.history.replaceState(null, '', '/#contact');
  };

  return (
    <section id="hot-deal" className="section relative bg-page-tint">
      <div className="site-container">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center md:mb-10">
            <span className="section-tag">Hot Deal</span>
            <h2 className="mt-2 text-4xl font-bold leading-tight text-ink md:text-5xl">
              Etihad Town Phase 4
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-body md:text-lg">
              Payment plan for Phase 4, featured right here for quick review.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-[28px] border border-line bg-white shadow-soft-lg"
          >
            <button
              type="button"
              onClick={() => setZoom({ src: paymentPlanP4, alt: 'Etihad Town Phase 4 payment plan' })}
              className="group relative block w-full cursor-zoom-in overflow-hidden"
            >
              <img
                src={paymentPlanP4}
                alt="Etihad Town Phase 4 payment plan"
                className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-[#003B73]/0 transition-all duration-300 group-hover:bg-[#003B73]/20">
                <span className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-ink-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <ZoomIn size={16} /> View Fullscreen
                </span>
              </div>
            </button>
          </motion.div>
          <p className="mt-3 px-1 text-center text-sm text-muted">Tap the payment plan to view it fullscreen.</p>

          <div className="mt-8 flex justify-center">
            <button onClick={scrollToContact} className="btn-primary">
              Book Against This Deal
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {zoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center overflow-auto bg-black/95 p-4 backdrop-blur-sm"
            onClick={() => setZoom(null)}
          >
            <button
              onClick={() => setZoom(null)}
              className="fixed right-5 top-5 z-10 rounded-full bg-white/10 p-2 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
            >
              <X size={26} />
            </button>
            <motion.img
              src={zoom.src}
              alt={zoom.alt}
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              className="mx-auto my-auto h-auto max-w-full rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
