"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  FileText,
  ChevronLeft,
  ChevronRight,
  X,
  Expand,
  Download,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const galleryImages = [
  {
    src: "/images/explainable-summary.jpg",
    label: "Project Overview",
    alt: "Explainable AI Coding Assistant one-pager summary",
  },
  {
    src: "/images/explainable-3.jpg",
    label: "87% High Confidence",
    alt: "High confidence inline suggestion in the code editor",
  },
  {
    src: "/images/explainable-4.jpg",
    label: "AI Reasoning Panel",
    alt: "AI Reasoning side panel showing confidence score and explanations",
  },
  {
    src: "/images/explainable-2.jpg",
    label: "42% Low Confidence",
    alt: "Low confidence suggestion with warning indicators",
  },
];

const tags = [
  "AI/ML",
  "Developer Tools",
  "Explainability",
  "Trust Systems",
  "UX Research",
];

const insights = [
  {
    title: "Calibrated Confidence",
    desc: "Reduces blind trust and speeds adoption",
  },
  {
    title: "Codebase Intelligence",
    desc: "Beyond naive RAG for repo-specific reasoning",
  },
  {
    title: "Legible Correctness",
    desc: "Visible during coding, not just in post-review",
  },
];

export function ProjectsSection() {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>(0.05);
  const [activeThumb, setActiveThumb] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i + 1) % galleryImages.length);
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
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
            Selected Work
          </p>
          <h2 className="mb-10 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Explainable AI Coding Assistant
          </h2>
        </div>

        {/* Main project card */}
        <div
          className="glass-card overflow-hidden rounded-2xl transition-all duration-700 delay-100"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          {/* Featured preview image */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/Explainable_Coding_Assistant.pdf";
                link.download = "Explainable_Coding_Assistant.pdf";
                link.click();
              }}
              className="group relative block w-full cursor-pointer overflow-hidden"
            >
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={galleryImages[activeThumb].src || "/placeholder.svg"}
                  alt={galleryImages[activeThumb].alt}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 1200px"
                  priority={activeThumb === 0}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-background/0 transition-colors group-hover:bg-background/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background/80 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                  <Expand className="h-5 w-5 text-foreground" />
                </div>
              </div>
            </button>
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-2 overflow-x-auto border-t border-border/50 bg-background/30 p-3">
            {galleryImages.map((img, i) => (
              <button
                type="button"
                key={img.src}
                onClick={() => setActiveThumb(i)}
                className={`group relative flex-shrink-0 overflow-hidden rounded-lg transition-all ${
                  activeThumb === i
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <div className="relative h-16 w-24 md:h-20 md:w-32">
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    className="object-cover object-top"
                    sizes="128px"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/80 to-transparent px-1.5 pb-1 pt-4">
                  <span className="text-[10px] font-medium leading-tight text-foreground">
                    {img.label}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Content area */}
          <div className="p-6 md:p-8">
            {/* Tags */}
            <div className="mb-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border/50 bg-secondary/50 px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="mb-4 text-base leading-relaxed text-muted-foreground">
              An AI-powered code completion tool featuring calibrated confidence
              scores and explainable reasoning. Tackles the critical &ldquo;trust
              tax&rdquo; in AI coding assistants by showing developers{" "}
              <span className="text-foreground">why</span> a suggestion was made
              and <span className="text-foreground">how confident</span> the
              model is, reducing blind acceptance and manual verification overhead.
            </p>

            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              The $3B+ AI coding assistant market faces a core adoption barrier:
              developers don&apos;t trust AI-generated code. This prototype solves
              that with a confidence-calibrated system that surfaces reasoning
              inline, letting developers make informed accept/reject decisions at
              a glance.
            </p>

            {/* Action buttons */}
            <div className="mb-8 flex flex-wrap gap-3">
              <a
                href="/Explainable_Coding_Assistant.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
              >
                <FileText className="h-4 w-4" />
                View Full Analysis
              </a>
              <button
                type="button"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/Explainable_Coding_Assistant.pdf";
                  link.download = "Explainable_Coding_Assistant.pdf";
                  link.click();
                }}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-transparent px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </button>
            </div>

            {/* Key Insights */}
            <div className="grid gap-4 md:grid-cols-3">
              {insights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-border/30 bg-secondary/30 p-4"
                >
                  <div className="mb-1 flex items-center gap-2">
                    <ArrowUpRight className="h-3.5 w-3.5 text-primary" />
                    <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-md"
          onClick={closeLightbox}
          onKeyDown={(e) => e.key === "Escape" && closeLightbox()}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-secondary/80 text-foreground transition-colors hover:bg-secondary"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-secondary/80 text-foreground transition-colors hover:bg-secondary"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Image */}
          <div
            className="relative mx-16 max-h-[85vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[lightboxIndex].src || "/placeholder.svg"}
              alt={galleryImages[lightboxIndex].alt}
              width={1400}
              height={900}
              className="max-h-[85vh] w-auto rounded-lg object-contain"
              sizes="90vw"
            />
            <div className="mt-3 text-center">
              <p className="text-sm font-medium text-foreground">
                {galleryImages[lightboxIndex].label}
              </p>
              <p className="text-xs text-muted-foreground">
                {lightboxIndex + 1} / {galleryImages.length}
              </p>
            </div>
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-secondary/80 text-foreground transition-colors hover:bg-secondary"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
            {galleryImages.map((_, i) => (
              <button
                type="button"
                key={`dot-${galleryImages[i].src}`}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                className={`h-2 w-2 rounded-full transition-all ${
                  i === lightboxIndex ? "bg-primary w-6" : "bg-muted-foreground/40"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
