# CLAUDE.md

## Vision and Mission
Personal portfolio site for an AI PM targeting frontier tech companies.

## Current Stack
- Next.js (App Router), TypeScript, Tailwind CSS, Vercel, pnpm
- Recharts (for embedded charts on case study pages)
- Repo: harshitleads/harshit.ai, Domain: harshit.ai

## Code Rules
- No em dashes anywhere in copy
- No placeholder content in production
- Gmail compose links only, never mailto links
- Filter logic is AND, must match all selected tags
- All case study pages must use shared case study components
- Traction pills: always Sentence Case, Sidebar icons: 24px
- NEVER run git commit/push/reset/checkout
- NEVER delete files unless task spec explicitly names the file

## Architecture
- `/` — homepage with anchor nav and filter system
- `/work/eval-studio` — Eval Studio case study
- `/work/claude-code-bridge` — claude-code-bridge case study
- `/work/explainable-ai` — Explainable AI case study
- `/work/dear-her` — Dear Her case study
- `/work/pm-salary-ace` — PM Salary Ace case study
- `/work/job-market-pulse` — Job Market Pulse case study (embedded Recharts chart)
- `components/projects-section.tsx` — ProjectData interface, projects array, filter system
- `components/case-study/` — shared components (CaseStudySidebar, ScreenshotGallery, CaseStudyLayout)
- `components/case-study/PulsePreviewChart.tsx` — client component, Recharts, reads /data/fred-snapshot.json
- `public/data/fred-snapshot.json` — static FRED data snapshot (Jan 2021 - Feb 2025)

## Homepage Project Order
1. eval-studio 2. claude-code-bridge 3. explainable-ai 4. dear-her 5. pm-salary-ace 6. job-market-pulse

## Case Study Button Standards
- Default: Try It (primary) > GitHub (secondary) > Back to Portfolio
- Explainable AI: Read the Research (primary) > Try the Prototype > View Code > Back to Portfolio
- claude-code-bridge: GitHub (primary) > Back to Portfolio
- Job Market Pulse: Explore the Dashboard (primary, ExternalLink) > Back to Portfolio. No GitHub.

## Calendly
- URL: calendly.com/harshit-harshit/15min (hide_gdpr_banner=1)
- Copy: "Quick intro call · 15 min · we can go over if we're on a roll :)"

## Pending Work
- Screenshots for pulse case study: pulse-h1b.png, pulse-chart.png (pulse-hero.png exists)
- All READMEs: humanize copy (review for AI voice)
- Sentinel pitch deck (May 7, separate chat)
- Batch: floating portfolio popup on all sub-sites (eval, trust, dearher, pmquiz, pulse)

## Completed Work
- 2026-04-04: Eval Studio case study page, homepage card, sitemap
- 2026-04-04: All hero buttons standardized, homepage cards View Project only
- 2026-04-04: Traction pills Sentence Case, Dear Her repo public + README
- 2026-04-04: All GitHub READMEs updated with case study links
- 2026-04-04: Eval Studio favicon, OG image, mockup screenshots
- 2026-04-04: claude-code-bridge case study page, homepage card, sitemap
- 2026-04-04: Eval Studio imagePosition fix
- 2026-04-05: Homepage reordered (6 projects)
- 2026-04-05: Explainable AI: sidebar stats (Live), UI redesign (two-panel), progression buttons
- 2026-04-05: Sidebar icons 24px across all case study pages
- 2026-04-05: Eval Studio: origin story, "Shipped in 2 Hours" pill, 6-competitor landscape, golden dataset roadmap
- 2026-04-05: Calendly copy: "Quick intro call · 15 min · we can go over if we're on a roll :)"
- 2026-04-05: claude-code-bridge: "Shipped in 2 Hours" pill, problem section enhanced, imagePosition reverted
- 2026-04-05: OG metadata and image compression completed
- 2026-04-05: Hero "Currently" copy updated
- 2026-04-05: Job Market Pulse shipped at pulse.harshit.ai
- 2026-04-05: Job Market Pulse case study page with embedded Recharts chart, homepage card, sitemap
