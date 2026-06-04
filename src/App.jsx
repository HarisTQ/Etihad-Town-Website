import { useEffect, useLayoutEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import Home from './pages/Home';
import PhaseDetail from './pages/PhaseDetail';
import VRTours from './pages/VRTours';

// Reset scroll on every route change (but let in-page #hash links scroll
// themselves on the Home page).
function ScrollManager() {
  const { pathname, hash } = useLocation();
  const isInitialHomeLoad = useRef(true);
  const skipInitialHashScroll = useRef(false);

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    if (isInitialHomeLoad.current && pathname === '/') {
      window.scrollTo(0, 0);

      if (hash) {
        skipInitialHashScroll.current = true;
        window.history.replaceState(null, '', '/');
      }
    }

    isInitialHomeLoad.current = false;
  }, [pathname, hash]);

  useEffect(() => {
    if (skipInitialHashScroll.current) {
      skipInitialHashScroll.current = false;
      return;
    }

    if (hash) {
      // Wait a tick for the target route/section to render, then scroll to it.
      const id = hash.slice(1);
      const t = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen bg-page overflow-x-hidden w-full relative">
      <ScrollManager />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/phase/:id" element={<PhaseDetail />} />
          <Route path="/vr-tours" element={<VRTours />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}
