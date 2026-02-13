"use client";

import { Cpu, GraduationCap, Briefcase } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const highlights = [
  {
    icon: GraduationCap,
    title: "UC Berkeley MEng",
    desc: "Industrial Engineering & Operations Research",
  },
  {
    icon: Briefcase,
    title: "5 Years at GE Vernova",
    desc: "Complex product development at scale",
  },
  {
    icon: Cpu,
    title: "Frontier AI Focus",
    desc: "Targeting OpenAI, Anthropic & leading AI startups",
  },
];

export function AboutSection() {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>(0.1);

  return (
    <section id="about" ref={ref} className="relative px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

        <div
          className="transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
            Background
          </p>
          <h2 className="mb-10 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Building AI Products at the Frontier
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Bio */}
          <div
            className="lg:col-span-3 transition-all duration-700 delay-100"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                {"I'm transitioning into AI Product Management after "}
                <span className="font-medium text-foreground">5 years at GE Vernova</span>
                {", where I built complex products with engineering teams and shipped at scale."}
              </p>
              <p>
                {"Currently completing my "}
                <span className="font-medium text-foreground">MEng at UC Berkeley (IEOR)</span>
                {", I'm targeting PM roles at frontier AI companies like "}
                <span className="text-primary">OpenAI</span>{", "}
                <span className="text-primary">Anthropic</span>
                {", and leading AI startups."}
              </p>
              <p>
                {"I bring "}
                <span className="text-primary">technical depth</span>{", "}
                <span className="text-accent">strategic thinking</span>
                {", and a hunger to solve the most interesting problems in AI."}
              </p>
            </div>
          </div>

          {/* Highlight cards */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            {highlights.map((item, i) => (
              <div
                key={item.title}
                className="glass-card rounded-xl p-5 transition-all duration-700"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: `${200 + i * 100}ms`,
                }}
              >
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
