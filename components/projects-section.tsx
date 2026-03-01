"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  X,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  FileText,
  Maximize2,
  ExternalLink,
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
  /** Card shows a shorter blurb; modal shows the full paragraph. */
  problem: { short: string; full: string };
  solution: { short: string; full: string };
  keyInsight: string;
  differentiation: string[];
  /** index 0 = summary / one-pager image; rest = mockup gallery */
  images: ImageItem[];
  pdfLink?: string;
  liveDemoLink?: string;
}

/* ------------------------------------------------------------------ */
/* Data                                                                 */
/* ------------------------------------------------------------------ */

const projects: ProjectData[] = [
  {
    id: "explainable-ai",
    title: "Explainable AI Coding Assistant",
    tagline: "Trust Through Transparency",
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
    images: [
      { src: "/images/explainable-summary.jpg", label: "Project One-Pager" },
      { src: "/images/explainable-1.jpg", label: "Explainable Reasoning Panel" },
      { src: "/images/explainable-4.jpeg", label: "Low Confidence Warning (42%)" },
      { src: "/images/explainable-2.jpg", label: "High Confidence Suggestion (87%)" },
    ],
    pdfLink: "/Explainable_Coding_Assistant.pdf",
  },
  {
    id: "pm-salary-ace",
    title: "PM Salary Ace",
    tagline: "Practice Like the Job Depends On It",
    problem: {
      short:
        "Most PM candidates underprepare because generic frameworks don\u2019t reflect the real skill gap between junior and staff-level roles.",
      full: "Most PM candidates underprepare because existing resources don\u2019t reflect the real skill gap between junior and staff-level roles. Generic frameworks give false confidence. PM Salary Ace maps 125 questions directly to compensation tiers \u2014 so candidates understand exactly what level they\u2019re actually at.",
    },
    solution: {
      short:
        "125 questions mapped to real PM salary tiers \u2014 from $130K Junior to $350K+ Staff \u2014 with gamified UX designed to keep you in the quiz, not bouncing off it.",
      full: "A gamified quiz platform with 5 difficulty tiers mapped to real PM compensation ranges ($130K\u2013$350K+), skill-based filtering across Product Sense, Product Design, Metrics, and Behavioral, a hint system, multi-correct question support, a countdown timer, and a radar chart performance breakdown. Built and shipped to 44 users in 3 hours using Lovable + Supabase.",
    },
    keyInsight:
      "Salary ranges aren\u2019t just labels \u2014 they\u2019re psychological permission slips. Showing candidates the money attached to each tier reframes preparation from obligation to aspiration.",
    differentiation: [
      "5 compensation-mapped tiers ($130K Junior \u2192 $350K+ Staff)",
      "Skill-based filtering: Product Sense, Design, Metrics, Behavioral",
      "Radar chart performance breakdown across PM competencies",
      "Built and shipped to 44 real users in a single 3-hour sprint",
    ],
    images: [
      { src: "/images/pm-quiz-landing.png", label: "Landing Page \u2014 Choose Your Tier" },
      { src: "/images/pm-quiz-question.png", label: "Quiz UI \u2014 Question Screen" },
      { src: "/images/pm-quiz-results.png", label: "Results \u2014 Radar Chart Breakdown" },
    ],
    liveDemoLink: "https://pm-salary-ace.lovable.app",
  },
];

/* ------------------------------------------------------------------ */
/* ProjectCard                                                          */
/* ------------------------------------------------------------------ */

interface ProjectCardProps {
  project: ProjectData;
  isVisible: boolean;
  onOpenModal: () => void;
  onOpenLightbox: (idx: number, images: ImageItem[]) => void;
}

function ProjectCard({
  project,
  isVisible,
  onOpenModal,
  onOpenLightbox,
}: ProjectCardProps) {
  return (
    <div
      className="glass-card overflow-hidden rounded-2xl transition-all duration-700 delay-100"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
      }}
    >
      <div className="flex flex-col lg:flex-row">
        {/* Left: Summary image -- clicks open lightbox */}
        <button
          type="button"
          onClick={() => onOpenLightbox(0, project.images)}
          className="group relative w-full flex-shrink-0 cursor-pointer overflow-hidden lg:w-[340px] xl:w-[400px]"
        >
          <Image
            src={project.images[0].src}
            alt={`${project.title} one-pager`}
            width={600}
            height={800}
            className="h-60 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105 lg:h-full"
          />
          <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/60 text-foreground opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
            <Maximize2 className="h-3.5 w-3.5" />
          </div>
        </button>

        {/* Right: Problem + Solution + CTA */}
        <div className="flex flex-1 flex-col justify-center p-6 md:p-8 lg:p-10">
          <h3 className="mb-1 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {project.title}
          </h3>
          <p className="mb-5 text-sm font-medium text-primary">{project.tagline}</p>

          <div className="mb-4">
            <p className="mb-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              The Problem
            </p>
            <p className="text-sm leading-relaxed text-foreground/80">
              {project.problem.short}
            </p>
          </div>

          <div className="mb-6">
            <p className="mb-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              The Solution
            </p>
            <p className="text-sm leading-relaxed text-foreground/80">
              {project.solution.short}
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenModal}
            className="group/btn inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
          >
            View Project
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ProjectModal                                                         */
/* ------------------------------------------------------------------ */

interface ProjectModalProps {
  project: ProjectData;
  activeThumb: number;
  onThumbChange: (idx: number) => void;
  onClose: () => void;
  onOpenLightbox: (idx: number, images: ImageItem[]) => void;
}

