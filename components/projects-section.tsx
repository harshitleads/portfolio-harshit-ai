"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const mockupImages = [
  {
    src: "/images/explainable-1.jpg",
    alt: "Explainable AI mockup 1",
  },
  {
    src: "/images/explainable-2.jpg",
    alt: "Explainable AI mockup 2",
  },
  {
    src: "/images/explainable-3.jpg",
    alt: "Explainable AI mockup 3",
  },
];

export function ProjectsSection() {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>(0.05);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");
  const [lightboxAlt, setLightboxAlt] = useState("");
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const openLightbox = (src: string, alt: string) => {
    setLightboxImage(src);
    setLightboxAlt(alt);
    setLightboxOpen(true);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.5, 3));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.5, 0.5));

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

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxOpen]);

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
          className="overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-700 delay-100"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          {/* Embedded one-pager image */}
          <div className="relative w-full">
            <Image
              src="/images/explainable-summary.jpg"
              alt="Explainable AI Coding Assistant one-pager summary"
              width={1200}
              height={1600}
              className="w-full"
              priority
            />
          </div>

          {/* Text content */}
          <div className="p-6 md:p-10">
            {/* The Problem */}
            <div className="mb-8">
              <h3 className="mb-3 text-xl font-bold text-foreground">The Problem</h3>
              <p className="leading-relaxed text-muted-foreground">
                Developers spend hours manually verifying AI-generated code because they don&apos;t trust it. 
                This &ldquo;trust tax&rdquo; is the biggest barrier to AI coding assistant adoption, even though 
                the $3B+ market is growing fast.
              </p>
            </div>

            {/* The Insight */}
            <div className="mb-8">
              <h3 className="mb-3 text-xl font-bold text-foreground">The Insight</h3>
              <p className="leading-relaxed text-muted-foreground">
                Trust isn&apos;t binary—it&apos;s calibrated. By surfacing the model&apos;s uncertainty 
                and reasoning inline, developers can make informed accept/reject decisions at a glance, 
                eliminating blind acceptance and reducing verification overhead.
              </p>
            </div>

            {/* Key Differentiation */}
            <div className="mb-8">
              <h3 className="mb-3 text-xl font-bold text-foreground">Key Differentiation</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="mt-1.5 flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <span className="leading-relaxed">
                    <span className="font-semibold text-foreground">Calibrated confidence</span> — Explicit 
                    uncertainty reduces blind trust and speeds adoption
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <span className="leading-relaxed">
                    <span className="font-semibold text-foreground">Codebase intelligence beyond naive RAG</span> — 
                    Repository-specific reasoning, not just pattern matching
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <span className="leading-relaxed">
                    <span className="font-semibold text-foreground">Makes correctness legible during coding</span> — 
                    Visible inline, not just in post-review
                  </span>
                </li>
              </ul>
            </div>

            {/* Research */}
            <div className="mb-10">
              <h3 className="mb-3 text-xl font-bold text-foreground">Research</h3>
              <p className="leading-relaxed text-muted-foreground">
                This project combined quantitative analysis of developer behavior with qualitative interviews 
                to understand trust patterns in AI-assisted coding. The findings informed a prototype that 
                balances transparency with usability, ensuring explainability doesn&apos;t slow down the workflow.
              </p>
            </div>

            {/* Three mockup images */}
            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {mockupImages.map((img) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => openLightbox(img.src, img.alt)}
                  className="group relative overflow-hidden rounded-lg border border-border/50 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={400}
                    height={300}
                    className="w-full transition-transform duration-300 group-hover:scale-105"
                  />
                </button>
              ))}
            </div>

            {/* View full analysis link */}
            <div className="text-center">
              <a
                href="/Explainable_Coding_Assistant.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary underline-offset-4 transition-colors hover:underline"
              >
                View full analysis (PDF)
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox modal with zoom/pan */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-lg"
          onClick={closeLightbox}
          onKeyDown={(e) => e.key === "Escape" && closeLightbox()}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-secondary/80 text-foreground transition-colors hover:bg-secondary"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Zoom controls */}
          <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
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
          </div>

          {/* Zoom level indicator */}
          <div className="absolute left-4 top-28 z-10 rounded-full bg-secondary/80 px-3 py-1.5 text-sm font-medium text-foreground">
            {Math.round(zoom * 100)}%
          </div>

          {/* Image container */}
          <div
            className="relative max-h-[90vh] max-w-[90vw] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
          >
            <div
              style={{
                transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                transition: isDragging ? "none" : "transform 0.2s ease-out",
              }}
            >
              <Image
                src={lightboxImage}
                alt={lightboxAlt}
                width={1400}
                height={900}
                className="max-h-[90vh] w-auto rounded-lg object-contain"
                draggable={false}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
