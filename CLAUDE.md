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

