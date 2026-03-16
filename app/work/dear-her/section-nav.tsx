"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "origin", label: "Why I Built This" },
  { id: "product", label: "How It Works" },
  { id: "traction", label: "Day One and Beyond" },
  { id: "decisions", label: "Every Decision Had a Reason" },
  { id: "screenshots", label: "The Product" },
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
