import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { ScreenshotGallery } from "./screenshot-gallery";

export const metadata: Metadata = {
  title: "PM Salary Ace | Case Study | Harshit Sharma",
  description:
    "A gamified PM interview prep platform built and shipped to 44 users in 3 hours.",
};

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
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
    <p className="text-base leading-8 text-muted-foreground md:text-[17px]">
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export default function PMSalaryAcePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* ---- HERO ---- */}
      <section className="px-6 pb-16 pt-12 md:pb-24 md:pt-16">
        <div className="mx-auto max-w-3xl">

          {/* Back nav */}
          <Link
            href="/"
            className="mb-12 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>

          {/* Tag */}
          <SectionLabel>Case Study</SectionLabel>

          {/* Title */}
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            PM Salary Ace
          </h1>

          {/* Tagline */}
          <p className="mb-5 text-lg font-medium text-primary md:text-xl">
            Practice Like the Job Depends On It
          </p>

          {/* Subtitle */}
          <p className="mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            A gamified PM interview prep platform built and shipped to 44 users in 3 hours.
          </p>

          {/* CTAs */}
          <div className="mb-10 flex flex-wrap gap-3">
            <a
              href="https://pm-salary-quest.lovable.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              Live Demo
              <ExternalLink className="h-4 w-4" />
            </a>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-secondary"
            >
              Back to Portfolio
            </Link>
          </div>

          {/* Stat pills */}
          <div className="flex flex-wrap gap-3">
            {[
              { value: "3 Hours", sub: "Build time" },
              { value: "44 Users", sub: "At launch" },
              { value: "125 Questions", sub: "In the bank" },
            ].map(({ value, sub }) => (
              <div
                key={value}
                className="rounded-full border border-primary/20 bg-primary/10 px-5 py-2 text-center"
              >
                <p className="text-sm font-bold text-primary">{value}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="px-6">
        <div className="mx-auto max-w-3xl">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
      </div>

      {/* ---- BODY ---- */}
      <div className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-3xl space-y-20">

          {/* ---- SECTION 1: THE INSIGHT ---- */}
          <section>
            <SectionLabel>The Insight</SectionLabel>
            <SectionHeading>Why I Built This</SectionHeading>
            <Card className="space-y-5">
              <Body>
                I run the Product Management Affinity Group for UC Berkeley&apos;s MEng program.
                I kept watching smart engineers undersell themselves into safe technical roles
                because PM recruitment felt out of reach. The problem wasn&apos;t ability; it
                was confidence and calibration. They didn&apos;t know what level they were
                actually at.
              </Body>
              <Body>
                The salary ranges weren&apos;t just labels. They were psychological permission
                slips. Showing someone that their thinking maps to a $280K&ndash;$350K Frontier
                AI PM role reframes preparation from obligation to ambition. That was the core
                design decision everything else was built around.
              </Body>
            </Card>
          </section>

          {/* ---- SECTION 2: THE BUILD ---- */}
          <section>
            <SectionLabel>The Build</SectionLabel>
            <SectionHeading>3 Hours to Shipped</SectionHeading>
            <Card>
              <Body>
                Built entirely with Lovable (AI app builder) + Claude for prompting and
                debugging + Supabase for the feedback database. No traditional coding.
              </Body>

              {/* Timeline */}
              <div className="mt-8 space-y-0">
                {[
                  {
                    hour: "Hour 1",
                    label: "Product Decisions",
                    body: "Tier structure, salary ranges, gamification approach, question categories.",
                  },
                  {
                    hour: "Hour 2",
                    label: "Building",
                    body: "Quiz UI, timer, hint system, multi-correct question support, flag button.",
                  },
                  {
                    hour: "Hour 3",
                    label: "Polish + Shipping",
                    body: "Radar chart results, admin feedback dashboard, Safari bug fix, deployment.",
                  },
                ].map(({ hour, label, body }, i, arr) => (
                  <div key={hour} className="flex gap-5">
                    {/* Spine */}
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary ring-1 ring-primary/30">
                        {i + 1}
                      </div>
                      {i < arr.length - 1 && (
                        <div className="mt-1 w-px flex-1 bg-border" />
                      )}
                    </div>
                    {/* Content */}
                    <div className={`pb-7 ${i === arr.length - 1 ? "pb-0" : ""}`}>
                      <p className="mb-0.5 text-xs font-bold uppercase tracking-widest text-primary">
                        {hour}
                      </p>
                      <p className="mb-1 font-semibold text-foreground">{label}</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stack */}
              <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-border pt-6">
                <p className="mr-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Stack
                </p>
                {["Lovable", "Claude", "Supabase", "Vercel"].map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-foreground"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </Card>
          </section>

          {/* ---- SECTION 3: WHAT I DISCOVERED ---- */}
          <section>
            <SectionLabel>User Research</SectionLabel>
            <SectionHeading>What Users Did vs. What I Expected</SectionHeading>
            <Card className="space-y-5">
              <p className="font-semibold text-foreground">
                I built a learning tool. Users treated it as an assessment.
              </p>
              <Body>
                I designed the platform around exploration: hints, show answer, retry without
                seeing the correct answer. The assumption was that people would go slow, learn,
                and build intuition.
              </Body>
              <Body>
                Instead, 44 users answered, clicked next, answered, clicked next. They wanted
                to know their score, not learn the material. That gap between designer intent
                and user behavior forced an immediate iteration, making the Staff, Frontier,
                and Mid-level questions significantly harder so the assessment experience was
                at least accurate.
              </Body>
            </Card>
          </section>

          {/* ---- SECTION 4: LLM CALIBRATION ---- */}
          <section>
            <SectionLabel>A Discovery</SectionLabel>
            <SectionHeading>What I Discovered About AI-Generated Questions</SectionHeading>
            <Card className="space-y-5">
              <Body>
                I used Claude to generate all 125 questions. The output looked good, until
                users started getting perfect scores on Staff-level questions that should be
                genuinely difficult.
              </Body>
              <Body>
                The problem: LLMs generate MCQ distractors that are too obviously wrong. The
                correct answer was plausible, but the wrong answers were clearly implausible.
                Real interview questions have four plausible answers. That&apos;s what makes
                them hard.
              </Body>
              <Body>
                This is a calibration failure specific to AI-generated assessment content, and
                it required manual review and rewriting of the hardest tiers to fix.
              </Body>
            </Card>
          </section>

          {/* ---- SECTION 5: KNOWN ISSUES + V2 ---- */}
          <section>
            <SectionLabel>Honest Assessment</SectionLabel>
            <SectionHeading>V1 Honest Assessment</SectionHeading>
            <div className="grid gap-4 md:grid-cols-2">

              {/* What's broken */}
              <Card>
                <p className="mb-5 text-xs font-bold uppercase tracking-widest text-red-400/80">
                  What&apos;s Broken
                </p>
                <ul className="space-y-3">
                  {[
                    "No open-ended questions (MCQ only)",
                    "Timer goes negative instead of flagging timeout",
                    "Question difficulty still being calibrated",
                    "No user accounts or progress tracking",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>

              {/* V2 vision */}
              <Card>
                <p className="mb-5 text-xs font-bold uppercase tracking-widest text-primary">
                  V2 Vision
                </p>
                <ul className="space-y-3">
                  {[
                    "LLM-powered open-ended answer grading",
                    "GPT-4o mini parsing answers against model criteria",
                    "Full model answer visible after each question",
                    "Personalized weak area recommendations",
                    "Login + progress tracking across sessions",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </section>

          {/* ---- SECTION 6: SCREENSHOTS ---- */}
          <section>
            <SectionLabel>Screenshots</SectionLabel>
            <SectionHeading>The Product</SectionHeading>
            <ScreenshotGallery />
          </section>

        </div>
      </div>

      {/* ---- FOOTER ---- */}
      <footer className="border-t border-border px-6 py-14">
        <div className="mx-auto max-w-3xl flex flex-col items-center gap-5 text-center">
          <p className="text-sm text-muted-foreground">
            Built by Harshit Sharma, UC Berkeley MEng
          </p>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-secondary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>
        </div>
      </footer>

    </main>
  );
}
