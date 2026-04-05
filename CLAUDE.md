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
- 2026-04-04: Eval Studio case study page, homepage card, sitemap, sidebar icons 20px, traction pills fixed, GitHub/live demo buttons added, GitHub in contact section, repo renamed and configured

---

## ACTIVE TASK: Standardize all case study page hero buttons + remove GitHub/Try It from homepage cards

This task makes all 4 case study pages consistent and removes secondary buttons from homepage cards.

### STANDARD PATTERN FOR ALL CASE STUDY PAGE HEROES

Every case study page hero must have exactly this button row, in exactly this order:

```tsx
<div className="mb-10 flex flex-wrap gap-3">
  {/* 1. Try It -- primary green button with ExternalLink icon */}
  <a
    href="LIVE_URL"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
  >
    Try It <ExternalLink className="h-4 w-4" />
  </a>
  {/* 2. GitHub -- secondary border button with Github icon (SKIP for Dear Her) */}
  <a
    href="GITHUB_URL"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-secondary"
  >
    <Github className="h-4 w-4" />
    GitHub
  </a>
  {/* 3. Back to Portfolio -- secondary border button with ArrowLeft icon */}
  <Link href="/#projects" className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-secondary">
    <ArrowLeft className="h-4 w-4" />
    Back to Portfolio
  </Link>
</div>
```

Import `Github` from `lucide-react` in every case study page that has a GitHub button.

### Per-page specifics:

**Eval Studio (`app/work/eval-studio/page.tsx`):**
- Try It: https://eval.harshit.ai
- GitHub: https://github.com/harshitleads/eval-studio (use Github icon, NOT ExternalLink)
- Back to Portfolio: present
- Import Github from lucide-react

**PM Salary Ace (`app/work/pm-salary-ace/page.tsx`):**
- Try It: https://pmquiz.harshit.ai
- GitHub: https://github.com/harshitleads/pm-salary-quest (use Github icon)
- Back to Portfolio: present
- Import Github from lucide-react if not already imported

**Dear Her (`app/work/dear-her/page.tsx`):**
- Try It: https://dearher.harshit.ai
- NO GitHub button (no public repo to show)
- Back to Portfolio: present

**Explainable AI (`app/work/explainable-ai/page.tsx`):**
- Try It: https://trust.harshit.ai
- GitHub: https://github.com/harshitleads/explainable-coding-assistant (use Github icon)
- Back to Portfolio: present (currently missing, add it)
- Import Github from lucide-react if not already imported

### Part 2: Remove GitHub and Try It buttons from homepage project cards

In `components/projects-section.tsx`, in the `ProjectCard` component, remove the two secondary button blocks that render `project.liveDemoLink` ("Try It") and `project.githubLink` ("GitHub"). Keep ONLY the "View Project" primary CTA button. The data fields `liveDemoLink` and `githubLink` in the ProjectData interface and projects array should remain unchanged.

### Part 3: Fix Eval Studio homepage card image position

In the eval-studio entry in the projects array in `projects-section.tsx`, change:
```
imagePosition: "object-top",
```
to:
```
imagePosition: "object-[center_30%]",
```

### Acceptance criteria
- All 4 case study pages have Try It button with ExternalLink icon as PRIMARY (green) button
- All 4 case study pages have Back to Portfolio button with ArrowLeft icon
- 3 case study pages (PM Salary Ace, Explainable AI, Eval Studio) have GitHub button with Github icon (NOT ExternalLink icon)
- Dear Her has NO GitHub button
- Button ORDER is identical on all pages: Try It, GitHub (if applicable), Back to Portfolio
- Button STYLING is identical on all pages (same classes)
- Homepage project cards show ONLY "View Project" button, no GitHub or Try It
- Eval Studio card image position is object-[center_30%]
- All icons imported correctly from lucide-react
- No em dashes in any copy
- Build passes
