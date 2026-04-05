# Product Decisions

A running log of significant product and technical decisions made during development. Each entry records what was decided, why, and what alternatives were rejected.

Entries are append-only. Never edit old entries.

---

### 2026-03-17 -- Gmail compose over mailto links
**Decision:** Use Gmail compose links instead of mailto links for all contact CTAs.
**Why:** mailto links behave inconsistently across devices and often open unwanted default mail apps. Gmail compose links work reliably for the target audience.
**Rejected:** mailto links, contact form (adds unnecessary friction).

### 2026-03-17 -- AND filter logic not OR
**Decision:** Project filter uses AND logic -- results must match all selected tags.
**Why:** OR logic returns too many results and dilutes the portfolio signal. AND feels more intentional and shows fewer, more relevant projects.
**Rejected:** OR logic (too noisy), single-select filter (too limiting).

### 2026-03-17 -- Shared case study component system
**Decision:** All case study pages use shared components: CaseStudySidebar, ScreenshotGallery, CaseStudyLayout.
**Why:** Consistency across pages, single source of truth for layout. Adding a new case study should not require rebuilding layout from scratch.
**Rejected:** Per-page custom layouts (inconsistent, high maintenance).

### 2026-03-17 -- Canvas animation performance constraints
**Decision:** Hero canvas animation capped at 30fps, pixel ratio 1.5x max, pre-baked sine wave motion.
**Why:** GPU usage was at 78% without constraints. Reduced to 47% with these limits. Portfolio sites should not drain battery.
**Rejected:** Full 60fps uncapped animation (too expensive on low-end devices).

### 2026-03-21 -- Calendly inline embed over link button
**Decision:** Embed Calendly inline in the contact section rather than a simple link button.
**Why:** Seeing the calendar directly removes one step of friction. The inline embed blends into the site layout better than a redirect.
**Rejected:** Simple "Book a call" link button (less friction reduction), full-width embed (wasted space), popup modal (blocks content).

### 2026-03-21 -- Calendly event: two durations instead of single 30 min
**Decision:** Offer 15 min (default) and 30 min options on the Quick Intro Call event.
**Why:** 30 minutes is a high-commitment ask from someone who doesn't know you yet. 15 minutes is the standard intro call length. Offering both respects the invitee's time.
**Rejected:** 15 min only (might feel too short), 30 min only (too high a commitment ask).

### 2026-03-21 -- Floating bubble widget for Calendly
**Decision:** Added a fixed bottom-right floating bubble that fades in after a delay with a dismiss X.
**Why:** Most visitors won't scroll to the contact section. The bubble gives passive visibility to the booking option without blocking content.
**Rejected:** Full popup modal (blocks content), no visibility at all (buries the feature).

### 2026-03-21 -- Contact button copy: remove exclamation marks, fix hierarchy
**Decision:** Removed exclamation marks from all contact button copy. Title font-weight 500, subtitle font-weight 400 at 13px.
**Why:** Exclamation marks read loud and eager, inconsistent with a confident site aesthetic. Original hierarchy had subtitle bolder than title, which is backwards.
**Rejected:** ALL CAPS labels (too aggressive), keeping exclamation marks (wrong tone).

### 2026-03-08 -- Dear Her: Claude API over default Gemini
**Decision:** Use Anthropic Claude API for letter generation instead of Lovable's default Gemini integration.
**Why:** Letter quality is the core product. Claude produced warmer, more personal output. Cost is negligible at ~$0.01/letter.
**Rejected:** Gemini (lower quality output for this use case), GPT-4 (no meaningful quality difference, higher cost).

### 2026-03-08 -- Dear Her: anonymous by design
**Decision:** No login, no email collection, no auth required to create or view letters.
**Why:** The product is about emotional expression. Any login wall kills the moment. Shareable links work without auth via Supabase RLS public SELECT policy.
**Rejected:** Email-gated access (adds friction at the worst moment), social login (unnecessary data collection).

### 2026-03-08 -- Dear Her: IP-based rate limiting
**Decision:** 3 letters per rolling 24-hour window, tracked by IP hash only.
**Why:** Abuse prevention without requiring auth. Hash-only storage means no PII is stored.
**Rejected:** No rate limit (abuse risk), auth-based limiting (contradicts anonymous design).

### 2026-03-08 -- Dear Her: voice input toggle
**Decision:** Added Web Speech API mic toggle on each input field.
**Why:** Emotional writing is hard to start on a blank page. Speaking removes the blank page problem and produces more authentic input.
**Rejected:** No voice input (higher friction), always-on voice (invasive).

### 2026-04-03 -- Calendly theming: accept default colors
**Decision:** Accept Calendly's default white/blue theme after premium trial expired.
**Why:** Custom color params require a paid plan. The embed still functions. Theming mismatch is cosmetic, not worth paying for or hacking.
**Rejected:** CSS override hacks (Calendly loads in iframe, cross-origin blocks most overrides), paying for premium just for colors.

