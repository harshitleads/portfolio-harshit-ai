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
- `/` — main portfolio with anchor nav and filter system
- `/work/pm-salary-ace` — PM Salary Ace case study
- `/work/dear-her` — Dear Her case study
- `/work/explainable-ai` — Explainable AI case study
- `/sitemap.xml` — auto-generated via sitemap.ts
- `components/projects-section.tsx` — ProjectData interface, projects array, filter system
- `components/case-study/` — shared case study components (CaseStudySidebar, ScreenshotGallery, CaseStudyLayout)
- `app/globals.css` — cs-* typography system

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

## Design System
- Dark navy background, bright green accent, glass-card components
- Case study pages: two-column layout with sticky left sidebar
- Sidebar width: lg:w-52 xl:w-60
- Screenshots: aspect-ratio 16/10, object-fit cover

## Known Issues and Backlog
- Custom domain explainable.harshit.ai not yet configured in Vercel

## Project Log
[Technical decisions appended here automatically via claude-code-bridge.]

### 2026-03-21

## Session: 2026-03-21

- Added Calendly inline embed to contact section. data-url: https://calendly.com/harshit-harshit/15min?background_color=0a0f1e&text_color=ffffff&primary_color=00ff88. Height 700px, max-width 800px wrapper, glass card container (background rgba(255,255,255,0.04), border-radius 16px, border 1px solid rgba(255,255,255,0.08)).
- Calendly event renamed from "30 Minute Meeting" to "Quick Intro Call". Two durations: 15 min (default) and 30 min.
- Calendly heading: "If it's easier, pick a time directly" with subtitle "15 / 30 min · Google Meet". Icon: CalendarDays 24x24 with bg-primary/10 backdrop matching contact card icon containers.
- Added floating bubble widget: fixed bottom-right, fades in after delay, "Pick a time to connect / 15 / 30 min · Google Meet", dismissible with X, clicking scrolls to contact section.
- Contact button copy: removed exclamation marks. Now "Email me", "Connect with me on LinkedIn", "Grab my resume". Font-weight hierarchy fixed: title 500, subtitle 400 13px.
- About section: removed all transitioning/aspiring language. "to transition into AI Product Management" replaced with "I build products daily, not just study them." WHERE I AM card updated to remove "Learning by building" framing.
- Philosophy modal: "At Berkeley I am building" replaced with "At Berkeley I built". "is teaching me" and "I am learning the foundations" replaced with confident present-tense framing.
- claude-code-bridge project: repo description, website (harshit.ai), and topics added on GitHub.
- explainable-coding-assistant: repo description and topics added on GitHub.
- CLAUDE.md initialized with proper workflow — bridge now active for this project.


### 2026-04-03

## Session: 2026-04-03

### Calendly Bubble Fixes (3 issues)

1. **Cross-page navigation broken:** Floating bubble click uses scroll-only logic, which fails on `/work/*` pages. Fix: detect if on homepage — if not, navigate to `/#contact` first, then scroll to the Calendly embed element specifically.

2. **Scroll target too high:** Bubble scrolls to the contact section anchor, but the Calendly embed is further down within it. Fix: scroll to the Calendly embed container element directly (not the section top).

3. **Bubble never reappears:** After dismissing or clicking the bubble, it's gone permanently. Fix: after dismiss/click, set a 30-40 second timeout to show the bubble again if user is still on the site.

### Calendly Theming

- Calendly premium/trial expired. Custom color params (background_color, text_color, primary_color) in the embed URL no longer apply. Calendly now renders with default white/blue theme. This is accepted — not a blocker. Do not attempt to fix or hack around it.

### Discovery Needed

Before implementing fixes, Cursor needs to find:
- Where the bubble component lives and how click/dismiss state is managed
- Whether bubble is rendered in layout.tsx (all pages) or only homepage
- What the current scroll/navigation logic is on bubble click


### 2026-04-03

---

## TASK: Fix Calendly Floating Bubble (3 issues)
**Status:** Ready for execution
**Priority:** High

### Context
The floating bubble is in `components/calendly-bubble.tsx`, rendered globally in `app/layout.tsx`. The contact section is in `components/contact-section.tsx`. The Calendly embed has class `calendly-inline-widget` but no `id`.

### Issue 1: Cross-page navigation broken
**Problem:** Bubble click does `document.getElementById("contact").scrollIntoView()`. On `/work/*` pages, `#contact` doesn't exist so nothing happens.
**Fix:** On click, check if `document.getElementById("contact")` exists. If not, use Next.js `router.push("/#contact")`. After navigation, scroll to the Calendly embed. Use `useRouter` from `next/navigation`.

### Issue 2: Scroll target too high
**Problem:** Scrolls to `#contact` section top, but Calendly embed is further down within it.
**Fix:** Add `id="calendly-embed"` to the Calendly embed container in `contact-section.tsx`. Update bubble click to scroll to `#calendly-embed` instead of `#contact`.

### Issue 3: Bubble disappears permanently after dismiss/click
**Problem:** `sessionStorage.setItem("calendly-bubble-dismissed", "true")` kills the bubble for the entire session with no reappearance.
**Fix:** After dismiss or click, hide the bubble. Set a `setTimeout` of 35 seconds. When it fires, show the bubble again (set `visible: true`, `dismissed: false`). Do NOT clear sessionStorage on reappearance — use component state only. Remove the sessionStorage logic entirely; rely on useState + timeout.

### Acceptance Criteria
- [ ] On any `/work/*` page, clicking bubble navigates to homepage and scrolls to Calendly embed
- [ ] On homepage, clicking bubble scrolls directly to Calendly embed (not section top)
- [ ] After dismissing bubble (X or click), it reappears after ~35 seconds
- [ ] Bubble still fades in on initial page load with existing delay
- [ ] Test on both homepage and at least one `/work/*` page
- [ ] No console errors

### Files to touch
- `components/calendly-bubble.tsx` — main fixes
- `components/contact-section.tsx` — add `id="calendly-embed"` to the embed container

