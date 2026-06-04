import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Maximize2, Loader2, Phone, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

function VRMask({ label, phone, masks = [], onFullscreen, onClose, fullscreen = false }) {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[5] flex items-center justify-between gap-2 bg-gradient-to-b from-[#0B1220] via-[#0B1220]/95 to-[#0B1220]/78 px-4 sm:px-6"
        style={{ height: fullscreen ? '15%' : '14%', minHeight: fullscreen ? 64 : 56 }}
      >
        <div className="flex min-w-0 flex-col leading-none">
          <span className="truncate text-sm font-bold uppercase tracking-[0.16em] text-white sm:text-base">
            {label || 'Etihad Town'}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5DBB63] sm:text-[11px]">
            360 Virtual Tour
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {phone && (
            <a
              href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
              className="pointer-events-auto hidden items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 sm:inline-flex"
            >
              <Phone size={13} className="text-[#5DBB63]" />
              <span>{phone}</span>
            </a>
          )}
          {onFullscreen && (
            <button
              type="button"
              onClick={onFullscreen}
              className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              <Maximize2 size={13} />
              <span className="hidden sm:inline">Fullscreen</span>
            </button>
          )}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              <X size={14} />
              <span className="hidden sm:inline">Close</span>
            </button>
          )}
        </div>
      </div>

      {masks.map((mask, index) => {
        const position =
          mask.corner === 'top-left'
            ? { left: 0, top: 0 }
            : mask.corner === 'top-right'
              ? { right: 0, top: 0 }
              : mask.corner === 'bottom-left'
                ? { left: 0, bottom: 0 }
                : { right: 0, bottom: 0 };

        return (
          <div
            key={`${mask.corner}-${index}`}
            className="pointer-events-none absolute z-[4] bg-[#0B1220]"
            style={{
              ...position,
              width: `${mask.w}%`,
              height: `${mask.h}%`,
            }}
          />
        );
      })}
    </>
  );
}

function VRCanvas({ src, label, phone, loaded, setLoaded, masks, onFullscreen, onClose, fullscreen = false, canvasHeight = '70vh' }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-soft"
      style={{ height: fullscreen ? '100%' : canvasHeight }}
    >
      {!loaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 text-muted">
          <Loader2 size={30} className="animate-spin" />
          <span className="text-sm tracking-wide">Loading 360 tour...</span>
        </div>
      )}

      <iframe
        src={src}
        title={label || '360 Virtual Tour'}
        className="h-full w-full border-0"
        allow="fullscreen; accelerometer; gyroscope; magnetometer; xr-spatial-tracking"
        allowFullScreen
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />

      <VRMask
        label={label}
        phone={phone}
        masks={masks}
        onFullscreen={onFullscreen}
        onClose={onClose}
        fullscreen={fullscreen}
      />
    </div>
  );
}

export default function VRFrame({ src, label, phone, height = '70vh', hideBranding = true, masks = [] }) {
  const [loaded, setLoaded] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenLoaded, setFullscreenLoaded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = fullscreen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [fullscreen]);

  return (
    <>
      <div style={{ height }}>
        <VRCanvas
          src={src}
          label={label}
          phone={phone}
          loaded={loaded}
          setLoaded={setLoaded}
          masks={hideBranding ? masks : []}
          onFullscreen={() => setFullscreen(true)}
          canvasHeight={height}
        />
      </div>

      {createPortal(
        <AnimatePresence>
          {fullscreen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[220] bg-black/96 p-3 md:p-5"
            >
              <VRCanvas
                src={src}
                label={label}
                phone={phone}
                loaded={fullscreenLoaded}
                setLoaded={setFullscreenLoaded}
                masks={hideBranding ? masks : []}
                onClose={() => setFullscreen(false)}
                fullscreen
              />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
