import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const cards = [
  {
    slug: 'phase-1',
    title: 'Etihad Town Phase 1',
    transition: 'Expanding Card Transition',
    description: 'Legacy residential inventory with mature surroundings and direct city connectivity.',
  },
  {
    slug: 'phase-2',
    title: 'Etihad Town Phase 2',
    transition: 'Card-to-Page Transition',
    description: 'Balanced development plan with curated amenities and future-facing access routes.',
  },
  {
    slug: 'phase-3',
    title: 'Etihad Town Phase 3',
    transition: 'Container Transform Animation',
    description: 'Growth-focused phase designed for rising value and premium neighborhood planning.',
  },
  {
    slug: 'phase-4',
    title: 'Etihad Town Phase 4',
    transition: 'Morphing Card Animation',
    description: 'Newest launch with modern planning standards and long-term investment upside.',
  },
];

const cardLayout = [
  { x: -316, y: 18, rotate: -12, scale: 0.985, zIndex: 34 },
  { x: -112, y: 2, rotate: -4, scale: 1, zIndex: 28 },
  { x: 112, y: 2, rotate: 4, scale: 1, zIndex: 27 },
  { x: 316, y: 18, rotate: 12, scale: 0.985, zIndex: 22 },
];

const fanCardTransition = { type: 'spring', stiffness: 260, damping: 28, mass: 0.95 };
const expandTransition = { duration: 0.52, ease: [0.22, 1, 0.36, 1] };

export default function Phases() {
  const [activeSlug, setActiveSlug] = useState(null);
  const [hoveredSlug, setHoveredSlug] = useState(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 900);
  const activeCard = useMemo(
    () => cards.find((card) => card.slug === activeSlug) ?? null,
    [activeSlug],
  );

  useEffect(() => {
    const setFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const slug = params.get('phase');
      if (!slug) {
        setActiveSlug(null);
        return;
      }
      if (cards.some((card) => card.slug === slug)) {
        setActiveSlug(slug);
      } else {
        setActiveSlug(null);
      }
    };
    setFromUrl();
    window.addEventListener('popstate', setFromUrl);
    return () => window.removeEventListener('popstate', setFromUrl);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeCard ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeCard]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const openCard = (slug) => {
    const next = new URL(window.location.href);
    next.searchParams.set('phase', slug);
    window.history.pushState(null, '', next.toString());
    setActiveSlug(slug);
  };

  const closeCard = () => {
    const next = new URL(window.location.href);
    next.searchParams.delete('phase');
    window.history.pushState(null, '', next.toString());
    setActiveSlug(null);
  };

  return (
    <section id="phases" className="phase-section relative overflow-hidden py-16 md:py-20">
      <div className="site-container">
        <div className="text-center mb-1 md:mb-2">
          <span className="section-tag">Interactive Phases</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-1 leading-tight">
            Experience Each Phase
            <span className="block text-gradient-blue">With Premium Motion</span>
          </h2>
        </div>

        <div className="fan-stage" role="list" aria-label="Etihad Town phases">
          {cards.map((card, index) => {
            const isActive = activeSlug === card.slug;
            const isHovered = hoveredSlug === card.slug;
            const isOtherHovered = hoveredSlug && hoveredSlug !== card.slug;
            const layout = cardLayout[index];

            return (
              <motion.button
                key={card.slug}
                type="button"
                layoutId={`phase-card-${card.slug}`}
                onClick={() => openCard(card.slug)}
                onMouseEnter={() => setHoveredSlug(card.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
                onFocus={() => setHoveredSlug(card.slug)}
                onBlur={() => setHoveredSlug(null)}
                whileTap={{ scale: 0.98 }}
                animate={{
                  x: isMobile ? 0 : isActive ? 0 : layout.x,
                  y: isMobile ? 0 : isActive ? 0 : isHovered ? layout.y - 24 : layout.y,
                  rotate: isMobile ? 0 : isActive ? 0 : layout.rotate,
                  scale: isActive ? 1 : isHovered ? 1.04 : layout.scale,
                  opacity: isOtherHovered ? 0.72 : 1,
                }}
                transition={fanCardTransition}
                className="fan-card glass"
                style={{ zIndex: isHovered ? 80 : layout.zIndex }}
                role="listitem"
                aria-haspopup="dialog"
                aria-label={card.title}
              >
                <motion.span
                  layout="position"
                  transition={expandTransition}
                  className="fan-card__badge"
                >
                  {card.transition}
                </motion.span>
                <motion.h3
                  layout="position"
                  transition={expandTransition}
                  className="fan-card__title"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layout="position"
                  transition={expandTransition}
                  className="fan-card__text"
                >
                  {card.description}
                </motion.p>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeCard && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.26, ease: 'easeOut' }}
              className="phase-overlay"
              onClick={closeCard}
            />
            <motion.section
              layoutId={`phase-card-${activeCard.slug}`}
              className="phase-page"
              role="dialog"
              aria-modal="true"
              transition={expandTransition}
            >
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.28, delay: 0.14, ease: 'easeOut' }}
                className="phase-page__content"
              >
                <button type="button" className="phase-close" onClick={closeCard}>
                  Close
                </button>
                <motion.span
                  layout="position"
                  transition={expandTransition}
                  className="fan-card__badge"
                >
                  {activeCard.transition}
                </motion.span>
                <motion.h3
                  layout="position"
                  transition={expandTransition}
                  className="phase-page__title"
                >
                  {activeCard.title}
                </motion.h3>
                <motion.p
                  layout="position"
                  transition={expandTransition}
                  className="phase-page__text"
                >
                  {activeCard.description}
                </motion.p>
              </motion.div>
            </motion.section>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
