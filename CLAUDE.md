# Sentinel One-Pager — Context

## What This Is
UC Berkeley MEng IEOR Capstone Spring 2026 — Project 234, AgentOps / Sentinel.
Fung Institute one-pager submission.

**Team:** Harshit Sharma, Idris Houir Alami, Yuejia Zeng
**Advisor:** Dr. Lee Fleming
**File naming:** 234_AgentOps_ProjectOne-Pager_2026.pdf

---

## Status: FINALIZING IN GOOGLE SLIDES

Harshit is editing the PPTX in Google Slides. All content/image fixes are applied.

---

## Fung Institute Spec
- Size: 8.5" x 11" portrait
- Margins: at least 0.5" all around
- Format: PDF
- Fonts: Georgia + Lucida Grande (Mac) / Lucida Sans (PC)
- Two logos, same size: UC Berkeley Engineering + Fung Institute MEng
- File: 234_AgentOps_ProjectOne-Pager_2026.pdf
- Nothing smaller than 10pt

---

## Final Content

**Title:** Catching AI Agent Failures Before They Ship
**Subtitle:** CI/CD-style reliability testing for multi-step, tool-using AI agent systems

**Objective (2 sentences):**
When AI agents break after an update, teams rarely notice until it is too late. Sentinel is a testing layer that catches failures before they reach users.

**Problem:** AI agents break silently when code changes. No warning. No alert. Users are the first to notice.

**Solution:** Sentinel runs automated checks after every update, comparing AI behavior before and after. Ship with confidence.

**Why Sentinel Wins:**
- Regression CI — Automated behavior checks on every release. Catch regressions before they ship.
- Open and Self-Hostable — Works with existing tools. Self-hostable. No vendor lock-in.
- Cost and Safety Guardrails — Controls test costs and flags unsafe AI outputs automatically.

**Market:** TAM $100M-$520M, SAM $50M-$90M, SOM $0.5M-$27M

**Customer Discovery (6+ interviews):**
- AI Startup Founder (Vachi AI) — Built manual eval from scratch. No existing tool solves this.
- Venture Investor (500 Global) — Sees gap across 10+ portfolio companies.

**Methodology:** Customer Discovery + Market Sizing + Competitive Analysis + Revenue Strategy + VC Pitch

**Footer:** UC Berkeley MEng IEOR 2026 | Team 234

---

## Design Decisions (locked)

- Background: #f5f4f0 beige
- Cards: white (#ffffff) on beige
- Section headers: #003262 navy pills, rounded corners
- All rectangles: rounded corners (~6pt radius)
- Gold accent borders on "Why Sentinel Wins" cards
- Red left border on Problem card, green on Solution card
- Navy left border on Objective and Customer Discovery cards
- Methodology banner: dark navy #0f2744 with gold label
- Logos: processed to white-on-transparent for navy header bar
- Value chain: REMOVED (saves space, info is implicit)
- Competitive positioning: SVG chart (editable version provided as separate SVG)
- TAM/SAM/SOM: Gemini-generated concentric circles image (corrected $50M-$90M)
- Story illustration: Gemini-generated 3-panel stick figure

---

## Font Sizes (10pt minimum)

- Title: 18-20pt Georgia Bold
- Subtitle: 11pt Lucida Grande Italic
- Section headers: 10pt Lucida Grande Bold, ALL CAPS
- Objective/card labels: 10pt Lucida Grande Bold
- Body text: 12pt Georgia
- Card titles: 11pt Lucida Grande Bold
- Card body: 11pt Georgia
- Footer/methodology: 10pt Lucida Grande
- Header names: 10pt Lucida Grande

---

## Image Assets

All images processed and embedded in the PPTX:
- Berkeley Engineering logo — white on transparent (processed from original blue)
- Fung MEng logo — white+gold on transparent (black bg removed)
- Story illustration — Gemini-generated 3-panel (v1 works → new capability → silent failure)
- TAM/SAM/SOM — Gemini-generated concentric circles (corrected SAM: $50M-$90M)
- Competitive positioning — SVG rendered to PNG (LangSmith, OpenAI Evals, TruLens, Sentinel)

---

## Completed Work

- Built full HTML one-pager from scratch with base64-embedded images
- Processed logos to white-on-transparent for navy header
- Fixed SAM from $900M to $90M using new Gemini image
- Trimmed objective from 3 sentences to 2
- Removed value chain row
- Created editable SVG competitive positioning chart
- Built editable PPTX (8.5x11 portrait) with all objects movable
- Applied rounded corners to all card shapes
- Matched old HTML design exactly, then applied all fixes
- Provided both fixed HTML and editable PPTX to Harshit
- Finalized title: "Catching AI Agent Failures Before They Ship"
