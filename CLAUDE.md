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
- `/` — main portfolio with anchor nav and filter system
- `/work/pm-salary-ace` — PM Salary Ace case study
- `/work/dear-her` — Dear Her case study
- `/work/explainable-ai` — Explainable AI case study
- `/work/eval-studio` — Eval Studio case study
- `/work/claude-code-bridge` — claude-code-bridge case study
- `/sitemap.xml` — auto-generated via sitemap.ts
- `components/projects-section.tsx` — ProjectData interface, projects array, filter system
- `components/case-study/` — shared case study components (CaseStudySidebar, ScreenshotGallery, CaseStudyLayout)
- `components/calendly-bubble.tsx` — floating CTA bubble, rendered globally in `app/layout.tsx`
- `components/contact-section.tsx` — contact cards + Calendly inline embed (`id="calendly-embed"`)

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
### YYYY-MM-DD — Short title
**Decision:** What was decided.
**Why:** The reasoning.
**Rejected:** What alternatives were considered and why they lost.
```

## Design System
- Dark navy background (#0a0f1e), bright green accent (#00c896), glass-card components
- Case study pages: two-column layout with sticky left sidebar
- Contact cards: title font-weight 500, subtitle font-weight 400 at 13px, no exclamation marks

## Case Study Page Button Standard
1. Try It (primary green, ExternalLink icon) — for web apps with live demos
2. GitHub (primary green if no Try It, otherwise secondary, Github icon)
3. Back to Portfolio (secondary border, ArrowLeft icon)

## Homepage Card Standard
Homepage project cards show ONLY "View Project" as the single CTA.

## Homepage Project Order (canonical)
1. eval-studio
2. claude-code-bridge
3. explainable-ai
4. dear-her
5. pm-salary-ace

## Calendly Integration
- Embed URL: https://calendly.com/harshit-harshit/15min (with hide_gdpr_banner=1)
- Premium expired: renders with default Calendly theme. Accepted, do not hack around it.
- Floating bubble: 7s reappearance after dismiss, auto-hides when embed is in viewport (IntersectionObserver)
- Cross-page nav: bubble uses usePathname + useRouter to navigate from /work/* pages to homepage embed

---

## ACTIVE TASK: Fix sidebar icons + Explainable AI button progression labels

### Part 1: Fix icon alignment in CaseStudySidebar component

In `components/case-study/CaseStudySidebar.tsx`, find the stat card rendering. When a stat has an `icon`, the current layout uses a flex row with the icon pushed to the far right via `justify-between`. The icon floats to the top-right and looks disconnected.

**Fix:** When a stat has an icon, keep the icon on the right BUT vertically center the icon with the value text using `items-center`. Also bump icon size from 20px to 24px for better visual weight.

Find this block in the stats rendering:
```tsx
{stat.icon ? (
  <div className="flex items-center justify-between">
    <p className="text-xl font-bold text-slate-100">{stat.value}</p>
    {stat.icon}
  </div>
) : (
  <p className="text-xl font-bold text-slate-100">{stat.value}</p>
)}
```

This layout is fine structurally — `items-center` is already there. The problem is the icons themselves are being passed in at size={20} from each case study page. The fix is in each page that passes icons.

**Update icon sizes in ALL case study pages that use sidebar icons:**

File: `app/work/eval-studio/page.tsx`
Find sidebarStats and change all icon `size={20}` to `size={24}`:
```tsx
{ value: "LLM Infra", label: "Domain", icon: <Server size={24} className="text-emerald-400/70" /> },
{ value: "Live", label: "Status", icon: <Zap size={24} className="text-emerald-400/70" /> },
```

File: `app/work/claude-code-bridge/page.tsx`
Find sidebarStats and change all icon `size={20}` to `size={24}`:
```tsx
{ value: "Context Engineering", label: "Domain", icon: <GitBranch size={24} className="text-emerald-400/70" /> },
{ value: "Shipped", label: "Status", icon: <Zap size={24} className="text-emerald-400/70" /> },
```

File: `app/work/explainable-ai/page.tsx`
Find sidebarStats and change all icon `size={20}` to `size={24}`:
```tsx
{ value: "AI Trust", label: "Domain", icon: <Shield size={24} className="text-emerald-400/70" /> },
{ value: "Live", label: "Status", icon: <Zap size={24} className="text-emerald-400/70" /> },
```

### Part 2: Explainable AI button progression labels

In `app/work/explainable-ai/page.tsx`, find the hero buttons section (the `<div className="mb-10 flex flex-wrap gap-3 mt-5">` block).

Replace the current buttons with this exact order and labeling:

```tsx
<div className="mb-10 flex flex-wrap gap-3 mt-5">
  <a
    href="/Explainable_Coding_Assistant.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
  >
    Read the Research <ExternalLink className="h-4 w-4" />
  </a>
  <a
    href="https://trust.harshit.ai"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-secondary"
  >
    <ExternalLink className="h-4 w-4" />
    Try the Prototype
  </a>
  <a
    href="https://github.com/harshitleads/explainable-coding-assistant"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-secondary"
  >
    <Github className="h-4 w-4" />
    View Code
  </a>
  <Link href="/#projects" className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-secondary">
    <ArrowLeft className="h-4 w-4" />
    Back to Portfolio
  </Link>