### 2026-04-03 -- Calendly bubble: timed reappearance instead of permanent dismiss
**Decision:** After dismiss or click, bubble reappears after 7 seconds if the user is not already viewing the calendar. Auto-hides when Calendly embed is in viewport via IntersectionObserver.
**Why:** Permanent dismiss means the CTA is lost forever. Timed reappearance gives a second chance without being aggressive. IntersectionObserver prevents redundant prompting.
**Rejected:** Permanent dismiss (loses CTA), immediate reappear (annoying), no dismiss option (blocks content).

### 2026-04-03 -- Reframe case study stats: drop raw counts, show conversion metrics
**Decision:** Removed raw user/visitor counts (22 users, 255 visitors, 48 letters) from case study sidebars and homepage project cards. Replaced with conversion rates, execution speed, and product depth metrics. PM Salary Ace: Shipped in 3 Hrs / 336 Questions / 49% Activation Rate / V2 Live. Dear Her: Shipped in 3 Hrs / 59% Conversion / 10 Countries / Zero Paid Distribution.
**Why:** Low absolute numbers undercut senior PM positioning. These were organic with zero paid distribution, but a hiring manager sees "22 users" and thinks small. Conversion rate and execution speed demonstrate product instinct, which is the actual portfolio signal.
**Rejected:** Keeping raw counts (hurts positioning), removing all metrics (loses credibility), inflating numbers (dishonest).

### 2026-04-03 -- Git and file deletion guardrails in CLAUDE.md
**Decision:** Added two code rules to all project CLAUDE.md files: (1) Never run git commit, push, reset, or any git write commands. (2) Never delete files unless the task spec explicitly names the file. Default to rename or comment out.
**Why:** With Cursor auto-run mode enabled, Claude Code executes without permission prompts. Without guardrails, a poorly scoped prompt could result in destructive commits or file deletions. These rules apply regardless of which chat generates the Cursor prompt.
**Rejected:** Relying on Cursor's sandbox protection alone (tested: sandbox does not block file deletion), disabling auto-run (too much friction for daily workflow).

### 2026-04-04

