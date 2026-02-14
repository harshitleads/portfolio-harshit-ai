"use client";

import { useState, useEffect, useCallback } from "react";
import { Zap, BookOpen, Rocket, X, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const journeyCards = [
  {
    icon: Zap,
    heading: "WHERE I STARTED",
    text: "Non-traditional: safety-critical systems to enterprise SaaS. I\u2019ve worked where failure = lawsuits and casualties, not just bugs.",
    delay: 0,
  },
  {
    icon: BookOpen,
    heading: "WHERE I AM",
    text: "Berkeley MEng diving into ML/RL/AI evals. Daily power user across frontier models. Learning by building, not just studying.",
    delay: 100,
  },
  {
    icon: Rocket,
    heading: "WHERE I\u2019M GOING",
    text: "Building on the path to AGI. Where models are powerful but reliability is everything. Hard problems, high stakes.",
    delay: 200,
  },
];

export function AboutSection() {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>(0.1);
  const [modalOpen, setModalOpen] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);

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

  /* Stagger cards after section visible */
  useEffect(() => {
    if (isVisible) {
      const t = setTimeout(() => setCardsVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [isVisible]);

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

          {/* Bio text */}
          <div
            className="max-w-4xl transition-all duration-700 delay-100"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                {"I started in electrical engineering, designing power systems where failure meant explosions, not just bad user reviews. That taught me to think through failure modes obsessively because in safety-critical systems, \u201Cit works in the demo\u201D isn\u2019t good enough."}
              </p>
              <p>
                {"I spent the last three years of my time at "}
                <span className="font-medium text-foreground">GE's Energy business</span>
                {" building B2B SaaS products: PLM systems, data operations platforms, and revenue enablement tools that supported a "}
                <span className="font-medium text-foreground">$150M+ sales pipeline</span>
                {". I learned how to ship complex enterprise software at scale, work with global engineering teams, and drive adoption across organizations."}
              </p>
              <p>
                {"Now at "}
                <span className="font-medium text-foreground">Berkeley (MEng, IEOR)</span>
                {", I\u2019m combining both backgrounds, technical depth in ML/deep learning/RL, plus hands-on experience with AI evals productization, to transition into AI Product Management."}
              </p>
              <p>
                {"I\u2019m a daily AI power user: I code with Claude, build agents for automation, and live in the products I want to help build."}
              </p>
              <p>
                {"My focus: "}
                <span className="text-primary">bridging the gap between AI capability and reliable deployment at scale</span>
                {" because the companies that win won\u2019t just have the most capable models, they\u2019ll have the most trustworthy ones."}
              </p>
            </div>
          </div>

          {/* Journey Cards */}
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {journeyCards.map((card) => (
              <div
                key={card.heading}
                className="group rounded-xl border border-border/40 bg-gradient-to-br from-[hsla(222,45%,12%,0.7)] to-[hsla(222,45%,8%,0.5)] p-6 backdrop-blur-xl transition-all duration-300 ease-in-out hover:scale-[1.02] hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                style={{
                  opacity: cardsVisible ? 1 : 0,
                  transform: cardsVisible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.5s ease-out ${card.delay}ms, transform 0.5s ease-out ${card.delay}ms, scale 0.3s ease-in-out, border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out`,
                }}
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                  <card.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-foreground">
                  {card.heading}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {card.text}
                </p>
              </div>
            ))}
          </div>

          {/* Philosophy button */}
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-5 py-2.5 text-sm font-medium text-primary transition-all duration-200 hover:scale-[1.03] hover:border-primary/50 hover:bg-primary/10 hover:brightness-110"
            >
              {"Read My Full Philosophy"}
              <ArrowRight className="h-4 w-4" />
            </button>
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
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.8)] backdrop-blur-sm" />

          <div
            className="relative z-10 max-h-[90vh] w-full max-w-[800px] overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl md:p-12"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "slideUp 0.3s ease-out" }}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>

            <h3 className="mb-8 pr-10 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              How I Approach Building Products
            </h3>

            <div className="space-y-5 text-base leading-[1.7] text-muted-foreground md:text-lg">
              <p>
                {"I started my career in electrical engineering, designing power systems where a design flaw doesn\u2019t just crash an app, it causes fires, explosions, and casualties."}
              </p>
              <p>
                {"Early in my time at GE Vernova, I worked as a system engineer on power electronics and critical infrastructure. When you\u2019re designing equipment that sits in hospitals, data centers, and industrial facilities, you learn to think through failure modes obsessively. What breaks? When does it fail silently? How will users misuse it? What are the second-order effects?"}
              </p>
              <p>
                {"I then transitioned into building B2B SaaS products at GE: PLM systems, data operations platforms, and revenue enablement tools supporting a $150M+ sales pipeline. I learned how to ship complex enterprise software at scale, manage stakeholders across global engineering teams, and drive adoption in risk-averse organizations."}
              </p>
              <p>
                {"This combination, safety-critical thinking from electrical engineering plus enterprise software experience, gives me a "}
                <span className="font-medium text-foreground">unique lens on AI products</span>
                {". AI systems fail in unpredictable ways. They hallucinate confidently. They work in demos but break in production. Users trust them blindly until something goes catastrophically wrong. The companies that win will be the ones who design for failure modes from day one."}
              </p>
              <p>
                {"At Berkeley (MEng), I\u2019m building technical depth in ML, deep learning, and reinforcement learning. My capstone on productizing AI evals is teaching me how frontier models are calibrated for commercial deployment. I\u2019m not trying to become a research scientist; I\u2019m learning the technical foundations to make better product decisions."}
              </p>
              <p>
                {"I\u2019m also a power user. I use AI to code, build agents for workflow automation, and 10x my productivity daily. I don\u2019t just theorize about AI adoption; I live it."}
              </p>
              <p>
                {"Here\u2019s my perspective on where AI products are headed: many teams focus primarily on capabilities, viz. bigger context windows, faster inference, more complex reasoning. Those advances matter. But I believe if multi-agent coordination is a path to AGI, the next critical step is equally important: "}
                <span className="font-medium text-primary">building agents that fail predictably and gracefully</span>
                {"."}
              </p>
              <p>
                {"Current multi-agent systems have real reliability challenges. They can break unpredictably, waste tokens retrying failed processes, and compound errors across agent handoffs. If we\u2019re building toward workflows with hundreds or thousands of coordinating agents, the foundation has to be rock-solid. You can\u2019t scale complexity on top of unreliable primitives."}
              </p>
              <p>
                {"This is where "}
                <span className="font-medium text-foreground">evals stop being a testing function and become core product strategy</span>
                {". Calibrated confidence, failure mode mapping, graceful degradation; these aren\u2019t nice-to-haves. They\u2019re what separates demos from products people actually deploy at scale."}
              </p>
            <p>
  {"Evals are my entry point into AI product strategy, not my ceiling. I\u2019m focused on the full product lifecycle\u2014from model capabilities to UX to go-to-market. But where I differentiate is understanding that reliability architecture isn\u2019t a post-launch problem. It\u2019s a product decision from day one."}
</p>
<p className="font-medium text-foreground">
  {"What I bring to AI product development: Systems thinking from safety-critical infrastructure, enterprise SaaS experience, obsessive failure-mode analysis, hands-on expertise with frontier models, and a track record of shipping complex products at scale."}
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
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}
