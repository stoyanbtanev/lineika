# DESIGN.md — Lineika Higia
## Medical Transport Premium Website Design System

Synthesized from Apple × Stripe × Airbnb design systems, adapted for a premium emergency/medical transport brand operating in Bulgaria and across Europe.

---

## 1. Visual Theme & Atmosphere

**Mood:** Authoritative, trustworthy, human. The site must communicate *"we are ready right now"* while feeling premium and modern — not clinical or cold.

**Density:** Medium. Generous white space for premium feel, but clear service information is never more than 2 scrolls away. Emergency CTA is always on-screen.

**Design philosophy:** Cinematic photography (fleet images), bold typographic hierarchy, a signature emergency-red accent, and glass-morphic surfaces. Think Apple's restraint with Stripe's gradient sophistication applied to an urgent-care context.

**Light mode:** Near-white page (`#FAFAFA`), pure-white surfaces, sharp text. Clean, trustworthy, clinical.
**Dark mode:** Deep zinc-black page (`#09090B`), elevated zinc-dark surfaces, electric-red accent. Premium, nighttime emergency feel.

---

## 2. Color Palette & Roles

### Light Mode

| Name | Hex | Role |
|------|-----|------|
| `background` | `#FAFAFA` | Page background |
| `surface` | `#FFFFFF` | Cards, nav, modals |
| `surface-alt` | `#F4F4F5` | Alternating sections |
| `accent-emergency` | `#D72638` | Emergency red — primary CTAs, icons, highlights |
| `accent-trust` | `#1C5FA8` | Trust blue — secondary links, info |
| `accent-green` | `#16A34A` | Success states, "available now" |
| `text-primary` | `#0A0A0B` | Headings and body |
| `text-muted` | `#6B7280` | Supporting text, labels |
| `border` | `#E4E4E7` | Dividers, card borders |
| `overlay` | `rgba(0,0,0,0.45)` | Hero image overlay |

### Dark Mode (apply on `[data-theme="dark"]`)

| Name | Hex | Role |
|------|-----|------|
| `background` | `#09090B` | Page background |
| `surface` | `#18181B` | Cards, nav |
| `surface-alt` | `#27272A` | Alternating sections |
| `accent-emergency` | `#EF4444` | Emergency red (brighter) |
| `accent-trust` | `#3B82F6` | Trust blue |
| `accent-green` | `#22C55E` | Success |
| `text-primary` | `#FAFAFA` | Headings and body |
| `text-muted` | `#A1A1AA` | Supporting text |
| `border` | `#3F3F46` | Dividers |
| `overlay` | `rgba(0,0,0,0.65)` | Hero image overlay |

---

## 3. Typography Rules

```
Primary (body / UI):  "Inter", system-ui, -apple-system, sans-serif
Display (headings):   "Plus Jakarta Sans", "Inter", sans-serif
Mono (phone / badge): "JetBrains Mono", "Courier New", monospace
```

