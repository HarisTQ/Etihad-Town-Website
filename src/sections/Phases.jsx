import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { phases } from '../data/phases';

const cardLayout = [
  { x: -316, y: 18, rotate: -12, scale: 0.985, zIndex: 34 },
  { x: -112, y: 2, rotate: -4, scale: 1, zIndex: 28 },
  { x: 112, y: 2, rotate: 4, scale: 1, zIndex: 27 },
  { x: 316, y: 18, rotate: 12, scale: 0.985, zIndex: 22 },
];

const fanCardTransition = { type: 'spring', stiffness: 260, damping: 28, mass: 0.95 };

export default function Phases() {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 900);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const openPhase = (id) => navigate(`/phase/${id}`);

  return (
    <section id="phases" className="phase-section section relative bg-page-tint">
      <div className="site-container">
        <div className="mb-8 text-center md:mb-10">
          <span className="section-tag">Our Phases</span>
          <h2 className="mt-1 text-4xl font-bold leading-tight text-ink md:text-5xl">
            Explore Each Phase
            <span className="block text-gradient-blue">Tap a Card for Full Details</span>
          </h2>
        </div>

        <div className="fan-stage" role="list" aria-label="Etihad Town phases">
          {phases.map((card, index) => {
            const isHovered = hoveredId === card.id;
            const isOtherHovered = hoveredId && hoveredId !== card.id;
            const layout = cardLayout[index];

            return (
              <motion.button
                key={card.id}
                type="button"
                onClick={() => openPhase(card.id)}
                onMouseEnter={() => setHoveredId(card.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(card.id)}
                onBlur={() => setHoveredId(null)}
                whileTap={{ scale: 0.98 }}
                animate={{
                  x: isMobile ? 0 : layout.x,
                  y: isMobile ? 0 : isHovered ? layout.y - 24 : layout.y,
                  rotate: isMobile ? 0 : layout.rotate,
                  scale: isHovered ? 1.04 : isMobile ? 1 : layout.scale,
                  opacity: isOtherHovered ? 0.72 : 1,
                }}
                transition={fanCardTransition}
                className="fan-card fan-card--imageOnly"
                style={{
                  zIndex: isHovered ? 80 : layout.zIndex,
                  background: `url(${card.card}) center / cover no-repeat`,
                }}
                role="listitem"
                aria-label={`${card.title} — view details`}
              >
                {/* Hover/tap affordance — card art already shows the phase name */}
                <span className="fan-card__label">
                  <span className="fan-card__label-cta">
                    View Details <ArrowRight size={14} />
                  </span>
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
