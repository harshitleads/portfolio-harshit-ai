"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { CalendarDays } from "lucide-react";

export default function CalendlyBubble() {
  const [calendarInView, setCalendarInView] = useState(false);
  const pathname = usePathname();

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
          15 min · we can go over if we&apos;re on a roll :)
        </p>
      </div>
    </div>
  );
}
