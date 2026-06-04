import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import paymentPlanP4 from '../assets/payment-plan-p4.png';

export default function HotDeal() {
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
            <img
              src={paymentPlanP4}
              alt="Etihad Town Phase 4 payment plan"
              className="block h-auto w-full"
            />
          </motion.div>

          <div className="mt-8 flex justify-center">
            <button onClick={scrollToContact} className="btn-primary">
              Book Against This Deal
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
