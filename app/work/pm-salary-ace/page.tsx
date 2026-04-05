import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Layers } from "lucide-react";
import { CaseStudySidebar } from "@/components/case-study/CaseStudySidebar";
import { CaseStudyLayout } from "@/components/case-study/CaseStudyLayout";
import { ScreenshotGallery } from "@/components/case-study/ScreenshotGallery";

export const metadata: Metadata = {
  title: "PM Salary Ace | Case Study | Harshit Sharma",
  description: "A full-stack PM interview prep platform. Built V1 in 3 hours, iterated to V2 with auth, progress tracking, and 336 questions.",
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
  { value: "3 Hrs", label: "Shipped in", sublabel: "Concept to shipped" },
  { value: "336", label: "Questions", sublabel: "Across 5 tiers", icon: <Layers size={20} className="text-emerald-400/70" /> },
  { value: "49%", label: "Activation Rate", showProgressBar: true, progressValue: 49 },
  { value: "V2", label: "Live" },
];

const sidebarSections = [
  { id: "insight", label: "Why I Built This" },
  { id: "sprint1", label: "V1 Sprint" },
  { id: "research", label: "User Research" },
  { id: "metrics", label: "V1 Metrics" },
  { id: "sprint2", label: "V2 Decisions" },
  { id: "feedback", label: "User Feedback" },
  { id: "screenshots", label: "Screenshots" },
  { id: "roadmap", label: "Roadmap" },
];

const screenshots = [
  { src: "/images/pm-quiz-landing-v2.png", alt: "Landing Page", caption: "Landing Page" },
  { src: "/images/pm-quiz-question-v2.png", alt: "Quiz Interface", caption: "Quiz Interface" },
  { src: "/images/pm-quiz-results-v2.png", alt: "Progress Dashboard", caption: "Progress Dashboard" },
  { src: "/images/pm-quiz-custom-v2.png", alt: "Custom Quiz Builder", caption: "Custom Quiz Builder" },
];

