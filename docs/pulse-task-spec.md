# Job Market Pulse — Case Study Page + Homepage Card Task Spec

## PART 1: Case study page at app/work/job-market-pulse/page.tsx

Follow the EXACT pattern from app/work/eval-studio/page.tsx. Same imports, same shared components (CaseStudySidebar, CaseStudyLayout), same SectionLabel/SectionHeading/Card/Body helpers defined inline. This is a LIGHTER case study — 5 sections, not 7.

### Metadata
title: "Job Market Pulse | Case Study | Harshit Sharma"
description: "A real-time dashboard visualizing US labor market trends and H-1B visa sponsorship data. Built with FRED API, DOL, and USCIS public data."
OG image: "/images/pulse-hero.png"

### Sidebar stats
- { value: "Data Dashboard", label: "Type" }
- { value: "Analytics", label: "Domain", icon: BarChart3 size={24} }
- { value: "Live", label: "Status", icon: Zap size={24} }
- { value: "Next.js + FRED API", label: "Stack" }

### Sidebar sections
- { id: "why", label: "Why I Built This" }
- { id: "preview", label: "Live Preview" }
- { id: "data-sources", label: "Data Sources" }
- { id: "decisions", label: "Design Decisions" }
- { id: "screenshots", label: "Screenshots" }

### Screenshots array (PLACEHOLDER images — will 404 until added later)
- { src: "/images/pulse-hero.png", alt: "Dashboard Overview", caption: "Labor Market Overview" }
- { src: "/images/pulse-h1b.png", alt: "H-1B Tracker", caption: "H-1B Sponsor Tracker" }
- { src: "/images/pulse-chart.png", alt: "Job Openings Trend", caption: "Job Openings vs Unemployment" }

