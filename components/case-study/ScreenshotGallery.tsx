"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Maximize2, ExternalLink } from "lucide-react";

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
  const [openSrc, setOpenSrc] = useState<string | null>(null);
  const openImg = screenshots.find((s) => s.src === openSrc) ?? null;

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {screenshots.map(({ src, alt, caption }) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpenSrc(src)}
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

      {openImg && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.92)" }}
          onClick={() => setOpenSrc(null)}
          role="dialog"
          aria-modal="true"
          aria-label={openImg.alt}
        >
          <button
            type="button"
            onClick={() => setOpenSrc(null)}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="flex max-h-[90vh] max-w-[92vw] items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={openImg.src}
              alt={openImg.alt}
              width={1600}
              height={1100}
              className="max-h-[90vh] max-w-[92vw] rounded-lg object-contain"
              priority
            />
          </div>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-[13px] font-medium text-white/90 backdrop-blur-sm">
            {openImg.caption}
          </p>
        </div>
      )}
    </>
  );
}
