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
- `components/projects-section.tsx` -- ProjectData interface, projects array, filter system
- `components/case-study/` -- shared case study components

## Code Rules
- No em dashes anywhere in copy
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
- Traction pills: always Sentence Case (capitalize first letter of each word)

## Calendly Integration
- Embed URL: https://calendly.com/harshit-harshit/15min (with hide_gdpr_banner=1)
- Floating bubble: 7s reappearance after dismiss, auto-hides when embed is in viewport

## Known Issues and Backlog
- Custom domain explainable.harshit.ai not yet configured in Vercel

## Completed Work
- 2026-04-04: Eval Studio case study, homepage card, sitemap, sidebar icons, traction pills, buttons standardized, GitHub in contact, Dear Her repo set up

---

## ACTIVE TASK: Standardize traction pill casing to Sentence Case

In `components/projects-section.tsx`, fix the traction strings and the last item in differentiation arrays so all pills use consistent Sentence Case (capitalize first letter of each significant word).

### Changes needed:

**Dear Her traction:**
Change: `"Shipped in 3 hours · 59% conversion · 10 countries · zero paid distribution"`
To: `"Shipped in 3 Hours · 59% Conversion · 10 Countries · Zero Paid Distribution"`

**Dear Her differentiation last item:**
Change: `"59% conversion, 10 countries, zero paid distribution"`
To: `"59% Conversion, 10 Countries, Zero Paid Distribution"`

**PM Salary Ace traction:**
Change: `"Shipped in 3 hours · 336 questions · 49% activation rate"`
To: `"Shipped in 3 Hours · 336 Questions · 49% Activation Rate"`

**PM Salary Ace differentiation last item:**
Change: `"Shipped in 3 hours · 336 questions · 49% activation rate · V2 live"`
To: `"Shipped in 3 Hours · 336 Questions · 49% Activation Rate · V2 Live"`

**Eval Studio traction:**
Change: `"3 providers · 2-judge council · per-row cost tracking · live"`
To: `"3 Providers · 2-Judge Council · Per-row Cost Tracking · Live"`

**Eval Studio differentiation last item:**
Change: `"3 providers · 2-judge council · per-row cost tracking · live"`
To: `"3 Providers · 2-Judge Council · Per-row Cost Tracking · Live"`

**Explainable AI traction** (already correct):
`"Market research · Figma prototype · PDF case study"` -- already Sentence Case, no change needed.

### Acceptance criteria
- All traction pill text uses Sentence Case consistently across all 4 project cards
- The last item in each differentiation array matches the traction casing
- No other text changed
- Build passes
