"use client";

import { useState, useEffect } from "react";
import { CalendarDays } from "lucide-react";

export default function CalendlyBubble() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("calendly-bubble-dismissed")) return;

    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  function handleDismiss(e: React.MouseEvent) {
    e.stopPropagation();
    setDismissed(true);
    sessionStorage.setItem("calendly-bubble-dismissed", "1");
  }

  function handleClick() {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setDismissed(true);
    sessionStorage.setItem("calendly-bubble-dismissed", "1");
  }

  if (!visible || dismissed) return null;

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
          15 / 30 min · Google Meet
        </p>
      </div>
      <button
        onClick={handleDismiss}
        className="ml-1 text-slate-400 transition-colors hover:text-slate-200"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}
