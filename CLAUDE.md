# CLAUDE.md

## Vision and Mission
Personal portfolio site for an AI PM targeting frontier tech companies. Every page must read as senior PM thinking. The portfolio demonstrates product judgment, not just shipping ability.

## Current Stack
- Next.js (App Router), TypeScript, Tailwind CSS
- Deployed on Vercel (auto-deploys on push to main)
- pnpm as package manager
- Repo: harshitleads/harshit.ai
- Primary domain: harshit.ai

## Architecture
- `/` -- main portfolio with anchor nav and filter system
- `/work/pm-salary-ace` -- PM Salary Ace case study
- `/work/dear-her` -- Dear Her case study
- `/work/explainable-ai` -- Explainable AI case study
- `/work/eval-studio` -- Eval Studio case study
- `/sitemap.xml` -- auto-generated via sitemap.ts
- `components/projects-section.tsx` -- ProjectData interface, projects array, filter system
- `components/case-study/` -- shared case study components (CaseStudySidebar, ScreenshotGallery, CaseStudyLayout)

## Code Rules
- No em dashes anywhere in copy
- No placeholder content in production
- Gmail compose links only, never mailto links
- Filter logic is AND, must match all selected tags, never change this
- All case study pages must use shared case study components, no new layout patterns
- Traction pills: always Sentence Case
- NEVER run git commit, git push, git reset, git checkout, or any git write commands
- NEVER delete files unless the task spec explicitly says to delete a specific named file

## Decision Logging
When you make or execute a product or technical decision, append it to `docs/decisions.md` in this format:
```
### YYYY-MM-DD -- Short title
**Decision:** What was decided.
**Why:** The reasoning.
**Rejected:** What alternatives were considered and why they lost.
```

## Design System
- Dark navy background (#0a0f1e), bright green accent (#00c896), glass-card components
- Case study pages: two-column layout with sticky left sidebar

## Case Study Page Button Standard
1. Try It (primary green, ExternalLink icon)
2. GitHub (secondary border, Github icon -- skip for Dear Her)
3. Back to Portfolio (secondary border, ArrowLeft icon)

## Homepage Card Standard
Homepage project cards show ONLY "View Project" as the single CTA.

## Calendly Integration
- Embed URL: https://calendly.com/harshit-harshit/15min (with hide_gdpr_banner=1)
- Floating bubble: 7s reappearance after dismiss, auto-hides when embed is in viewport

## Pending Work
- OG metadata: title is 35 chars (optimal 50-60), description text outdated. Minor optimization.
- All READMEs: humanize copy
- PM Salary Ace: paste updated README to GitHub
- claude-code-bridge: build case study page on harshit.ai

## Completed Work
- 2026-04-04: Eval Studio case study page, homepage card, sitemap, sidebar icons 20px
- 2026-04-04: Standardized all case study hero buttons, removed secondary CTAs from homepage cards
- 2026-04-04: Traction pill casing standardized to Sentence Case
- 2026-04-04: Dear Her repo public, CLAUDE.md + decisions.md + README created
- 2026-04-04: All GitHub READMEs updated with case study links
- 2026-04-04: Eval Studio favicon and OG image added
- 2026-04-04: Added 4 mockup screenshots to Eval Studio case study (ScreenshotGallery) and homepage card lightbox (galleryIncludesHero)
