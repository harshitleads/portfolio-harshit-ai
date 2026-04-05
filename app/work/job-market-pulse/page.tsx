import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, BarChart3, Zap } from "lucide-react";
import { CaseStudySidebar } from "@/components/case-study/CaseStudySidebar";
import { CaseStudyLayout } from "@/components/case-study/CaseStudyLayout";
import { ScreenshotGallery } from "@/components/case-study/ScreenshotGallery";
import { PulsePreviewChart } from "@/components/case-study/PulsePreviewChart";

export const metadata: Metadata = {
  title: "Job Market Pulse | Case Study | Harshit Sharma",
  description: "A real-time dashboard visualizing US labor market trends and H-1B visa sponsorship data. Built with FRED API, DOL, and USCIS public data.",
  openGraph: {
    title: "Job Market Pulse | Harshit Sharma",
    description: "A real-time dashboard visualizing US labor market trends and H-1B visa sponsorship data. Built with FRED API, DOL, and USCIS public data.",
    images: [{ url: "/images/pulse-hero.png", width: 1200, height: 630 }],
  },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="cs-section-label mb-2">
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
      {children}
    </h2>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`glass-card rounded-2xl p-6 md:p-8 ${className}`}>
      {children}
    </div>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="cs-body">
      {children}
    </p>
  );
}

const sidebarStats = [
  { value: "Data Dashboard", label: "Type" },
  { value: "Analytics", label: "Domain", icon: <BarChart3 size={24} className="text-emerald-400/70" /> },
  { value: "Live", label: "Status", icon: <Zap size={24} className="text-emerald-400/70" /> },
  { value: "Next.js + FRED API", label: "Stack" },
];

const sidebarSections = [
  { id: "why", label: "Why I Built This" },
  { id: "preview", label: "Live Preview" },
  { id: "data-sources", label: "Data Sources" },
  { id: "decisions", label: "Design Decisions" },
  { id: "screenshots", label: "Screenshots" },
];

const screenshots = [
  { src: "/images/pulse-hero.png", alt: "Dashboard Overview", caption: "Labor Market Overview" },
  { src: "/images/pulse-h1b.png", alt: "H-1B Tracker", caption: "H-1B Sponsor Tracker" },
  { src: "/images/pulse-chart.png", alt: "Job Openings Trend", caption: "Job Openings vs Unemployment" },
];

