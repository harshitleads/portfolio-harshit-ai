# CLAUDE.md

## Vision and Mission
Personal portfolio site for an AI PM targeting frontier tech companies. Every page must read as senior PM thinking. The portfolio demonstrates product judgment, not just shipping ability.

## Current Stack
- Next.js (App Router), TypeScript, Tailwind CSS
- Deployed on Vercel (auto-deploys on push to main)
- pnpm as package manager
- Repo: harshitleads/harshit.ai
- Primary domain: harshit.ai

## Architecture
- `/` — main portfolio with anchor nav and filter system
- `/work/pm-salary-ace` — PM Salary Ace case study
- `/work/dear-her` — Dear Her case study
- `/work/explainable-ai` — Explainable AI case study
- `/work/eval-studio` — Eval Studio case study
- `/work/claude-code-bridge` — claude-code-bridge case study
- `/sitemap.xml` — auto-generated via sitemap.ts
- `components/projects-section.tsx` — ProjectData interface, projects array, filter system
- `components/case-study/` — shared case study components (CaseStudySidebar, ScreenshotGallery, CaseStudyLayout)
- `components/calendly-bubble.tsx` — floating CTA bubble, rendered globally in `app/layout.tsx`
- `components/contact-section.tsx` — contact cards + Calendly inline embed (`id="calendly-embed"`)

## Code Rules
- No em dashes anywhere in copy
- No placeholder content in production
- Gmail compose links only, never mailto links
- Filter logic is AND, must match all selected tags, never change this
- All case study pages must use shared case study components, no new layout patterns
- Traction pills: always Sentence Case
- Sidebar icons: 24px across all case study pages
- NEVER run git commit, git push, git reset, git checkout, or any git write commands
- NEVER delete files unless the task spec explicitly says to delete a specific named file

## Decision Logging
When you make or execute a product or technical decision, append it to `docs/decisions.md` in this format:
```
### YYYY-MM-DD — Short title
**Decision:** What was decided.
**Why:** The reasoning.
**Rejected:** What alternatives were considered and why they lost.
```

## Design System
- Dark navy background (#0a0f1e), bright green accent (#00c896), glass-card components
- Case study pages: two-column layout with sticky left sidebar
- Contact cards: title font-weight 500, subtitle font-weight 400 at 13px, no exclamation marks

## Case Study Page Button Standard
- Default: Try It (primary green) > GitHub (secondary) > Back to Portfolio (secondary)
- Explainable AI exception: Read the Research (primary green, PDF) > Try the Prototype (secondary) > View Code (secondary) > Back to Portfolio (secondary)
- claude-code-bridge: GitHub (primary green, no live demo) > Back to Portfolio (secondary)

## Homepage Card Standard
Homepage project cards show ONLY "View Project" as the single CTA.

## Homepage Project Order (canonical)
1. eval-studio
2. claude-code-bridge
3. explainable-ai
4. dear-her
5. pm-salary-ace

## Calendly Integration
- Embed URL: https://calendly.com/harshit-harshit/15min (with hide_gdpr_banner=1)
- Premium expired: renders with default Calendly theme. Accepted, do not hack around it.
- Floating bubble: 7s reappearance after dismiss, auto-hides when embed is in viewport (IntersectionObserver)
- Cross-page nav: bubble uses usePathname + useRouter to navigate from /work/* pages to homepage embed

---

## ACTIVE TASK: Eval Studio case study updates (3 parts)

### Part 1: Add "Shipped in 2 Hours" traction pill

In `app/work/eval-studio/page.tsx`, find the traction pills array in the hero section (the `.map(({ value, sub })` block with 4 items). Add a 5th pill as the LAST item:

```tsx
{ value: "Shipped in 2 Hours", sub: "Side project" },
```

### Part 2: Rewrite the Problem section with origin story

In `app/work/eval-studio/page.tsx`, find section id="problem". Replace the entire section content with:

```tsx
<section id="problem">
  <SectionLabel>The Problem</SectionLabel>
  <SectionHeading>I Needed This Myself</SectionHeading>
  <Card className="space-y-5">
    <Body>
      I was designing an AI interview agent and faced a dilemma: which model should power it, and what prompt would actually perform before I committed to building it into the agent pipeline? I knew the options. Going the right way was what mattered for the product.
    </Body>
    <Body>
      I tried comparing outputs manually across Claude, GPT, and Gemini. It was slow, messy, and impossible to keep track of. I thought something like this should exist. So I built it as a side project and shipped Eval Studio in two hours.
    </Body>
    <Body>
      When I talked to other founders and PMs building Gen AI and agentic AI products, they described the same problem. Everyone was manually iterating through models and prompts, copying outputs into spreadsheets, losing track of which version performed better. It felt productive but it was productive procrastination. No rigor, no reproducibility, no cost visibility.
    </Body>
  </Card>
</section>
```

### Part 3: Add competitive landscape section

In `app/work/eval-studio/page.tsx`, add a NEW section between the "problem" section and the "use-cases" section. Also add this section to the sidebarSections array.

**Update sidebarSections** — add a new entry after "Problem":
```tsx
{ id: "landscape", label: "Competitive Landscape" },
```

**New section JSX** — insert this between the closing `</section>` of id="problem" and the opening `<section id="use-cases">`:

```tsx
{/* SECTION: COMPETITIVE LANDSCAPE */}
<section id="landscape">
  <SectionLabel>Market Context</SectionLabel>
  <SectionHeading>What Exists and Where It Falls Short</SectionHeading>
  <Card className="space-y-5 mb-4">
    <Body>
      LLM evaluation is not a new idea. The tools exist. But they are all built for different users than the PM or founder who just needs to pick a model and a prompt before building.
    </Body>
  </Card>
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    {[
      {
        name: "Prompt Cannon",
        position: "Casual model comparison",
        gap: "One prompt at a time, side-by-side outputs. No dataset, no scoring rubric, no cost tracking. Good for curiosity, not for product decisions.",
      },
      {
        name: "Promptfoo (acquired by OpenAI)",
        position: "Developer CLI tool",
        gap: "Powerful but requires Node.js, YAML config files, and terminal setup. Pivoted heavily toward red teaming and security testing. Not built for quick prompt/model comparison.",
      },
      {
        name: "Braintrust",
        position: "Enterprise eval platform",
        gap: "Full observability suite with CI/CD integration, tracing, and experiment tracking. Pro plan at $249/month. Built for teams with production AI, not for a PM prototyping an agent.",
      },
      {
        name: "LangSmith",
        position: "LangChain ecosystem",
        gap: "Tightly coupled to LangChain. Strong for teams already in that ecosystem, but requires SDK integration. Not model-agnostic in practice.",
      },
      {
        name: "Google LLM Comparator",
        position: "Research tool",
        gap: "Python library that ingests JSON files. Built for ML researchers comparing Gemma model versions, not for PMs comparing prompt strategies across providers.",
      },
      {
        name: "Langfuse",
        position: "Open-source observability",
        gap: "Excellent for production logging and tracing. Eval features exist but are secondary to observability. Requires self-hosting or cloud account setup.",
      },
    ].map(({ name, position, gap }) => (
      <Card key={name}>
        <p className="cs-card-title mb-1">{name}</p>
        <p className="mb-2 text-[12px] font-bold uppercase tracking-widest text-primary">{position}</p>
        <p className="cs-body">{gap}</p>
      </Card>
    ))}
  </div>
  <Card className="mt-4 space-y-5">
    <Body>
      The gap is not eval tooling. The gap is zero-setup eval tooling. Every tool above requires CLI installation, SDK integration, cloud accounts, or Python scripting before you can compare a single prompt. Eval Studio is a URL. Open it, paste your API keys, upload a CSV, and get scored results in minutes. That is the product bet: the fastest path from question to answer for anyone choosing a model or prompt.
    </Body>
  </Card>