function ProjectModal({
  project,
  activeThumb,
  onThumbChange,
  onClose,
  onOpenLightbox,
}: ProjectModalProps) {
  const mockupImages = project.images.slice(1);

  return (
    <div
      className="fixed inset-0 z-[80] flex justify-end overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Project details"
    >
      <div
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 flex h-full w-full max-w-3xl flex-col overflow-y-auto bg-card shadow-2xl shadow-background/80 animate-in slide-in-from-right duration-300 md:border-l md:border-border/50">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border/50 bg-card/95 px-6 py-4 backdrop-blur-sm">
          <h2 className="text-lg font-bold text-foreground">{project.title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-secondary"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 px-6 py-8 md:px-10">
          {/* Summary image -- clickable to lightbox */}
          <button
            type="button"
            onClick={() => onOpenLightbox(0, project.images)}
            className="group relative mb-10 block w-full overflow-hidden rounded-xl border border-border/30 transition-all hover:border-primary/30"
          >
            <Image
              src={project.images[0].src}
              alt={`${project.title} one-pager`}
              width={1200}
              height={1600}
              className="w-full transition-transform duration-300 group-hover:scale-[1.01]"
              priority
            />
            <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/60 text-foreground opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
              <Maximize2 className="h-3.5 w-3.5" />
            </div>
          </button>

          {/* THE PROBLEM */}
          <div className="mb-8">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
              The Problem
            </h3>
            <p className="leading-relaxed text-muted-foreground">{project.problem.full}</p>
          </div>

          {/* THE SOLUTION */}
          <div className="mb-8">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
              The Solution
            </h3>
            <p className="leading-relaxed text-muted-foreground">{project.solution.full}</p>
          </div>

          {/* KEY INSIGHT */}
          <div className="mb-8">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
              Key Insight
            </h3>
            <p className="leading-relaxed text-muted-foreground">{project.keyInsight}</p>
          </div>

          {/* DIFFERENTIATION */}
          <div className="mb-10">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
              Differentiation
            </h3>
            <ul className="space-y-2.5 text-muted-foreground">
              {project.differentiation.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1.5 flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* MOCKUP GALLERY */}
          {mockupImages.length > 0 && (
            <div className="mb-10">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">
                Prototype Mockups
              </h3>

              {/* Main display -- clicking opens lightbox */}
              <button
                type="button"
                onClick={() => onOpenLightbox(activeThumb, mockupImages)}
                className="group relative mb-4 block w-full cursor-pointer overflow-hidden rounded-xl border border-border/30 transition-all hover:border-primary/40"
              >
                <Image
                  src={mockupImages[activeThumb].src}
                  alt={mockupImages[activeThumb].label}
                  width={1200}
                  height={800}
                  className="w-full transition-transform duration-300 group-hover:scale-[1.01]"
                />
                <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/60 text-foreground opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                  <Maximize2 className="h-3.5 w-3.5" />
                </div>
              </button>

              {/* Thumbnails row */}
              <div className="grid grid-cols-3 gap-3">
                {mockupImages.map((img, i) => (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => onThumbChange(i)}
                    className={`group overflow-hidden rounded-lg border-2 transition-all ${
                      activeThumb === i
                        ? "border-primary shadow-lg shadow-primary/10"
                        : "border-border/30 hover:border-muted-foreground/40"
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.label}
                      width={400}
                      height={260}
                      className="w-full"
                    />
                    <p
                      className={`px-2 py-1.5 text-center text-[10px] font-medium leading-tight md:text-xs ${
                        activeThumb === i ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {img.label}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CTA links */}
          {(project.pdfLink || project.liveDemoLink) && (
            <div className="flex justify-center gap-3">
              {project.pdfLink && (
                <a
                  href={project.pdfLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
                >
                  <FileText className="h-4 w-4" />
                  View Full Analysis
                </a>
              )}
              {project.liveDemoLink && (
                <a
                  href={project.liveDemoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-primary px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/10"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              )}
            </div>
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

  /* Which project's modal is open (null = closed) */
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  /* Lightbox state */
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<ImageItem[]>([]);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  /* Per-modal gallery state */
  const [activeThumb, setActiveThumb] = useState(0);

  /* Zoom / pan state */
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const selectedProject = projects.find((p) => p.id === selectedProjectId) ?? null;

  const openModal = (id: string) => {
    setSelectedProjectId(id);
    setActiveThumb(0);
  };
  const closeModal = () => setSelectedProjectId(null);

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

  /* Keyboard + scroll lock */
  useEffect(() => {
    if (!selectedProjectId && !lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxOpen) {
          setLightboxOpen(false);
          setZoom(1);
          setPosition({ x: 0, y: 0 });
        } else {
          setSelectedProjectId(null);
        }
      }
      if (lightboxOpen && e.key === "ArrowRight") goNext();
      if (lightboxOpen && e.key === "ArrowLeft") goPrev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selectedProjectId, lightboxOpen, goNext, goPrev]);

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
            Selected Work
          </p>
        </div>

        {/* ---- PROJECT CARDS ---- */}
        <div className="space-y-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isVisible={isVisible}
              onOpenModal={() => openModal(project.id)}
              onOpenLightbox={openLightbox}
            />
          ))}
        </div>
      </div>

      {/* ---- PROJECT MODAL ---- */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          activeThumb={activeThumb}
          onThumbChange={setActiveThumb}
          onClose={closeModal}
          onOpenLightbox={openLightbox}
        />
      )}

      {/* ---- LIGHTBOX (over everything) ---- */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.95)" }}
          onClick={() => { if (zoom <= 1) closeLightbox(); }}
          onWheel={(e) => {
            e.preventDefault();
            if (e.deltaY < 0) setZoom((z) => Math.min(z + 0.25, 5));
            else setZoom((z) => { const n = Math.max(z - 0.25, 0.5); if (n <= 1) setPosition({ x: 0, y: 0 }); return n; });
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
                className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
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
