import { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Volume2, VolumeX, Play, ZoomIn, X,
  MapPin, ExternalLink, Compass, Clock, Phone,
} from 'lucide-react';
import { getPhase, phases } from '../data/phases';
import { PRIMARY_PHONE, WHATSAPP_LINK } from '../data/site';
import VRFrame from '../components/VRFrame';

function SectionHeading({ index, tag, title }) {
  return (
    <div className="mb-7 flex items-center gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#003B73] to-[#5DBB63] text-sm font-bold text-white">
        {index}
      </span>
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5DBB63]">{tag}</div>
        <h2 className="text-2xl font-bold leading-tight text-ink md:text-3xl">{title}</h2>
      </div>
    </div>
  );
}

function ZoomableImage({ src, alt, onZoom, maxH = false }) {
  return (
    <div className="card overflow-hidden rounded-3xl p-3 md:p-5">
      <button
        type="button"
        onClick={() => onZoom({ src, alt })}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl"
      >
        <img
          src={src}
          alt={alt}
          className={`mx-auto w-full object-contain transition-transform duration-700 group-hover:scale-[1.02] ${maxH ? 'max-h-[80vh] w-auto' : ''}`}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-[#003B73]/0 transition-all duration-300 group-hover:bg-[#003B73]/20">
          <span className="bg-white/90 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-ink-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <ZoomIn size={16} /> View Fullscreen
          </span>
        </div>
      </button>
    </div>
  );
}

function PhaseVideo({ src }) {
  const ref = useRef(null);
  const [muted, setMuted] = useState(true);

  // Autoplay muted on mount (browser-allowed). Sound is one tap away.
  useEffect(() => {
    const v = ref.current;
    if (v) v.play().catch(() => {});
  }, []);

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    const next = !muted;
    v.muted = next;
    setMuted(next);
    if (!next) v.play().catch(() => {});
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-black shadow-soft">
      <video
        ref={ref}
        src={src}
        className="block max-h-[78vh] w-full"
        autoPlay
        muted
        loop
        playsInline
        controls
      />
      <AnimatePresence>
        {muted && (
          <motion.button
            type="button"
            onClick={toggleSound}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 rounded-full bg-[#5DBB63] px-6 py-3.5 text-sm font-bold text-white shadow-[0_8px_30px_rgba(93,187,99,0.5)]"
          >
            <Play size={16} className="fill-white" />
            Tap for Sound
          </motion.button>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={toggleSound}
        className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/55 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-md transition-colors hover:bg-black/75"
      >
        {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        {muted ? 'Unmute' : 'Mute'}
      </button>
    </div>
  );
}

export default function PhaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const phase = getPhase(id);
  const [zoom, setZoom] = useState(null); // { src, alt } | null

  useEffect(() => {
    document.body.style.overflow = zoom ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [zoom]);

  if (!phase) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-5 px-6 text-center">
        <h1 className="text-3xl font-bold text-ink">Phase not found</h1>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
    );
  }

  const otherPhases = phases.filter((p) => p.id !== phase.id);

  return (
    <div className="relative min-h-screen pt-24 pb-20 md:pt-28">
      <div className="site-container relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={16} /> Back
        </button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="section-tag">{phase.tagline}</span>
          <h1 className="mt-2 text-4xl font-bold leading-tight text-ink md:text-6xl">
            Etihad Town <span className="text-gradient-green">{phase.name}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-body md:text-lg">
            {phase.description}
          </p>
        </motion.div>

        {phase.available ? (
          <div className="flex flex-col gap-16 md:gap-20">
            {/* 1. VIDEO */}
            <section>
              <SectionHeading index={1} tag="Walkthrough" title="Project Video" />
              <PhaseVideo src={phase.video} />
            </section>

            {/* 2. PAYMENT PLAN */}
            <section>
              <SectionHeading index={2} tag="Investment" title="Payment Plan" />
              <ZoomableImage
                src={phase.paymentPlan}
                alt={`${phase.title} payment plan`}
                onZoom={setZoom}
              />
              <p className="mt-3 px-1 text-sm text-muted">Tap the image to view it fullscreen.</p>
            </section>

            {/* 3. MAP */}
            <section>
              <SectionHeading index={3} tag="Master Plan" title="Society Map" />
              <ZoomableImage
                src={phase.map}
                alt={`${phase.title} society master plan`}
                onZoom={setZoom}
                maxH
              />
              <p className="mt-3 px-1 text-sm text-muted">Tap the map to zoom in and explore the master plan.</p>
            </section>

            {/* 4. VR TOUR */}
            <section>
              <SectionHeading index={4} tag="Immersive" title="360° Virtual Tour" />
              <VRFrame
                src={phase.vrTour}
                label={`Etihad Town ${phase.name}`}
                phone={PRIMARY_PHONE.display}
              />
              <p className="mt-3 px-1 text-sm text-muted">
                Drag to look around. Use fullscreen for the best experience.
              </p>
            </section>

            {/* 5. LOCATION */}
            <section>
              <SectionHeading index={5} tag="Find Us" title="Location" />
              <div className="card flex flex-col items-start gap-5 rounded-3xl p-7 md:flex-row md:items-center md:justify-between md:p-9">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand-blue/25 bg-brand-blue/10">
                    <MapPin size={22} className="text-brand-blue" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink-2">Etihad Town {phase.name}</h3>
                    <p className="mt-1 max-w-md text-sm leading-relaxed text-body">
                      Main Raiwind Road, Lahore. Tap below to open live directions in Google Maps.
                    </p>
                  </div>
                </div>
                <a href={phase.location} target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center md:w-auto">
                  <Compass size={16} /> Open in Google Maps <ExternalLink size={14} />
                </a>
              </div>
            </section>
          </div>
        ) : (
          /* Phase 4 — coming soon */
          <div className="flex flex-col gap-12">
            <div className="card flex flex-col items-center gap-5 rounded-3xl px-6 py-20 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#003B73] to-[#5DBB63]">
                <Clock size={30} className="text-white" />
              </span>
              <h2 className="text-2xl font-bold text-ink md:text-3xl">Details Coming Soon</h2>
              <p className="max-w-md text-body">
                Etihad Town {phase.name} is our newest launch. Video walkthrough, payment plan,
                map and 360° tour will be added here shortly.
              </p>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <a href={`tel:${PRIMARY_PHONE.tel}`} className="btn-primary justify-center">
                  <Phone size={15} /> Call for Updates
                </a>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-outline justify-center">
                  WhatsApp Us
                </a>
              </div>
              {phase.location && (
                <a href={phase.location} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-blue">
                  <MapPin size={15} /> View {phase.name} location on Google Maps
                </a>
              )}
            </div>
          </div>
        )}

        {/* Explore other phases */}
        <div className="mt-20 border-t border-line pt-12">
          <h3 className="mb-6 text-lg font-semibold text-ink">Explore Other Phases</h3>
          <div className="grid grid-cols-3 gap-3 sm:gap-5">
            {otherPhases.map((p) => (
              <Link
                key={p.id}
                to={`/phase/${p.id}`}
                className="card group flex flex-col items-center justify-center gap-1 rounded-2xl px-3 py-6 text-center transition-all hover:border-line-strong"
              >
                <span className="text-xs uppercase tracking-widest text-muted">Etihad Town</span>
                <span className="text-base font-bold text-ink-2 transition-colors group-hover:text-brand-green md:text-lg">{p.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Shared image lightbox (payment plan + map) */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center overflow-auto bg-black/95 p-4 backdrop-blur-sm"
            onClick={() => setZoom(null)}
          >
            <button onClick={() => setZoom(null)} className="fixed right-5 top-5 z-10 rounded-full bg-white/10 p-2 text-white/80 transition-colors hover:bg-white/20 hover:text-white">
              <X size={26} />
            </button>
            <motion.img
              src={zoom.src}
              alt={zoom.alt}
              initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }}
              className="mx-auto my-auto h-auto max-w-full rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
