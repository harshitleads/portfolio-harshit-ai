"use client";

import { Mail, Linkedin, FileText, ArrowUpRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const contacts = [
  {
    icon: Mail,
    label: "Email me!",
    value: "harshitleads@gmail.com",
    href: "mailto:harshitleads@gmail.com",
  },
  {
    icon: Linkedin,
    label: "Connect with me on LinkedIn!",
    value: "/in/harryleads",
    href: "https://linkedin.com/in/harryleads",
  },
  {
    icon: FileText,
    label: "Grab my resume!",
    value: "Resume_Harshit_Sharma.pdf",
    href: "/Resume_Harshit_Sharma.pdf",
    download: true
  },
];

export function ContactSection() {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>(0.1);

  return (
    <section id="contact" ref={ref} className="relative px-6 py-20 md:py-24">
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
            Connect
          </p>
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {"Let's Connect!"}
          </h2>
          <p className="mb-10 max-w-lg text-base leading-relaxed text-muted-foreground">
            Interested in AI product strategy? Building something cool? Just want to chat about agents and reliability? I'm easy to reach.
            <br /><br />
            Currently: Trying to resurrect my chess game, playing too much table tennis, and planning my next trip to Japan (vegetarian ramen research in progress).
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {contacts.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="glass-card group flex items-center gap-4 rounded-xl p-5 transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: `${200 + i * 100}ms`,
              }}
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold tracking-wider text-muted-foreground">
                  {item.label}
                </p>
                <p className="truncate text-sm font-medium text-foreground">{item.value}</p>
              </div>
              <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-muted-foreground opacity-0 transition-all group-hover:text-primary group-hover:opacity-100" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
