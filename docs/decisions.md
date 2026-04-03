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
