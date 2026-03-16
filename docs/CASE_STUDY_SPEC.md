# Case Study Design Spec

Standard design tokens and conventions for all case study pages.

## Typography

| Element | Classes |
|---|---|
| Body text | `text-[15px] leading-7 text-slate-400` |
| Body (in Body component) | `text-base leading-8 text-slate-400 md:text-[17px]` |
| Section headings | `text-2xl font-bold tracking-tight text-foreground md:text-3xl` |
| Section category labels | `text-[11px] font-bold uppercase tracking-widest text-primary` |
| Card descriptions | `text-[15px] leading-7 text-slate-400` |
| Screenshot captions | `text-[13px] text-slate-400 font-medium` |

## Sidebar (At a Glance)

| Element | Classes |
|---|---|
| AT A GLANCE / SECTIONS labels | `text-[13px] font-bold uppercase tracking-widest text-primary` |
| Stat numbers | `text-xl font-bold text-slate-100` |
| Stat labels | `text-[13px] text-slate-400` |
| Sublabels (teal accent) | `text-[12px] text-emerald-400/80` |
| Progress bar track | `h-[6px] rounded-full bg-white/15` |
| Progress bar fill | `bg-gradient-to-r from-emerald-400 to-emerald-600` |
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
- Title: `mb-2 font-semibold text-foreground`
- Description: `text-[15px] leading-7 text-slate-400`

## Writing Rules

- No em dashes anywhere. Use commas or periods instead.
- Sublabels should use teal accent color, never muted grey.
- Body text uses `text-slate-400`, never `text-muted-foreground`.
- Stat numbers use `text-slate-100`, never pure `text-white`.

## Shared Components

All case study pages should use these shared components from `/components/case-study/`:

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
