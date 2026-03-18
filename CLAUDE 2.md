# CLAUDE.md — Project Intelligence File
# This file is read automatically by Claude Code at the start of every session.
# Last updated: 2026-03-16

---

## Who I Am
Harshit Sharma — AI PM, UC Berkeley MEng (graduating May 2026)
Building a PM portfolio to target AI PM roles at frontier tech companies
Goal: ship high-quality portfolio pieces, maintain consistency across all pages

---

## How I Work
- I use Claude Code and Cursor to build
- Prefer targeted edits over large rewrites
- When in doubt, ask before making large changes
- Show me what changed and why, not just what changed

---

## Workflow (always follow this order)
1. /explore — understand the codebase first
2. /create-plan — propose the approach, wait for approval
3. /execute — build only what was approved
4. /review — check for errors and quality
5. /document — update this CLAUDE.md with what changed

Never skip straight to executing without exploring first.

---

## Portfolio Narrative
Targeting AI PM roles at frontier tech companies (OpenAI, Anthropic, leading
AI startups). Every portfolio piece must read as senior PM thinking, not junior
execution. The portfolio demonstrates product judgment, not just shipping ability.

Projects are positioned by what they reveal about product thinking:
- PM Salary Ace — Live Product. Speed of execution + real user traction.
- Dear Her — Shipped product. Emotional intelligence + rapid deployment.
- Explainable AI — Case Study. Product framing of a technical gap.
- Eval Studio — Portfolio piece. Familiarity with eval methodology and LLM-as-judge.

---

## Copy Voice (non-negotiable)
- No em dashes anywhere — replace with commas, colons, or rewrite the sentence
- No generic filler: "leveraging AI", "robust solution", "seamless experience"
- No influencer-style vulnerability or performative storytelling
- Short, personal, direct — reads like a PM wrote it, not a marketer
- Witty where appropriate, never try-hard
- Skimmable: bold key terms, keep paragraphs short
- No "B2B" or "Consumer" as domain tags — use AI Tools, Developer Tools,
  Evals, Productivity

---

## Project Positioning Rules
- PM Salary Ace is a Live Product, not a Case Study — framing matters
- "I built a quiz" reads as junior energy — frame through product thinking
- Explainable AI is a proof of concept — prototype stage, not a live product
- Case study pages are the primary experience; PDFs are secondary downloads
- Naming your own limitations signals product maturity more than sweeping claims

---

## Current Stack
- Next.js (App Router), TypeScript, Tailwind CSS
- Deployed on Vercel (auto-deploys on push to main)
- pnpm as package manager
- Repo: harshitleads/harshit.ai
- Domain registrar: Namecheap
- Primary domain: harshit.ai
- Redirect: harshitsharma.me → harshit.ai (301 permanent)
- Email: harshit@harshit.ai (Google Workspace)

---

## Architecture
- `/` — main portfolio with anchor nav and filter system
- `/work/pm-salary-ace` — PM Salary Ace case study
- `/work/dear-her` — Dear Her case study
- `/work/explainable-ai` — Explainable AI case study
- `/sitemap.xml` — auto-generated via sitemap.ts

### Key Component
`components/projects-section.tsx` — contains ProjectData interface,
projects[] array, ProjectCard, ProjectModal, filter system.

### Shared Case Study Components
All case study pages MUST use:
- `components/case-study/CaseStudySidebar.tsx`
- `components/case-study/ScreenshotGallery.tsx`
- `components/case-study/CaseStudyLayout.tsx`
- Global cs-* typography system in globals.css

Do not introduce new layout patterns for case study pages.

---

## Design System (do not deviate)
- Dark navy background, bright green accent, glass-card components
- All case study pages: two-column layout with sticky left sidebar
- Sidebar width: lg:w-52 xl:w-60
- Sidebar contains: At a Glance stats + section nav links
- Screenshots: aspect-ratio 16/10, object-fit cover
- Filter logic: AND (must match ALL selected tags)
- Gmail compose links only, never mailto links
- Fonts, colors, spacing: inherit from existing system, never introduce new styles

---

## What "Done" Looks Like for a Case Study Page
- Two-column sticky sidebar layout using shared components
- Sidebar: At a Glance stats + section nav links
- Sections: Problem, Market Context, User Research, Design Decisions,
  Honest Limitations, Prototype Walkthrough, What's Next
- No placeholder content anywhere
- Mobile viewport tested before shipping
- sitemap.ts updated after adding the new route

---

## Code Hygiene (non-negotiable)
- No em dashes anywhere in copy — sounds AI-written
- No placeholder content in production
- Always test mobile viewport before shipping
- Handle errors gracefully — never show raw errors to users
- Keep components small and focused on one job
- Delete unused code — don't leave commented-out blocks
- Meaningful commit messages — describe what changed and why

---

## Known Issues / Backlog
- [ ] Wire screenshots into /work/explainable-ai
      (images already exist in /public/images/ as explainable-1.jpg
      through explainable-4.jpeg and explainable-summary.jpg)
- [ ] Add work/explainable-ai to sitemap.ts
- [ ] Add custom domain explainable.harshit.ai in Vercel, then update
      the Live Product button URL on the case study page

---

## Project Log

### 2026-03-16 — CLAUDE.md initialized with full context
- Repo renamed from portfolio-harshit-ai to harshit.ai
- Shared case study components created (CaseStudySidebar, ScreenshotGallery,
  CaseStudyLayout)
- Global cs-* typography system added to globals.css
  (cs-body 17px, cs-card-title 17px, cs-section-label 13px, cs-label 14px,
  cs-sublabel 14px, cs-micro 13px, cs-caption 14px)
- All three case study pages migrated to shared components
- Hero canvas animation rewritten with pre-baked sine wave motion, cursor glow,
  IntersectionObserver pause, 30fps throttle, pixel ratio capped at 1.5x
  GPU usage: 78% → 47%
- Explainable AI case study page live with Notion API integration
  (pulls competitors from DB 3001c35846358067a18adeaa5f08cd1b)
- NOTION_API_KEY set in .env.local and Vercel env vars
- OG meta tags set up (2400x1260 image), sitemap, Google Search Console
- harshitsharma.me redirect domain configured via Namecheap DNS
- GitHub cleanup: deleted Personal-website (empty) and harshitleads.github.io
  (duplicate)

---

## How to Update This File
After every significant build session, append to Project Log:
- What was built
- What stack/tools were used and why
- What was learned or discovered
- What's next

Run /document to trigger this update. Think of it as git commit, not autosave.
Only run /document when a stable, meaningful state has been reached.
### 2026-03-18
## Folder Restructure — 2026-03-17
Portfolio Website folder restructured. Repo now lives directly at:
/Users/H8har/Desktop/Berkeley - Academics/Projects/Portfolio Website/
No longer nested inside portfolio-harshit-ai subfolder.
Git history preserved. GitHub remote unchanged. Vercel unaffected.
