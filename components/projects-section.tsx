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
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const mockupImages = [
  {
    src: "/images/explainable-1.jpg",
    label: "High Confidence Suggestion (87%)",
  },
  {
    src: "/images/explainable-2.jpg",
    label: "Low Confidence Warning (42%)",
  },
  {
    src: "/images/explainable-3.jpg",
    label: "Explainable Reasoning Panel",
  },
];

export function ProjectsSection() {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>(0.05);
  const [modalOpen, setModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const [activeThumb, setActiveThumb] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  /* Modal controls */
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  /* Lightbox controls */
  const openLightbox = (idx: number) => {
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
  const goNext = useCallback(
    () => setLightboxIdx((i) => (i + 1) % mockupImages.length),
    []
  );
  const goPrev = useCallback(
    () =>
      setLightboxIdx(
        (i) => (i - 1 + mockupImages.length) % mockupImages.length
      ),
    []
  );

  /* Zoom/pan */
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

  /* Keyboard & scroll lock */
  useEffect(() => {
    if (!modalOpen && !lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxOpen) closeLightbox();
        else closeModal();
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
  }, [modalOpen, lightboxOpen, goNext, goPrev]);

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

        {/* ---- PROJECT CARD (homepage) ---- */}
        <button
          type="button"
          onClick={openModal}
          className="glass-card group block w-full cursor-pointer overflow-hidden rounded-2xl text-left transition-all duration-700 delay-100 hover:scale-[1.01] hover:shadow-xl hover:shadow-primary/5"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <div className="flex flex-col md:flex-row">
            {/* Thumbnail */}
            <div className="relative w-full flex-shrink-0 overflow-hidden md:w-80 lg:w-96">
              <Image
                src="/images/explainable-summary.jpg"
                alt="Explainable AI Coding Assistant"
                width={600}
                height={800}
                className="h-56 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105 md:h-full"
              />
            </div>
            {/* Card text */}
            <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
              <h3 className="mb-1 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Explainable AI Coding Assistant
              </h3>
              <p className="mb-3 text-sm font-medium text-primary">
                Trust Through Transparency
              </p>
              <p className="mb-6 leading-relaxed text-muted-foreground">
                Product strategy for AI coding tools that builds developer trust
                through calibrated confidence and explainable reasoning.
              </p>
              <span className="inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all group-hover:brightness-110">
                View Project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </button>
      </div>

      {/* ---- PROJECT MODAL ---- */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[80] flex justify-end overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Project details"
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Slide-in panel */}
          <div className="relative z-10 flex h-full w-full max-w-3xl flex-col overflow-y-auto bg-card shadow-2xl shadow-background/80 animate-in slide-in-from-right duration-300 md:border-l md:border-border/50">
            {/* Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border/50 bg-card/95 px-6 py-4 backdrop-blur-sm">
              <h2 className="text-lg font-bold text-foreground">
                Explainable AI Coding Assistant
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-secondary"
                aria-label="Close modal"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 px-6 py-8 md:px-10">
              {/* Full one-pager image */}
              <div className="mb-10 overflow-hidden rounded-xl border border-border/30">
                <Image
                  src="/images/explainable-summary.jpg"
                  alt="Explainable AI Coding Assistant one-pager"
                  width={1200}
                  height={1600}
                  className="w-full"
                  priority
                />
              </div>

              {/* THE PROBLEM */}
              <div className="mb-8">
                <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
                  The Problem
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  {
                    "Developers spend hours manually verifying AI-generated code because existing tools optimize for speed over trust. When assistants can\u2019t show confidence or explain reasoning, every suggestion requires full mental review\u2014creating a \u201Ctrust tax\u201D that blocks adoption."
                  }
                </p>
              </div>

              {/* THE SOLUTION */}
              <div className="mb-8">
                <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
                  The Solution
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  {
                    "Calibrated confidence scores + explainable reasoning = reduced verification overhead. Instead of hiding uncertainty, surface it. Show developers WHY a suggestion makes sense and WHEN to be skeptical."
                  }
                </p>
              </div>

              {/* KEY INSIGHT */}
              <div className="mb-8">
                <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
                  Key Insight
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  {
                    "Trust isn\u2019t about being right more often\u2014it\u2019s about making uncertainty legible. High-confidence suggestions should be measurably more reliable than low-confidence ones."
                  }
                </p>
              </div>

              {/* DIFFERENTIATION */}
              <div className="mb-10">
                <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
                  Differentiation
                </h3>
                <ul className="space-y-2.5 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="mt-1.5 flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span className="leading-relaxed">
                      Explicit confidence calibration (not just autocomplete
                      speed)
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span className="leading-relaxed">
                      Codebase-aware reasoning (beyond generic RAG)
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span className="leading-relaxed">
                      Legible correctness during development (not post-review)
                    </span>
                  </li>
                </ul>
              </div>

              {/* ---- MOCKUP GALLERY ---- */}
              <div className="mb-10">
                <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">
                  Prototype Mockups
                </h3>

                {/* Main display */}
                <button
                  type="button"
                  onClick={() => openLightbox(activeThumb)}
                  className="group relative mb-4 block w-full overflow-hidden rounded-xl border border-border/30 transition-all hover:border-primary/40"
                >
                  <Image
                    src={mockupImages[activeThumb].src}
                    alt={mockupImages[activeThumb].label}
                    width={1200}
                    height={800}
                    className="w-full transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-background/0 transition-colors group-hover:bg-background/20">
                    <ZoomIn className="h-8 w-8 text-foreground opacity-0 transition-opacity group-hover:opacity-80" />
                  </div>
                </button>

                {/* Thumbnails row */}
                <div className="grid grid-cols-3 gap-3">
                  {mockupImages.map((img, i) => (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => setActiveThumb(i)}
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
                          activeThumb === i
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        {img.label}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* View Full Analysis */}
              <div className="flex justify-center">
                <a
                  href="/Explainable_Coding_Assistant.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
                >
                  <FileText className="h-4 w-4" />
                  View Full Analysis
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---- LIGHTBOX (over modal) ---- */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-lg"
          onClick={closeLightbox}
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

          {/* Zoom controls */}
          <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleZoomOut();
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/80 text-foreground transition-colors hover:bg-secondary"
              aria-label="Zoom out"
            >
              <ZoomOut className="h-5 w-5" />
            </button>
            <span className="rounded-full bg-secondary/80 px-3 py-1.5 text-xs font-medium text-foreground">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleZoomIn();
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/80 text-foreground transition-colors hover:bg-secondary"
              aria-label="Zoom in"
            >
              <ZoomIn className="h-5 w-5" />
            </button>
          </div>

          {/* Prev / Next arrows */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
              setZoom(1);
              setPosition({ x: 0, y: 0 });
            }}
            className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-secondary/80 text-foreground transition-colors hover:bg-secondary"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
              setZoom(1);
              setPosition({ x: 0, y: 0 });
            }}
            className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-secondary/80 text-foreground transition-colors hover:bg-secondary"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Image caption & dots */}
          <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
            <p className="rounded-full bg-secondary/80 px-4 py-1.5 text-xs font-medium text-foreground">
              {mockupImages[lightboxIdx].label}
            </p>
            <div className="flex gap-2">
              {mockupImages.map((_, i) => (
                <button
                  key={`dot-${mockupImages[i].src}`}
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
                      : "bg-muted-foreground/40 hover:bg-muted-foreground"
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Zoomable image */}
          <div
            className="relative max-h-[85vh] max-w-[90vw] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
              cursor:
                zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default",
            }}
          >
            <div
              style={{
                transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                transition: isDragging ? "none" : "transform 0.2s ease-out",
              }}
            >
              <Image
                src={mockupImages[lightboxIdx].src}
                alt={mockupImages[lightboxIdx].label}
                width={1400}
                height={900}
                className="max-h-[85vh] w-auto rounded-lg object-contain"
                draggable={false}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
