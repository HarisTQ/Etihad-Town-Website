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

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone / Call',
    value: '+92 300 123 4567',
    sub: 'Mon – Sat, 9am – 7pm',
    href: 'tel:+923001234567',
    color: '#003B73',
  },
  {
    icon: MessageSquare,
    label: 'WhatsApp',
    value: '+92 300 123 4567',
    sub: 'Quick response guaranteed',
    href: 'https://wa.me/923001234567',
    color: '#5DBB63',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@etihadtownlhr.com',
    sub: 'We reply within 24 hours',
    href: 'mailto:info@etihadtownlhr.com',
    color: '#003B73',
  },
  {
    icon: MapPin,
    label: 'Sales Office',
    value: 'Main Raiwind Road, Lahore',
    sub: 'Visit our display center',
    href: 'https://maps.google.com/?q=Etihad+Town+Phase+4+Lahore',
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
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-16 md:py-24 pt-24 md:pt-32 relative overflow-hidden">
      {/* BG */}

      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#5DBB63]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-[#003B73]/8 rounded-full blur-3xl pointer-events-none" />

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
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 leading-tight">
            Contact
            <span className="text-gradient-blue"> Us</span>
          </h2>
          <div className="w-full flex justify-center">
            <p className="text-white/55 mt-4 w-full max-w-3xl text-base leading-relaxed text-center">
              Our expert sales consultants are ready to guide you through every step of your investment journey.
            </p>
          </div>

        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start mt-20 lg:mt-24">
          {/* Contact info cards */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-4 md:gap-5"
          >
            <h3 className="text-white font-semibold text-lg mb-2 mt-20 md:mt-28">Reach Us Directly</h3>
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                  className="glass rounded-2xl px-5 py-4 md:px-6 md:py-5 flex items-center gap-6 group border border-white/5 hover:border-white/15 transition-all"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: `${info.color}20`,
                      border: `1px solid ${info.color}40`,
                    }}
                  >
                    <Icon size={20} stroke="white" strokeWidth={1.8} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white/50 text-xs font-medium uppercase tracking-wider">{info.label}</div>
                    <div className="text-white font-semibold text-sm mt-0.5 truncate">{info.value}</div>
                    <div className="text-white/40 text-xs mt-0.5">{info.sub}</div>
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
            <div className="glass rounded-3xl px-6 py-8 md:px-10 md:py-10 flex flex-col">
              <h3 className="text-white font-semibold text-lg mb-6 text-center">Send an Enquiry</h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle size={48} className="text-[#5DBB63] mb-4" />
                  <h4 className="text-white font-semibold text-lg">Thank You!</h4>
                  <p className="text-white/55 text-sm mt-2">We'll contact you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/60 text-xs font-medium block mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#5DBB63]/60 focus:bg-white/8 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-white/60 text-xs font-medium block mb-1.5">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+92 300 0000000"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#5DBB63]/60 focus:bg-white/8 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-white/60 text-xs font-medium block mb-1.5">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#5DBB63]/60 focus:bg-white/8 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-xs font-medium block mb-1.5">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="I'm interested in a 5 Marla plot..."
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#5DBB63]/60 focus:bg-white/8 transition-all resize-none"
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
