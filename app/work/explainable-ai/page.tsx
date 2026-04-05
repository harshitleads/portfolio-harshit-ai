import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Shield, Zap } from "lucide-react";
import { CaseStudySidebar } from "@/components/case-study/CaseStudySidebar";
import { CaseStudyLayout } from "@/components/case-study/CaseStudyLayout";
import Image from "next/image";

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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="cs-section-label mb-1">{children}</p>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold mb-4">{children}</h2>;
}

const sidebarStats = [
  { value: "Developer Tool", label: "Type" },
  { value: "AI Trust", label: "Domain", icon: <Shield size={24} className="text-emerald-400/70" /> },
  { value: "Live", label: "Status", icon: <Zap size={24} className="text-emerald-400/70" /> },
  { value: "Next.js + Claude", label: "Stack" },
];

const sidebarSections = [
  { id: "problem", label: "Problem Framing" },
  { id: "market", label: "Market Context" },
  { id: "research", label: "User Research" },
  { id: "decisions", label: "Design Decisions" },
  { id: "limitations", label: "Honest Limitations" },
  { id: "prototype", label: "Prototype Walkthrough" },
  { id: "screenshots", label: "Screenshots" },
  { id: "next", label: "What's Next" },
];

interface CompetitiveTool {
  name: string
  marketPosition: string
  keyFeatures: string
  uniqueAngle: string
  keyInsights: string
  targetUser: string
  pricing: string
}

