"use client";
import { useState } from "react";
import Image from "next/image";
import { X, Maximize2 } from "lucide-react";

const screenshots = [
  { src: "/images/pm-quiz-landing-v2.png", label: "Landing Page" },
  { src: "/images/pm-quiz-question-v2.png", label: "Quiz Interface" },
  { src: "/images/pm-quiz-results-v2.png", label: "Progress Dashboard" },
  { src: "/images/pm-quiz-custom-v2.png", label: "Custom Quiz Builder" },
];

export function ScreenshotGallery() {
  const [openSrc, setOpenSrc] = useState<string | null>(null);
  const openImg = screenshots.find((s) => s.src === openSrc) ?? null;
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {screenshots.map(({ src, label }) => (
          <button key={src} type="button" onClick={() => setOpenSrc(src)} className="group glass-card overflow-hidden rounded-xl text-left">
            <div className="relative overflow-hidden">
              <Image src={src} alt={label} width={600} height={420} className="w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
              <div className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-background/60 text-foreground opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                <Maximize2 className="h-3 w-3" />
              </div>
            </div>
            <p className="px-3 py-2.5 text-center text-[13px] font-medium text-slate-400">{label}</p>
          </button>
        ))}
      </div>
      {openImg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ background: "rgba(0,0,0,0.92)" }} onClick={() => setOpenSrc(null)} role="dialog" aria-modal="true" aria-label={openImg.label}>
          <button type="button" onClick={() => setOpenSrc(null)} className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
          <div className="flex max-h-[90vh] max-w-[92vw] items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <Image src={openImg.src} alt={openImg.label} width={1600} height={1100} className="max-h-[90vh] max-w-[92vw] rounded-lg object-contain" priority />
          </div>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-[13px] font-medium text-white/90 backdrop-blur-sm">{openImg.label}</p>
        </div>
      )}
    </>
  );
}
