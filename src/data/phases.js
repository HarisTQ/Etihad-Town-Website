import videoP1 from '../assets/video-p1.mp4';
import videoP2 from '../assets/Video-p2.mp4';
import videoP3 from '../assets/video-p3.mp4';
import mapP1 from '../assets/map-p1.jpg';
import mapP2 from '../assets/map-p2.jpg';
import mapP3 from '../assets/map-p3.jpg';
import payP1 from '../assets/payment-plan-1.webp';
import payP2 from '../assets/payment-plan-2.webp';
import payP3 from '../assets/paymwnt-plan-3c.webp';
import card1 from '../assets/phase1-card.svg';
import card2 from '../assets/phase2-card.svg';
import card3 from '../assets/phase3-card.svg';
import card4 from '../assets/phase4-card.svg';

// One source of truth for every phase. Phase 4 is intentionally left
// `available: false` with no media — the detail page renders a
// "coming soon" state until the client provides Phase 4 data.
//
// vrMask: opaque corner panels placed over the embedded VR tour to hide
// the official Etihad logo / phone number baked into the third-party tour.
// Each entry is a corner + size (in % of the frame). Calibrated visually.
export const phases = [
  {
    id: '1',
    slug: 'phase-1',
    name: 'Phase 1',
    title: 'Etihad Town Phase 1',
    tagline: 'Established Living, Proven Value',
    description:
      'Legacy residential inventory with mature surroundings, developed infrastructure and direct city connectivity. A settled community with proven appreciation.',
    card: card1,
    video: videoP1,
    paymentPlan: payP1,
    map: mapP1,
    vrTour: 'https://etihadtown.com.pk/ET-tour/et1.html',
    location: 'https://maps.app.goo.gl/pcJssyYQLgSmp4Un8',
    mapEmbed: 'https://www.google.com/maps?q=Etihad+Town+Phase+1,+Raiwind+Road,+Lahore&z=14&output=embed',
    vrMask: [
      { corner: 'top-left', w: 22, h: 14 },
      { corner: 'top-right', w: 22, h: 14 },
    ],
    available: true,
  },
  {
    id: '2',
    slug: 'phase-2',
    name: 'Phase 2',
    title: 'Etihad Town Phase 2',
    tagline: 'Balanced Planning, Modern Amenities',
    description:
      'A balanced development plan with curated amenities, wide carpeted roads and future-facing access routes — designed for comfortable family living.',
    card: card2,
    video: videoP2,
    paymentPlan: payP2,
    map: mapP2,
    vrTour: 'https://etihadtown.com.pk/vtour/index.html',
    location: 'https://maps.app.goo.gl/JwaymhpWwA1wjsrs9',
    mapEmbed: 'https://www.google.com/maps?q=Etihad+Town+Phase+2,+Lahore&z=14&output=embed',
    vrMask: [
      { corner: 'top-left', w: 22, h: 14 },
      { corner: 'top-right', w: 22, h: 14 },
    ],
    available: true,
  },
  {
    id: '3',
    slug: 'phase-3',
    name: 'Phase 3',
    title: 'Etihad Town Phase 3',
    tagline: 'Growth-Focused, Premium Neighborhood',
    description:
      'Growth-focused phase engineered for rising value and premium neighborhood planning, with modern development standards and strong investment upside.',
    card: card3,
    video: videoP3,
    paymentPlan: payP3,
    map: mapP3,
    vrTour: 'https://etihadtown.com.pk/ET3-tour/',
    location: 'https://maps.app.goo.gl/5sbG6SuU4ehp2xJr5',
    mapEmbed: 'https://www.google.com/maps?q=Etihad+Town+Phase+3,+Lahore&z=14&output=embed',
    vrMask: [
      { corner: 'top-left', w: 22, h: 14 },
      { corner: 'top-right', w: 22, h: 14 },
    ],
    available: true,
  },
  {
    id: '4',
    slug: 'phase-4',
    name: 'Phase 4',
    title: 'Etihad Town Phase 4',
    tagline: 'The Newest Launch',
    description:
      'The newest launch with modern planning standards and long-term investment upside. Full details are being finalised — check back soon.',
    card: card4,
    video: null,
    paymentPlan: null,
    map: null,
    vrTour: null,
    location: 'https://maps.app.goo.gl/qkffzDEaCbWEovvK6',
    mapEmbed: 'https://www.google.com/maps?q=Etihad+Town+Phase+4,+Kahna+Nau,+Lahore&z=14&output=embed',
    vrMask: [],
    available: false,
  },
];

export const getPhase = (id) => phases.find((p) => p.id === id || p.slug === id);
