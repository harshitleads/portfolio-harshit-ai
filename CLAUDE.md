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
- `components/projects-section.tsx` — homepage project cards + full lightbox with arrows, zoom, keyboard nav
- `components/case-study/ScreenshotGallery.tsx` — case study page image gallery with lightbox, arrows, keyboard nav, dots
- `components/case-study/CaseStudySidebar.tsx` — shared sidebar with stats and section nav
- `components/case-study/CaseStudyLayout.tsx` — shared layout wrapper

## Completed Work
- ScreenshotGallery lightbox: added left/right arrow navigation, keyboard nav (ArrowLeft/Right/Escape), dot indicators, caption updates on navigate

## Pending Work
- Homepage project order: move job-market-pulse to position 4 (before dear-her), move explainable-ai to position 5
- Tag audit: eval-studio gets [Live Product, Evals, AI Tools, Developer Tools], claude-code-bridge gets [Live Product, Developer Tools, AI Tools], explainable-ai gets [Case Study, Developer Tools, AI Tools], job-market-pulse gets [Live Product, Analytics], add Analytics to DOMAIN_FILTERS
- Eval Studio: demo mode (pre-loaded results without API keys)
- Explainable AI: walkthrough video or pre-loaded example