export default function PMSalaryAcePage() {
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
            PM Salary Ace
          </h1>
          <p className="mb-5 text-lg font-medium text-primary md:text-xl">
            Practice Like the Job Depends On It
          </p>
          <p className="mb-10 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
            A gamified PM prep platform. V1 shipped in 3 hours and revealed two things: users wanted assessment, not learning, and AI-generated questions were too easy to guess. V2 was built around those findings.
          </p>
          <div className="mb-10 flex flex-wrap gap-3">
            <a
              href="https://pmquiz.harshit.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              Live Product <ExternalLink className="h-4 w-4" />
            </a>
            <Link href="/#projects" className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-secondary">
              Back to Portfolio
            </Link>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              { value: "Shipped in 3 Hours", sub: "Concept to shipped" },
              { value: "336 Questions", sub: "Across 5 tiers" },
              { value: "49% Activation", sub: "Activation rate" },
              { value: "V2 Live", sub: "Iterating" },
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

        {/* SECTION 1: WHY */}
        <section id="insight">
          <SectionLabel>The Insight</SectionLabel>
          <SectionHeading>Why I Built This</SectionHeading>
          <Card className="space-y-5">
            <Body>
              I run the Product Management Affinity Group for UC Berkeley&apos;s MEng program. I kept watching smart engineers undersell themselves into safe technical roles because PM recruitment felt out of reach. The problem was not ability. It was confidence and calibration. They did not know what level they were actually at.
            </Body>
            <Body>
              Salary ranges are not just labels. They are psychological permission slips. Showing someone that their thinking maps to a $280K to $350K Frontier AI PM role reframes preparation from obligation to ambition. That was the core design decision everything else was built around.
            </Body>
          </Card>
        </section>

        {/* SECTION 2: V1 SPRINT */}
        <section id="sprint1">
          <SectionLabel>Sprint 1</SectionLabel>
          <SectionHeading>V1: 3 Hours to Shipped</SectionHeading>
          <Card>
            <Body>
              Built with Lovable (AI app builder), Claude for prompting and debugging, and Supabase for the feedback database. No traditional coding. The goal was to validate the concept with real users before investing more time.
            </Body>
            <div className="mt-8 space-y-0">
              {[
                { hour: "Hour 1", label: "Product Decisions", body: "Tier structure, salary ranges, gamification approach, question categories." },
                { hour: "Hour 2", label: "Building", body: "Quiz UI, timer, hint system, multi-correct question support, flag button." },
                { hour: "Hour 3", label: "Polish and Shipping", body: "Radar chart results, admin feedback dashboard, Safari bug fix, deployment." },
              ].map(({ hour, label, body }, i, arr) => (
                <div key={hour} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary ring-1 ring-primary/30">
                      {i + 1}
                    </div>
                    {i < arr.length - 1 && <div className="mt-1 w-px flex-1 bg-border" />}
                  </div>
                  <div className={`pb-7 ${i === arr.length - 1 ? "pb-0" : ""}`}>
                    <p className="mb-0.5 text-[12px] font-bold uppercase tracking-widest text-primary">{hour}</p>
                    <p className="cs-card-title mb-1">{label}</p>
                    <p className="cs-body">{body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-border pt-6">
              <p className="cs-section-label mr-1">V1 Stack</p>
              {["Lovable", "Claude", "Supabase", "Vercel"].map((tool) => (
                <span key={tool} className="rounded-full border border-border bg-secondary px-3 py-1 text-[13px] font-medium text-foreground">{tool}</span>
              ))}
            </div>
          </Card>
        </section>

        {/* SECTION 3: WHAT V1 TAUGHT */}
        <section id="research">
          <SectionLabel>User Research</SectionLabel>
          <SectionHeading>What V1 Taught Me</SectionHeading>
          <Card className="space-y-5">
            <p className="font-semibold text-foreground">I built a learning tool. Users treated it as an assessment.</p>
            <Body>
              I designed the platform around exploration: hints, show answer, retry without seeing the correct answer first. The assumption was that people would go slow, learn, and build intuition.
            </Body>
            <Body>
              Instead, users answered, clicked next, answered, clicked next. They wanted to know their score, not learn the material. That gap between designer intent and user behavior forced an immediate iteration.
            </Body>
            <Body>
              The second discovery: LLMs generate MCQ distractors that are too obviously wrong. The correct answer was plausible, but the wrong answers were clearly implausible. Real interview questions have four plausible answers. That is what makes them hard. All 125 original questions were flagged for regeneration.
            </Body>
          </Card>
        </section>

        {/* SECTION: V1 METRICS */}
        <section id="metrics">
          <SectionLabel>V1 Metrics</SectionLabel>
          <SectionHeading>What the Numbers Showed</SectionHeading>
          <Card className="space-y-8">
            {/* Part A: Activation Funnel */}
            <div className="space-y-4">
              <p className="cs-section-label">Activation Funnel</p>
              <div className="flex flex-col items-center gap-0">
                <div className="relative w-full">
                  <svg viewBox="0 0 400 70" className="w-full">
                    <polygon points="0,0 400,0 365,70 35,70" fill="rgba(52,211,153,0.22)" stroke="rgba(52,211,153,0.4)" strokeWidth="1" />
                    <text x="200" y="28" textAnchor="middle" fill="white" fontWeight="bold" fontSize="18">22</text>
                    <text x="200" y="44" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="12">Users</text>
                    <text x="200" y="58" textAnchor="middle" fill="rgba(52,211,153,0.9)" fontSize="12">First 12 hours</text>
                  </svg>
                </div>
                <div className="flex w-full items-center gap-2 py-1.5">
                  <div className="h-px flex-1 bg-white/[0.06]" />
                  <p className="cs-micro">&darr; 51% didn&apos;t activate</p>
                  <div className="h-px flex-1 bg-white/[0.06]" />
                </div>
                <div className="relative w-[49%]">
                  <svg viewBox="0 0 400 70" className="w-full">
                    <polygon points="0,0 400,0 365,70 35,70" fill="rgba(52,211,153,0.12)" stroke="rgba(52,211,153,0.2)" strokeWidth="1" />
                    <text x="200" y="28" textAnchor="middle" fill="white" fontWeight="bold" fontSize="18">11</text>
                    <text x="200" y="44" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="12">Activated</text>
                    <text x="200" y="58" textAnchor="middle" fill="rgba(52,211,153,0.9)" fontSize="12">49% activation rate</text>
                  </svg>
                </div>
              </div>
            </div>

            {/* Part B: Question Tier Breakdown */}
            <div className="space-y-3 border-t border-border pt-6">
              <p className="cs-section-label">Question Distribution</p>
              <div className="flex h-10 overflow-hidden rounded-lg">
                <div className="flex items-center justify-center bg-emerald-400/20" style={{ width: `${(60 / 336) * 100}%` }}>
                  <span className="text-[12px] text-white">Associate 60</span>
                </div>
                <div className="flex items-center justify-center bg-emerald-400/35" style={{ width: `${(65 / 336) * 100}%` }}>
                  <span className="text-[12px] text-white">Mid 65</span>
                </div>
                <div className="flex items-center justify-center bg-emerald-400/50" style={{ width: `${(67 / 336) * 100}%` }}>
                  <span className="text-[12px] text-white">Senior 67</span>
                </div>
                <div className="flex items-center justify-center bg-emerald-400/65" style={{ width: `${(72 / 336) * 100}%` }}>
                  <span className="text-[12px] text-white">Staff 72</span>
                </div>
                <div className="flex items-center justify-center bg-emerald-400/80" style={{ width: `${(72 / 336) * 100}%` }}>
                  <span className="text-[12px] text-white">Principal 72</span>
                </div>
              </div>
              <div className="cs-micro flex justify-between">
                <span>$130–170K</span>
                <span>$170–220K</span>
                <span>$220–280K</span>
                <span>$280–350K</span>
                <span>$350K+</span>
              </div>
            </div>
          </Card>
        </section>

        {/* SECTION 4: V2 SPRINT */}
        <section id="sprint2">
          <SectionLabel>Sprint 2</SectionLabel>
          <SectionHeading>V2: What Changed and Why</SectionHeading>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              {
                decision: "336 questions via Gemini 2.5 Pro with human QA",
                reasoning: "AI generation is fast but produces obvious wrong answers. 211 new questions were generated and reviewed before going live. The original 125 are flagged inactive pending regeneration.",
              },
              {
                decision: "Supabase backend with RLS and server-side answer security",
                reasoning: "V1 had answers hardcoded in the frontend JS array. Anyone could inspect the source and cheat. V2 uses a SECURITY DEFINER view that hides correct answers from the API. Answers are only fetched after submission via RPC call.",
              },
              {
                decision: "Google OAuth and email auth, but no forced login",
                reasoning: "Higher tiers were initially gated behind login. That was reversed. Trust is a barrier for an unknown product. Forcing email signup before letting someone try a Staff+ question creates more friction than value. All 5 tiers are now open. Login unlocks progress tracking.",
              },
              {
                decision: "Progress dashboard with per-skill radar chart",
                reasoning: "The radar chart initially used session-level proxy data. That was not accurate enough. V2 tracks correctness per question per category in a JSONB column, giving users a real skill breakdown across Product Sense, Metrics, Product Design, and Behavioral.",
              },
              {
                decision: "Custom quiz builder with tier, skill, and difficulty filters",
                reasoning: "Direct response to user feedback. Users wanted to drill weaknesses, not practice randomly. The builder lets them cross-filter and set question count.",
              },
              {
                decision: "Hero copy changed from Master PM Interviews to Think Like a Top PM",
                reasoning: "Original copy implied mock interview simulation. The product is a skills builder, not an interview simulator. The target user is someone trying to break into PM, not someone already doing PM interviews.",
              },
            ].map(({ decision, reasoning }) => (
              <Card key={decision}>
                <p className="cs-card-title mb-2">{decision}</p>
                <p className="cs-body">{reasoning}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* SECTION 5: USER FEEDBACK */}
        <section id="feedback">
          <SectionLabel>User Feedback</SectionLabel>
          <SectionHeading>What Beta Users Said</SectionHeading>
          <Card className="space-y-6">
            <div>
              <p className="cs-section-label mb-1">Beta User, aspiring PM</p>
              <ul className="mt-3 space-y-2">
                {[
                  "Multi-select tag too small, not visible enough",
                  "Some mid-level questions feel easy",
                  "Product sense questions are relevant and well-written",
                  "No bugs encountered, fast performance",
                  "Suggested making it more similar to actual interviews",
                ].map((item) => (
                  <li key={item} className="cs-body flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-border pt-6">
              <p className="cs-section-label mb-3">My Response</p>
              <Body>
                Multi-select visibility is a valid bug. Question difficulty is intentional: the target user is an aspiring PM, not a current PM. Interview simulation is a V3 direction, not V2 scope. The product is explicitly a thinking skills builder.
              </Body>
            </div>
          </Card>
        </section>

        {/* SECTION 6: V2 SCREENSHOTS */}
        <section id="screenshots">
          <SectionLabel>Product Screenshots</SectionLabel>
          <SectionHeading>V2 Live Product</SectionHeading>
          <ScreenshotGallery screenshots={screenshots} />
        </section>

        {/* SECTION 7: WHAT'S NEXT */}
        <section id="roadmap">
          <SectionLabel>Roadmap</SectionLabel>
          <SectionHeading>V3 Direction</SectionHeading>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <p className="cs-section-label mb-5">Still In Progress (V2)</p>
              <ul className="space-y-3">
                {[
                  "Contrast fixes on quiz builder and tier badge pills",
                  "Tablet card height consistency",
                  "Regenerate original 125 questions via Gemini",
                  "Make multi-select tag more prominent",
                ].map((item) => (
                  <li key={item} className="cs-body flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted-foreground/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <p className="cs-section-label mb-5">V3 Vision</p>
              <ul className="space-y-3">
                {[
                  "Open-ended questions with LLM-as-judge scoring",
                  "Full model answer visible after each question",
                  "Personalized weak area recommendations",
                  "Interview simulation format",
                ].map((item) => (
                  <li key={item} className="cs-body flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
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
