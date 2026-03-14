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
                {"For five years I shipped products at scale: complex enterprise software, data platforms, and revenue tooling that supported a "}
                <span className="font-medium text-foreground">$150M+ sales pipeline</span>
                {". I learned how to work with large cross-functional teams, drive adoption across organizations, and own outcomes end to end."}
              </p>
              <p>
                {"Now at "}
                <span className="font-medium text-foreground">Berkeley (M. Eng.)</span>
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

            <div className="space-y-6 text-base leading-[1.8] text-muted-foreground md:text-lg">

              <p>
                I started in electrical engineering designing power systems where a design flaw does not just crash an app.{" "}
                <span className="font-semibold text-foreground">It causes fires, explosions, and casualties.</span>{" "}
                You learn to think through failure modes obsessively: what breaks, when does it fail silently, how will users misuse it.
              </p>

              <p>
                For five years I shipped products at scale: complex enterprise software, data platforms, and revenue tooling that supported a{" "}
                <span className="font-semibold text-foreground">$150M+ sales pipeline</span>.
                {" "}I learned how to ship in risk-averse organizations, manage cross-functional teams, and drive adoption when users do not want to change how they work.
              </p>

              <p>
                That background gives me a specific lens on AI products.{" "}
                <span className="font-semibold text-foreground">AI systems fail in unpredictable ways.</span>{" "}
                They hallucinate confidently. They work in demos but break in production. The companies that win will be the ones who{" "}
                <span className="text-primary font-medium">design for failure modes from day one</span>, not as an afterthought.
              </p>

              <p>
                At Berkeley I am building technical depth in ML, deep learning, and RL. My capstone on{" "}
                <span className="font-semibold text-foreground">productizing AI evals</span>{" "}
                is teaching me how frontier models are calibrated for commercial deployment. I am not trying to become a research scientist. I am learning the foundations to make better product decisions.
              </p>

              <p>
                I am also a power user. I code with Claude, build agents for automation, and use AI to{" "}
                <span className="font-semibold text-foreground">10x my productivity daily</span>.
                {" "}I do not theorize about AI adoption. I live it.
              </p>

              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">The Opportunity I See</p>
                <p className="text-sm leading-relaxed">
                  Current multi-agent systems break unpredictably, waste tokens retrying failed processes, and compound errors across handoffs.
                  If we are building toward workflows with hundreds of coordinating agents,{" "}
                  <span className="font-semibold text-foreground">the foundation has to be solid.</span>{" "}
                  You cannot scale complexity on top of unreliable primitives.
                </p>
              </div>

              <div className="rounded-xl border border-border/40 bg-secondary/20 p-5">
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">My Thesis</p>
                <p className="text-sm leading-relaxed">
                  Most PMs treat evals as a testing function.{" "}
                  <span className="text-primary font-semibold">I see them as core product strategy.</span>{" "}
                  Calibrated confidence, failure mode mapping, graceful degradation: these separate demos from products people actually deploy at scale.
                  The companies building reliable AI need PMs who think about failure modes as early as they think about features.{" "}
                  <span className="font-semibold text-foreground">That is the gap I am building toward.</span>
                </p>
              </div>

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
