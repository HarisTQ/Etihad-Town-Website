import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, X, Maximize2, Download } from 'lucide-react';
import paymentPlanImg from '../assets/payment_plan.png';

export default function PaymentPlan() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section id="payment-plan" className="py-16 md:py-24 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-20 left-0 w-80 h-80 bg-[#5DBB63]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#003B73]/8 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container max-w-6xl relative z-10">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >

            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 leading-tight">
              Payment
              <span className="text-gradient-green"> Plan</span>
            </h2>


          </motion.div>

          {/* Summary cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 mt-10"
          >
            {[
              { label: 'Booking', value: '20%', sub: 'Down Payment' },
              { label: 'Confirmation', value: '10%', sub: 'After 30 Days' },
              { label: 'Installments', value: '60%', sub: '36 Monthly' },
              { label: 'Possession', value: '10%', sub: 'On Delivery' },
            ].map((item) => (
              <div key={item.label} className="glass rounded-2xl px-6 py-5 md:px-8 md:py-6 text-center flex flex-col justify-center">
                <div className="text-2xl font-bold text-[#5DBB63]">{item.value}</div>
                <div className="text-white font-semibold text-sm mt-1">{item.label}</div>
                <div className="text-white/45 text-xs mt-0.5">{item.sub}</div>
              </div>
            ))}
          </motion.div>

          {/* Payment plan image container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group"
          >
            <div className="glass rounded-3xl p-3 md:p-5 overflow-hidden">
              {/* Image */}
              <div
                className="relative rounded-2xl overflow-hidden cursor-zoom-in"
                onClick={() => setModalOpen(true)}
              >
                <img
                  src={paymentPlanImg}
                  alt="Etihad Town Phase 4 Payment Plan"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#003B73]/0 group-hover:bg-[#003B73]/20 transition-all duration-300 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="glass rounded-full p-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <ZoomIn size={28} className="text-white" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Zoom hint */}
            <div className="flex items-center justify-center gap-2 mt-4 text-white/40 text-xs">
              <ZoomIn size={13} />
              <span>Click image to view fullscreen</span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center mt-8">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setModalOpen(true)}
                className="btn-primary text-sm px-6 py-3 w-full sm:w-auto justify-center"
              >
                <Maximize2 size={15} />
                View Full Screen
              </motion.button>

            </div>
          </motion.div>
        </div>
      </section>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors p-2"
              >
                <X size={28} />
              </button>
              <img
                src={paymentPlanImg}
                alt="Payment Plan Fullscreen"
                className="w-full h-auto rounded-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
