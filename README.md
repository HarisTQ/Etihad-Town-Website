# Etihad Town Lahore — Marketing Website

A modern, responsive marketing site for **Etihad Town Lahore**, showcasing each development phase with a dedicated detail page (project video, payment plan, society map, 360° virtual tour and location) plus a combined VR Tours page. Built as a clean, light, production-ready single-page app.

🔗 Brand reference: [etihadtown.com.pk](https://etihadtown.com.pk/)

---

## ✨ Features

- **Light, professional UI** with a centralized design-token system (navy `#003B73` + green `#5DBB63` brand accents on a clean white/light-gray surface).
- **Per-phase detail pages** (`/phase/1` … `/phase/4`) — each with, in order:
  1. Project video (autoplays muted, one-tap unmute)
  2. Payment plan (zoomable image)
  3. Society map (zoomable image)
  4. 360° virtual tour (embedded iframe)
  5. Location (Google Maps link)
- **Phase 4** is intentionally a polished *"Details Coming Soon"* placeholder until its assets are supplied — flip one flag to activate it (see [Adding Phase 4](#adding--editing-phase-content)).
- **VR Tours page** (`/vr-tours`) with a phase selector.
- **Branded VR masking** — the embedded third-party 360° tours have their baked-in logo/phone covered by an on-brand top bar (see [VR tour masking](#vr-tour-masking)).
- **Responsive** for mobile + desktop (phase cards show 2-per-row on mobile).
- **Engaging floating contact** button (Call + WhatsApp) and a working enquiry form that forwards to WhatsApp.
- Smooth `framer-motion` animations throughout.

---

## 🧰 Tech stack

| Area | Choice |
|------|--------|
| Framework | React 19 |
| Build tool | Vite 8 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) + design tokens in `src/index.css` |
| Routing | react-router-dom 7 |
| Animation | framer-motion 12 |
| Icons | lucide-react |
| Linting | ESLint 10 |

---

## ✅ Requirements

- **Node.js ≥ 20.19** (Vite 8 requirement; Node 22 LTS recommended)
- npm (ships with Node)

All app dependencies are declared in [`package.json`](./package.json) — `npm install` is the single setup step.

---

## 🚀 Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Production build (outputs to dist/)
npm run build

# 4. Preview the production build locally
npm run preview

# 5. Lint
npm run lint
```

---

## 📁 Project structure

```
src/
├── main.jsx              # App entry — wraps <App/> in <BrowserRouter>
├── App.jsx               # Routes + persistent chrome (Navbar/Footer/FloatingContact) + scroll manager
├── index.css            # Design system: tokens, .section, .card, .btn-*, .section-tag, fan-card, etc.
├── components/
│   ├── Navbar.jsx        # Transparent over hero → solid white on scroll / inner routes
│   ├── Footer.jsx
│   ├── FloatingContact.jsx   # Call + WhatsApp floating action button
│   └── VRFrame.jsx       # Reusable 360° iframe with branded masking bar
├── sections/             # Home-page sections
│   ├── Hero.jsx
│   ├── Phases.jsx        # Interactive fan of phase cards → navigates to /phase/:id
│   ├── Features.jsx
│   └── Contact.jsx
├── pages/
│   ├── Home.jsx          # Hero → Phases → Features → Contact
│   ├── PhaseDetail.jsx   # /phase/:id
│   └── VRTours.jsx       # /vr-tours
├── data/
│   ├── site.js           # Contact details (phones, email, WhatsApp, address)
│   └── phases.js         # Single source of truth for all phase content
└── assets/               # Videos, maps (jpg), payment plans, phase card art, hero images
```

### Routes
| Path | Page |
|------|------|
| `/` | Home |
| `/phase/:id` | Phase detail (`1`–`4`) |
| `/vr-tours` | VR Tours |

---

## ✏️ Adding / editing content

### Phase content
All phase data lives in **`src/data/phases.js`**. Each phase object:

```js
{
  id: '1', slug: 'phase-1', name: 'Phase 1',
  title: 'Etihad Town Phase 1',
  tagline: '…', description: '…',
  card: card1,                 // card art (imported asset)
  video: videoP1,              // mp4 (imported asset)
  paymentPlan: payP1,          // image (imported asset)
  map: mapP1,                  // image (imported asset)
  vrTour: 'https://…',         // 360° tour URL
  location: 'https://maps…',   // Google Maps link
  available: true,             // false → renders the "Coming Soon" page
}
```

**To activate Phase 4:** import its assets at the top of `phases.js`, fill `video` / `paymentPlan` / `map` / `vrTour`, and set `available: true`. No component changes needed.

### Contact details
Phone numbers, WhatsApp, email and address are centralized in **`src/data/site.js`** — edit once, updates everywhere (navbar CTA, contact section, footer, floating button, enquiry form).

---

## 🎨 Design system

Tokens are defined in `src/index.css` (`:root` + Tailwind `@theme`) and exposed as utilities:

- **Colors:** `bg-page`, `bg-page-tint`, `bg-surface`, `bg-surface-2`, `border-line`, `text-ink`/`text-ink-2`/`text-body`/`text-muted`/`text-faint`, `text-brand-blue`, `text-brand-green`.
- **Layout:** `.site-container` (max-width + responsive gutters), `.section` (vertical rhythm).
- **Surfaces:** `.card`, `.shadow-soft`, `.shadow-soft-lg`.
- **Buttons:** `.btn-primary` (navy), `.btn-green`, `.btn-outline`, `.btn-sm`.
- **Eyebrow:** `.section-tag`.

Reuse these instead of ad-hoc colors so the UI stays consistent.

---

## 🕶️ VR tour masking

The official 360° tours (`etihadtown.com.pk/...`) embed their own logo (top-left) and phone (top-right). Because they're cross-origin, we can't edit their DOM, so **`VRFrame.jsx`** overlays an on-brand dark top bar that covers that strip and shows our own label + number. Keep that bar dark when restyling — it is functional, not decorative.

---

## ☁️ Deployment

The app is a client-side SPA, so the host must rewrite all paths to `index.html` for deep links (e.g. refreshing `/phase/1`).

- **Vercel:** handled by the included [`vercel.json`](./vercel.json) (`rewrites` → `/index.html`).
- **Netlify / other static hosts:** add an equivalent SPA fallback (e.g. a `_redirects` file with `/*  /index.html  200`).

Build command: `npm run build` · Output directory: `dist`.

---

## 📝 Notes

- **Video file sizes:** the bundled phase walkthrough videos are large (≈ 48–92 MB each). For production they should be compressed (e.g. 720p H.264, ~5–10 MB) for faster mobile loading.
- Society maps are provided as images (converted from the source PDFs) so they render reliably on every device, including mobile.
