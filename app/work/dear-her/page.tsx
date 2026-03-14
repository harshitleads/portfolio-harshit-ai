import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { ScreenshotGallery } from "./screenshot-gallery";

export const metadata: Metadata = {
  title: "Dear Her | Case Study | Harshit Sharma",
  description: "A free AI letter-writing app built on Women's Day. 255 visitors, 48 letters, 10 countries in 24 hours.",
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">{children}</p>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground md:text-3xl">{children}</h2>;
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`glass-card rounded-2xl p-6 md:p-8 ${className}`}>{children}</div>;
}

function Body({ children }: { children: React.ReactNode }) {
  return <p className="text-base leading-8 text-muted-foreground md:text-[17px]">{children}</p>;
}

export default function DearHerPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* HERO */}
      <section className="px-6 pb-16 pt-12 md:pb-24 md:pt-16">
        <div className="mx-auto max-w-3xl">
          <Link href="/" className="mb-12 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>
          <SectionLabel>Case Study</SectionLabel>
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Dear Her
          </h1>
          <p className="mb-5 text-lg font-medium text-primary md:text-xl">
            Some feelings are too big for a text message.
          </p>
          <p className="mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            A free AI letter-writing app built in one afternoon on Women&apos;s Day. Write three honest prompts about a woman in your life. Claude turns them into a letter she will never forget.
          </p>
          <div className="mb-10 flex flex-wrap gap-3">
            <a
              href="https://dearher.harshit.ai/"
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
              { value: "One Afternoon", sub: "Idea to live product" },
              { value: "255 Visitors", sub: "First 7 days" },
              { value: "48 Letters", sub: "Generated" },
              { value: "10 Countries", sub: "Zero paid distribution" },
            ].map(({ value, sub }) => (
              <div key={value} className="rounded-full border border-primary/20 bg-primary/10 px-5 py-2 text-center">
                <p className="text-sm font-bold text-primary">{value}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
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

      <div className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-3xl space-y-20">

          {/* SECTION 1: ORIGIN */}
          <section>
            <SectionLabel>The Origin</SectionLabel>
            <SectionHeading>Why I Built This</SectionHeading>
            <Card className="space-y-5">
              <Body>
                My mom has spent her whole life trying to protect me from uncertainty. I have spent my whole life running toward it. New country, quit a stable job, back to school, building things that may or may not work. She has never once asked me to stop.
              </Body>
              <Body>
                I built Dear Her to say what I never quite say out loud. Then I realized other people had the same problem. The gap is not feeling. It is articulation. Most people feel things deeply about the women in their lives and find no words that feel worthy of the feeling.
              </Body>
              <Body>
                I shipped it on Women&apos;s Day. By the end of the day, 48 people had used it to write letters to their moms, partners, sisters, friends, and mentors across 10 countries.
              </Body>
            </Card>
          </section>

          {/* SECTION 2: HOW IT WORKS */}
          <section>
            <SectionLabel>The Product</SectionLabel>
            <SectionHeading>How It Works</SectionHeading>
            <Card>
              <div className="space-y-0">
                {[
                  { step: "Step 1", label: "Choose who you are writing to", body: "Mom, Partner, Sister, Friend, Mentor, or a custom name. The relationship shapes the tone and sign-off of the generated letter." },
                  { step: "Step 2", label: "Answer three guided prompts", body: "What is a small thing she does that you never mention? Describe her in a moment only you have seen. What do you want her to know today? Each prompt is capped at 300 characters. Voice input is available so you can speak instead of type." },
                  { step: "Step 3", label: "Claude writes the letter", body: "Your raw inputs are transformed into a full letter. Emotional, specific, human. Not generic. The system prompt explicitly bans em dashes because letters should feel written by a person, not an AI." },
                  { step: "Step 4", label: "Share a unique link", body: "The letter lives at a unique URL. The share button copies a pre-drafted warm message to clipboard, not just a cold link. The recipient opens it and watches the letter appear typewriter-style on a warm parchment card." },
                ].map(({ step, label, body }, i, arr) => (
                  <div key={step} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary ring-1 ring-primary/30">
                        {i + 1}
                      </div>
                      {i < arr.length - 1 && <div className="mt-1 w-px flex-1 bg-border" />}
                    </div>
                    <div className={`pb-7 ${i === arr.length - 1 ? "pb-0" : ""}`}>
                      <p className="mb-0.5 text-xs font-bold uppercase tracking-widest text-primary">{step}</p>
                      <p className="mb-1 font-semibold text-foreground">{label}</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-border pt-6">
                <p className="mr-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">Stack</p>
                {["Lovable", "Claude API", "Supabase", "Namecheap"].map((tool) => (
                  <span key={tool} className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-foreground">{tool}</span>
                ))}
              </div>
            </Card>
          </section>

          {/* SECTION 3: PRODUCT DECISIONS */}
          <section>
            <SectionLabel>Product Decisions</SectionLabel>
            <SectionHeading>Every Decision Had a Reason</SectionHeading>
            <div className="space-y-4">
              {[
                {
                  decision: "No photo uploads",
                  reasoning: "The original concept included photos. Dropped it. Users may be uncomfortable uploading images of loved ones to an unknown service. Words-only is more private and universally accessible.",
                },
                {
                  decision: "Voice input via Web Speech API",
                  reasoning: "Typing feelings is hard. Speaking them is easier. Added as a tap-to-start toggle. The first user comment on LinkedIn specifically called this out: 'Also really liked the voice feature, reduces a lot of friction.' That is the only validation you need.",
                },
                {
                  decision: "IP-based rate limiting at 3 letters per 24 hours",
                  reasoning: "Protects against API cost abuse without requiring login. Rolling 24-hour window prevents gaming the midnight reset. A dynamic counter shows remaining letters proactively so users are not surprised by a block.",
                },
                {
                  decision: "Claude API over Gemini",
                  reasoning: "Lovable defaults to Gemini (free, built-in). Switched deliberately. The letter quality is the entire product. Claude produces significantly better emotional writing. Cost is approximately $0.01 per letter, negligible at current scale.",
                },
                {
                  decision: "Fully anonymous, no login required",
                  reasoning: "The content is emotionally sensitive. Requiring an account would create a trust barrier before anyone had experienced the product. Privacy note on the writer page: 'Your words are private. Letters are stored anonymously with no account, no name, no email attached.'",
                },
                {
                  decision: "Relationship-aware sign-offs",
                  reasoning: "A letter to a Mom ends 'With all my love.' A letter to a Mentor ends 'With deep gratitude.' Relationship type is passed to the system prompt. Generic sign-offs break the emotional coherence of the letter.",
                },
                {
                  decision: "Pre-drafted share message copied to clipboard",
                  reasoning: "The share button does not just copy a URL. It copies a full warm message: 'I wrote something for you. Open this when you have a quiet moment.' Recipients should never receive a cold link with no emotional context.",
                },
                {
                  decision: "Anti-em-dash system prompt",
                  reasoning: "A specific instruction was added to the Claude system prompt to never use em dashes. Em dashes read as AI-generated. Letters need to feel written by a person.",
                },
              ].map(({ decision, reasoning }) => (
                <Card key={decision}>
                  <p className="mb-2 font-semibold text-foreground">{decision}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{reasoning}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* SECTION 4: TRACTION */}
          <section>
            <SectionLabel>Traction</SectionLabel>
            <SectionHeading>Day One and Beyond</SectionHeading>
            <Card className="space-y-6">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { value: "255", label: "Visitors (7 days)" },
                  { value: "48", label: "Letters generated" },
                  { value: "59%", label: "Landing to writer" },
                  { value: "10", label: "Countries" },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center">
                    <p className="text-2xl font-bold text-primary">{value}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-6 space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Traffic Sources</p>
                <p className="text-sm leading-relaxed text-muted-foreground">204 direct, 26 LinkedIn, 20 Instagram. No paid distribution. Shared to personal LinkedIn, Berkeley MEng WhatsApp group, I-House community, and personal WhatsApp status.</p>
              </div>
              <div className="border-t border-border pt-6 space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Devices</p>
                <p className="text-sm leading-relaxed text-muted-foreground">78.4% mobile. This shaped the design from the start: large tap targets, single-column layout, voice input as a primary affordance, not an afterthought.</p>
              </div>
              <div className="border-t border-border pt-6 space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">First User Comment</p>
                <blockquote className="border-l-2 border-primary pl-4 italic text-muted-foreground text-sm leading-relaxed">
                  &ldquo;Tried it and really liked it. It also made me reflect on a few things about someone I deeply love. This is beautiful, Harshit. Also really liked the voice feature, reduces a lot of friction.&rdquo;
                </blockquote>
                <p className="text-xs text-muted-foreground">Himani Agarwal, Cornell 2026, AI and Product</p>
              </div>
            </Card>
          </section>

          {/* SECTION 5: SCREENSHOTS */}
          <section>
            <SectionLabel>Product Screenshots</SectionLabel>
            <SectionHeading>The Product</SectionHeading>
            <ScreenshotGallery />
            <div className="mt-6 text-center">
              <a
                href="https://dearher.harshit.ai/letter/66a514c7-4c69-4ec9-b3d5-fdd59b25fc73"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary/10"
              >
                See a live letter <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </section>

        </div>
      </div>

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
