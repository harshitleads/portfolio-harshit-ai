"use client";

import { useEffect } from "react";
import { Mail, Linkedin, FileText, Github, ArrowUpRight, CalendarDays } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const contacts = [
  {
    icon: Mail,
    label: "Email me",
    value: "harshit@harshit.ai",
    href: "https://mail.google.com/mail/?view=cm&to=harshit@harshit.ai&su=" + encodeURIComponent("Your portfolio got me. Here I am.") + "&body=" + encodeURIComponent("Hey Harshit,") + "%0A%0A" + encodeURIComponent("I came across your portfolio and wanted to reach out.") + "%0A%0A" + encodeURIComponent("What I'm looking for / why I'm writing:") + "%0A" + encodeURIComponent("[e.g. I'm hiring for an AI PM role / I want to") + "%0A" + encodeURIComponent("collaborate / I have a question about your work]") + "%0A%0A" + encodeURIComponent("A bit about me:") + "%0A" + encodeURIComponent("[e.g. I'm a recruiter at X / PM at Y / student at Z]") + "%0A%0A" + encodeURIComponent("Looking forward to connecting.") + "%0A%0A" + encodeURIComponent("[Your name]"),
  },
  {
    icon: Linkedin,
    label: "Connect with me on LinkedIn",
    value: "/in/harryleads",
    href: "https://linkedin.com/in/harryleads",
  },
  {
    icon: Github,
    label: "Check out my code",
    value: "github.com/harshitleads",
    href: "https://github.com/harshitleads",
  },
  {
    icon: FileText,
    label: "Grab my resume",
    value: "Resume_Harshit_Sharma.pdf",
    href: "/Resume_Harshit_Sharma.pdf",
    download: true
  },
];

export function ContactSection() {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>(0.1);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => {
      (window as unknown as { Calendly: { initInlineWidgets: () => void } }).Calendly?.initInlineWidgets();
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

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
          <p className="mb-2 text-[13px] font-medium uppercase tracking-widest text-primary">
            Connect
          </p>
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {"Let's Connect!"}
          </h2>
          <p className="mb-10 text-[17px] leading-relaxed text-slate-400">
            Interested in AI product strategy? Building something cool? Just want to chat about agents and reliability? I'm easy to reach.
            <br /><br />
            Currently: Trying to resurrect my chess game, playing too much table tennis, and planning my next trip to Japan (vegetarian ramen research in progress!).
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                <p className="text-[14px] font-medium tracking-wider text-slate-400">
                  {item.label}
                </p>
                <p className="truncate text-[13px] font-normal text-slate-400">{item.value}</p>
              </div>
              <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-muted-foreground opacity-0 transition-all group-hover:text-primary group-hover:opacity-100" />
            </a>
          ))}
        </div>

        <div
          style={{
            maxWidth: 800,
            margin: "2rem auto",
            padding: "1.5rem",
            background: "rgba(255,255,255,0.04)",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="mb-1 flex items-center gap-2">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <CalendarDays size={24} className="text-primary" />
            </div>
            <div>
              <p className="text-[14px] font-medium text-slate-400">
                If it&apos;s easier, pick a time directly
              </p>
              <p className="text-[13px] font-normal text-slate-400">
                15 / 30 min · Google Meet
              </p>
            </div>
          </div>
          <div
            id="calendly-embed"
            className="calendly-inline-widget"
            data-url="https://calendly.com/harshit-harshit/15min?background_color=0a0f1e&text_color=ffffff&primary_color=00ff88&hide_gdpr_banner=1"
            style={{ minWidth: 320, height: 700 }}
          />
        </div>
      </div>
    </section>
  );
}
