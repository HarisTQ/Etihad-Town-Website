import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Navigation } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'Location', href: '#location' },
  { label: 'Payment Plan', href: '#payment-plan' },
  { label: 'Contact Us', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['home', 'features', 'location', 'payment-plan', 'contact'];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? 'bg-[rgba(11,18,32,0.85)] backdrop-blur-xl border-b border-white/10 shadow-2xl'
          : 'bg-transparent'
          }`}
      >
        <div className="site-container">
          <div className="flex items-center justify-between h-18 py-4">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={() => handleNav('#home')}
              className="flex flex-col leading-none cursor-pointer group"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-white font-bold text-xl tracking-tight font-[Poppins]">
                ETIHAD TOWN
              </span>
              <span className="text-[#5DBB63] font-semibold text-xs tracking-[0.25em] uppercase">
                Phase 4 • Lahore
              </span>

            </motion.a>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNav(link.href)}
                    className={`relative text-sm font-medium tracking-wide transition-colors duration-300 group ${isActive ? 'text-white' : 'text-white/70 hover:text-white'
                      }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-gradient-to-r from-[#003B73] to-[#5DBB63] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-4">
              <motion.a
                href="tel:+923001234567"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="hidden md:flex btn-green text-sm px-5 py-3"
              >
                <Phone size={15} />
                Book Your Plot
              </motion.a>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 rounded-lg text-white/80 hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-[68px] left-0 right-0 z-40 bg-[rgba(11,18,32,0.97)] backdrop-blur-xl border-b border-white/10 lg:hidden"
          >
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => handleNav(link.href)}
                  className={`text-left px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${activeSection === link.href.replace('#', '')
                    ? 'bg-[#003B73]/30 text-white border border-[#003B73]/50'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {link.label}
                </motion.button>
              ))}
              <div className="pt-2">
                <a href="tel:+923001234567" className="btn-green w-full justify-center text-sm py-3.5">
                  <Phone size={15} />
                  Book Your Plot Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
