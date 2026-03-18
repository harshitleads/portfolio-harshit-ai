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
