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
- Sidebar icons: 24px across all case study pages
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
- Default: Try It (primary green) > GitHub (secondary) > Back to Portfolio (secondary)
- Explainable AI exception: Read the Research (primary green, PDF) > Try the Prototype (secondary) > View Code (secondary) > Back to Portfolio (secondary)
- claude-code-bridge: GitHub (primary green, no live demo) > Back to Portfolio (secondary)

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

## ACTIVE TASK: Three fixes — Calendly copy + bridge hero image + bridge case study updates

### Fix 1: Update Calendly copy across all surfaces

The Calendly event is staying at 15 min. Update all display copy.

**In `components/contact-section.tsx`:**
Find the text that currently says "15 / 30 min" (or similar duration text near the Calendly card). Replace it with:

```
Quick intro call · 15 min · we can go over if we're on a roll :)
```

This exact copy including the smiley.

**In `components/calendly-bubble.tsx`:**
Find any duration copy (likely "15 / 30 min" or "15 min"). Update to:

```
15 min · we can go over if we're on a roll :)
```

Or if the bubble has a shorter format, at minimum update "15 / 30 min" to "15 min". Use judgment on what fits.

Note: The Calendly embed URL does NOT change. Only update display copy.

### Fix 2: Zoom out claude-code-bridge hero image on homepage

In `components/projects-section.tsx`, find the claude-code-bridge project object. Change `imagePosition` from `"object-center"` to `"object-[center_20%]"` to shift the crop point upward and show more of the architecture loop.

### Fix 3: claude-code-bridge case study — add traction pill + enhance problem section

In `app/work/claude-code-bridge/page.tsx`:

**Add "Shipped in 2 Hours" traction pill.** Find the traction pills array in the hero (the `.map(({ value, sub })` block). Add a 5th pill as the FIRST item (before "Shipped"):

```tsx
{ value: "Shipped in 2 Hours", sub: "Built and working" },
```

So the full array becomes:
```tsx
{ value: "Shipped in 2 Hours", sub: "Built and working" },
{ value: "Context Engineering", sub: "Strategy to code" },
{ value: "Used Daily", sub: "6 projects" },
{ value: "MCP Native", sub: "Anthropic SDK" },
```

Remove the old `{ value: "Shipped", sub: "Open source" }` pill since "Shipped in 2 Hours" replaces it with more signal.

**Enhance the Problem section.** Find section id="problem". Add a third Body paragraph after the existing two:

```tsx
<Body>
  I built claude-code-bridge in two hours to fix this for myself. It saves hours of manual copy-paste every week, reduces the errors that come from re-explaining context from memory, and keeps a clean CLAUDE.md that any AI coding agent can read automatically. The bridge runs across six active projects today.
</Body>
```

### Files to modify
- MODIFY: `components/contact-section.tsx` — Calendly duration copy
- MODIFY: `components/calendly-bubble.tsx` — Calendly duration copy if present
- MODIFY: `components/projects-section.tsx` — claude-code-bridge imagePosition
- MODIFY: `app/work/claude-code-bridge/page.tsx` — traction pill + problem section paragraph

### Acceptance Criteria
- [ ] Contact card shows "Quick intro call · 15 min · we can go over if we're on a roll :)"
- [ ] Calendly bubble duration copy updated (no "30 min" anywhere)
- [ ] claude-code-bridge homepage card shows more of the architecture diagram
- [ ] claude-code-bridge case study has 4 traction pills: "Shipped in 2 Hours", "Context Engineering", "Used Daily", "MCP Native"
- [ ] claude-code-bridge problem section has 3 paragraphs (third one about building in 2 hours, saving copy-paste, 6 projects)
- [ ] No em dashes in any copy
- [ ] `pnpm build` passes with no errors

---

## Pending Work
- OG metadata: title is 35 chars (optimal 50-60), description text outdated
- OG image: 725KB, WhatsApp recommends < 600KB. Re-export at 70% JPG quality if needed
- All READMEs: humanize copy (review for AI voice)
- Sentinel deck (May 7 deadline)

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
- 2026-04-05: Sidebar icons bumped from 20px to 24px across all case study pages
- 2026-04-05: Explainable AI buttons reordered with progression labels
- 2026-04-05: Eval Studio case study: origin story rewrite, "Shipped in 2 Hours" pill, 6-competitor landscape section, golden dataset generator added to roadmap
