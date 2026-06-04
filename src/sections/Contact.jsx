import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  CheckCircle,
} from 'lucide-react';
import { PHONES, EMAIL, WHATSAPP_LINK, ADDRESS } from '../data/site';

const contactInfo = [
  {
    icon: Phone,
    label: 'Call Us',
    value: PHONES[0].display,
    sub: 'Mon – Sat, 9am – 7pm',
    href: `tel:${PHONES[0].tel}`,
    color: '#003B73',
  },
  {
    icon: Phone,
    label: 'Sales & Bookings',
    value: PHONES[1].display,
    sub: 'Talk to our sales team',
    href: `tel:${PHONES[1].tel}`,
    color: '#003B73',
  },
  {
    icon: MessageSquare,
    label: 'WhatsApp',
    value: PHONES[0].display,
    sub: 'Quick response guaranteed',
    href: WHATSAPP_LINK,
    color: '#5DBB63',
  },
  {
    icon: Mail,
    label: 'Email',
    value: EMAIL,
    sub: 'We reply within 24 hours',
    href: `mailto:${EMAIL}`,
    color: '#003B73',
  },
  {
    icon: MapPin,
    label: 'Sales Office',
    value: 'Main Raiwind Road, Lahore',
    sub: ADDRESS,
    href: 'https://maps.google.com/?q=Etihad+Town+Lahore+Raiwind+Road',
    color: '#5DBB63',
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Forward the enquiry to the sales team via WhatsApp with details prefilled.
    const text =
      `*New Enquiry — Etihad Town*%0A` +
      `Name: ${encodeURIComponent(formData.name)}%0A` +
      `Phone: ${encodeURIComponent(formData.phone)}%0A` +
      `Email: ${encodeURIComponent(formData.email || '—')}%0A` +
      `Message: ${encodeURIComponent(formData.message || '—')}`;
    window.open(`${WHATSAPP_LINK}?text=${text}`, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="section relative overflow-hidden bg-page-tint">
      <div className="relative z-10 site-container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-tag">Get In Touch</span>
          <h2 className="text-4xl md:text-5xl font-bold text-ink mt-3 leading-tight">
            Contact
            <span className="text-gradient-blue"> Us</span>
          </h2>
          <p className="text-body mt-4 mx-auto max-w-3xl text-base leading-relaxed text-center">
            Our expert sales consultants are ready to guide you through every step of your investment journey.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Contact info cards */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-4 md:gap-5"
          >
            <h3 className="text-ink-2 font-semibold text-lg mb-2">Reach Us Directly</h3>
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={`${info.label}-${info.value}`}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                  className="card rounded-2xl px-5 py-4 md:px-6 md:py-5 flex items-center gap-6 group transition-all"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: `${info.color}14`,
                      border: `1px solid ${info.color}33`,
                    }}
                  >
                    <Icon size={20} stroke={info.color} strokeWidth={1.8} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-muted text-xs font-medium uppercase tracking-wider">{info.label}</div>
                    <div className="text-ink-2 font-semibold text-sm mt-0.5 truncate">{info.value}</div>
                    <div className="text-faint text-xs mt-0.5">{info.sub}</div>
                  </div>
                  
                </motion.a>
              );
            })}
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="card rounded-3xl px-6 py-8 md:px-10 md:py-10 flex flex-col">
              <h3 className="text-ink-2 font-semibold text-lg mb-6 text-center">Send an Enquiry</h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle size={48} className="text-[#5DBB63] mb-4" />
                  <h4 className="text-ink font-semibold text-lg">Thank You!</h4>
                  <p className="text-body text-sm mt-2">We'll contact you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-muted text-xs font-medium block mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className="w-full bg-surface-2 border border-line rounded-xl px-4 py-3 text-ink text-sm placeholder-faint focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-muted text-xs font-medium block mb-1.5">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+92 300 0000000"
                        className="w-full bg-surface-2 border border-line rounded-xl px-4 py-3 text-ink text-sm placeholder-faint focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-muted text-xs font-medium block mb-1.5">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full bg-surface-2 border border-line rounded-xl px-4 py-3 text-ink text-sm placeholder-faint focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-muted text-xs font-medium block mb-1.5">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="I'm interested in a 5 Marla plot..."
                      rows={4}
                      className="w-full bg-surface-2 border border-line rounded-xl px-4 py-3 text-ink text-sm placeholder-faint focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 focus:bg-white transition-all resize-none"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-green justify-center py-4 text-sm mt-2 w-full"
                  >
                    <Send size={15} />
                    Send Enquiry
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
