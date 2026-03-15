"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Maximize2,
  ExternalLink,
  Telescope,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */

interface ImageItem {
  src: string;
  label: string;
}

interface ProjectData {
  id: string;
  title: string;
  tagline: string;
  /** Display tags: Content Type · Domain (e.g. Case Study · Enterprise) */
  tags: string[];
  /** Card shows a shorter blurb; modal shows the full paragraph. */
  problem: { short: string; full: string };
  solution: { short: string; full: string };
  keyInsight: string;
  differentiation: string[];
  traction?: string;
  /** index 0 = summary / one-pager image; rest = mockup gallery */
  images: ImageItem[];
  /** When true, gallery includes the hero image (index 0) as first thumbnail */
  galleryIncludesHero?: boolean;
  imagePosition?: string;
  pdfLink?: string;
  liveDemoLink?: string;
  caseStudyLink?: string;
}

/* ------------------------------------------------------------------ */
/* Data                                                                 */
/* ------------------------------------------------------------------ */

const projects: ProjectData[] = [
  {
    id: "explainable-ai",
    title: "Explainable AI Coding Assistant",
    tagline: "Trust Through Transparency",
    tags: ["Case Study", "Developer Tools"],
    problem: {
      short:
        "Developers waste hours verifying AI suggestions because tools optimize for speed, not trust, creating a \u201Ctrust tax\u201D that blocks adoption.",
      full: "Developers spend hours manually verifying AI-generated code because existing tools optimize for speed over trust. When assistants can\u2019t show confidence or explain reasoning, every suggestion requires full mental review, creating a \u201Ctrust tax\u201D that blocks adoption.",
    },
    solution: {
      short:
        "Calibrated confidence scores + explainable reasoning. Show developers WHY a suggestion works and WHEN to be skeptical.",
      full: "Calibrated confidence scores + explainable reasoning = reduced verification overhead. Instead of hiding uncertainty, surface it. Show developers WHY a suggestion makes sense and WHEN to be skeptical.",
    },
    keyInsight:
      "Trust isn\u2019t about being right more often; it\u2019s about making uncertainty legible. High-confidence suggestions should be measurably more reliable than low-confidence ones.",
    differentiation: [
      "Explicit confidence calibration (not just autocomplete speed)",
      "Codebase-aware reasoning (beyond generic RAG)",
      "Legible correctness during development (not post-review)",
    ],
    traction: "Market research · Figma prototype · PDF case study",
    images: [
      { src: "/images/explainable-summary.jpg", label: "Project One-Pager" },
      { src: "/images/explainable-1.jpg", label: "Explainable Reasoning Panel" },
      { src: "/images/explainable-4.jpeg", label: "Low Confidence Warning (42%)" },
      { src: "/images/explainable-2.jpg", label: "High Confidence Suggestion (87%)" },
    ],
    imagePosition: "object-[center_25%]",
    pdfLink: "/Explainable_Coding_Assistant.pdf",
    caseStudyLink: "/work/explainable-ai",
  },
  {
    id: "pm-salary-ace",
    title: "PM Salary Ace",
    tagline: "Practice Like the Job Depends On It",
    tags: ["Live Product", "AI Tools"],
    problem: {
      short:
        "PM candidates don't know what skill level they're actually at. Generic prep doesn't map to real compensation gaps.",
      full: "Most PM candidates underprepare because generic interview resources don't map to real compensation levels. A candidate preparing for $170K Mid-level and one targeting $350K Staff+ need fundamentally different skills, but almost no tool reflects that gap.",
    },
    solution: {
      short:
        "336 questions across 5 salary tiers. Practice what a $350K Staff+ PM actually needs, not generic frameworks.",
      full: "A full-stack quiz platform with 336 questions mapped across 5 PM salary tiers ($130K\u2013$350K+). Key decisions: AI-generated questions required human QA before going live. Early wrong answers were too obvious, which broke the learning value. Auth is opt-in: all 5 tiers are open by default, login unlocks streak tracking and a skill radar chart. Gating higher tiers behind login killed conversions. Trust is a barrier for an unknown product.",
    },
    keyInsight:
      "The hardest call was quality vs. speed. AI generation got us to 336 questions fast, but the first 125 had detectable wrong answers. We flagged them inactive and regenerated. Shipping fast was right. Shipping bad questions wasn't worth it.",
    differentiation: [
      "Tier-mapped questions: Junior and Staff+ require different thinking, not just harder trivia",
      "AI-generated, human QA'd: wrong answers must force real reasoning, not guessing",
      "No forced auth: all 5 tiers open by default, progress tracking is opt-in",
      "22 users \u00B7 12 hours \u00B7 49% activation from a single Berkeley PM Club post",
    ],
    traction: "22 users · 12 hours · 49% activation rate",
    images: [
      { src: "/images/pm-quiz-landing-v2.png", label: "Landing Page" },
      { src: "/images/pm-quiz-question-v2.png", label: "Quiz UI: Question Screen" },
      { src: "/images/pm-quiz-results-v2.png", label: "Progress Dashboard" },
      { src: "/images/pm-quiz-custom-v2.png", label: "Custom Quiz Builder" },
    ],
    galleryIncludesHero: true,
    imagePosition: "object-top",
    liveDemoLink: "https://pmquiz.harshit.ai/",
    caseStudyLink: "/work/pm-salary-ace",
  },
  {
    id: "dear-her",
    title: "Dear Her",
    tagline: "Some feelings are too big for a text message.",
    tags: ["Live Product", "AI Tools"],
    problem: {
      short: "Most people feel things deeply about the women in their lives but never find the words to say it. The gap is not feeling. It is articulation.",
      full: "Most people feel things deeply about the women in their lives but never find the words to say it. The gap is not feeling. It is articulation. Built on Women's Day as a personal gift to my mom and partner, then opened to anyone who needed it.",
    },
    solution: {
      short: "Write three honest prompts about her. Claude transforms them into a beautiful animated letter she can open from any link, no login required.",
      full: "A free web app where you answer three guided prompts about a woman in your life, and Claude transforms your raw inputs into a beautiful letter that appears typewriter-style on a warm parchment card. Fully anonymous, shareable via a unique link, no account required. Voice input lets you speak instead of type. Relationship-aware sign-offs mean a letter to a mentor reads differently from a letter to a partner.",
    },
    keyInsight: "The share button copies a pre-drafted message to clipboard, not just a URL. Recipients should never receive a cold link with no context. The warm message sets emotional tone before the letter is opened.",
    differentiation: [
      "Voice input as a friction reducer: speak your feelings instead of typing them",
      "Relationship-aware sign-offs: mentor letters do not say 'With all my love'",
      "Privacy first: fully anonymous, no login, no email, letters stored with hashed IPs only",
      "255 visitors, 48 letters, 59% landing-to-writer conversion, 10 countries, zero paid distribution",
    ],
    traction: "255 visitors · 48 letters · 10 countries · zero paid distribution",
    images: [
      { src: "/images/dear-her-landing.png", label: "Landing Page" },
      { src: "/images/dear-her-writer-active.png", label: "Write Your Letter" },
      { src: "/images/dear-her-letter.png", label: "Letter Output" },
    ],
    galleryIncludesHero: true,
    imagePosition: "object-center",
    liveDemoLink: "https://dearher.harshit.ai/",
    caseStudyLink: "/work/dear-her",
  },
];

