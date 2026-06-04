import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Compass } from 'lucide-react';
import { PRIMARY_PHONE } from '../data/site';
import logo from '../assets/etihad-town-seeklogo.png';

// type 'section' links scroll within Home; type 'route' links navigate.
const navLinks = [
  { label: 'Home', type: 'section', target: 'home' },
  { label: 'Phases', type: 'section', target: 'phases' },
  { label: 'Features', type: 'section', target: 'features' },
  { label: 'VR Tours', type: 'route', target: '/vr-tours' },
  { label: 'Contact Us', type: 'section', target: 'contact' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = scrolled || location.pathname !== '/';

  const handleLink = (link) => {
    setMenuOpen(false);
    if (link.type === 'route') {
      navigate(link.target);
      return;
    }
    // section link
    if (location.pathname === '/') {
      const el = document.getElementById(link.target);
      el?.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', link.target === 'home' ? '/' : `/#${link.target}`);
    } else {
      navigate(link.target === 'home' ? '/' : `/#${link.target}`);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${solid
          ? 'bg-white/90 backdrop-blur-xl border-b border-line shadow-soft'
          : 'bg-transparent'
          }`}
      >
        <div className="site-container">
          <div className="flex items-center justify-between h-18 py-4">
            {/* Logo */}
            <Link
              to="/"
              className="flex flex-col leading-none cursor-pointer group"
              aria-label="Etihad Town Lahore — Home"
            >
              <img
                src={logo}
                alt="Etihad Town"
                className={`h-9 w-auto md:h-10 transition-all duration-300 ${solid ? '' : 'brightness-0 invert drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)]'}`}
              />
              <span className={`mt-1 pl-0.5 text-[10px] font-semibold uppercase tracking-[0.3em] transition-colors ${solid ? 'text-brand-green' : 'text-white/85'}`}>
                Lahore
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive =
                  link.type === 'route' && location.pathname === link.target;
                return (
                  <button
                    key={link.label}
                    onClick={() => handleLink(link)}
                    className={`relative text-sm font-medium tracking-wide transition-colors duration-300 group ${solid
                      ? (isActive ? 'text-ink' : 'text-body hover:text-ink')
                      : (isActive ? 'text-white' : 'text-white/80 hover:text-white')
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
                href={`tel:${PRIMARY_PHONE.tel}`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="hidden md:flex btn-green btn-sm"
              >
                <Phone size={15} />
                Book Your Plot
              </motion.a>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${solid ? 'text-ink/80 hover:text-ink' : 'text-white/80 hover:text-white'}`}
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
            className="fixed top-[68px] left-0 right-0 z-40 bg-white border-b border-line shadow-soft-lg lg:hidden"
          >
            <div className="site-container py-6 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => handleLink(link)}
                  className="text-left px-4 py-3.5 rounded-xl text-sm font-medium text-body hover:text-ink hover:bg-surface-2 transition-all duration-200 flex items-center gap-2"
                >
                  {link.label === 'VR Tours' && <Compass size={15} className="text-brand-green" />}
                  {link.label}
                </motion.button>
              ))}
              <div className="pt-2">
                <a href={`tel:${PRIMARY_PHONE.tel}`} className="btn-green w-full justify-center">
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
