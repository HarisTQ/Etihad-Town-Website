import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';

// Inline social icons (lucide-react doesn't export Facebook/Instagram/etc.)
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
    <polygon fill="#0B1220" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/8 bg-[#060d1a]">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#003B73]/80 to-transparent" />

      <div className="site-container py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {/* Brand column */}
          <div>
            <div className="mb-5">
              <div className="text-white font-bold text-xl tracking-tight">ETIHAD TOWN</div>
              <div className="text-[#5DBB63] font-semibold text-xs tracking-[0.25em] uppercase mt-0.5">Phase 4 • Lahore</div>
            </div>
            <p className="text-white/45 text-sm leading-relaxed max-w-xs">
              Lahore's most prestigious residential development. Building dreams, delivering value, creating legacies.
            </p>
            {/* Social links */}
            <div className="flex gap-3 mt-6">
              {[
                { icon: FacebookIcon, href: '#', label: 'Facebook' },
                { icon: InstagramIcon, href: '#', label: 'Instagram' },
                { icon: YoutubeIcon, href: '#', label: 'YouTube' },
                { icon: TwitterIcon, href: '#', label: 'Twitter' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.12, y: -2 }}
                  className="w-9 h-9 glass rounded-lg flex items-center justify-center text-white/50 hover:text-white transition-colors"
                  aria-label={label}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">Quick Links</h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: 'Home', href: '#home' },
                { label: 'Payment Plan', href: '#payment-plan' },
                { label: 'Location', href: '#location' },
                { label: 'Investment Benefits', href: '#benefits' },
                { label: 'Contact Us', href: '#contact' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">Contact</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-white mt-0.5 shrink-0" />
                <span className="text-white/50 text-sm leading-relaxed">
                  Main Raiwind Road, Lahore, Punjab, Pakistan
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-white shrink-0" />
                <a href="tel:+923001234567" className="text-white/50 hover:text-white text-sm transition-colors">
                  +92 300 123 4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-white shrink-0" />
                <a href="mailto:info@etihadtownlhr.com" className="text-white/50 hover:text-white text-sm transition-colors">
                  info@etihadtownlhr.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            © {year} Etihad Town Phase 4 Lahore. All rights reserved.
          </p>
          <p className="text-white/25 text-xs">
            etihadtownlhr.com — Premium Real Estate
          </p>
        </div>
      </div>
    </footer>
  );
}
