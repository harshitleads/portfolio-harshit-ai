import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Explainable AI Coding Assistant | Case Study | Harshit Sharma",
  description:
    "A product case study on adding an explainability layer to AI coding assistants. Market research, user insight, and Figma prototype.",
  openGraph: {
    title: "Explainable AI Coding Assistant | Case Study | Harshit Sharma",
    description:
      "A product case study on adding an explainability layer to AI coding assistants. Market research, user insight, and Figma prototype.",
    url: "https://harshit.ai/work/explainable-ai",
  },
};

const sections = [
  { id: "problem", label: "Problem Framing" },
  { id: "market", label: "Market Context" },
  { id: "research", label: "User Research" },
  { id: "decisions", label: "Design Decisions" },
  { id: "prototype", label: "Prototype Walkthrough" },
  { id: "next", label: "What's Next" },
];

const stats = [
  { label: "Type", value: "Case Study" },
  { label: "Domain", value: "Developer Tools" },
  { label: "Status", value: "Prototype stage" },
  { label: "Deliverables", value: "Market research, Figma prototype, PDF" },
];

export default function ExplainableAIPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>

        <div className="mb-10">
          <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2 font-medium">
            Case Study
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
            Explainable AI Coding Assistant
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            AI coding tools generate code. They don&apos;t explain it. This is a
            product study on what happens when you add the missing layer.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <a
              href="/Explainable_Coding_Assistant.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium border border-foreground/20 rounded-full px-4 py-1.5 hover:bg-foreground/5 transition-colors"
            >
              View Full PDF
            </a>
            <a
              href="https://explainable-coding-assistant-6r1papywr.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              Live Product <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="lg:w-52 xl:w-60 shrink-0">
            <div className="lg:sticky lg:top-8 space-y-8">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3 font-medium">
                  At a Glance
                </p>
                <div className="space-y-3">
                  {stats.map((s) => (
                    <div key={s.label}>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                      <p className="text-sm font-medium">{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3 font-medium">
                  Sections
                </p>
                <nav className="space-y-1">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-0.5"
                    >
                      {s.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          <div className="flex-1 space-y-16">
            <section id="problem">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1 font-medium">
                The Problem
              </p>
              <h2 className="text-2xl font-bold mb-4">Problem Framing</h2>
              <p className="text-muted-foreground mb-4">
                GitHub Copilot, Cursor, and their peers have fundamentally
                changed how code gets written. A developer types a comment and
                a function appears. That is genuinely useful. But it creates a
                second problem that nobody ships a fix for: the developer
                doesn&apos;t know why the function looks the way it does.
              </p>
              <p className="text-muted-foreground mb-4">
                For junior developers, this means accepting suggestions they
                don&apos;t fully understand, which makes them slower to debug and
                less likely to build intuition over time. For senior developers,
                it means spending mental energy validating suggestions before
                trusting them, which erodes the time savings that made the tool
                valuable in the first place.
              </p>
              <p className="text-muted-foreground">
                The product question is not &quot;how do we make suggestions
                better?&quot; That is a model problem. The product question is:
                &quot;how do we make suggestions legible?&quot; That is a design
                and product problem, and it has not been seriously attempted.
              </p>
            </section>

            <section id="market">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1 font-medium">
                Market Context
              </p>
              <h2 className="text-2xl font-bold mb-4">
                Where the Market Sits Today
              </h2>
              <p className="text-muted-foreground mb-6">
                Every major AI coding assistant competes on suggestion quality
                and language coverage. None compete on explainability. This is
                a consistent gap, not an oversight.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {[
                  {
                    name: "GitHub Copilot",
                    note: "Inline autocomplete with no rationale surface. Comment-driven generation has no explanation layer.",
                  },
                  {
                    name: "Cursor",
                    note: "Chat alongside the editor is closer, but it is reactive. The user has to ask. Explanations are not surfaced proactively.",
                  },
                  {
                    name: "Codeium / Tabnine",
                    note: "Speed-focused. The value prop is low latency, not transparency. No explanation affordance at all.",
                  },
                ].map((tool) => (
                  <div
                    key={tool.name}
                    className="border border-foreground/10 rounded-xl p-4"
                  >
                    <p className="font-semibold text-sm mb-1">{tool.name}</p>
                    <p className="text-xs text-muted-foreground">{tool.note}</p>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground">
                The gap is structural. These tools were built to maximize
                suggestion throughput. Explanation is friction by default.
                Reframing it as a feature, not a bug, is the core product bet.
              </p>
            </section>

            <section id="research">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1 font-medium">
                User Research
              </p>
              <h2 className="text-2xl font-bold mb-4">User Research Findings</h2>
              <p className="text-muted-foreground mb-6">
                Interviews and observations with developers across experience
                levels surfaced two distinct but related problems. The
                terminology is different. The root cause is the same: the AI
                does not show its work.
              </p>
              <div className="space-y-5">
                {[
                  {
                    persona: "Junior Developer",
                    quote:
                      "I accepted the suggestion because it looked right. I couldn't tell you why it chose a recursive approach instead of a loop. I just ran it and hoped.",
                    insight:
                      "Junior devs use AI suggestions as learning shortcuts but don't gain the understanding that makes the shortcut stick. Trust without comprehension creates fragile knowledge.",
                  },
                  {
                    persona: "Senior Developer",
                    quote:
                      "I spend 30 seconds reviewing every suggestion. That's fine if it's right. But if the suggestion is wrong, I've just spent 30 seconds being wrong confidently.",
                    insight:
                      "Senior devs have the knowledge to evaluate suggestions but lack the context the model used to generate them. They can catch errors, but they can't verify reasoning efficiently.",
                  },
                  {
                    persona: "Engineering Manager",
                    quote:
                      "My team's PRs are getting reviewed longer, not shorter, since we adopted Copilot. Reviewers don't know which lines were AI-generated versus intentional.",
                    insight:
                      "Explainability is not just a solo-developer problem. It affects code review velocity, team trust, and the legibility of intent across a pull request.",
                  },
                ].map((item) => (
                  <div
                    key={item.persona}
                    className="border border-foreground/10 rounded-xl p-5"
                  >
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2 font-medium">
                      {item.persona}
                    </p>
                    <p className="text-sm italic text-foreground/80 mb-3">
                      &quot;{item.quote}&quot;
                    </p>
                    <p className="text-sm text-muted-foreground">{item.insight}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="decisions">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1 font-medium">
                Design Decisions
              </p>
              <h2 className="text-2xl font-bold mb-4">
                What Explainability Means in a Coding Context
              </h2>
              <p className="text-muted-foreground mb-6">
                Explainability in AI is often treated as a technical property of
                the model: attention maps, SHAP values, confidence scores. That
                framing is wrong for this use case. Developers don&apos;t need to
                understand the model. They need to understand the suggestion.
                Those are different problems.
              </p>
              <div className="space-y-4">
                {[
                  {
                    decision: "Why this approach",
                    description:
                      "Every code suggestion surfaces a one-line rationale: the primary reason this pattern was chosen over alternatives. Not model internals. Product-level reasoning. 'Chosen for readability over performance at this scale.'",
                  },
                  {
                    decision: "What tradeoffs exist",
                    description:
                      "The suggestion panel shows one to two explicit tradeoffs: 'This approach is easier to read but creates an extra loop over the array. Acceptable at n < 10,000.' Developers can then decide whether the tradeoff applies to their context.",
                  },
                  {
                    decision: "What the developer needs to know",
                    description:
                      "A knowledge prereq note for junior developers: 'This uses a closure. If closures are new to you, here is a 60-second explainer.' Not condescending. Optional. Targeted at closing the specific gap the suggestion surfaces.",
                  },
                  {
                    decision: "Inline vs. separate panel",
                    description:
                      "The explanation lives in a collapsible side panel, not inline with the suggestion. Inline creates noise for developers who don't need it. The panel is open by default for juniors (inferred from file history and error patterns) and collapsed by default for seniors.",
                  },
                ].map((item) => (
                  <div key={item.decision} className="border-l-2 border-foreground/20 pl-4">
                    <p className="font-semibold text-sm mb-1">{item.decision}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="prototype">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1 font-medium">
                Prototype
              </p>
              <h2 className="text-2xl font-bold mb-4">Prototype Walkthrough</h2>
              <p className="text-muted-foreground mb-6">
                The Figma prototype covers three primary flows: suggestion with
                explanation panel, tradeoff comparison mode, and the knowledge
                prereq surface for junior developers. Each flow was designed to
                require zero new user intent. The explanation appears because
                the developer accepted a suggestion, not because they asked for
                help.
              </p>
              <div className="space-y-5">
                {[
                  {
                    step: "01",
                    title: "Suggestion with Explanation Panel",
                    desc: "Developer accepts a suggestion. The panel slides in from the right, showing the rationale, the pattern used, and the primary tradeoff. Collapse arrow is visible. No modal, no interruption to the editing flow.",
                  },
                  {
                    step: "02",
                    title: "Tradeoff Comparison Mode",
                    desc: "Developer clicks 'See alternatives.' Two to three alternative approaches render in a diff-style view, each with its own tradeoff note. The selected approach is highlighted. The developer can swap to an alternative without re-typing.",
                  },
                  {
                    step: "03",
                    title: "Knowledge Prereq Surface",
                    desc: "If the suggestion uses a pattern the developer's file history suggests they haven't encountered before, a small tag appears: 'New to closures?' Tapping it opens a 60-second inline explainer. Designed to be ignored by developers who already know it.",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="flex gap-4 border border-foreground/10 rounded-xl p-5"
                  >
                    <span className="text-2xl font-bold text-foreground/20 shrink-0">
                      {item.step}
                    </span>
                    <div>
                      <p className="font-semibold text-sm mb-1">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <a
                  href="/Explainable_Coding_Assistant.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium border border-foreground/20 rounded-full px-4 py-1.5 hover:bg-foreground/5 transition-colors"
                >
                  View full prototype documentation (PDF)
                </a>
              </div>
            </section>

            <section id="next">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1 font-medium">
                What&apos;s Next
              </p>
              <h2 className="text-2xl font-bold mb-4">Next Sprint</h2>
              <p className="text-muted-foreground mb-6">
                The current deliverable is market research, user insight
                framing, and a Figma prototype. The next sprint is a live
                prototype built as a VS Code extension or a Cursor plugin,
                depending on which surfaces the explainability layer more
                natively.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    label: "In progress",
                    items: [
                      "VS Code extension scaffolding",
                      "LLM prompt design for rationale generation",
                      "Explanation quality eval rubric",
                    ],
                  },
                  {
                    label: "On the roadmap",
                    items: [
                      "File-history-based experience inference",
                      "Team-level explanation sharing in PR review",
                      "Opt-in learning mode for junior developers",
                    ],
                  },
                ].map((col) => (
                  <div key={col.label} className="border border-foreground/10 rounded-xl p-5">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3 font-medium">
                      {col.label}
                    </p>
                    <ul className="space-y-2">
                      {col.items.map((item) => (
                        <li
                          key={item}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-foreground/30 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <div className="pt-4 border-t border-foreground/10">
              <p className="text-sm text-muted-foreground">
                Built by Harshit Sharma, UC Berkeley MEng
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mt-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Portfolio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
