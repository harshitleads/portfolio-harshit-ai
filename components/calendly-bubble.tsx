"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CalendarDays } from "lucide-react";

export default function CalendlyBubble() {
  const [visible, setVisible] = useState(false);
  const [calendarInView, setCalendarInView] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const reappearTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleShow = useCallback((delay: number) => {
    if (reappearTimer.current) clearTimeout(reappearTimer.current);
    reappearTimer.current = setTimeout(() => setVisible(true), delay);
  }, []);

  // Initial 3s delay to show
  useEffect(() => {
    scheduleShow(3000);
    return () => {
      if (reappearTimer.current) clearTimeout(reappearTimer.current);
    };
  }, [scheduleShow]);

  // Track whether the Calendly embed is in view
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

  function closeAllOverlays() {
    document.querySelectorAll<HTMLElement>('[role="dialog"]').forEach((el) => {
      el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
  }

  function hide() {
    setVisible(false);
    scheduleShow(7000);
  }

  function handleDismiss(e: React.MouseEvent) {
    e.stopPropagation();
    hide();
  }

  function handleClick() {
    closeAllOverlays();
    hide();

    if (pathname === "/") {
      const embed = document.getElementById("calendly-embed");
      if (embed) {
        embed.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    // Navigate to homepage, then scroll to embed after load
    router.push("/");
    const poll = setInterval(() => {
      const embed = document.getElementById("calendly-embed");
      if (embed) {
        clearInterval(poll);
        embed.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
    setTimeout(() => clearInterval(poll), 5000);
  }

  // Hide bubble when calendar is in view
  if (!visible || calendarInView) return null;

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
