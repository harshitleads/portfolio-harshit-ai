# harshit.ai — Portfolio Website

## Stack
- Next.js (App Router), TypeScript, Tailwind CSS, Vercel, pnpm
- Repo: harshitleads/harshit.ai

## Code Rules
- No em dashes anywhere in copy
- No placeholder content in production
- Gmail compose links only, never mailto links
- Filter logic is AND, must match all selected tags
- All case study pages must use shared case study components
- Traction pills: always Sentence Case, Sidebar icons: 24px
- NEVER run git commit/push/reset/checkout
- NEVER delete files unless task spec explicitly names the file

## Components
- `components/projects-section.tsx` — homepage project cards + lightbox
- `components/case-study/ScreenshotGallery.tsx` — case study page image gallery
- `components/case-study/CaseStudySidebar.tsx` — shared sidebar
- `components/case-study/CaseStudyLayout.tsx` — shared layout wrapper
- `components/calendly-bubble.tsx` — persistent floating Calendly CTA (rendered in app/layout.tsx, hides when Calendly embed is in view)

## Completed Work
- ScreenshotGallery lightbox: arrows, keyboard nav, dot indicators
- 2026-04-10: CalendlyBubble made persistent, case study bubbles on all 5 sub-sites
- 2026-04-10: Homepage reorder, tag audit, GitHub pins — all done

## Pending Work
- Eval Studio: demo mode or walkthrough video (highest priority — product unusable without API keys for recruiters)
- Explainable AI: walkthrough video or pre-loaded example
- README humanization across all repos