const CONTENT_TYPE_FILTERS = ["Case Study", "Live Product", "Teardown", "Research"];
const DOMAIN_FILTERS = ["AI Tools", "Evals", "Developer Tools", "Productivity"];

/* ------------------------------------------------------------------ */
/* ProjectCard                                                          */
/* ------------------------------------------------------------------ */

interface ProjectCardProps {
  project: ProjectData;
  isVisible: boolean;
  onOpenLightbox: (idx: number, images: ImageItem[]) => void;
}

function ProjectCard({
  project,
  isVisible,
  onOpenLightbox,
}: ProjectCardProps) {
  /* Determine the primary CTA destination */
  const ctaLink = project.caseStudyLink ?? project.pdfLink ?? null;
  const ctaIsExternal = ctaLink !== null && !ctaLink.startsWith("/work");

  return (
    <div
      className="glass-card overflow-hidden rounded-2xl transition-all duration-700 delay-100"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
      }}
    >
      <div className="flex flex-col">
        {/* Left: Summary image -- clicks open lightbox */}
        <button
          type="button"
          onClick={() => onOpenLightbox(0, project.images)}
          className="group relative w-full flex-shrink-0 cursor-pointer overflow-hidden"
        >
          <Image
            src={project.images[0].src}
            alt={`${project.title} one-pager`}
            width={600}
            height={800}
            className={`h-52 w-full object-cover ${project.imagePosition ?? 'object-top'} transition-transform duration-500 group-hover:scale-105`}
          />
          <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/60 text-foreground opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
            <Maximize2 className="h-3.5 w-3.5" />
          </div>
        </button>

        {/* Right: Problem + Solution + CTA */}
        <div className="flex flex-1 flex-col justify-start p-6">
          <h3 className="mb-1 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {project.title}
          </h3>
          <p className="mb-2 text-sm font-medium text-primary">{project.tagline}</p>
          <div className="mb-5 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-slate-400/20 bg-slate-400/[0.06] px-2 py-0.5 text-[11px] font-medium tracking-wide text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mb-4">
            <p className="mb-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              The Problem
            </p>
            <p className="text-sm leading-relaxed text-foreground/80">
              {project.problem.short}
            </p>
          </div>

          <div className="mb-4">
            <p className="mb-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              The Solution
            </p>
            <p className="text-sm leading-relaxed text-foreground/80">
              {project.solution.short}
            </p>
          </div>

          {project.traction && (
            <div className="mb-6 flex flex-wrap gap-2">
              {project.traction?.split(" · ").map((stat) => (
                <span
                  key={stat}
                  className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                >
                  {stat}
                </span>
              ))}
            </div>
          )}

          {ctaLink === null ? (
            <button
              type="button"
              disabled
              className="group/btn inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground opacity-50"
            >
              View Project
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : ctaIsExternal ? (
            <a
              href={ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              View Project
              <ExternalLink className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
            </a>
          ) : (
            <Link
              href={ctaLink}
              className="group/btn inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              View Project
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ProjectsSection                                                      */
/* ------------------------------------------------------------------ */

export function ProjectsSection() {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>(0.05);

  /* Filter state: multi-select, AND logic */
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (tag: string) => {
    setActiveFilters((prev) =>
      prev.includes(tag) ? prev.filter((f) => f !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => setActiveFilters([]);

  const filteredProjects = activeFilters.length === 0
    ? projects
    : projects.filter((p) => activeFilters.every((f) => p.tags.includes(f)));

  const hasActiveFilters = activeFilters.length > 0;

  /* Lightbox state */
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<ImageItem[]>([]);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  /* Zoom / pan state */
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  /* Lightbox: caller passes exactly which image array to browse */
  const openLightbox = (idx: number, images: ImageItem[]) => {
    setLightboxImages(images);
    setLightboxIdx(idx);
    setLightboxOpen(true);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };
  const closeLightbox = () => {
    setLightboxOpen(false);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };
  const goNext = useCallback(() => {
    setLightboxIdx((i) => (i + 1) % lightboxImages.length);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, [lightboxImages.length]);
  const goPrev = useCallback(() => {
    setLightboxIdx((i) => (i - 1 + lightboxImages.length) % lightboxImages.length);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, [lightboxImages.length]);

  /* Zoom / Pan */
  const handleZoomIn = () => {
    setZoom((z) => Math.min(z + 0.5, 4));
    setPosition({ x: 0, y: 0 });
  };
  const handleZoomOut = () => {
    setZoom((z) => {
      const next = Math.max(z - 0.5, 0.5);
      if (next <= 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };
  const handleMouseUp = () => setIsDragging(false);

  /* Keyboard + scroll lock for lightbox */
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxOpen(false);
        setZoom(1);
        setPosition({ x: 0, y: 0 });
      }
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxOpen, goNext, goPrev]);

  return (
    <section id="projects" ref={ref} className="relative px-6 py-20 md:py-24">
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
            {!hasActiveFilters && `Selected Work, ${projects.length} Projects`}
            {hasActiveFilters && filteredProjects.length === 1 && `Selected Work, Showing 1 of ${projects.length} Projects`}
            {hasActiveFilters && filteredProjects.length === 0 && `Selected Work, 0 of ${projects.length} Projects`}
            {hasActiveFilters && filteredProjects.length > 1 && `Selected Work, Showing ${filteredProjects.length} of ${projects.length} Projects`}
          </p>
        </div>

        {/* Filter bar */}
        <div className="mb-10 mt-6 flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={clearFilters}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                !hasActiveFilters
                  ? "border border-primary bg-primary text-primary-foreground hover:brightness-110"
                  : "border border-slate-400/20 bg-slate-400/[0.06] text-slate-400 hover:border-slate-400/40 hover:brightness-110"
              }`}
            >
              All
            </button>
            {CONTENT_TYPE_FILTERS.map((label) => {
              const isActive = activeFilters.includes(label);
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => toggleFilter(label)}
                  className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                    isActive
                      ? "border border-primary bg-primary text-primary-foreground hover:brightness-110"
                      : "border border-slate-400/20 bg-slate-400/[0.06] text-slate-400 hover:border-slate-400/40 hover:brightness-110"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2">
            {DOMAIN_FILTERS.map((label) => {
              const isActive = activeFilters.includes(label);
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => toggleFilter(label)}
                  className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                    isActive
                      ? "border border-primary bg-primary text-primary-foreground hover:brightness-110"
                      : "border border-slate-400/20 bg-slate-400/[0.06] text-slate-400 hover:border-slate-400/40 hover:brightness-110"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ---- PROJECT CARDS / EMPTY STATE ---- */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isVisible={isVisible}
                onOpenLightbox={openLightbox}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Telescope className="mb-6 h-10 w-10 text-primary" />
            <h3 className="mb-3 text-xl font-bold text-foreground md:text-2xl">
              Wow. Nobody&apos;s been here before.
            </h3>
            <p className="mb-8 max-w-md text-sm leading-relaxed text-muted-foreground">
              Not even me. You just filtered yourself into a gap in my portfolio. Honestly? That&apos;s useful. Tell me what you were looking for and I&apos;ll tell you if it&apos;s next on my list.
            </p>
            <a
              href={`https://mail.google.com/mail/?view=cm&to=harshit@harshit.ai&su=${encodeURIComponent(`I went looking for ${activeFilters.join(" + ")} and found nothing. We need to talk.`)}&body=${encodeURIComponent("Hey Harshit,") + "%0A%0A" + encodeURIComponent("I was exploring your portfolio and filtered for") + "%0A" + encodeURIComponent(activeFilters.join(" + ") + " but nothing came up yet.") + "%0A%0A" + encodeURIComponent("I'm interested in this space because:") + "%0A" + encodeURIComponent("[e.g. I work in enterprise AI / I'm building") + "%0A" + encodeURIComponent("something in this space]") + "%0A%0A" + encodeURIComponent("Here's what I was hoping to see from you:") + "%0A" + encodeURIComponent("[e.g. a case study on / a live product that does...]") + "%0A%0A" + encodeURIComponent("Would love to know if this is on your roadmap.") + "%0A%0A" + encodeURIComponent("[Your name]")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-primary px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/10"
            >
              Drop me a note
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        )}
      </div>

      {/* ---- LIGHTBOX (over everything) ---- */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.95)" }}
          onClick={() => { if (zoom <= 1) closeLightbox(); }}
          onWheel={(e) => {
            e.preventDefault();
            if (zoom > 1) {
              setPosition((prev) => ({
                x: prev.x - e.deltaX,
                y: prev.y - e.deltaY,
              }));
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev / Next */}
          {lightboxImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Bottom bar: dots + label + zoom controls */}
          <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
            <div className="flex flex-col items-center gap-2">
              <p className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
                {lightboxImages[lightboxIdx]?.label}
              </p>
              {lightboxImages.length > 1 && (
                <div className="flex gap-2">
                  {lightboxImages.map((_, i) => (
                    <button
                      key={`dot-${lightboxImages[i].src}`}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxIdx(i);
                        setZoom(1);
                        setPosition({ x: 0, y: 0 });
                      }}
                      className={`h-2 w-2 rounded-full transition-all ${
                        lightboxIdx === i
                          ? "scale-125 bg-primary"
                          : "bg-white/30 hover:bg-white/60"
                      }`}
                      aria-label={`Go to image ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Zoom controls */}
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-2 py-1 backdrop-blur-sm">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleZoomOut(); }}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Zoom out"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <span className="min-w-[48px] text-center text-xs font-medium text-white/80">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleZoomIn(); }}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Zoom in"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              {zoom > 1 && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setZoom(1); setPosition({ x: 0, y: 0 }); }}
                  className="ml-1 rounded-full px-2 py-0.5 text-[10px] font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Zoomable image -- fills viewport */}
          <div
            className="flex h-[90vh] w-[95vw] items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
              cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default",
            }}
          >
            <div
              style={{
                transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                transition: isDragging ? "none" : "transform 0.3s ease-out",
                transformOrigin: "center center",
              }}
            >
              <Image
                src={lightboxImages[lightboxIdx]?.src ?? "/placeholder.jpg"}
                alt={lightboxImages[lightboxIdx]?.label ?? ""}
                width={1800}
                height={1200}
                className="max-h-[88vh] max-w-[93vw] rounded-lg object-contain"
                draggable={false}
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
