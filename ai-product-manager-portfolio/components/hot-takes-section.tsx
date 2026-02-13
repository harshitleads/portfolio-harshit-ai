"use client";

import { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown, Flame, ChevronDown, ChevronUp } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const takes = [
  "Most AI products fail not because of bad models, but because of bad product thinking.",
  "The best PM skill is saying no to features that demo well but ship poorly.",
  "RAG is necessary but not sufficient. Context without reasoning is just expensive search.",
  "Confidence scores without explanations are worse than no scores at all.",
  "The next wave of AI products will be won by trust, not capability.",
  "Engineers who become PMs have an unfair advantage in AI companies.",
  "User research in AI products requires studying failures, not just successes.",
  "Every AI product needs a graceful degradation strategy, not just a happy path.",
  "The best AI features feel invisible. If users notice the AI, you've already lost.",
  "Hiring for 'AI PM' is mostly a signal that the company doesn't know what they need.",
];

type Reactions = Record<string, { like: number; disagree: number; me_too: number }>;
type UserReacted = Record<string, { like: boolean; disagree: boolean; me_too: boolean }>;

export function HotTakesSection() {
  const [sectionRef, isVisible] = useScrollAnimation<HTMLElement>(0.05);
  const [showAll, setShowAll] = useState(false);
  const [reactions, setReactions] = useState<Reactions>({});
  const [userReacted, setUserReacted] = useState<UserReacted>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedR = localStorage.getItem("hs-reactions");
      const savedU = localStorage.getItem("hs-user-reacted");
      if (savedR) setReactions(JSON.parse(savedR));
      if (savedU) setUserReacted(JSON.parse(savedU));
    } catch {}
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("hs-reactions", JSON.stringify(reactions));
    localStorage.setItem("hs-user-reacted", JSON.stringify(userReacted));
  }, [reactions, userReacted, mounted]);

  const toggle = (index: number, type: "like" | "disagree" | "me_too") => {
    const key = String(index);
    const wasActive = userReacted[key]?.[type] ?? false;
    const delta = wasActive ? -1 : 1;

    setReactions((prev) => ({
      ...prev,
      [key]: {
        like: (prev[key]?.like ?? 0) + (type === "like" ? delta : 0),
        disagree: (prev[key]?.disagree ?? 0) + (type === "disagree" ? delta : 0),
        me_too: (prev[key]?.me_too ?? 0) + (type === "me_too" ? delta : 0),
      },
    }));

    setUserReacted((prev) => ({
      ...prev,
      [key]: {
        like: prev[key]?.like ?? false,
        disagree: prev[key]?.disagree ?? false,
        me_too: prev[key]?.me_too ?? false,
        [type]: !wasActive,
      },
    }));
  };

  const visible = showAll ? takes : takes.slice(0, 3);

  const ReactionBtn = ({
    index,
    type,
    icon: Icon,
    label,
    activeColor,
  }: {
    index: number;
    type: "like" | "disagree" | "me_too";
    icon: typeof ThumbsUp;
    label: string;
    activeColor: string;
  }) => {
    const active = userReacted[String(index)]?.[type] ?? false;
    const count = reactions[String(index)]?.[type] ?? 0;
    return (
      <button
        type="button"
        onClick={() => toggle(index, type)}
        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
          active
            ? `${activeColor} border-current`
            : "border-border/50 text-muted-foreground hover:border-border hover:text-foreground"
        }`}
      >
        <Icon className="h-3 w-3" />
        {label}
        {count > 0 && <span className="ml-0.5 tabular-nums">{count}</span>}
      </button>
    );
  };

  return (
    <section id="takes" ref={sectionRef} className="relative px-6 py-20 md:py-24">
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
            Perspectives
          </p>
          <h2 className="mb-10 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Hot Takes & Random Facts
          </h2>
        </div>

        <div className="space-y-4">
          {visible.map((take, i) => (
            <div
              key={take}
              className="glass-card rounded-xl p-5 transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: `${100 + i * 80}ms`,
              }}
            >
              <div className="mb-3 flex items-start gap-3">
                <Flame className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <p className="text-sm leading-relaxed text-foreground">{take}</p>
              </div>
              <div className="flex flex-wrap gap-2 pl-7">
                <ReactionBtn index={i} type="like" icon={ThumbsUp} label="Like" activeColor="text-primary" />
                <ReactionBtn index={i} type="disagree" icon={ThumbsDown} label="Disagree" activeColor="text-orange-400" />
                <ReactionBtn index={i} type="me_too" icon={Flame} label="Me Too" activeColor="text-accent" />
              </div>
            </div>
          ))}
        </div>

        {takes.length > 3 && (
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="mx-auto mt-6 flex items-center gap-2 rounded-lg border border-border bg-transparent px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
          >
            {showAll ? (
              <>Show Less <ChevronUp className="h-4 w-4" /></>
            ) : (
              <>Show All Takes <ChevronDown className="h-4 w-4" /></>
            )}
          </button>
        )}
      </div>
    </section>
  );
}