async function getCompetitiveTools(): Promise<CompetitiveTool[]> {
  try {
    const res = await fetch(
      `https://api.notion.com/v1/databases/${process.env.NOTION_COMPETITIVE_DB_ID}/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ page_size: 20 }),
        next: { revalidate: 3600 },
      }
    )
    if (!res.ok) return []
    const data = await res.json()
    return data.results.map((page: any) => ({
      name: page.properties['Competitor Name']?.title?.[0]?.plain_text ?? '',
      marketPosition: page.properties['Market Position']?.rich_text?.[0]?.plain_text ?? '',
      keyFeatures: page.properties['Key Features']?.rich_text?.[0]?.plain_text ?? '',
      uniqueAngle: page.properties['Unique Angle']?.rich_text?.[0]?.plain_text ?? '',
      keyInsights: page.properties['Key Insight']?.rich_text?.[0]?.plain_text ?? '',
      targetUser: page.properties['Target User']?.rich_text?.[0]?.plain_text ?? '',
      pricing: page.properties['Pricing']?.rich_text?.[0]?.plain_text ?? '',
      analysisType: page.properties['Analysis Type']?.select?.name ?? page.properties['Analysis Type']?.multi_select?.[0]?.name ?? '',
    })).filter((t: any) => {
      if (!t.name) return false
      const excluded = ['user pain point', 'strategic', 'solution mockup', 'one-pager', 'synthesis', 'analysis']
      return !excluded.some((term: string) => t.name.toLowerCase().includes(term))
    })
  } catch {
    return []
  }
}

export default async function ExplainableAIPage() {
  const tools = await getCompetitiveTools()
  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* HERO */}
      <section className="px-6 pb-16 pt-12 md:pb-24 md:pt-16">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
          <p className="cs-section-label mb-2">Case Study</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
            Explainable AI Coding Assistant
          </h1>
          <p className="text-base text-slate-400 max-w-2xl">
            AI coding tools generate code. They don&apos;t explain it. This is a
            product study on what happens when you add the missing layer, and an
            honest look at what that layer can and cannot tell you.
          </p>
          <div className="mb-10 flex flex-wrap gap-3 mt-5">
            <a
              href="/Explainable_Coding_Assistant.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              Read the Research <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href="https://trust.harshit.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-secondary"
            >
              <ExternalLink className="h-4 w-4" />
              Try the Prototype
            </a>
            <a
              href="https://github.com/harshitleads/explainable-coding-assistant"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-secondary"
            >
              <Github className="h-4 w-4" />
              View Code
            </a>
            <Link href="/#projects" className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-secondary">
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Link>
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

        <section id="problem">
          <SectionLabel>The Problem</SectionLabel>
          <SectionHeading>Problem Framing</SectionHeading>
          <p className="cs-body mb-4">
            GitHub Copilot, Cursor, and their peers have fundamentally
            changed how code gets written. A developer types a comment and
            a function appears. That is genuinely useful. But it creates a
            second problem that nobody ships a fix for: the developer
            doesn&apos;t know why the function looks the way it does.
          </p>
          <p className="cs-body mb-4">
            For junior developers, this means accepting suggestions they
            don&apos;t fully understand, which makes them slower to debug and
            less likely to build intuition over time. For senior developers,
            it means spending mental energy validating suggestions before
            trusting them, which erodes the time savings that made the tool
            valuable in the first place.
          </p>
          <p className="cs-body">
            The product question is not &quot;how do we make suggestions
            better?&quot; That is a model problem. The product question is:
            &quot;how do we make suggestions legible?&quot; That is a design
            and product problem, and it has not been seriously attempted.
          </p>
        </section>

        <section id="market">
          <SectionLabel>Market Context</SectionLabel>
          <SectionHeading>Where the Market Sits Today</SectionHeading>
          <p className="cs-body mb-6">
            Every major AI coding assistant competes on suggestion quality
            and language coverage. None compete on explainability. This is
            a consistent gap, not an oversight.
          </p>
          {tools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {tools.map((tool) => (
                <div key={tool.name} className="border border-foreground/10 rounded-xl p-4 space-y-3">
                  <p className="cs-card-title">{tool.name}</p>
                  {tool.marketPosition && (
                    <p className="text-[13px] font-medium text-emerald-400/80 uppercase tracking-wide">{tool.marketPosition}</p>
                  )}
                  {tool.keyFeatures && (
                    <p className="cs-body">{tool.keyFeatures}</p>
                  )}
                  {tool.uniqueAngle && (
                    <div className="border-t border-foreground/10 pt-3">
                      <p className="text-[13px] font-bold uppercase tracking-widest text-slate-400 mb-1">Unique Angle</p>
                      <p className="cs-body">{tool.uniqueAngle}</p>
                    </div>
                  )}
                  {tool.keyInsights && (
                    <div className="border-t border-foreground/10 pt-3">
                      <p className="text-[13px] font-bold uppercase tracking-widest text-slate-400 mb-1">Key Insight</p>
                      <p className="cs-body">{tool.keyInsights}</p>
                    </div>
                  )}
                  {tool.pricing && (
                    <p className="text-[13px] text-slate-400">{tool.pricing}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {[
                { name: "GitHub Copilot", note: "Inline autocomplete with no rationale surface. Comment-driven generation has no explanation layer." },
                { name: "Cursor", note: "Chat alongside the editor is closer, but it is reactive. The user has to ask. Explanations are not surfaced proactively." },
                { name: "Codeium / Tabnine", note: "Speed-focused. The value prop is low latency, not transparency. No explanation affordance at all." },
              ].map((tool) => (
                <div key={tool.name} className="border border-foreground/10 rounded-xl p-4">
                  <p className="cs-card-title mb-1">{tool.name}</p>
                  <p className="cs-body">{tool.note}</p>
                </div>
              ))}
            </div>
          )}
          <p className="text-[13px] text-slate-400 mb-6">Source: competitive analysis database, updated continuously.</p>
          <p className="cs-body">
            The gap is structural. These tools were built to maximize
            suggestion throughput. Explanation is friction by default.
            Reframing it as a feature, not a bug, is the core product bet.
          </p>
        </section>

        <section id="research">
          <SectionLabel>User Research</SectionLabel>
          <SectionHeading>User Research Findings</SectionHeading>
          <p className="cs-body mb-6">
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
                <p className="cs-section-label mb-2">{item.persona}</p>
                <p className="text-sm italic text-foreground/80 mb-3">
                  &quot;{item.quote}&quot;
                </p>
                <p className="cs-body">{item.insight}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="decisions">
          <SectionLabel>Design Decisions</SectionLabel>
          <SectionHeading>
            What Explainability Means in a Coding Context
          </SectionHeading>
          <p className="cs-body mb-6">
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
                <p className="cs-card-title mb-1">{item.decision}</p>
                <p className="cs-body">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="limitations">
          <SectionLabel>Honest Limitations</SectionLabel>
          <SectionHeading>The Confidence Score Problem</SectionHeading>
          <p className="cs-body mb-4">
            The working prototype generates a confidence score between 0 and
            100. Developers in testing found it immediately intuitive. That is
            also the problem.
          </p>
          <p className="cs-body mb-4">
            The score is generated by Claude reasoning over two snippets of
            code. It has no access to your test suite, your linter output, your
            git history, or your codebase conventions. It is pattern matching
            against training data, not measurement against your system. A
            suggestion that scores 87% might be wrong for your codebase. A
            suggestion that scores 42% might be exactly right.
          </p>
          <p className="cs-body mb-6">
            This matters because the value of a confidence score depends
            entirely on what it is measuring. A score without auditable inputs
            is a UI feature, not a technical one. It reduces anxiety, but it
            does not reduce risk.
          </p>
          <p className="cs-card-title mb-3">
            What a meaningful confidence score would actually require:
          </p>
          <ul className="space-y-2 mb-6">
            {[
              "Static analysis output: does the suggestion compile, does it pass linting",
              "Test coverage signals: do existing tests cover the changed lines",
              "Codebase context: does this pattern appear elsewhere in the repo, is it consistent with conventions",
              "Runtime signals: has similar code caused failures before",
            ].map((item) => (
              <li key={item} className="cs-body flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="cs-body">
            None of these exist in the current prototype. The prototype
            demonstrates that the explainability UI is viable and that
            developers find the output useful. The open product question is:
            what is the minimum codebase context you need to give an LLM to
            make its confidence meaningful? That is the next design problem.
          </p>
        </section>

        <section id="prototype">
          <SectionLabel>Prototype</SectionLabel>
          <SectionHeading>Prototype Walkthrough</SectionHeading>
          <p className="cs-body mb-6">
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
                  <p className="cs-card-title mb-1">{item.title}</p>
                  <p className="cs-body">{item.desc}</p>
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

        <section id="screenshots">
          <SectionLabel>Product Screenshots</SectionLabel>
          <SectionHeading>The Product</SectionHeading>
          <div className="space-y-6">
            {[
              { src: "/images/explainable-1.jpg", alt: "Suggestion with explanation panel", caption: "Suggestion with explanation panel, 42% confidence" },
              { src: "/images/explainable-2.jpg", alt: "High confidence suggestion", caption: "High confidence suggestion, 87%" },
              { src: "/images/explainable-3.jpg", alt: "Full reasoning panel", caption: "Full reasoning panel with verification step" },
              { src: "/images/explainable-4.jpeg", alt: "Low confidence suggestion", caption: "Low confidence, no panel open" },
              { src: "/images/explainable-summary.jpg", alt: "Product summary", caption: "Product summary: problem, solution, value props" },
            ].map((img) => (
              <div key={img.src}>
                <div className="overflow-hidden rounded-xl border border-foreground/10" style={{ aspectRatio: "16/10" }}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={1200}
                    height={750}
                    className="w-full object-cover rounded-xl"
                  />
                </div>
                <p className="cs-caption text-center mt-2">{img.caption}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="next">
          <SectionLabel>What&apos;s Next</SectionLabel>
          <SectionHeading>Next Sprint</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                label: "In progress",
                items: [
                  "Codebase context API: passing repo structure and conventions into the explanation prompt",
                  "Confidence score grounding: integrating static analysis signals alongside LLM reasoning",
                  "VS Code extension scaffold: moving from paste-and-analyze to native inline interception",
                ],
              },
              {
                label: "Open questions",
                items: [
                  "How much codebase context improves confidence accuracy vs. increases latency",
                  "Whether confidence scores cause developers to under-review high-scoring suggestions",
                  "Whether the explanation panel creates new cognitive load vs. reducing verification time",
                ],
              },
            ].map((col) => (
              <div key={col.label} className="border border-foreground/10 rounded-xl p-5">
                <p className="cs-section-label mb-3">{col.label}</p>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li
                      key={item}
                      className="cs-body flex items-start gap-2"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
