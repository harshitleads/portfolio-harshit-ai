# CLAUDE.md

## Vision and Mission
Personal portfolio site for an AI PM targeting frontier tech companies.

## Current Stack
- Next.js (App Router), TypeScript, Tailwind CSS, Vercel, pnpm
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

## Homepage Project Order
1. eval-studio
2. claude-code-bridge
3. explainable-ai
4. dear-her
5. pm-salary-ace
6. job-market-pulse

## Case Study Button Standards
- Default: Try It (primary) > GitHub (secondary) > Back to Portfolio
- Explainable AI: Read the Research (primary) > Try the Prototype > View Code > Back to Portfolio
- claude-code-bridge: GitHub (primary) > Back to Portfolio
- Job Market Pulse: Explore the Dashboard (primary, ExternalLink) > Back to Portfolio. No GitHub.

## Calendly
- URL: calendly.com/harshit-harshit/15min (hide_gdpr_banner=1)
- Copy: "Quick intro call · 15 min · we can go over if we're on a roll :)"

## Decision Logging
When you make or execute a product or technical decision, append it to `docs/decisions.md` in this format:
```
### YYYY-MM-DD — Short title
**Decision:** What was decided.
**Why:** The reasoning.
**Rejected:** What alternatives were considered and why they lost.
```

---

## ACTIVE TASK: Build Job Market Pulse case study page

The full task spec is at: `docs/pulse-task-spec.md`. Read that file and execute it with these overrides:

### IMPORTANT OVERRIDES (read before executing the task spec):

1. **SKIP Part 2 entirely.** The homepage card for job-market-pulse is ALREADY in the projects array in `components/projects-section.tsx`. Do NOT add a duplicate. Instead, find the existing job-market-pulse entry and update its `caseStudyLink` from `"https://pulse.harshit.ai"` to `"/work/job-market-pulse"`.

2. **Execute Part 1** (case study page) exactly as spec'd.

3. **Execute Part 3** (sitemap update) exactly as spec'd.

4. **Execute Part 4** (install recharts) exactly as spec'd.

5. **Create all files listed** in the task spec:
   - `app/work/job-market-pulse/page.tsx`
   - `components/case-study/PulsePreviewChart.tsx`
   - `public/data/fred-snapshot.json`

### Acceptance Criteria
- [ ] Case study page renders at /work/job-market-pulse
- [ ] Recharts chart renders with hover tooltips (Job Openings + Unemployment Rate)
- [ ] Chart reads from /data/fred-snapshot.json
- [ ] Chart has dark theme (dark bg, emerald #00c896 + amber #f59e0b lines)
- [ ] "Explore the Dashboard" links to https://pulse.harshit.ai
- [ ] No GitHub button on the page
- [ ] Existing homepage card caseStudyLink updated to "/work/job-market-pulse"
- [ ] No duplicate homepage card created
- [ ] Sitemap updated
- [ ] No em dashes, traction pills in Sentence Case
- [ ] pnpm build passes

---

## Pending Work
- Screenshots for pulse case study (pulse-hero.png, pulse-h1b.png, pulse-chart.png)
- All READMEs: humanize copy
- Sentinel pitch deck (May 7, separate chat)
- Batch: floating portfolio popup on all sub-sites

## Completed Work
- 2026-03-21: Calendly inline embed, floating bubble, contact copy cleanup, about section language cleanup
- 2026-04-03: Calendly bubble fixes (cross-page nav, scroll target, 7s reappearance, IntersectionObserver, GDPR banner hidden)
- 2026-04-04: Eval Studio case study page, homepage card, sitemap
- 2026-04-04: All hero buttons standardized, homepage cards View Project only
- 2026-04-04: claude-code-bridge case study page, homepage card
- 2026-04-05: Homepage reordered, sidebar icons 24px
- 2026-04-05: Explainable AI sidebar stats, UI redesign, progression buttons
- 2026-04-05: Eval Studio origin story, competitive landscape, roadmap
- 2026-04-05: Calendly copy, bridge traction pill, OG metadata
- 2026-04-05: Job Market Pulse shipped at pulse.harshit.ai
- 2026-04-05: Job Market Pulse homepage card added (6th in array, links to pulse.harshit.ai)