Import from Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
```

| Element | Font | Size (fluid) | Weight | Line-height |
|---------|------|------|--------|-------------|
| Hero H1 | Plus Jakarta Sans | `clamp(2.5rem, 6vw, 5rem)` | 800 | 1.05 |
| Section H2 | Plus Jakarta Sans | `clamp(1.75rem, 4vw, 3rem)` | 700 | 1.1 |
| Card H3 | Plus Jakarta Sans | `1.25rem` | 600 | 1.3 |
| Body | Inter | `1rem` | 400 | 1.7 |
| Label / tag | Inter | `0.875rem` | 500 | 1.5 |
| Phone number | JetBrains Mono | `1.5rem` | 600 | 1.2 |

---

## 4. Component Stylings

### Buttons

**Primary (Emergency CTA)**
```
background: var(--accent-emergency)
color: white
border-radius: 100px (pill)
padding: 0.875rem 2rem
font-weight: 600
font-size: 1rem
box-shadow: 0 4px 20px rgba(215,38,56,0.35)
hover: brightness(1.1) + scale(1.02)
active: scale(0.98)
transition: all 0.2s ease
```

**Secondary (Ghost)**
```
background: transparent
border: 1.5px solid var(--text-primary)
color: var(--text-primary)
border-radius: 100px
padding: 0.875rem 2rem
hover: background var(--surface), shadow
```

**Trust CTA**
```
background: var(--accent-trust)
color: white
border-radius: 100px
```

### Cards (Services)
```
background: var(--surface)
border: 1px solid var(--border)
border-radius: 16px
padding: 2rem
border-top: 3px solid var(--accent-emergency)   ← gradient left→right on each card (unique per service)
box-shadow: 0 1px 3px rgba(0,0,0,0.06)
hover: transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.1)
transition: all 0.3s cubic-bezier(0.25,0.8,0.25,1)
```

### Navigation
```
position: sticky top-0
background: rgba(var(--surface-rgb), 0.85)
backdrop-filter: blur(20px) saturate(180%)
border-bottom: 1px solid var(--border)
height: 64px on desktop, 56px on mobile
z-index: 1000
```

### Language Selector
```
Custom dropdown, flag emoji + language code
background: var(--surface-alt)
border-radius: 8px
Active: accent-emergency underline
```

### Theme Toggle
```
Icon button: sun ☀️ / moon 🌙
border-radius: 50%
background: var(--surface-alt)
size: 40px
hover: rotate(15deg)
```

### Forms
```
input, textarea:
  background: var(--surface-alt)
  border: 1.5px solid var(--border)
  border-radius: 10px
  padding: 0.875rem 1rem
  focus: border-color var(--accent-trust), box-shadow: 0 0 0 3px rgba(28,95,168,0.15)
  color: var(--text-primary)
```

---

## 5. Layout Principles

- Max content width: **1200px**, centered with `margin: 0 auto`
- Section padding: `clamp(3rem, 8vw, 7rem) 0`
- Horizontal padding: `clamp(1rem, 5vw, 2rem)`
- Card gap: `1.5rem`
- Service grid: `repeat(auto-fit, minmax(300px, 1fr))`

---

## 6. Depth & Elevation

| Level | Usage | Shadow |
|-------|-------|--------|
| 0 | Background | none |
| 1 | Cards resting | `0 1px 3px rgba(0,0,0,0.06)` |
| 2 | Cards hover | `0 8px 24px rgba(0,0,0,0.1)` |
| 3 | Floating CTA button | `0 16px 40px rgba(215,38,56,0.4)` |
| 4 | Lightbox modal | `0 32px 80px rgba(0,0,0,0.5)` |

---

## 7. Do's and Don'ts

✅ DO:
- Keep emergency phone number in hero AND nav AND contact section
- Use real fleet photos — authenticity builds trust
- Keep all 5 language versions semantically equivalent
- Use pill-shaped CTAs for the primary action
- Animate counters in #why section on scroll

❌ DON'T:
- Use stock photos — only use the actual fleet images from `/images_final/`
- Forget to test dark mode on every section
- Use more than 2 type weights in a single block
- Overcrowd the hero — one clear H1, one sub, two CTAs maximum
- Use red for anything non-emergency (preserve meaning)

---

## 8. Responsive Behavior

| Breakpoint | Changes |
|-----------|---------|
| `max-width: 640px` | Single column, mobile nav overlay, hero H1 smaller |
| `640–1024px` | 2-column services, inline trust bar wraps |
| `1024px+` | Full 3-column, horizontal contact layout |

Touch targets: min 44×44px on all interactive elements.
Font sizes never go below 14px.
Images use `loading="lazy"` except above-the-fold hero.

---

## 9. Agent Prompt Guide

> "Build this UI using DESIGN.md. The accent color is #D72638 (emergency red). Main font is Plus Jakarta Sans for headings and Inter for body. All sections scroll on a single page. Dark mode via [data-theme='dark'] on the html element. Language strings come from js/i18n.js with data-i18n attributes."

**Quick color reference:**
- Primary CTA: `#D72638` (light) / `#EF4444` (dark)
- Secondary: `#1C5FA8` (light) / `#3B82F6` (dark)  
- Background: `#FAFAFA` (light) / `#09090B` (dark)
- Surface: `#FFFFFF` (light) / `#18181B` (dark)
