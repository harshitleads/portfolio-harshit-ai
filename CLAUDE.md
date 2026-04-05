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
- Fonts, colors, spacing: inherit from existing system, never introduce new styles
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
- Sidebar width: lg:w-52 xl:w-60
- Contact cards: title font-weight 500, subtitle font-weight 400 at 13px, no exclamation marks

## Case Study Page Button Standard
All case study pages follow this exact button order in the hero:
1. Try It (primary green, ExternalLink icon) -- links to live product
2. GitHub (secondary border, Github icon) -- links to repo (skip for Dear Her)
3. Back to Portfolio (secondary border, ArrowLeft icon) -- links to /#projects

## Homepage Card Standard
Homepage project cards show ONLY "View Project" as the single CTA. No GitHub, no Try It.

## Calendly Integration
- Embed URL: https://calendly.com/harshit-harshit/15min (with hide_gdpr_banner=1)
- Floating bubble: 7s reappearance after dismiss, auto-hides when embed is in viewport
- Cross-page nav: bubble uses usePathname + useRouter to navigate from /work/* pages to homepage embed
- Subtitle: "15 / 30 min . Google Meet" on both bubble and contact card

## Known Issues and Backlog
- Custom domain explainable.harshit.ai not yet configured in Vercel
- Eval Studio case study page needs mockup screenshots

## Completed Work
- 2026-04-04: Eval Studio case study page, homepage card, sitemap, sidebar icons 20px
- 2026-04-04: Traction pills fixed to separate badges, GitHub/contact section added
- 2026-04-04: Standardized all case study hero buttons (Try It > GitHub > Back to Portfolio)
- 2026-04-04: Removed GitHub/Try It from homepage cards (View Project only)
- 2026-04-04: Eval Studio image position set to object-[center_30%]
- 2026-04-04: Traction pill casing standardized to Sentence Case across all cards
