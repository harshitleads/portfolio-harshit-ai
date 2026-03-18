# Case Study Design Spec

Standard design tokens and conventions for all case study pages.

**Never use arbitrary Tailwind font sizes like text-sm, text-xs, text-base on body content — always use the cs-* classes.**

## CSS Utility Classes (defined in app/globals.css)

These are the **only approved way** to style text on case study pages:

| Class | Purpose | Styles |
|---|---|---|
| `cs-body` | Body text, descriptions, bullets | 15px, line-height 1.75rem, slate-400 |
| `cs-card-title` | Card titles, step titles | 15px, semibold, slate-100 |
| `cs-section-label` | Section category labels (teal) | 11px, bold, uppercase, tracking, emerald |
| `cs-label` | Sidebar stat labels | 13px, slate-400 |
| `cs-sublabel` | Sidebar teal accent sublabels | 12px, emerald-400/80 |
| `cs-micro` | Tiny labels, funnel drops, metadata | 11px, slate-400 |
| `cs-caption` | Screenshot captions | 13px, medium, slate-400 |

## Sidebar (At a Glance)

| Element | How to style |
|---|---|
| AT A GLANCE / SECTIONS labels | `text-[13px] font-bold uppercase tracking-widest text-primary` |
| Stat numbers | `text-xl font-bold text-slate-100` |
| Stat labels | `cs-label` |
| Sublabels (teal accent) | `cs-sublabel` |
| Progress bar track | `h-[6px] rounded-full bg-white/15` |
| Progress bar fill | Inline style: `linear-gradient(to right, #34d399, #059669)` |
| Card container | `rounded-lg border border-white/[0.07] bg-white/[0.04] p-3` |

## Navigation

| State | Classes |
|---|---|
| Active nav link | `text-emerald-400 border-l-2 border-emerald-400 pl-2` |
| Inactive nav link | `text-slate-400 border-l-0 pl-0` |
| Nav link base | `block text-[14px] transition-all duration-200` |
| Hover | `hover:text-emerald-400` |

IntersectionObserver config: `threshold: 0.3`, `rootMargin: '-10% 0px -60% 0px'`

## Decision Cards

- Container: `grid grid-cols-1 md:grid-cols-2 gap-4`
- Card wrapper: `glass-card rounded-2xl p-6 md:p-8`
- Title: `cs-card-title mb-2`
- Description: `cs-body`

## Writing Rules

- No em dashes anywhere. Use commas or periods instead.
- Sublabels should use teal accent color, never muted grey.
- Body text uses `cs-body`, never `text-muted-foreground` or arbitrary Tailwind sizes.
- Stat numbers use `text-slate-100`, never pure `text-white`.

## Shared Components

All case study pages must use these shared components from `/components/case-study/`:

### CaseStudySidebar

```tsx
import { CaseStudySidebar } from "@/components/case-study/CaseStudySidebar";

<CaseStudySidebar
  stats={[
    { value: "255", label: "Visitors", sublabel: "First 3 days" },
    { value: "59%", label: "Conversion", showProgressBar: true, progressValue: 59 },
    { value: "10", label: "Countries", icon: <Globe size={14} className="text-emerald-400/70" /> },
  ]}
  sections={[
    { id: "origin", label: "Why I Built This" },
    { id: "product", label: "How It Works" },
  ]}
/>
```

### ScreenshotGallery

```tsx
import { ScreenshotGallery } from "@/components/case-study/ScreenshotGallery";

<ScreenshotGallery
  screenshots={[
    { src: "/images/screenshot.png", alt: "Landing", caption: "Landing Page" },
  ]}
  liveUrl="https://example.com"
  liveLabel="See a live letter"
/>
```

### CaseStudyLayout

```tsx
import { CaseStudyLayout } from "@/components/case-study/CaseStudyLayout";

<CaseStudyLayout sidebar={<CaseStudySidebar ... />}>
  <section id="origin">...</section>
  <section id="product">...</section>
</CaseStudyLayout>
```
