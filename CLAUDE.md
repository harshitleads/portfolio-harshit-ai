# harshit.ai — Portfolio Website

## Stack
- Next.js (App Router), TypeScript, Tailwind CSS, Vercel, pnpm
- Repo: harshitleads/harshit.ai

## Code Rules
- No em dashes anywhere in copy
- No placeholder content in production
- Gmail compose links only, never mailto links
- Filter logic is AND, must match all selected tags
- All case study pages must use shared case study components
- Traction pills: always Sentence Case, Sidebar icons: 24px
- NEVER run git commit/push/reset/checkout
- NEVER delete files unless task spec explicitly names the file

## Components
- `components/projects-section.tsx` — homepage project cards + full lightbox
- `components/case-study/ScreenshotGallery.tsx` — case study page image gallery
- `components/case-study/CaseStudySidebar.tsx` — shared sidebar
- `components/case-study/CaseStudyLayout.tsx` — shared layout wrapper
- `components/calendly-bubble.tsx` — floating Calendly CTA bubble (rendered in app/layout.tsx)

## Completed Work
- ScreenshotGallery lightbox: arrows, keyboard nav, dot indicators

## Pending Work
- Homepage project order: move job-market-pulse to position 4, explainable-ai to position 5
- Tag audit: update tags per spec
- Eval Studio: demo mode
- Explainable AI: walkthrough video

---

## ACTIVE TASK: Make CalendlyBubble persistent — remove dismiss, always visible

### Context
The CalendlyBubble currently has dismiss logic (click X, it disappears for 7s, then reappears). This is unnecessary — the bubble is small, non-blocking, and serves as a navigation CTA. Make it persistent and always visible. Remove the X button and all timer/state logic.

### What to Do

**1. Replace `components/calendly-bubble.tsx`** with this simplified version:

```tsx
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { CalendarDays } from "lucide-react";

export default function CalendlyBubble() {
  const [calendarInView, setCalendarInView] = useState(false);
  const pathname = usePathname();

  // Track whether the Calendly embed is in view — hide bubble when it is
  useEffect(() => {
    const el = document.getElementById("calendly-embed");
    if (!el) {
      setCalendarInView(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setCalendarInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [pathname]);

  function handleClick() {
    const embed = document.getElementById("calendly-embed");
    if (embed) {
      embed.scrollIntoView({ behavior: "smooth" });
    }
  }

  if (calendarInView) return null;

  return (
    <div
      onClick={handleClick}
      className="animate-bubble-in fixed bottom-6 right-6 z-[9999] flex cursor-pointer items-center gap-[10px] rounded-2xl border border-white/10 px-4 py-3"
      style={{
        background: "rgba(11,17,30,0.95)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      }}
    >
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <CalendarDays size={16} className="text-primary" />
      </div>
      <div>
        <p className="text-[13px] font-medium" style={{ color: "rgb(226,235,243)" }}>
          Let&apos;s find a time
        </p>
        <p className="text-[11px]" style={{ color: "rgb(148,163,184)" }}>
          15 min · we can go over if we're on a roll :)
        </p>
      </div>
    </div>
  );
}
```

Key changes from current version:
- REMOVED: dismiss button (X)
- REMOVED: useState for visible, reappearTimer, scheduleShow
- REMOVED: handleDismiss function
- REMOVED: useRouter (no longer needed since we removed cross-page navigation logic)
- REMOVED: closeAllOverlays function
- KEPT: IntersectionObserver to hide bubble when Calendly embed is in view (this is useful — no point showing "Let's find a time" when the calendar is already visible)
- KEPT: handleClick to scroll to Calendly embed
- Simplified handleClick — only scrolls on current page, no cross-page navigation needed since bubble is on all pages via layout.tsx

### Files to Touch (ONLY these)
- EDIT: `components/calendly-bubble.tsx`
