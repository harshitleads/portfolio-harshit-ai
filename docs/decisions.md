# Product Decisions

A running log of significant product and technical decisions made during development. Each entry records what was decided, why, and what alternatives were rejected.

Entries are append-only. Never edit old entries.

---

### 2026-03-17 — Gmail compose over mailto links
**Decision:** Use Gmail compose links instead of mailto links for all contact CTAs.
**Why:** mailto links behave inconsistently across devices and often open unwanted default mail apps. Gmail compose links work reliably for the target audience.
**Rejected:** mailto links, contact form (adds unnecessary friction).

### 2026-03-17 — AND filter logic not OR
**Decision:** Project filter uses AND logic — results must match all selected tags.
**Why:** OR logic returns too many results and dilutes the portfolio signal. AND feels more intentional and shows fewer, more relevant projects.
**Rejected:** OR logic (too noisy), single-select filter (too limiting).

### 2026-03-17 — Shared case study component system
**Decision:** All case study pages use shared components: CaseStudySidebar, ScreenshotGallery, CaseStudyLayout.
**Why:** Consistency across pages, single source of truth for layout. Adding a new case study should not require rebuilding layout from scratch.
**Rejected:** Per-page custom layouts (inconsistent, high maintenance).

### 2026-03-17 — Canvas animation performance constraints
**Decision:** Hero canvas animation capped at 30fps, pixel ratio 1.5x max, pre-baked sine wave motion.
**Why:** GPU usage was at 78% without constraints. Reduced to 47% with these limits. Portfolio sites should not drain battery.
**Rejected:** Full 60fps uncapped animation (too expensive on low-end devices).

### 2026-03-21

### 2026-03-21 — Calendly inline embed over link button
**Decision:** Embed Calendly inline in the contact section rather than a simple link button.
**Why:** The inline embed with dark theming (background_color=0a0f1e, text_color=ffffff, primary_color=00ff88) blends natively with the site. Seeing the calendar directly removes one step of friction. The visual result was validated by previewing it live.
**Rejected:** Simple "Book a call" link button (less friction reduction), full-width embed (wasted space on left side), white embed without theming (looked like a third-party widget).

### 2026-03-21 — Calendly event: two durations instead of single 30 min
**Decision:** Offer 15 min (default) and 30 min options on the Quick Intro Call event.
**Why:** 30 minutes is a high-commitment ask from someone who doesn't know you yet. 15 minutes is the standard intro call length — easy yes, can always extend. Offering both respects the invitee's time while keeping the longer option available.
**Rejected:** 15 min only (might feel too short for some), 20 min (non-standard, adds clutter), 30 min only (original, too much ask).

### 2026-03-21 — Calendly event renamed to "Quick Intro Call"
**Decision:** Renamed from "30 Minute Meeting" to "Quick Intro Call".
**Why:** The old name was inaccurate with two durations. "Quick Intro Call" sets the right expectation — low commitment, conversational — without referencing a specific time.
**Rejected:** "Chat with Harshit" (too casual), keeping "30 Minute Meeting" (inaccurate).

### 2026-03-21 — Floating bubble widget for Calendly
**Decision:** Added a fixed bottom-right floating bubble that appears after a short delay, showing "Pick a time to connect / 15 / 30 min · Google Meet" with a dismiss X.
**Why:** Most visitors won't scroll to the contact section. The bubble gives passive visibility to the booking option without blocking content. Clicking it scrolls to the Calendly embed rather than opening a separate page.
**Rejected:** Full popup modal (blocks content, bad UX for a PM portfolio), no visibility at all (buries the feature).

### 2026-03-21 — Calendly card heading: no colon, subtitle does the work
**Decision:** Heading is "If it's easier, pick a time directly" with subtitle "15 / 30 min · Google Meet". No colon on the heading.
**Why:** The subtitle explains the specifics. A colon was considered briefly but rejected because the other contact cards don't use colons — adding one would be inconsistent. The subtitle is what differentiates this card from the three above it.
**Rejected:** Colon after heading (inconsistent with other cards), "grab 30 minutes directly" (repetitive with subtitle), "below" or "here:" as directional suffixes (clunky).

### 2026-03-21 — Contact button copy: remove exclamation marks, fix hierarchy
**Decision:** "Email me!", "Connect with me on LinkedIn!", "Grab my resume!" → removed exclamation marks. Title font-weight 500, subtitle font-weight 400 at 13px.
**Why:** Exclamation marks read loud and eager — inconsistent with the confident, precise aesthetic of the rest of the site. The original hierarchy had subtitle bolder than title, which is backwards.
**Rejected:** ALL CAPS labels (too aggressive), keeping exclamation marks (wrong tone).

### 2026-03-21 — Calendly Google Calendar sync across all 4 accounts
**Decision:** Connected all four Google calendars (harshit@harshit.ai, harshitsharma@berkeley.edu, 8.harshit.sharma@gmail.com, harshit.leads@gmail.com) to Calendly for conflict checking.
**Why:** Meetings are spread across accounts. Without all four connected, Calendly could allow bookings during existing meetings.
**Rejected:** Single calendar only (misses conflicts on other accounts), manual availability management (error-prone).


### 2026-03-22

## 2026-03-08 — Dear Her (dearher.harshit.ai)

**What was built:** AI-powered letter generator. Users describe a woman they love/admire, Claude transforms inputs into a beautiful animated letter with a shareable link. Built in ~3 hours on Women's Day.

**Stack:** Lovable (React SPA), Supabase (letters table), Anthropic Claude API (claude-sonnet-4-20250514, max_tokens:600), custom domain dearher.harshit.ai via Namecheap CNAME + Lovable domain settings.

**Key decisions:**
- Claude API over Lovable's default Gemini — letter quality is the core product, ~$0.01/letter is negligible
- IP-based rate limiting (3 letters per rolling 24hr window) — abuse prevention, stored as hash only
- Anonymous by design — no login, no email, no name attached beyond what user types
- Voice input toggle (Web Speech API, continuous:true) — reduces friction for emotional writing
- Pre-drafted share message copies with link — prevents cold URL shares
- Relationship-specific sign-offs — Mom/Partner/Mentor get appropriate closings
- Custom addressee field — "Dear Nana," not just "Dear Mom,"
- OG tags: homepage = product invitation, letter page = "Someone wrote something for you"
- No em dashes in system prompt — letters must read human-written

**Day 1 analytics:** 200+ visitors, 40 letters, ~20% conversion rate

**Known bugs fixed:**
- Shareable link was behind Lovable auth wall — fixed by making /letter/[uuid] fully public (Supabase RLS public SELECT policy)
- Character counter overlapping text — fixed with pill-shaped opaque background on counter
- Mic buttons all activatable simultaneously — fixed with shared activeFieldIndex state
- SpeechRecognition instance breaks after first use — fixed by recreating instance fresh on every mic click

**Still to watch:**
- Mic broken in Lovable preview (expected — iframe blocks mic permissions, test on live site only)
- TTLs in Namecheap should be set back to Automatic now that DNS is stable