</section>
```

### Part 4: Update the What's Next roadmap

In `app/work/eval-studio/page.tsx`, find section id="whats-next". Replace the items array with:

```tsx
"Synthetic golden dataset generator: create high-precision evaluation datasets from minimal inputs, so you do not need 50 hand-labeled rows to start",
"Demo mode with pre-loaded mock results so visitors can browse without API keys",
"Persistent run history across sessions",
"Batch API support for larger datasets",
"Hybrid scoring: auto-detect exact match for structured outputs, LLM judge for open-ended",
```

### Files to modify
- MODIFY: `app/work/eval-studio/page.tsx` — traction pill, problem rewrite, competitive landscape section, roadmap update

### Acceptance Criteria
- [ ] 5 traction pills in hero (Multi-provider, Judge Council, Cost Tracking, Live, Shipped in 2 Hours)
- [ ] Problem section heading is "I Needed This Myself" with 3 paragraphs
- [ ] New "Competitive Landscape" section with 6 competitor cards appears between Problem and Two Use Cases
- [ ] Competitive Landscape section appears in sidebar navigation
- [ ] Summary paragraph below competitor cards articulates the zero-setup positioning
- [ ] What's Next has 5 items with golden dataset generator first
- [ ] No em dashes in any copy
- [ ] `pnpm build` passes with no errors

---

## Pending Work
- OG metadata: title is 35 chars (optimal 50-60), description text outdated
- OG image: 725KB, WhatsApp recommends < 600KB. Re-export at 70% JPG quality if needed
- All READMEs: humanize copy (review for AI voice)
- Sentinel deck (May 7 deadline)

## Completed Work
- 2026-03-21: Calendly inline embed, floating bubble, contact copy cleanup, about section language cleanup
- 2026-04-03: Calendly bubble fixes (cross-page nav, scroll target, 7s reappearance, IntersectionObserver, GDPR banner hidden)
- 2026-04-04: Eval Studio case study page, homepage card, sitemap, sidebar icons 20px
- 2026-04-04: Standardized all case study hero buttons (Try It > GitHub > Back to Portfolio)
- 2026-04-04: Removed GitHub/Try It from homepage cards (View Project only)
- 2026-04-04: Traction pill casing standardized to Sentence Case
- 2026-04-04: Dear Her repo public, renamed, CLAUDE.md + decisions.md + README created
- 2026-04-04: All GitHub READMEs updated with case study links
- 2026-04-04: Eval Studio favicon and OG image added, GitHub description/website/topics set
- 2026-04-04: Eval Studio mockup screenshots added to case study page and homepage gallery
- 2026-04-04: claude-code-bridge case study page built, homepage card added, sitemap updated
- 2026-04-04: Eval Studio imagePosition fix committed
- 2026-04-05: Homepage projects reordered: Eval Studio > claude-code-bridge > Explainable AI > Dear Her > PM Salary Ace
- 2026-04-05: Explainable AI sidebar stats updated: Developer Tool, AI Trust (Shield), Live (Zap), Next.js + Claude
- 2026-04-05: Explainable AI product UI redesigned: FilePanel removed, two-panel layout, confidence score enlarged
- 2026-04-05: Sidebar icons bumped from 20px to 24px across all case study pages
- 2026-04-05: Explainable AI buttons reordered with progression labels
