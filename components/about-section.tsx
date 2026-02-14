"use client";

import { useState, useEffect, useCallback } from "react";
import { Cpu, GraduationCap, Briefcase, X, ArrowRight } from "lucide-react";
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
    desc: "B2B SaaS, PLM, data ops & revenue enablement",
  },
  {
    icon: Cpu,
    title: "Frontier AI Focus",
    desc: "Building products at leading AI companies",
  },
];

export function AboutSection() {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>(0.1);
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = useCallback(() => setModalOpen(false), []);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [modalOpen, closeModal]);

  return (
    <>
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
              Building AI Products That Scale Reliably
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
                  {"I started in electrical engineering, designing power systems where failure meant explosions, not just bad user reviews. That taught me to think through failure modes obsessively\u2014because in safety-critical systems, \u201Cit works in the demo\u201D isn\u2019t good enough."}
                </p>
                <p>
                  {"I spent the last few years of my time at "}
                  <span className="font-medium text-foreground">GE Vernova</span>
                  {" building B2B SaaS products: PLM systems, data operations platforms, and revenue enablement tools that supported a "}
                  <span className="font-medium text-foreground">$150M+ sales pipeline</span>
                  {". I learned how to ship complex enterprise software at scale, work with global engineering teams, and drive adoption across organizations."}
                </p>
                <p>
                  {"Now at "}
                  <span className="font-medium text-foreground">Berkeley (MEng\u2019 2026)</span>
                  {", I\u2019m combining both backgrounds\u2014technical depth in ML/deep learning/RL, plus hands-on experience with AI evals productization\u2014to transition into AI Product Management."}
                </p>
                <p>
                  {"I\u2019m a daily AI power user: I code with Claude, brainstorm ideas with ChatGPT, build agents for automation, and live in the products I want to help build."}
                </p>
                <p>
                  {"My focus: "}
                  <span className="text-primary">bridging the gap between AI capability and reliable deployment at scale</span>
                  {"\u2014because the companies that win won\u2019t just have the most capable models, they\u2019ll have the most trustworthy ones."}
                </p>
              </div>

              {/* Philosophy button */}
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="mt-8 inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-5 py-2.5 text-sm font-medium text-primary transition-all hover:border-primary/50 hover:bg-primary/10"
              >
                {"Read My Full Philosophy on AI"}
                <ArrowRight className="h-4 w-4" />
              </button>
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

      {/* Philosophy Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={closeModal}
          style={{ animation: "fadeIn 0.2s ease-out" }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

          {/* Modal content */}
          <div
            className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl md:p-10"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "slideUp 0.3s ease-out" }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Title */}
            <h3 className="mb-8 pr-8 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              How I Approach Building AI Products
            </h3>

            {/* Content */}
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                I started my career in electrical engineering, designing power systems where a design flaw doesn{"'"}t just crash an app{"\u2014"}it causes fires, explosions, and casualties.
              </p>
              <p>
                Early in my time at GE Vernova, I worked as a system engineer on power electronics and critical infrastructure. When you{"'"}re designing equipment that sits in hospitals, data centers, and industrial facilities, you learn to think through failure modes obsessively. What breaks? When does it fail silently? How will users misuse it? What are the second-order effects?
              </p>
              <p>
                I then transitioned into building B2B SaaS products at GE{"\u2014"}PLM systems, data operations platforms, and revenue enablement tools supporting a $150M+ sales pipeline. I learned how to ship complex enterprise software at scale, manage stakeholders across global engineering teams, and drive adoption in risk-averse organizations.
              </p>
              <p>
                That combination{"\u2014"}safety-critical thinking from electrical engineering plus enterprise software experience{"\u2014"}gives me a{" "}
                <span className="font-medium text-foreground">unique lens on AI products</span>. AI systems fail in unpredictable ways. They hallucinate confidently. They work in demos but break in production. Users trust them blindly until something goes catastrophically wrong. The companies that win will be the ones who design for failure modes from day one.
              </p>
              <p>
                At Berkeley (MEng, IEOR), I{"'"}m building technical depth in ML, deep learning, and reinforcement learning. My capstone on productizing AI evals is teaching me how frontier models are calibrated for commercial deployment. I{"'"}m not trying to become a research scientist{"\u2014"}I{"'"}m learning the technical foundations to make better product decisions.
              </p>
              <p>
                I{"'"}m also a power user. I use AI to code, build agents for workflow automation, and 10x my productivity daily. I don{"'"}t just theorize about AI adoption{"\u2014"}I live it.
              </p>
              <p>
                Here{"'"}s my perspective on where AI products are headed: many teams focus primarily on capabilities{"\u2014"}bigger context windows, faster inference, more complex reasoning. Those advances matter. But I believe if multi-agent coordination is a path to AGI, the next critical step is equally important:{" "}
                <span className="font-medium text-primary">building agents that fail predictably and gracefully</span>.
              </p>
              <p>
                Current multi-agent systems have real reliability challenges. They can break unpredictably, waste tokens retrying failed processes, and compound errors across agent handoffs. If we{"'"}re building toward workflows with hundreds or thousands of coordinating agents, the foundation has to be rock-solid. You can{"'"}t scale complexity on top of unreliable primitives.
              </p>
              <p>
                This is where{" "}
                <span className="font-medium text-foreground">evals stop being a testing function and become core product strategy</span>. Calibrated confidence, failure mode mapping, graceful degradation{"\u2014"}these aren{"'"}t nice-to-haves. They{"'"}re what separates demos from products people actually deploy at scale.
              </p>
              <p>
                I{"'"}m not positioning myself as an evals specialist or AI test engineer. I understand the full scope of AI product development{"\u2014"}from model capabilities to UX to go-to-market. But I know that commercial-scale AI products live or die on their reliability architecture, and that{"'"}s where my background gives me an edge most PMs don{"'"}t have.
              </p>
              <p className="font-medium text-foreground">
                What I bring: safety-critical thinking from electrical engineering, B2B SaaS shipping experience, obsessive attention to failure modes, hands-on AI expertise, and five years of building complex products at scale.
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