### Hero
- SectionLabel: "Case Study"
- h1: "Job Market Pulse"
- Tagline: "The labor market, visualized"
- Description: "A real-time dashboard that combines data from the Federal Reserve, Department of Labor, and USCIS into one clean view. Labor market trends from 2021 to present, H-1B sponsor rankings, PM role salary ranges, and approval rates. Data refreshes every 24 hours."
- Buttons: "Explore the Dashboard" (primary green, ExternalLink icon, href https://pulse.harshit.ai) + "Back to Portfolio" (secondary, ArrowLeft, href /#projects). NO GitHub button.
- Traction pills:
  - { value: "4 Data Sources", sub: "FRED, DOL, USCIS, BLS" }
  - { value: "Live Data", sub: "Refreshes daily" }
  - { value: "H-1B Tracker", sub: "Company lookup" }
  - { value: "Shipped", sub: "pulse.harshit.ai" }

### Section 1: Why I Built This (id="why")
- SectionLabel: "Motivation"
- SectionHeading: "Government Data Shouldn't Be This Hard to Read"
- Single Card, two Body paragraphs:
  1. "The US labor market generates incredibly rich data every month. JOLTS tracks job openings, hires, quits, and layoffs. USCIS publishes H-1B approval rates by employer. The Department of Labor discloses every LCA filing with job titles and salaries. All of it is public. None of it is easy to use."
  2. "I built Job Market Pulse because I was tired of navigating government PDFs, ad-heavy aggregator sites, and fragmented H-1B portals just to answer simple questions. How many jobs are open right now? Which companies sponsor H-1B for PM roles? What are they paying? Four data sources, one dashboard, refreshed daily."

### Section 2: Live Preview (id="preview")
- SectionLabel: "Preview"
- SectionHeading: "Job Openings vs Unemployment Rate"
- This section contains an EMBEDDED INTERACTIVE CHART using Recharts.
- The chart component MUST be a separate client component (needs "use client").
- Create a new file: components/case-study/PulsePreviewChart.tsx
- Chart shows two lines: Job Openings (left y-axis, millions) and Unemployment Rate (right y-axis, %)
- Data: fetch from /data/fred-snapshot.json (static file, see below)
- Use: LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer from recharts
- Styling: transparent/dark background, emerald green (#00c896) for job openings line, amber (#f59e0b) for unemployment rate, subtle dark grid lines (rgba white at 10%), white axis labels
- Tooltip: dark background, shows date + both values
- Below chart: Body text "Static snapshot from FRED API. For live data and more charts, explore the full dashboard."
- Below that: link "Explore the full dashboard" with arrow, linking to https://pulse.harshit.ai
- Install recharts: pnpm add recharts

### Static JSON file: public/data/fred-snapshot.json
Create this file with monthly data from Jan 2021 to Feb 2025:
[
  { "date": "2021-01", "jobOpenings": 7.1, "unemploymentRate": 6.7 },
  { "date": "2021-02", "jobOpenings": 7.4, "unemploymentRate": 6.2 },
  { "date": "2021-03", "jobOpenings": 8.1, "unemploymentRate": 6.0 },
  { "date": "2021-04", "jobOpenings": 9.3, "unemploymentRate": 6.1 },
  { "date": "2021-05", "jobOpenings": 9.5, "unemploymentRate": 5.8 },
  { "date": "2021-06", "jobOpenings": 10.1, "unemploymentRate": 5.9 },
  { "date": "2021-07", "jobOpenings": 10.9, "unemploymentRate": 5.4 },
  { "date": "2021-08", "jobOpenings": 10.9, "unemploymentRate": 5.2 },
  { "date": "2021-09", "jobOpenings": 10.6, "unemploymentRate": 4.7 },
  { "date": "2021-10", "jobOpenings": 10.6, "unemploymentRate": 4.6 },
  { "date": "2021-11", "jobOpenings": 10.8, "unemploymentRate": 4.2 },
  { "date": "2021-12", "jobOpenings": 11.4, "unemploymentRate": 3.9 },
  { "date": "2022-01", "jobOpenings": 11.3, "unemploymentRate": 4.0 },
  { "date": "2022-02", "jobOpenings": 11.3, "unemploymentRate": 3.8 },
  { "date": "2022-03", "jobOpenings": 11.9, "unemploymentRate": 3.6 },
  { "date": "2022-04", "jobOpenings": 11.4, "unemploymentRate": 3.6 },
  { "date": "2022-05", "jobOpenings": 11.3, "unemploymentRate": 3.6 },
  { "date": "2022-06", "jobOpenings": 10.7, "unemploymentRate": 3.6 },
  { "date": "2022-07", "jobOpenings": 10.7, "unemploymentRate": 3.5 },
  { "date": "2022-08", "jobOpenings": 10.3, "unemploymentRate": 3.7 },
  { "date": "2022-09", "jobOpenings": 10.2, "unemploymentRate": 3.5 },
  { "date": "2022-10", "jobOpenings": 10.3, "unemploymentRate": 3.7 },
  { "date": "2022-11", "jobOpenings": 10.2, "unemploymentRate": 3.6 },
  { "date": "2022-12", "jobOpenings": 10.5, "unemploymentRate": 3.5 },
  { "date": "2023-01", "jobOpenings": 10.6, "unemploymentRate": 3.4 },
  { "date": "2023-02", "jobOpenings": 9.9, "unemploymentRate": 3.6 },
  { "date": "2023-03", "jobOpenings": 9.7, "unemploymentRate": 3.5 },
  { "date": "2023-04", "jobOpenings": 10.1, "unemploymentRate": 3.4 },
  { "date": "2023-05", "jobOpenings": 9.8, "unemploymentRate": 3.7 },
  { "date": "2023-06", "jobOpenings": 9.2, "unemploymentRate": 3.6 },
  { "date": "2023-07", "jobOpenings": 8.8, "unemploymentRate": 3.5 },
  { "date": "2023-08", "jobOpenings": 8.9, "unemploymentRate": 3.8 },
  { "date": "2023-09", "jobOpenings": 8.7, "unemploymentRate": 3.8 },
  { "date": "2023-10", "jobOpenings": 8.9, "unemploymentRate": 3.9 },
  { "date": "2023-11", "jobOpenings": 8.8, "unemploymentRate": 3.7 },
  { "date": "2023-12", "jobOpenings": 9.0, "unemploymentRate": 3.7 },
  { "date": "2024-01", "jobOpenings": 8.8, "unemploymentRate": 3.7 },
  { "date": "2024-02", "jobOpenings": 8.8, "unemploymentRate": 3.9 },
  { "date": "2024-03", "jobOpenings": 8.4, "unemploymentRate": 3.8 },
  { "date": "2024-04", "jobOpenings": 8.1, "unemploymentRate": 3.9 },
  { "date": "2024-05", "jobOpenings": 7.9, "unemploymentRate": 4.0 },
  { "date": "2024-06", "jobOpenings": 7.7, "unemploymentRate": 4.1 },
  { "date": "2024-07", "jobOpenings": 7.7, "unemploymentRate": 4.3 },
  { "date": "2024-08", "jobOpenings": 7.8, "unemploymentRate": 4.2 },
  { "date": "2024-09", "jobOpenings": 7.4, "unemploymentRate": 4.1 },
  { "date": "2024-10", "jobOpenings": 7.7, "unemploymentRate": 4.1 },
  { "date": "2024-11", "jobOpenings": 7.1, "unemploymentRate": 4.2 },
  { "date": "2024-12", "jobOpenings": 6.5, "unemploymentRate": 4.1 },
  { "date": "2025-01", "jobOpenings": 7.2, "unemploymentRate": 4.0 },
  { "date": "2025-02", "jobOpenings": 6.9, "unemploymentRate": 4.1 }
]
NOTE: Approximate values from FRED/BLS JOLTS. Close enough for a static preview.

### Section 3: Data Sources (id="data-sources")
- SectionLabel: "Data Pipeline"
- SectionHeading: "Four Sources, One Dashboard"
- 2x2 grid of Cards:
  - "FRED API" / "Federal Reserve Economic Data" / "Job openings, unemployment rate, hires, quits, layoffs, and total separations. Monthly, seasonally adjusted."
  - "DOL OFLC" / "Department of Labor" / "Labor Condition Application disclosure data. Every H-1B filing with job title, salary, employer, and work location. FY2022 through FY2025."
  - "USCIS" / "H-1B Employer Data Hub" / "Approval and denial counts by employer, by fiscal year. FY2020 through FY2026 Q1."
  - "BLS JOLTS" / "Bureau of Labor Statistics" / "Monthly surveys of 21,000 establishments tracking job openings, hires, and separations across all nonfarm industries."

### Section 4: Design Decisions (id="decisions")
- SectionLabel: "Design Decisions"
- SectionHeading: "Why It Works This Way"
- 2-column grid of Cards:
  - "One chart, one story" / "Every chart answers exactly one question. Job openings vs unemployment tells the macro story. No multi-purpose charts that require a legend to decode."
  - "Annotations over legends" / "Key moments are labeled directly on the charts: COVID lockdowns, Great Resignation peak, tech layoff wave. The reader should not need to cross-reference a legend."
  - "Static preview, live dashboard" / "The case study page embeds a static snapshot for interactive preview. The full dashboard fetches live data every 24 hours. Two layers: preview for context, dashboard for depth."
  - "H-1B as a first-class tab" / "For international students and workers, H-1B sponsorship data is the most relevant labor market data. It deserves its own tab with company lookup, salary ranges, and approval trends."

### Section 5: Screenshots (id="screenshots")
- SectionLabel: "The Dashboard"
- SectionHeading: "What You Will Find"
- ScreenshotGallery with the screenshots array (images will 404 until added — acceptable for now)

### Footer
Same as other case studies: "Built by Harshit Sharma, UC Berkeley MEng" + Back to Portfolio button.

---

## PART 2: Homepage card in components/projects-section.tsx

Add as LAST item in the projects array (after pm-salary-ace):

id: "job-market-pulse"
title: "Job Market Pulse"
tagline: "The labor market, visualized"
tags: ["Live Product", "AI Tools"]
problem.short: "Job market data is scattered across government sites, ugly portals, and paywalled reports. Nobody has a clean, real-time view of what is actually happening."
problem.full: "The US labor market generates rich data every month through JOLTS, BLS, and USCIS. But accessing it means navigating government PDFs, ad-heavy aggregator sites, and fragmented H-1B portals. For job seekers, founders, and PMs, there is no single clean dashboard that shows job openings, layoffs, hiring trends, and H-1B sponsorship data in one place."
solution.short: "A real-time dashboard pulling from FRED API, DOL, and USCIS. Labor market trends, H-1B sponsor rankings, PM salary ranges, and approval rates in one view."
solution.full: "A data dashboard pulling from FRED API, DOL LCA filings, and USCIS H-1B employer data. Job openings, unemployment, hires, quits, and layoffs from 2021 to present. H-1B tracker with company lookup, top sponsors, PM role salary ranges, and approval trends. Data refreshes every 24 hours."
keyInsight: "The best dashboard is the one where you do not need a legend to understand what you are looking at. Every chart tells one story, every annotation explains why that moment matters."
differentiation: ["FRED API + DOL + USCIS data combined in one dashboard", "H-1B company lookup with PM-specific salary and filing data", "Annotations on charts explain key market moments", "Live data, refreshes every 24 hours"]
traction: "Live · 4 Data Sources · Daily Refresh"
images: [{ src: "/images/pulse-hero.png", label: "Dashboard Overview" }]
galleryIncludesHero: true
imagePosition: "object-top"
liveDemoLink: "https://pulse.harshit.ai"
caseStudyLink: "/work/job-market-pulse"
No githubLink.

---

## PART 3: Update sitemap
Add /work/job-market-pulse to app/sitemap.ts with today's date.

## PART 4: Install recharts
Run: pnpm add recharts

## Files to create/modify
- CREATE: app/work/job-market-pulse/page.tsx
- CREATE: components/case-study/PulsePreviewChart.tsx (client component)
- CREATE: public/data/fred-snapshot.json
- MODIFY: components/projects-section.tsx
- MODIFY: app/sitemap.ts
- RUN: pnpm add recharts

## Acceptance Criteria
- Case study page renders at /work/job-market-pulse
- Recharts chart renders with hover tooltips (Job Openings + Unemployment Rate)
- Chart reads from /data/fred-snapshot.json
- Chart has dark theme (dark bg, emerald green + amber lines)
- "Explore the Dashboard" links to https://pulse.harshit.ai
- No GitHub button
- Homepage card appears last
- Sitemap updated
- No em dashes, traction pills in Sentence Case
- pnpm build passes