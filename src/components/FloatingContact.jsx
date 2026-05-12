import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, X, Plus } from 'lucide-react';

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
      {/* Expanded buttons */}
      <AnimatePresence>
        {open && (
          <>
            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="flex items-center gap-3 group"
              aria-label="WhatsApp"
            >
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ delay: 0.1 }}
                className="glass-dark text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/10 whitespace-nowrap"
              >
                Chat on WhatsApp
              </motion.span>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #25D366, #128C7E)',
                  boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
                }}
              >
                <WhatsAppIcon />
              </motion.div>
            </motion.a>

            {/* Call */}
            <motion.a
              href="tel:+923001234567"
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-3 group"
              aria-label="Call"
            >
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ delay: 0.05 }}
                className="glass-dark text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/10 whitespace-nowrap"
              >
                Call Sales Team
              </motion.span>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #003B73, #004d96)',
                  boxShadow: '0 4px 20px rgba(0, 59, 115, 0.5)',
                }}
              >
                <Phone size={19} />
              </motion.div>
            </motion.a>
          </>
        )}
      </AnimatePresence>

      {/* Main FAB toggle */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl relative"
        style={{
          background: open
            ? 'linear-gradient(135deg, #003B73, #004d96)'
            : 'linear-gradient(135deg, #5DBB63, #4aa850)',
          boxShadow: open
            ? '0 6px 30px rgba(0, 59, 115, 0.6)'
            : '0 6px 30px rgba(93, 187, 99, 0.5)',
        }}
        aria-label={open ? 'Close contact options' : 'Open contact options'}
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Plus size={22} />
        </motion.div>

        {/* Pulse ring (only when closed) */}
        {!open && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[#5DBB63]"
            animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        )}
      </motion.button>
    </div>
  );
}
