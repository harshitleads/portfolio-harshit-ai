"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, Maximize2, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

interface Screenshot {
  src: string;
  alt: string;
  caption: string;
}

interface ScreenshotGalleryProps {
  screenshots: Screenshot[];
  liveUrl?: string;
  liveLabel?: string;
}

export function ScreenshotGallery({
  screenshots,
  liveUrl,
  liveLabel,
}: ScreenshotGalleryProps) {
  const [lightboxIdx, setLightboxIdx] = useState(-1);
  const isOpen = lightboxIdx >= 0;
  const current = isOpen ? screenshots[lightboxIdx] : null;

  const goPrev = useCallback(() => {
    setLightboxIdx((i) => (i - 1 + screenshots.length) % screenshots.length);
  }, [screenshots.length]);

  const goNext = useCallback(() => {
    setLightboxIdx((i) => (i + 1) % screenshots.length);
  }, [screenshots.length]);

  const close = useCallback(() => setLightboxIdx(-1), []);

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close, goPrev, goNext]);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {screenshots.map(({ src, alt, caption }, idx) => (
          <button
            key={src}
            type="button"
            onClick={() => setLightboxIdx(idx)}
            className="group glass-card overflow-hidden rounded-xl text-left"
          >
            <div className="relative overflow-hidden">
              <Image
                src={src}
                alt={alt}
                width={600}
                height={420}
                className="w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-background/60 text-foreground opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                <Maximize2 className="h-3 w-3" />
              </div>
            </div>
            <p className="px-3 py-2.5 text-center text-[13px] font-medium text-slate-400">
              {caption}
            </p>
          </button>
        ))}
      </div>

      {liveUrl && (
        <div className="mt-6 text-center">
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary/10"
          >
            {liveLabel ?? "See live"} <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      )}

      {current && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.92)" }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
        >
          {/* Close */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); close(); }}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev / Next */}
          {screenshots.length > 1 && (
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

          {/* Image */}
          <div
            className="flex max-h-[90vh] max-w-[92vw] items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={current.src}
              alt={current.alt}
              width={1600}
              height={1100}
              className="max-h-[90vh] max-w-[92vw] rounded-lg object-contain"
              priority
            />
          </div>

          {/* Bottom bar: caption + dots */}
          <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
            <p className="rounded-full bg-white/10 px-4 py-1.5 text-[13px] font-medium text-white/90 backdrop-blur-sm">
              {current.caption}
            </p>
            {screenshots.length > 1 && (
              <div className="flex gap-2">
                {screenshots.map((s, i) => (
                  <button
                    key={s.src}
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setLightboxIdx(i); }}
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
        </div>
      )}
    </>
  );
}
