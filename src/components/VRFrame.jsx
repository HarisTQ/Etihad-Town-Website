import { useState } from 'react';
import { Maximize2, ExternalLink, Loader2, Phone } from 'lucide-react';

/**
 * Embeds a third-party 3DVista VR tour. All three official Etihad tours bake
 * their own logo (top-left) and phone number (top-right) into the skin. Since
 * the tour is cross-origin we can't edit its DOM, so we cover the top strip
 * with our own branded bar — this hides their branding and reads as an
 * intentional header. The left date-timeline (lower down) stays visible.
 */
export default function VRFrame({ src, label, phone, height = '70vh', hideBranding = true }) {
  const [loaded, setLoaded] = useState(false);

  const openFull = () => window.open(src, '_blank', 'noopener,noreferrer');

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-soft"
      style={{ height }}
    >
      {!loaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 text-muted">
          <Loader2 size={30} className="animate-spin" />
          <span className="text-sm tracking-wide">Loading 360° tour…</span>
        </div>
      )}

      <iframe
        src={src}
        title={label || '360° Virtual Tour'}
        className="h-full w-full border-0"
        allow="fullscreen; accelerometer; gyroscope; magnetometer; xr-spatial-tracking"
        allowFullScreen
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />

      {/* Branded top bar that masks the official logo / phone number */}
      {hideBranding && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[5] flex items-center justify-between gap-2 bg-gradient-to-b from-[#0B1220] via-[#0B1220]/95 to-[#0B1220]/80 px-4 sm:px-6"
          style={{ height: '14%', minHeight: 56 }}
        >
          <div className="flex min-w-0 flex-col leading-none">
            <span className="truncate text-sm font-bold uppercase tracking-[0.16em] text-white sm:text-base">
              {label || 'Etihad Town'}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5DBB63] sm:text-[11px]">
              360° Virtual Tour
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {phone && (
              <a
                href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 sm:text-sm"
              >
                <Phone size={13} className="text-[#5DBB63]" />
                <span className="hidden sm:inline">{phone}</span>
              </a>
            )}
            <button
              type="button"
              onClick={openFull}
              className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              <Maximize2 size={13} />
              <span className="hidden sm:inline">Fullscreen</span>
              <ExternalLink size={12} className="opacity-70 sm:hidden" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