### 2026-04-04 -- Eval Studio case study page added to portfolio
**Decision:** Built /work/eval-studio with 6 sections (Problem, Two Use Cases, How It Works, Design Decisions, Honest Limitations, What's Next). Added homepage project card with tags [Live Product, Evals]. Sidebar stats: AI Eval Tool / LLM Infra / Live / Next.js + TS.
**Why:** Eval Studio is the highest-signal project for frontier AI PM roles. It demonstrates LLM evals fluency, judge council architecture, cost tracking, and multi-provider integration. The case study needed to be on the portfolio to complete the positioning story.
**Rejected:** Waiting for screenshots before building the page (delays shipping, placeholder is acceptable for now).


### 2026-04-05

### 2026-04-04 -- GitHub and Try It buttons on case study pages only, not homepage cards
**Decision:** Remove GitHub and Try It buttons from homepage project cards. Keep only "View Project" as the single CTA. Move GitHub and Try It links to the case study page hero sections instead.
**Why:** Homepage cards should be clean with one clear action. The case study page is where someone is already interested enough to dig deeper, so that is the right place for secondary actions like trying the live product or viewing the source code.
**Rejected:** Keeping all three buttons on homepage cards (cluttered, creates decision paralysis), removing GitHub/Try It entirely (loses discoverability).


### 2026-04-05

### 2026-04-04 — Reorder homepage projects array
**Decision:** New order: Eval Studio, claude-code-bridge, Explainable AI, Dear Her, PM Salary Ace.
**Why:** Lead with technically impressive (infra, MCP/context engineering), end with execution proof. Explainable AI has a strong case study but its live app UI is rough — sits behind polished projects, ahead of consumer apps.
**Rejected:** Alphabetical, chronological, or keeping Explainable AI at #2. App quality matters when recruiters click through.


### 2026-04-05

### 2026-04-04 -- Update Explainable AI sidebar stats
**Decision:** Change sidebar from "Prototype / Figma stage / 3 Deliverables" to "Developer Tool / AI Trust / Live / Next.js + Claude". Added Shield and Zap icons.
**Why:** The product is live at trust.harshit.ai. Sidebar saying "Prototype" and "Figma stage" undercuts the narrative that this went from design to working product. The case study tells the full story; the sidebar should reflect current state.
**Rejected:** Keeping "Case Study" as type. Changed to "Developer Tool" to match the domain and be consistent with Explainable AI's positioning alongside claude-code-bridge.


### 2026-04-05

### 2026-04-05 -- Sidebar icon size bump to 24px
**Decision:** Increase all case study sidebar icons from 20px to 24px across Eval Studio, claude-code-bridge, and Explainable AI. Keep vertically centered.
**Why:** At 20px the icons looked undersized and disconnected from the stat values. 24px gives better visual weight and presence in the At a Glance cards.
**Rejected:** Reducing to 16px (would make icons too subtle). Removing icons entirely (they add scannability).

### 2026-04-05 -- Explainable AI button progression labeling
**Decision:** Reorder hero buttons to: "Read the Research" (primary, PDF) > "Try the Prototype" > "View Code" > "Back to Portfolio". Merged old "View PDF" into "Read the Research" as the primary green CTA.
**Why:** Explainable AI is the only portfolio project with the full PM lifecycle: research > design > working prototype. Button order should tell that story. The PDF research doc is the star PM deliverable and deserves the primary position. Other projects keep their current button labels since they don't have this three-deliverable progression.
**Rejected:** Relabeling buttons across all five projects. Only Explainable AI has three distinct deliverables worth narrating. Others are already clear with "Try It" / "GitHub".


### 2026-04-05

### 2026-04-05 -- Eval Studio origin story + traction pill + roadmap update
**Decision:** Rewrote Problem section from generic "every AI team" framing to personal origin story (AI interview agent dilemma, shipped in 2 hours, validated with founders/PMs). Added "Shipped in 2 Hours" traction pill as 5th pill. Updated roadmap to 5 items with synthetic golden dataset generator as item 1.
**Why:** Personal origin story is more compelling than generic problem statement. Shows the tool was born from a real need, not spec'd in a vacuum. "Shipped in 2 hours" signals speed and execution. Golden dataset generator is the natural next step and shows product vision beyond V1.
**Rejected:** Redesigning Eval Studio's UI to look more polished. The "vibecoded in 2 hours" story is stronger than a pretty UI for an infra tool. Recruiters care about the architecture and thinking, not the font.


### 2026-04-05

### 2026-04-05 -- Add competitive landscape to Eval Studio case study
**Decision:** Added 6-competitor landscape section between Problem and Use Cases. Competitors: Prompt Cannon, Promptfoo (acquired by OpenAI), Braintrust, LangSmith, Google LLM Comparator, Langfuse. Positioning: "zero-setup eval tooling" — every competitor requires CLI, SDK, cloud accounts, or Python. Eval Studio is a URL.
**Why:** Shows market awareness and clear differentiation. A PM who can articulate why their product exists relative to funded alternatives demonstrates product sense. The competitive landscape also validates that the problem space is real (Promptfoo was acquired by OpenAI for this exact category).
**Rejected:** Including more competitors (DeepEval, Inspect AI, W&B Weave). Six is enough to make the point without overwhelming the page. Also rejected putting this on the homepage card — too detailed for a card, belongs in the case study deep dive.


### 2026-04-05

### 2026-04-05 -- Calendly copy update and bridge hero image zoom
**Decision:** Updated Calendly duration copy from "15 / 30 min" to warm single-duration copy ("Quick intro call · 15 min · we can go over if we're on a roll :)") on contact card and bubble. Changed claude-code-bridge homepage card imagePosition from object-center to object-[center_20%] to show more of the architecture diagram.
**Why:** Event is now 15 min only, old copy referenced 30 min which no longer exists. Warm tone matches the portfolio voice. Bridge hero image was cropping the architecture diagram too tight at object-center.
**Rejected:** Keeping "Google Meet" in the copy (unnecessary detail, the embed handles logistics). Using object-top for bridge image (too extreme, 20% is a subtler shift).

### 2026-04-05 -- claude-code-bridge case study: traction pill + origin paragraph
**Decision:** Replaced "Shipped / Open source" traction pill with "Shipped in 2 Hours / Built and working" (4 pills total). Added third paragraph to Problem section about building in 2 hours, saving copy-paste, and running across 6 projects.
**Why:** "Shipped" is generic. "Shipped in 2 Hours" shows execution speed and matches the Eval Studio traction pill pattern. The third paragraph adds personal origin and daily usage proof, turning the problem section from abstract to concrete.
**Rejected:** Keeping 5 pills (would crowd the hero). Adding a separate "Traction" section (overkill for a dev tool with no external users).


### 2026-04-05

### 2026-04-05 -- Job Market Pulse: no case study page, dashboard is the case study
**Decision:** Job Market Pulse gets a homepage card on harshit.ai but NO dedicated /work/ case study page. The "View Project" button links directly to pulse.harshit.ai. Narrative blocks are built into the dashboard itself.
**Why:** The dashboard IS the artifact. Data choices, chart design, annotations, and H-1B tracker all speak for themselves. Adding a case study page would just describe what the visitor can already see. Every other case study page exists because the product alone doesn't tell the full PM story — this one does.
**Rejected:** Building a /work/job-market-pulse case study page. Would take 2-3 hours with no additional signal for recruiters.

