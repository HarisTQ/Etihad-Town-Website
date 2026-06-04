import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { PHONES, EMAIL, ADDRESS } from '../data/site';

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon fill="#fff" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-[#021C3C]">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      <div className="site-container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <div className="mb-5">
              <div className="text-xl font-bold tracking-tight text-white">ETIHAD TOWN</div>
              <div className="mt-0.5 text-xs font-semibold uppercase tracking-[0.25em] text-brand-green">Lahore</div>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/72">
              Lahore&apos;s most prestigious residential development. Building dreams, delivering value, creating legacies.
            </p>

            <div className="mt-6 flex gap-3">
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
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/14 bg-white/6 text-white/78 transition-colors hover:text-white"
                  aria-label={label}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: 'Home', to: '/' },
                { label: 'Phases', to: '/#phases' },
                { label: 'Features', to: '/#features' },
                { label: 'VR Tours', to: '/vr-tours' },
                { label: 'Contact Us', to: '/#contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="inline-block text-sm text-white/72 transition-colors hover:translate-x-1 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">Contact</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="mt-0.5 shrink-0 text-brand-green" />
                <span className="text-sm leading-relaxed text-white/72">{ADDRESS}</span>
              </li>
              {PHONES.map((p) => (
                <li key={p.tel} className="flex items-center gap-3">
                  <Phone size={15} className="shrink-0 text-brand-green" />
                  <a href={`tel:${p.tel}`} className="text-sm text-white/72 transition-colors hover:text-white">
                    {p.display}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-3">
                <Mail size={15} className="shrink-0 text-brand-green" />
                <a href={`mailto:${EMAIL}`} className="break-all text-sm text-white/72 transition-colors hover:text-white">
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/46">
            &copy; {year} Etihad Town Lahore. All rights reserved.
          </p>
          <p className="text-xs text-white/46">
            Premium Real Estate - Main Raiwind Road, Lahore
          </p>
        </div>
      </div>
    </footer>
  );
}
