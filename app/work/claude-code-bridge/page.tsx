import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Github, GitBranch, Zap, FileText, BookOpen } from "lucide-react";
import { CaseStudySidebar } from "@/components/case-study/CaseStudySidebar";
import { CaseStudyLayout } from "@/components/case-study/CaseStudyLayout";
import { ScreenshotGallery } from "@/components/case-study/ScreenshotGallery";

export const metadata: Metadata = {
  title: "claude-code-bridge | Case Study | Harshit Sharma",
  description: "Local MCP server that bridges Claude Mac app and Cursor. Decisions from strategy sessions auto-sync to project files. Context compounds, never resets.",
  openGraph: {
    title: "claude-code-bridge | Harshit Sharma",
    description: "Local MCP server that bridges Claude Mac app and Cursor. Decisions from strategy sessions auto-sync to project files. Context compounds, never resets.",
    images: [{ url: "/images/claude-bridge-architecture.png", width: 1200, height: 630 }],
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
  { value: "Developer Tool", label: "Type" },
  { value: "Context Engineering", label: "Domain", icon: <GitBranch size={24} className="text-emerald-400/70" /> },
  { value: "Shipped", label: "Status", icon: <Zap size={24} className="text-emerald-400/70" /> },
  { value: "TypeScript + MCP", label: "Stack" },
];

const sidebarSections = [
  { id: "problem", label: "Problem" },
  { id: "how-it-works", label: "How It Works" },
  { id: "two-files", label: "Two Files, Two Purposes" },
  { id: "decisions", label: "Design Decisions" },
  { id: "limitations", label: "Honest Limitations" },
  { id: "screenshots", label: "Screenshots" },
  { id: "whats-next", label: "What's Next" },
];

const screenshots = [
  { src: "/images/claude-bridge-architecture.png", alt: "Architecture Loop", caption: "Architecture Loop" },
  { src: "/images/claude-bridge-before-after.png", alt: "Before and After", caption: "Before and After" },
  { src: "/images/claude-bridge-tools.png", alt: "MCP Tools", caption: "MCP Tools" },
  { src: "/images/claude-bridge-claudemd.png", alt: "CLAUDE.md in Action", caption: "CLAUDE.md in Action" },
];

export default function ClaudeCodeBridgePage() {
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
            claude-code-bridge
          </h1>
          <p className="mb-5 text-lg font-medium text-primary md:text-xl">
            Context compounds. It never resets.
          </p>
          <p className="mb-10 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
            A local MCP server that bridges Claude Mac app and Cursor. Strategy decisions from Claude auto-sync to your project files. When you open Cursor, Claude Code already knows where things stand. No copy-paste, no re-explaining.
          </p>
          <div className="mb-10 flex flex-wrap gap-3">
            <a
              href="https://github.com/harshitleads/claude-code-bridge"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <Link href="/#projects" className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-secondary">
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Link>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              { value: "Shipped", sub: "Open source" },
              { value: "Context Engineering", sub: "Strategy to code" },
              { value: "Used Daily", sub: "6 projects" },
              { value: "MCP Native", sub: "Anthropic SDK" },
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
          <SectionHeading>You Strategize in One Place, You Build in Another</SectionHeading>
          <Card className="space-y-5">
            <Body>
              You use Claude to think through architecture, weigh tradeoffs, and make product decisions. Then you switch to Cursor to build. The moment you switch, the context is gone. You re-explain what was decided, repeat the constraints, and hope you remember what you agreed on ten minutes ago.
            </Body>
            <Body>
              This is not a tooling problem. It is a context engineering problem. The decisions exist, they were made in a real conversation, but they are trapped in a chat window that your code editor cannot read.
            </Body>
          </Card>
        </section>

        {/* SECTION 2: HOW IT WORKS */}
        <section id="how-it-works">
          <SectionLabel>Workflow</SectionLabel>
          <SectionHeading>How It Works</SectionHeading>
          <Card>
            <div className="space-y-0">
              {[
                { step: "Step 1", label: "Strategize in Claude Mac app", body: "Think through architecture, product decisions, and tradeoffs in a normal Claude conversation. No special syntax, no commands." },
                { step: "Step 2", label: "claude-code-bridge writes decisions", body: "At the end of every strategy session, Claude automatically writes technical decisions to CLAUDE.md and product decisions to docs/decisions.md in your project." },
                { step: "Step 3", label: "Open Cursor", body: "Cursor reads CLAUDE.md at session start via .cursorrules. Claude Code has full context before you type a single command." },
                { step: "Step 4", label: "Build with context", body: "Claude Code knows the stack, the constraints, the decisions, and the history. No re-explaining. No copy-paste." },
                { step: "Step 5", label: "Next session compounds", body: "The next strategy session reads the existing log and builds on top of it. Every session adds to the context. It never resets." },
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
              {["TypeScript", "Node.js", "MCP SDK", "Anthropic"].map((tool) => (
                <span key={tool} className="rounded-full border border-border bg-secondary px-3 py-1 text-[13px] font-medium text-foreground">{tool}</span>
              ))}
            </div>
          </Card>
        </section>

        {/* SECTION 3: TWO FILES */}
        <section id="two-files">
          <SectionLabel>Architecture</SectionLabel>
          <SectionHeading>Two Files, Two Purposes</SectionHeading>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
                <FileText size={20} className="text-primary" />
              </div>
              <p className="cs-card-title mb-2">CLAUDE.md</p>
              <p className="cs-body">
                Technical context for Claude Code. Stack, architecture, code rules, and a running log of technical decisions. Claude Code reads this at the start of every Cursor session. Think of it as the project&apos;s working memory.
              </p>
            </Card>
            <Card>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
                <BookOpen size={20} className="text-primary" />
              </div>
              <p className="cs-card-title mb-2">docs/decisions.md</p>
              <p className="cs-body">
                Product decision log for humans. Why certain decisions were made, what tradeoffs were accepted, what alternatives were rejected. Append-only, never edited. Useful for PMs and engineers reviewing your work.
              </p>
            </Card>
          </div>
        </section>

        {/* SECTION 4: DESIGN DECISIONS */}
        <section id="decisions">
          <SectionLabel>Design Decisions</SectionLabel>
          <SectionHeading>Why It Works This Way</SectionHeading>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              {
                decision: "Two files, not one",
                reasoning: "Technical context (CLAUDE.md) and product reasoning (decisions.md) serve different readers. Claude Code needs stack and constraints. Humans need the why behind decisions. Mixing them makes both worse.",
              },
              {
                decision: "Append-only decision log",
                reasoning: "Product decisions are never edited. If a decision changes, a new entry explains why. This creates an auditable trail of product thinking that compounds over time.",
              },
              {
                decision: "Local MCP server, not a cloud service",
                reasoning: "Runs on your machine, reads and writes to your local filesystem. No API keys, no cloud dependency, no data leaving your laptop. Setup once, works forever.",
              },
              {
                decision: "Three tools, not ten",
                reasoning: "read_file, write_decisions, create_file. That is the entire surface area. Deliberate minimalism. Every tool added is a tool that can break or confuse the model.",
              },
              {
                decision: "stdio transport, not HTTP",
                reasoning: "Claude Mac app communicates with MCP servers via stdio (standard input/output). No ports, no networking, no firewall issues. The simplest possible transport for a local tool.",
              },
              {
                decision: ".cursorrules as the trigger",
                reasoning: "A one-line .cursorrules file tells Cursor to read CLAUDE.md at the start of every session. No plugin, no extension, no configuration UI. One file, automatic context loading.",
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
                { title: "Mac only", body: "Claude Mac app is required. Windows and Linux users cannot use this today." },
                { title: "No conflict resolution", body: "If two sessions write to CLAUDE.md simultaneously, last-write-wins. Not a problem for solo builders, but would need locking for teams." },
                { title: "Manual setup per project", body: "Each project needs a CLAUDE.md, a docs/decisions.md, and a .cursorrules file created manually. A CLI scaffolding tool would reduce this friction." },
                { title: "Context window limits apply", body: "CLAUDE.md is read into the context window. Very large project logs could eventually exceed limits. Periodic cleanup keeps it manageable." },
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

        {/* SECTION 6: SCREENSHOTS */}
        <section id="screenshots">
          <SectionLabel>Architecture and Tools</SectionLabel>
          <SectionHeading>How It Looks</SectionHeading>
          <ScreenshotGallery screenshots={screenshots} />
        </section>

        {/* SECTION 7: WHAT'S NEXT */}
        <section id="whats-next">
          <SectionLabel>Roadmap</SectionLabel>
          <SectionHeading>What&apos;s Next</SectionHeading>
          <Card>
            <ul className="space-y-3">
              {[
                "CLI scaffolding tool: `npx claude-code-bridge init` to create CLAUDE.md, decisions.md, and .cursorrules in any project",
                "Multi-agent support: bridge context across Claude, GPT, and Gemini sessions",
                "Team mode: shared decision log with conflict resolution for multi-contributor projects",
                "VS Code extension: bring the bridge to non-Cursor editors",
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
