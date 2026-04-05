# CLAUDE.md

## Vision and Mission
Personal portfolio site for an AI PM targeting frontier tech companies. Every page must read as senior PM thinking. The portfolio demonstrates product judgment, not just shipping ability.

## Current Stack
- Next.js (App Router), TypeScript, Tailwind CSS
- Deployed on Vercel (auto-deploys on push to main)
- pnpm as package manager
- Repo: harshitleads/harshit.ai
- Primary domain: harshit.ai
- Redirect: harshitsharma.me to harshit.ai
- Email: harshit@harshit.ai (Google Workspace)
- Domain registrar: Namecheap

## Architecture
- `/` -- main portfolio with anchor nav and filter system
- `/work/pm-salary-ace` -- PM Salary Ace case study
- `/work/dear-her` -- Dear Her case study
- `/work/explainable-ai` -- Explainable AI case study
- `/work/eval-studio` -- Eval Studio case study
- `/sitemap.xml` -- auto-generated via sitemap.ts
- `components/projects-section.tsx` -- ProjectData interface, projects array, filter system
- `components/case-study/` -- shared case study components (CaseStudySidebar, ScreenshotGallery, CaseStudyLayout)
- `app/globals.css` -- cs-* typography system
- `components/calendly-bubble.tsx` -- floating CTA bubble, rendered globally in `app/layout.tsx`
- `components/contact-section.tsx` -- contact cards + Calendly inline embed (`id="calendly-embed"`)

## Code Rules
- No em dashes anywhere in copy
- No placeholder content in production
- Test mobile viewport before shipping
- Handle errors gracefully, never show raw errors to users
- Keep components small and focused on one job
- Delete unused code, no commented-out blocks
- Meaningful commit messages
- Gmail compose links only, never mailto links
- Filter logic is AND, must match all selected tags, never change this
- All case study pages must use shared case study components, no new layout patterns
- Fonts, colors, spacing: inherit from existing system, never introduce new styles
- NEVER run git commit, git push, git reset, git checkout, or any git write commands. Only the developer commits and pushes manually. This rule has no exceptions.
- NEVER delete files unless the task spec explicitly says to delete a specific named file. If unsure, rename or comment out instead of deleting.

## Decision Logging
When you make or execute a product or technical decision, append it to `docs/decisions.md` in this format:
```
### YYYY-MM-DD -- Short title
**Decision:** What was decided.
**Why:** The reasoning.
**Rejected:** What alternatives were considered and why they lost.
```
This applies to every Claude session touching this project, not just the CTO chat.

## Design System
- Dark navy background (#0a0f1e), bright green accent (#00c896), glass-card components
- Case study pages: two-column layout with sticky left sidebar
- Sidebar width: lg:w-52 xl:w-60
- Screenshots: aspect-ratio 16/10, object-fit cover
- Contact cards: title font-weight 500, subtitle font-weight 400 at 13px, no exclamation marks

## Calendly Integration
- Embed URL: https://calendly.com/harshit-harshit/15min (with hide_gdpr_banner=1)
- Premium expired: renders with default Calendly theme. Accepted, do not hack around it.
- Floating bubble: 7s reappearance after dismiss, auto-hides when embed is in viewport (IntersectionObserver, 0.3 threshold)
- Cross-page nav: bubble uses usePathname + useRouter to navigate from /work/* pages to homepage embed
- Overlay cleanup: bubble click dispatches click to all [role="dialog"] + Escape keydown before navigating
- Subtitle: "15 / 30 min . Google Meet" on both bubble and contact card

## Known Issues and Backlog
- Custom domain explainable.harshit.ai not yet configured in Vercel

## Completed Work
- 2026-03-21: Calendly inline embed, floating bubble, contact copy cleanup, about section language cleanup, philosophy modal copy
- 2026-04-03: Calendly bubble fixes, stats reframed, guardrails added
- 2026-04-04: Eval Studio case study page, homepage card, sitemap, sidebar icons 20px, traction pills fixed, GitHub in contact section
- 2026-04-04: Homepage cards simplified to "View Project" only. GitHub buttons added to PM Salary Ace + Explainable AI case study heroes. Eval Studio image position set to object-[center_30%]. OG metadata on Eval Studio page.
