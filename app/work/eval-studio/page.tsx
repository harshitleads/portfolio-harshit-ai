import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, FlaskConical, Server, BarChart3, Zap } from "lucide-react";
import { CaseStudySidebar } from "@/components/case-study/CaseStudySidebar";
import { CaseStudyLayout } from "@/components/case-study/CaseStudyLayout";

export const metadata: Metadata = {
  title: "Eval Studio | Case Study | Harshit Sharma",
  description: "Browser-based LLM evaluation tool. Test prompts and models on your own data with multi-model judge council, cost tracking, and ranked results.",
  openGraph: {
    title: "Eval Studio | Harshit Sharma",
    description: "Browser-based LLM evaluation tool. Test prompts and models on your own data with multi-model judge council, cost tracking, and ranked results.",
    images: [{ url: "/images/eval-studio-hero.png", width: 1200, height: 630 }],
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
  { value: "AI Eval Tool", label: "Type" },
  { value: "LLM Infra", label: "Domain", icon: <Server size={20} className="text-emerald-400/70" /> },
  { value: "Live", label: "Status", icon: <Zap size={20} className="text-emerald-400/70" /> },
  { value: "Next.js + TS", label: "Stack" },
];

const sidebarSections = [
  { id: "problem", label: "Problem" },
  { id: "use-cases", label: "Two Use Cases" },
  { id: "how-it-works", label: "How It Works" },
  { id: "decisions", label: "Design Decisions" },
  { id: "limitations", label: "Honest Limitations" },
  { id: "whats-next", label: "What's Next" },
];

export default function EvalStudioPage() {
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
            Eval Studio
          </h1>
          <p className="mb-5 text-lg font-medium text-primary md:text-xl">
            Which prompt, which model, at what cost?
          </p>
          <p className="mb-10 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
            A browser-based LLM evaluation tool. Test prompts and models against your own data with a multi-model judge council, per-row cost tracking, and a ranked leaderboard. BYO API keys, nothing stored.
          </p>
          <div className="mb-10 flex flex-wrap gap-3">
            <a
              href="https://eval.harshit.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              Try It <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/harshitleads/eval-studio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-secondary"
            >
              GitHub <ExternalLink className="h-4 w-4" />
            </a>
            <Link href="/#projects" className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-secondary">
              Back to Portfolio
            </Link>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              { value: "Multi-provider", sub: "Anthropic, OpenAI, Gemini" },
              { value: "Judge Council", sub: "Cross-provider scoring" },
              { value: "Cost Tracking", sub: "Per-row, per-config" },
              { value: "Live", sub: "eval.harshit.ai" },
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

        {/* SECTION 1: PROBLEM */}
        <section id="problem">
          <SectionLabel>The Problem</SectionLabel>
          <SectionHeading>Spreadsheets, Gut Feel, or Generic Benchmarks</SectionHeading>
          <Card className="space-y-5">
            <Body>
              Every AI team faces the same question: which prompt, which model, at what cost? The standard answer is spreadsheets, gut feel, or generic benchmarks that have nothing to do with the actual product.
            </Body>
            <Body>
              Existing eval tools either require significant engineering setup, test on public benchmarks that do not reflect real use cases, or lock results behind expensive SaaS plans. There is no simple way to point a tool at your own data, define your own criteria, and get a scored, reproducible result.
            </Body>
          </Card>
        </section>

        {/* SECTION 2: TWO USE CASES */}
        <section id="use-cases">
          <SectionLabel>Use Cases</SectionLabel>
          <SectionHeading>Two Entry Points, Two Decisions</SectionHeading>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
                <FlaskConical size={20} className="text-primary" />
              </div>
              <p className="cs-card-title mb-2">Test Models</p>
              <p className="cs-body">
                Same prompt, different models. Upload your dataset, write one system prompt, pick 2-4 models across Anthropic, OpenAI, and Gemini. See which model serves your data best and at what cost.
              </p>
            </Card>
            <Card>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
                <BarChart3 size={20} className="text-primary" />
              </div>
              <p className="cs-card-title mb-2">Test Prompts</p>
              <p className="cs-body">
                Same model, different prompts. Upload your dataset, pick one model, write 2-4 system prompts. See which prompt produces better outputs on your actual data.
              </p>
            </Card>
          </div>
        </section>

        {/* SECTION 3: HOW IT WORKS */}
        <section id="how-it-works">
          <SectionLabel>Workflow</SectionLabel>
          <SectionHeading>How It Works</SectionHeading>
          <Card>
            <div className="space-y-0">
              {[
                { step: "Step 1", label: "Enter API keys", body: "Bring your own keys for Anthropic, OpenAI, or Google Gemini. Nothing stored, nothing logged. Keys live in React state only." },
                { step: "Step 2", label: "Upload a dataset", body: "Upload a CSV (max 50 rows) or use the built-in 50-row sample dataset covering 8 task categories." },
                { step: "Step 3", label: "Configure 2-4 prompt/model combinations", body: "Mix and match models and system prompts. Test Models mode locks the prompt; Test Prompts mode locks the model." },
                { step: "Step 4", label: "Define a scoring rubric", body: "Named criteria, weights, and colors. The rubric tells the judge council exactly what to evaluate and how to weight it." },
                { step: "Step 5", label: "Choose a judge council", body: "1-2 models, cross-provider recommended to reduce bias. A bias warning appears when any judge provider matches any config provider." },
                { step: "Step 6", label: "Run the eval", body: "Each row is scored independently by each judge, scores averaged. Rows where judges disagree by more than 15 points are flagged as outliers." },
                { step: "Step 7", label: "Get ranked results", body: "A ranked leaderboard with per-row scores, cost breakdown, outlier flags, and CSV export." },
              ].map(({ step, label, body }, i, arr) => (
                <div key={step} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary ring-1 ring-primary/30">
                      {i + 1}
                    </div>
                    {i < arr.length - 1 && <div className="mt-1 w-px flex-1 bg-border" />}
                  </div>
                  <div className={`pb-7 ${i === arr.length - 1 ? "pb-0" : ""}`}>
                    <p className="mb-0.5 text-[12px] font-bold uppercase tracking-widest text-primary">{step}</p>
                    <p className="cs-card-title mb-1">{label}</p>
                    <p className="cs-body">{body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-border pt-6">
              <p className="cs-section-label mr-1">Stack</p>
              {["Next.js", "TypeScript", "Anthropic API", "OpenAI API", "Gemini API", "Vercel"].map((tool) => (
                <span key={tool} className="rounded-full border border-border bg-secondary px-3 py-1 text-[13px] font-medium text-foreground">{tool}</span>
              ))}
            </div>
          </Card>
        </section>

        {/* SECTION 4: DESIGN DECISIONS */}
        <section id="decisions">
          <SectionLabel>Design Decisions</SectionLabel>
          <SectionHeading>Why It Works This Way</SectionHeading>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              {
                decision: "Judge council over single judge",
                reasoning: "A single model judging its own provider's outputs has a documented bias. Eval Studio uses two independent judges from different providers, averages their scores, and flags rows where judges disagree by more than 15 points. A bias warning appears when any judge provider matches any config provider.",
              },
              {
                decision: "BYO key, no backend storage",
                reasoning: "Users bring their own API keys. Keys live in React state only, never stored, never logged. API calls go through a server-side proxy to handle CORS, but nothing is persisted. This builds trust and eliminates server cost.",
              },
              {
                decision: "Cost tracking as a first-class metric",
                reasoning: "Every eval shows total tokens, total cost, and average cost per row per config. Pricing is hardcoded from provider docs with a last-updated timestamp. Cost is a real selection criterion alongside quality.",
              },
              {
                decision: "N-way configs (2-4) over fixed A vs B",
                reasoning: "Fixed A/B does not scale. N-way with dynamic add/remove is more flexible. Capped at 4 to stay within Tier 1 rate limits at 50 rows.",
              },
              {
                decision: "Ranked leaderboard over side-by-side columns",
                reasoning: "With N configs there is no natural A vs B. A ranked list with gold/silver/bronze badges scales cleanly and is easier to scan.",
              },
              {
                decision: "API key error recovery without losing state",
                reasoning: "When 50%+ of rows error (bad key), an inline fix panel appears on the results page with editable key inputs. Retry reruns the full eval without navigating away. Dataset, configs, and rubric are all preserved.",
              },
            ].map(({ decision, reasoning }) => (
              <Card key={decision}>
                <p className="cs-card-title mb-2">{decision}</p>
                <p className="cs-body">{reasoning}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* SECTION 5: HONEST LIMITATIONS */}
        <section id="limitations">
          <SectionLabel>Limitations</SectionLabel>
          <SectionHeading>Honest Limitations</SectionHeading>
          <Card className="space-y-5">
            <ul className="space-y-4">
              {[
                { title: "No persistence", body: "Closing the tab clears everything. This is intentional for V1 (no server cost, no auth complexity) but means you cannot compare runs across sessions." },
                { title: "50-row cap", body: "Sequential processing (one row at a time to avoid rate limits) means larger datasets would be slow. Batch API support is the V2 path." },
                { title: "Judge scoring is LLM pattern matching", body: "The rubric scores are the judges' assessments, not grounded metrics. Two-judge averaging reduces noise but does not eliminate subjectivity." },
                { title: "Cost data is hardcoded", body: "Pricing tables are manually maintained from provider documentation, not pulled from a live API." },
              ].map(({ title, body }) => (
                <li key={title} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted-foreground/40" />
                  <div>
                    <p className="cs-card-title mb-1">{title}</p>
                    <p className="cs-body">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* SECTION 6: WHAT'S NEXT */}
        <section id="whats-next">
          <SectionLabel>Roadmap</SectionLabel>
          <SectionHeading>What&apos;s Next</SectionHeading>
          <Card>
            <ul className="space-y-3">
              {[
                "Demo mode with pre-loaded mock results so visitors can browse without API keys",
                "Persistent run history across sessions",
                "Batch API support for larger datasets",
                "Hybrid scoring: auto-detect exact match for structured outputs, LLM judge for open-ended",
              ].map((item) => (
                <li key={item} className="cs-body flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
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
