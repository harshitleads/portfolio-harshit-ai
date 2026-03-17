# CLAUDE.md — Project Intelligence File
# Last updated: 2026-03-16

---

## Who I Am
Harshit Sharma — AI PM, UC Berkeley MEng
Building a PM portfolio to target AI PM roles at frontier tech companies
Goal: ship high-quality portfolio pieces, maintain consistency across all case study pages

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

## Code Hygiene (non-negotiable)
- No em dashes anywhere in copy — sounds AI-written
- No placeholder content in production
- Always test mobile viewport before shipping
- Handle errors gracefully — never show raw errors to users
- Keep components small and focused on one job
- Delete unused code — don't leave commented-out blocks
- Meaningful commit messages — describe what changed and why
- Gmail compose links only, never mailto
- Filter logic is AND (must match ALL selected tags)
- Screenshots: aspect-ratio 16/10, object-fit cover

---

## Current Stack
- Next.js (App Router), TypeScript, Tailwind CSS
- Deployed on Vercel (auto-deploys on push to main)
- pnpm as package manager
- Repo: harshitleads/harshit.ai

---

## Architecture
- `/` — main portfolio with anchor nav and filter system
- `/work/pm-salary-ace` — PM Salary Ace case study
- `/work/dear-her` — Dear Her case study
- `/work/explainable-ai` — Explainable AI case study

### Shared Case Study Components
All case study pages use:
- `components/case-study/CaseStudySidebar.tsx`
- `components/case-study/ScreenshotGallery.tsx`
- `components/case-study/CaseStudyLayout.tsx`
- Global cs-* typography system in `globals.css`

New case study pages MUST use these components. Do not
introduce new layout patterns.

---

## Vision & Mission
Portfolio site for Harshit Sharma. Demonstrates product
thinking through shipped work, not just descriptions.
Every page should read like a PM wrote it — not an engineer,
not a marketer.

---

## Known Issues / Backlog
- [ ] Wire screenshots into /work/explainable-ai
        (images already exist in /public/images/)
- [ ] Add work/explainable-ai to sitemap.ts
- [ ] Add custom domain explainable.harshit.ai in Vercel

---

## Project Log

### 2026-03-16 — CLAUDE.md initialized
- Repo renamed from portfolio-harshit-ai to harshit.ai
- Shared case study components created
- Global cs-* typography system added to globals.css
- Hero canvas animation rewritten (GPU: 78% → 47%)
- Explainable AI case study page live with Notion API
- OG meta tags, sitemap, Google Search Console set up
- harshitsharma.me redirect domain configured via Namecheap

---

## How to Update This File
After every significant build session, append to Project Log:
- What was built
- What stack/tools were used and why
- What was learned or discovered
- What's next