export default function JobMarketPulsePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* HERO */}
      <section className="px-6 pb-16 pt-12 md:pb-24 md:pt-16">
        <div className="mx-auto max-w-7xl">
          <Link href="/" className="mb-12 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>
          <SectionLabel>Case Study</SectionLabel>
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Job Market Pulse
          </h1>
          <p className="mb-5 text-lg font-medium text-primary md:text-xl">
            The labor market, visualized
          </p>
          <p className="mb-10 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
            A real-time dashboard that combines data from the Federal Reserve, Department of Labor, and USCIS into one clean view. Labor market trends from 2021 to present, H-1B sponsor rankings, PM role salary ranges, and approval rates. Data refreshes every 24 hours.
          </p>
          <div className="mb-10 flex flex-wrap gap-3">
            <a
              href="https://pulse.harshit.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              Explore the Dashboard <ExternalLink className="h-4 w-4" />
            </a>
            <Link href="/#projects" className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-secondary">
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Link>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              { value: "4 Data Sources", sub: "FRED, DOL, USCIS, BLS" },
              { value: "Live Data", sub: "Refreshes daily" },
              { value: "H-1B Tracker", sub: "Company lookup" },
              { value: "Shipped", sub: "pulse.harshit.ai" },
            ].map(({ value, sub }) => (
              <div key={value} className="rounded-full border border-primary/20 bg-primary/10 px-5 py-2 text-center">
                <p className="text-[15px] font-bold text-primary">{value}</p>
                <p className="text-[13px] text-slate-400">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="px-6">
        <div className="mx-auto max-w-3xl">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
      </div>

      <CaseStudyLayout
        sidebar={
          <CaseStudySidebar stats={sidebarStats} sections={sidebarSections} />
        }
      >

        {/* SECTION 1: WHY I BUILT THIS */}
        <section id="why">
          <SectionLabel>Motivation</SectionLabel>
          <SectionHeading>Government Data Shouldn&apos;t Be This Hard to Read</SectionHeading>
          <Card className="space-y-5">
            <Body>
              The US labor market generates incredibly rich data every month. JOLTS tracks job openings, hires, quits, and layoffs. USCIS publishes H-1B approval rates by employer. The Department of Labor discloses every LCA filing with job titles and salaries. All of it is public. None of it is easy to use.
            </Body>
            <Body>
              I built Job Market Pulse because I was tired of navigating government PDFs, ad-heavy aggregator sites, and fragmented H-1B portals just to answer simple questions. How many jobs are open right now? Which companies sponsor H-1B for PM roles? What are they paying? Four data sources, one dashboard, refreshed daily.
            </Body>
          </Card>
        </section>

        {/* SECTION 2: LIVE PREVIEW */}
        <section id="preview">
          <SectionLabel>Preview</SectionLabel>
          <SectionHeading>Job Openings vs Unemployment Rate</SectionHeading>
          <PulsePreviewChart />
          <div className="mt-6">
            <Body>
              Static snapshot from FRED API. For live data and more charts, explore the full dashboard.
            </Body>
            <a
              href="https://pulse.harshit.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:brightness-110"
            >
              Explore the full dashboard <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* SECTION 3: DATA SOURCES */}
        <section id="data-sources">
          <SectionLabel>Data Pipeline</SectionLabel>
          <SectionHeading>Four Sources, One Dashboard</SectionHeading>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              {
                name: "FRED API",
                org: "Federal Reserve Economic Data",
                desc: "Job openings, unemployment rate, hires, quits, layoffs, and total separations. Monthly, seasonally adjusted.",
              },
              {
                name: "DOL OFLC",
                org: "Department of Labor",
                desc: "Labor Condition Application disclosure data. Every H-1B filing with job title, salary, employer, and work location. FY2022 through FY2025.",
              },
              {
                name: "USCIS",
                org: "H-1B Employer Data Hub",
                desc: "Approval and denial counts by employer, by fiscal year. FY2020 through FY2026 Q1.",
              },
              {
                name: "BLS JOLTS",
                org: "Bureau of Labor Statistics",
                desc: "Monthly surveys of 21,000 establishments tracking job openings, hires, and separations across all nonfarm industries.",
              },
            ].map(({ name, org, desc }) => (
              <Card key={name}>
                <p className="cs-card-title mb-1">{name}</p>
                <p className="mb-2 text-[12px] font-bold uppercase tracking-widest text-primary">{org}</p>
                <p className="cs-body">{desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* SECTION 4: DESIGN DECISIONS */}
        <section id="decisions">
          <SectionLabel>Design Decisions</SectionLabel>
          <SectionHeading>Why It Works This Way</SectionHeading>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              {
                decision: "One chart, one story",
                reasoning: "Every chart answers exactly one question. Job openings vs unemployment tells the macro story. No multi-purpose charts that require a legend to decode.",
              },
              {
                decision: "Annotations over legends",
                reasoning: "Key moments are labeled directly on the charts: COVID lockdowns, Great Resignation peak, tech layoff wave. The reader should not need to cross-reference a legend.",
              },
              {
                decision: "Static preview, live dashboard",
                reasoning: "The case study page embeds a static snapshot for interactive preview. The full dashboard fetches live data every 24 hours. Two layers: preview for context, dashboard for depth.",
              },
              {
                decision: "H-1B as a first-class tab",
                reasoning: "For international students and workers, H-1B sponsorship data is the most relevant labor market data. It deserves its own tab with company lookup, salary ranges, and approval trends.",
              },
            ].map(({ decision, reasoning }) => (
              <Card key={decision}>
                <p className="cs-card-title mb-2">{decision}</p>
                <p className="cs-body">{reasoning}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* SECTION 5: SCREENSHOTS */}
        <section id="screenshots">
          <SectionLabel>The Dashboard</SectionLabel>
          <SectionHeading>What You Will Find</SectionHeading>
          <ScreenshotGallery screenshots={screenshots} />
        </section>

      </CaseStudyLayout>

      <footer className="border-t border-border px-6 py-14">
        <div className="mx-auto max-w-3xl flex flex-col items-center gap-5 text-center">
          <p className="text-sm text-muted-foreground">Built by Harshit Sharma, UC Berkeley MEng</p>
          <Link href="/#projects" className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-secondary">
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>
        </div>
      </footer>
    </main>
  );
}
