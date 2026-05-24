import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Features from './sections/Features';
import Phases from './sections/Phases';
import Location from './sections/Location';
import PaymentPlan from './sections/PaymentPlan';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0B1220] overflow-x-hidden w-full relative">
      {/* SEO-friendly title */}
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Phases />
        <Location />
        <PaymentPlan />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}
