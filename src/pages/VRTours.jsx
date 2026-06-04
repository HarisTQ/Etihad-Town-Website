import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, ArrowRight } from 'lucide-react';
import { phases } from '../data/phases';
import { PRIMARY_PHONE } from '../data/site';
import VRFrame from '../components/VRFrame';

export default function VRTours() {
  const tours = phases.filter((p) => p.vrTour);
  const [active, setActive] = useState(tours[0]);

  return (
    <div className="relative min-h-screen pt-24 pb-20 md:pt-28">
      <div className="site-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <span className="section-tag"><Compass size={11} className="mr-1 inline" /> Immersive Experience</span>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-ink md:text-6xl">
            360° <span className="text-gradient-green">Virtual Tours</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-body">
            Walk through Etihad Town from anywhere. Select a phase below to explore its
            fully immersive 360° virtual tour.
          </p>
        </motion.div>

        {/* Phase selector tabs */}
        <div className="mb-7 flex flex-wrap justify-center gap-3">
          {tours.map((p) => {
            const isActive = active.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActive(p)}
                className={
                  isActive
                    ? 'btn-green btn-sm rounded-full'
                    : 'btn-sm card rounded-full text-body hover:text-ink'
                }
              >
                Etihad Town {p.name}
              </button>
            );
          })}
        </div>

        {/* Active tour */}
        <motion.div key={active.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          <VRFrame
            src={active.vrTour}
            label={`Etihad Town ${active.name}`}
            phone={PRIMARY_PHONE.display}
            height="72vh"
            masks={active.vrMask}
          />
          <div className="mt-4 flex flex-col items-start justify-between gap-3 px-1 sm:flex-row sm:items-center">
            <p className="text-sm text-muted">
              Now viewing: <span className="font-semibold text-ink-2">Etihad Town {active.name}</span> — drag to look around.
            </p>
            <Link to={`/phase/${active.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-blue">
              See full {active.name} details <ArrowRight size={15} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
