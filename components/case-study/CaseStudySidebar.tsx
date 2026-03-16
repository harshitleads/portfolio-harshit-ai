"use client";

import { useEffect, useRef, useState } from "react";

interface StatCard {
  value: string;
  label: string;
  sublabel?: string;
  showProgressBar?: boolean;
  progressValue?: number;
  icon?: React.ReactNode;
}

interface SectionLink {
  id: string;
  label: string;
}

interface CaseStudySidebarProps {
  stats: StatCard[];
  sections: SectionLink[];
}

export function CaseStudySidebar({ stats, sections }: CaseStudySidebarProps) {
  const [activeSection, setActiveSection] = useState("");
  const isAtBottom = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !isAtBottom.current) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { threshold: 0.3, rootMargin: "-10% 0px -60% 0px" }
    );

    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    const handleScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 100;
      if (atBottom) {
        isAtBottom.current = true;
        setActiveSection(sections[sections.length - 1].id);
      } else {
        isAtBottom.current = false;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);

  return (
    <div className="space-y-6 lg:sticky lg:top-8">
      {/* Quick stats */}
      <div className="rounded-xl border border-border/40 bg-card/50 p-5">
        <p className="mb-4 text-[13px] font-bold uppercase tracking-widest text-primary">
          At a Glance
        </p>
        <div className="grid gap-2">
          {stats.map((stat) => (
            <div
              key={stat.value + stat.label}
              className="rounded-lg border border-white/[0.07] bg-white/[0.04] p-3"
            >
              {stat.icon ? (
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-slate-100">{stat.value}</p>
                  {stat.icon}
                </div>
              ) : (
                <p className="text-xl font-bold text-slate-100">{stat.value}</p>
              )}
              <p className="text-[13px] text-slate-400">{stat.label}</p>
              {stat.sublabel && (
                <p className="text-[12px] text-emerald-400/80">{stat.sublabel}</p>
              )}
              {stat.showProgressBar && stat.progressValue != null && (
                <div className="mt-1.5 h-[6px] w-full rounded-full bg-white/15">
                  <div
                    style={{
                      width: `${stat.progressValue}%`,
                      height: '100%',
                      borderRadius: '9999px',
                      background: 'linear-gradient(to right, #34d399, #059669)',
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Section links */}
      <div className="rounded-xl border border-border/40 bg-card/50 p-5">
        <p className="mb-4 text-[13px] font-bold uppercase tracking-widest text-primary">
          Sections
        </p>
        <nav className="space-y-2">
          {sections.map(({ id, label }) => {
            const isActive = activeSection === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                className={`block text-[14px] transition-all duration-200 ${
                  isActive
                    ? "border-l-2 border-emerald-400 pl-2 text-emerald-400"
                    : "border-l-0 pl-0 text-slate-400 hover:text-emerald-400"
                }`}
              >
                {label}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