</div>
```

Key changes:
- "Read the Research" (PDF) is now the PRIMARY green button — this is the star PM deliverable
- "Try the Prototype" is secondary — the functional implementation
- "View Code" replaces "GitHub" — clearer label
- "View PDF" button removed (replaced by "Read the Research" as primary)
- Order tells the PM lifecycle story: Research → Prototype → Code

### Files to modify
- MODIFY: `app/work/eval-studio/page.tsx` — icon size 20→24
- MODIFY: `app/work/claude-code-bridge/page.tsx` — icon size 20→24
- MODIFY: `app/work/explainable-ai/page.tsx` — icon size 20→24 + button reorder/relabel

### Acceptance Criteria
- [ ] All sidebar icons are 24px across all case study pages
- [ ] Icons are vertically centered with their stat value text
- [ ] Explainable AI hero buttons order: Read the Research (primary) → Try the Prototype → View Code → Back to Portfolio
- [ ] "Read the Research" is the green primary button
- [ ] No "View PDF" button (merged into "Read the Research")
- [ ] No other case study pages' buttons are changed
- [ ] `pnpm build` passes with no errors

---

## Pending Work
- OG metadata: title is 35 chars (optimal 50-60), description text outdated
- OG image: 725KB, WhatsApp recommends < 600KB. Re-export at 70% JPG quality if needed
- All READMEs: humanize copy (review for AI voice)
- PM Salary Ace: paste updated README to GitHub web editor
- Explainable AI: configure explainable.harshit.ai domain in Vercel

## Completed Work
- 2026-03-21: Calendly inline embed, floating bubble, contact copy cleanup, about section language cleanup
- 2026-04-03: Calendly bubble fixes (cross-page nav, scroll target, 7s reappearance, IntersectionObserver, GDPR banner hidden)
- 2026-04-04: Eval Studio case study page, homepage card, sitemap, sidebar icons 20px
- 2026-04-04: Standardized all case study hero buttons (Try It > GitHub > Back to Portfolio)
- 2026-04-04: Removed GitHub/Try It from homepage cards (View Project only)
- 2026-04-04: Traction pill casing standardized to Sentence Case
- 2026-04-04: Dear Her repo public, renamed, CLAUDE.md + decisions.md + README created
- 2026-04-04: All GitHub READMEs updated with case study links
- 2026-04-04: Eval Studio favicon and OG image added, GitHub description/website/topics set
- 2026-04-04: Eval Studio mockup screenshots added to case study page and homepage gallery
- 2026-04-04: claude-code-bridge case study page built, homepage card added, sitemap updated
- 2026-04-04: Eval Studio imagePosition fix committed
- 2026-04-05: Homepage projects reordered: Eval Studio > claude-code-bridge > Explainable AI > Dear Her > PM Salary Ace
- 2026-04-05: Explainable AI sidebar stats updated: Developer Tool, AI Trust (Shield), Live (Zap), Next.js + Claude
- 2026-04-05: Explainable AI product UI redesigned: FilePanel removed, two-panel layout, confidence score enlarged
