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

## Calendly Integration
- Embed URL: https://calendly.com/harshit-harshit/15min (with hide_gdpr_banner=1)
- Floating bubble: 7s reappearance after dismiss, auto-hides when embed is in viewport
- Cross-page nav: bubble uses usePathname + useRouter to navigate from /work/* pages to homepage embed
- Subtitle: "15 / 30 min . Google Meet" on both bubble and contact card

## Known Issues and Backlog
- Custom domain explainable.harshit.ai not yet configured in Vercel

## Completed Work
- 2026-04-04: Eval Studio case study page, homepage card, sitemap, sidebar icons 20px, traction pills fixed, GitHub in contact section, repo renamed and configured
- 2026-04-04: Standardized all case study hero buttons. Order: Try It (primary) > GitHub (secondary, Github icon) > Back to Portfolio (ArrowLeft icon). Dear Her: no GitHub. Explainable AI: added Back to Portfolio. Homepage cards: View Project only. Eval Studio image: object-[center_30%].
