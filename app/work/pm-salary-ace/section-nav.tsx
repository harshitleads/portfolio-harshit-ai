"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "insight", label: "Why I Built This" },
  { id: "sprint1", label: "V1 Sprint" },
  { id: "research", label: "User Research" },
  { id: "sprint2", label: "V2 Decisions" },
  { id: "feedback", label: "User Feedback" },
  { id: "screenshots", label: "Screenshots" },
  { id: "roadmap", label: "Roadmap" },
];

export function SectionNav() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
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

    return () => observer.disconnect();
  }, []);

  return (
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
  );
}
