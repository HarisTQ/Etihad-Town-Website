import { motion } from 'framer-motion';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';
import societyMapImg from '../assets/society_map.png';

export default function Location() {
  const googleMapsUrl = 'https://maps.google.com/?q=Etihad+Town+Phase+4+Lahore';
  const embedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54536.98!2d74.2!3d31.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904000000000%3A0x0!2zRXRpaGFkIFRvd24!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s';

  return (
    <section id="location" className="py-16 md:py-24 relative overflow-hidden">
      {/* Bg decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220] via-[#0B1220] to-[#0B1220]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] h-[400px] bg-[#003B73]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 site-container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Prime
            <span className="text-gradient-blue"> Location</span>
          </h2>
          <p className="text-white/55 mt-4 max-w-lg mx-auto text-base leading-relaxed text-center">
            Located on Main Raiwind Road — Lahore's fastest growing real estate corridor with exceptional connectivity.
          </p>

        </motion.div>

        {/* Split layout */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Society map */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="group"
          >
            <div className="glass rounded-3xl overflow-hidden p-3">
              <div className="rounded-2xl overflow-hidden relative">
                <img
                  src={societyMapImg}
                  alt="Etihad Town Phase 4 Society Map"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="glass text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    Society Master Plan
                  </span>
                </div>
              </div>
            </div>

            {/* Location highlights */}
            <div className="grid grid-cols-2 gap-4 md:gap-5 mt-6">
              {[
                { label: 'Ring Road', distance: '5 min' },
                { label: 'Lahore Airport', distance: '20 min' },
                { label: 'DHA Phase 9', distance: '15 min' },
                { label: 'Bahria Town', distance: '10 min' },
              ].map((item) => (
                <div key={item.label} className="glass rounded-xl p-4 md:p-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Navigation size={13} className="text-white" />
                    <span className="text-white/70 text-xs font-medium">{item.label}</span>
                  </div>
                  <span className="text-[#5DBB63] text-xs font-bold">{item.distance}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Google Maps + info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            {/* Map address card */}
            <div className="glass rounded-2xl px-6 py-5 md:px-8 md:py-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#003B73]/30 border border-[#003B73]/50 flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-base">Etihad Town Phase 4</h4>
                  <p className="text-white/55 text-sm mt-1 leading-relaxed">
                    Main Raiwind Road, Near Kala Shah Kaku, Lahore, Punjab, Pakistan
                  </p>
                  <motion.a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 mt-4 text-[#5DBB63] text-sm font-semibold hover:text-white transition-colors"
                  >
                    <ExternalLink size={14} />
                    Open in Google Maps
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="glass rounded-2xl overflow-hidden" style={{ height: '320px' }}>
              <iframe
                src={embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Etihad Town Phase 4 Location"
              />
            </div>

            {/* CTA */}
            <motion.a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary justify-center py-4 text-sm w-full sm:w-auto"
            >
              <ExternalLink size={15} />
              Get Directions on Google Maps
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
