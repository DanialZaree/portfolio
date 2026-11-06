# Design System & Technical Design Specification (design.md)
**Project**: Danial Zaree Portfolio  
**Target URL**: [danialzaree.dev](https://danialzaree.dev/)  
**Stack**: React 18, Vite, Tailwind CSS v3, GSAP (ScrollTrigger), Lenis Smooth Scroll, Iconify

---

## 1. Design Philosophy & Aesthetic Identity

The design system of this portfolio embodies a **Modernist Editorial & Motion-Driven Brutalism** aesthetic. It moves away from generic digital portfolio templates in favor of a bespoke, tactile art-direction:

- **Restrained Monochromatic Stone Palette**: Soft off-whites, warm secondary stone greys, and deep charcoal/obsidian accents.
- **Architectural & Editorial Typography**: Paired variable fonts featuring extreme contrast between massive display titles and refined body text.
- **Dynamic Dual-Tone Theme Inversion**: Smooth background and chrome color transitions between light and dark modes triggered seamlessly by GSAP ScrollTrigger as the user scrolls into specific sections.
- **Micro-Interactions & Bespoke Physics**: Custom magnetic fluid cursor, masked polygon title reveals, staggered timeline entrances, and buttery smooth momentum scrolling via Lenis.

---

## 2. Color Palette & Token System

The portfolio avoids standard saturated colors, utilizing calibrated neutral hues with subtle warm undertones.

### Color Tokens (Tailwind Configuration)

| Token Name | Hex Code | Visual Role & Usage |
| :--- | :--- | :--- |
| `primary-200` | `#F2F2F2` | Project card titles, high-contrast light highlights in dark mode |
| `primary-300` | `#E6E6E6` | Light subtle borders and accents |
| `primary-400` | `#D9D9D9` | Subtitles, project category metadata |
| `secondary-100`| `#FAFAF9` | Primary page canvas background (light sections) |
| `secondary-200`| `#E8E8E3` | Button foreground text, light element borders |
| `secondary-300`| `#DDDDD5` | Active nav color in dark mode, code badge backgrounds |
| `secondary-400`| `#D1D1C7` | Role statement text, selection highlight background |
| `secondary-500`| `#AEAE9D` | Large service expertise item typography |
| `secondary-600`| `#8C8C73` | Hover underline bars, custom cursor dot, section icon ornaments |
| `secondary-700`| `#70705C` | CTA hover underlines, active text highlights |
| `accent-400` | `#0E0E0C` | Primary dark canvas background (inverted sections), deep headings |
| `accent-300` | `#262626` | Hero typography, standard body copy, button base background |
| `accent-200` | `#4D4D4D` | Secondary body text, descriptions, muted prompts |
| `accent-100` | `#666666` | Form input underlines, social icons, subtle dividing lines |

### Global Pseudo-Elements & Selection

```css
::selection, ::-moz-selection, ::-webkit-selection {
  background: #D1D1C7;
}
```

---

## 3. Typography & Text Effects

### Font Families

1. **`CabinetGrotesk-Variable`** (`sans-serif`):
   - **File**: `assets/fonts/CabinetGrotesk-Variable.ttf` (weight range `100` to `900`)
   - **Applied to**: Body paragraphs (`p`), spans, links (`a`), form labels, buttons, navigation items.
   - **Characteristics**: Geometric grotesque with expressive ink traps, high legibility at micro sizes.

2. **`GeneralSans-Variable`** (`sans-serif`):
   - **File**: `assets/fonts/GeneralSans-Variable.ttf` (weight range `200` to `700`)
   - **Applied to**: All headings (`h1`, `h2`, `h3`, `h4`), section banners, massive display titles.
   - **Characteristics**: Modernist Swiss-style grotesk, tracking tightened to `-0.03em`.

### Fluid Dynamic Typography Scale (Clamp)

| Token | Responsive Definition | Typical Context |
| :--- | :--- | :--- |
| `text-title` | `clamp(3rem, 14vw, 9rem)` | Hero triple title text |
| `text-heading-1` | `clamp(2.5rem, 6.5vw, 10rem)` | Role statement heading |
| `text-heading-2` | `clamp(2.4rem, 8vw, 10rem)` | Section title banners (Heading component) |
| `text-heading-3` | `clamp(2rem, 5vw, 2.75rem)` | Sub-headings, section introductory titles |
| `text-special` | `clamp(2rem, 4vw, 3.25rem)` | Services & toolbox list items |
| `text-works-title`| `clamp(1.25rem, 2vw, 1.5rem)` | Project card titles |
| `text-body-1` | `clamp(1.1rem, 2vw, 1.3rem)` | Lead paragraphs, bio introductions |
| `text-body-2` | `clamp(1rem, 1.5vw, 1.5rem)` | Secondary body paragraphs, details |
| `text-body-3` | `1.1rem` | Navigation links, form labels, footer text |
| `text-body-4` | `clamp(0.75rem, 3vw, 1rem)` | Badge pills (year, tech stack), copyright |

### Text Stroke / Outline Utilities

Custom outline strokes used for decorative typography (notably the center hero title layer):
- `.font-outline-1`: `-webkit-text-stroke: 1.5px #0E0E0C;`
- `.font-outline-2`: `-webkit-text-stroke: 2px #0E0E0C;`
- `.font-outline-3`: `-webkit-text-stroke: 4px #0E0E0C;`
- `.font-outline-4`: `-webkit-text-stroke: 5px #0E0E0C;`

---

## 4. Layout, Grid & Spatial Architecture

### Responsive Breakpoints
- Standard Tailwind: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1536px`
- Custom Breakpoint: `md2: 872px`

### Structural Grid & Spacing
- **Container Paddings**: `px-5 md:px-10 xl:px-20 2xl:px-28`
- **Section Vertical Rhythm**: `my-[10%]` to `my-[12%]` on desktop for generous negative space.
- **Projects Grid**: Asymmetric 12-column layout:
  - Project 1 (ORBI AI Assistant): Full width (`md:col-span-12`) with embedded auto-playing video.
  - Project 2 (biNeti Web Suite): Left staggered column (`md:col-span-7 md:pt-16`).
  - Project 3 (Tweeter Boblo): Right staggered column (`md:col-span-5 md:pt-48`).
  - Project 4 (PulsePlay Music Player): Full width anchor (`md:col-span-12 md:pt-16`).
- **About Sticky Split View**: 50/50 two-column layout on `md` screens with a sticky profile photo (`md:sticky md:top-28`) matching the vertical flow of the bio narrative.

---

## 5. Animation, Motion & Interaction Design

The website utilizes an orchestration of **Lenis Smooth Scroll** and **GSAP (GreenSock) + ScrollTrigger**:

### 1. Lenis Smooth Scrolling
- Initialized in `NavBar.jsx` with a global `requestAnimationFrame` loop (`lenis.raf(time)`).
- Provides inertial momentum scroll across touchpads and mouse wheels.

### 2. Dual-Tone Theme Inversion (Light / Dark Morph)
ScrollTrigger detects entry into sections marked with `.nav-change` (the `Role` and `Works` sections):
- **Trigger**: `start: "top 375px"`, `end: "bottom 300px"`
- **Timeline Transformations**:
  - `body / .bg-secondary-100` backgroundColor morphs to `#0E0E0C` (Dark Obsidian).
  - `navBar` color morphs to `#DDDDD5`.
  - `cta` button switches background to `#D1D1C7` and text to `#0E0E0C`.
  - Toggle actions: `"restart reverse restart reverse"` (reverses smoothly upon scrolling out).

### 3. Custom Follower Cursor (`Cursor.jsx`)
- Custom element hidden on touch screens (`<640px`), enabled on desktop.
- Tracks mouse coordinates via `gsap.quickTo` (`x` and `y` duration `0.1s`, `power3` ease) for 60fps GPU acceleration without React state renders.
- **Card Hover State**: Expands from a 12px pill to a 112px interactive badge revealing a diagonal arrow SVG when hovering over project cards (`.img`).

### 4. Hero Stagger & Masked Entrances
- **Three-Tier Sandwich Heading**: Top solid text, center hollow text (transparent fill with `-webkit-text-stroke`), bottom solid text.
- **Masking**: Encapsulated inside `clip-path: polygon(0 0, 200% 0, 100% 100%, 0% 100%)`.
- **GSAP Sequence**:
  - Image container zooms out from `scale: 1.3 -> 1` (`duration: 3.25s`, `power3.inOut`).
  - Hero image scales from `scale: 2 -> 1` (`duration: 3.2s`, `power4.inOut`).
  - Headings slide upward from `translate-y-96` into visibility.
  - Infinite scroll indicator runs an ongoing translate loop.

### 5. Section Heading Mask Reveal
- Section titles (`Heading.jsx`) are encased in `.section-heading` with `clip-path: polygon(0 0, 100% 0%, 100% 100%, 0 100%)`.
- Individual headings slide up from `translate-y-56` to `y: 0` triggered at `top 550px`.

### 6. Interactive Link Micro-Animations
- Navigation and footer links feature expanding underline spans (`h-[0.125em] w-0 group-hover:w-full`) animated from left-to-right.
- Logo icon features a 45-degree rotation transition on hover (`group-hover:rotate-45`).

---

## 6. Components Inventory & Specifications

### 1. `NavBar.jsx`
- Fixed header (`fixed top-0 z-50 w-full`) with backdrop and padding.
- Initial slide-down entrance animation (`y: -100% -> 0`).
- Geometric SVG logo mark + brand title (`DANIAL.Z`).
- Quick navigation links (`#about`, `#services`, `#works`) and primary CTA button (`Let's Talk.`).

### 2. `Hero.jsx`
- Full-screen height (`h-screen`).
- Centerpiece triple title display.
- Subtle background abstract graphic (`heroimg.webp`, `opacity-50`, rounded corners).
- Minimalist rotated scroll indicator on the bottom right.

### 3. `Role.jsx`
- High-impact mission statement in `text-heading-1`.
- Serves as the visual bridge into the dark-mode transition.

### 4. `About.jsx`
- Split-screen biography: Sticky portrait photograph with rounded corners (`aspect-square md:aspect-auto`).
- Four years experience overview with direct links to GitHub and Telegram.

### 5. `Services.jsx` & `ServiceUi.jsx`
- Two key pillars:
  1. **My Expertises**: Frontend Development, Web Applications, UI/UX Architecture, Responsive Design, State Management, Performance Optimization.
  2. **My Digital Tool Box**: JavaScript, TypeScript, React, Next.js, TailwindCSS, Zustand, HTML5 / CSS3, GSAP, REST APIs & WebSockets.
- Animated divider line and large stacked typography (`text-special 2xl:text-7xl font-extrabold`).

### 6. `Works.jsx` & `Projects.jsx`
- Dynamic project showcase supporting both responsive video playback and high-resolution picture assets.
- Metadata pill tags for release year (`2025`, `2026`) and technology stack.
- Scale animation on media assets during card hover (`group-hover:scale-105` with `hover:rounded-3xl`).

### 7. `Contact.jsx`
- Direct contact details & Formspree AJAX form integration.
- Floating label inputs with CSS `:placeholder-shown` and `peer` transformations.
- Live Tehran time ticker updated per second via `setInterval`.
- Social digital spaces links with Iconify SVG icons (GitHub, LinkedIn, Telegram, Instagram).
- Fallback mailto triggers and error/unconfigured state handling.

### 8. `Footer.jsx`
- Compact minimalist footer.
- Real-time current year copyright (`new Date().getFullYear()`).
- "Back to Top" smooth scroll button with custom animated SVG chevron.

---

## 7. Performance, SEO & Accessibility (a11y)

- **Search Engine Optimization (SEO)**:
  - Complete JSON-LD `Person` schema markup embedded in `index.html`.
  - Canonical link pointing to `https://danialzaree.dev/`.
  - Detailed Open Graph (`og:*`) and Twitter Card (`twitter:*`) metadata.
- **Resource Hints**:
  - Image preloading for hero visual assets (`danial-profile.jpg`, `heroimg.webp`).
  - Next-gen image formats (`.webp`, `.avif`).
  - Font face `font-display: swap` configured for variable fonts.
- **Semantic Structure**:
  - Accessible `<header>`, `<main>`, `<section>`, `<nav>`, and `<footer>` elements.
  - Descriptive `aria-label` tags on all sections and icon-only links.
  - Native Netlify form placeholder included in HTML for build-time form detection.
