"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowDown } from "lucide-react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const nodesRef = useRef<Node[]>([]);
  const animFrameRef = useRef<number>(0);
  const [scrollY, setScrollY] = useState(0);

  const initNodes = useCallback((w: number, h: number) => {
    const count = Math.min(Math.floor((w * h) / 12000), 100);
    nodesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (nodesRef.current.length === 0) initNodes(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;
      }

      // Draw connections
      const maxDist = 150;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.15;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(56,189,148,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw nodes + mouse glow
      for (const node of nodes) {
        const dx = node.x - mouse.x;
        const dy = node.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const glow = dist < 200 ? (1 - dist / 200) * 0.6 : 0;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + glow * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56,189,148,${node.opacity + glow})`;
        ctx.fill();

        if (glow > 0.1) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + glow * 8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(56,189,148,${glow * 0.2})`;
          ctx.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [initNodes]);

  const parallax = Math.min(scrollY * 0.3, 200);
  const opacity = Math.max(1 - scrollY / 600, 0);

  return (
    <section className="relative flex h-screen items-end overflow-hidden pb-20 md:items-center md:pb-0">
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ transform: `translateY(${parallax}px)`, opacity }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/30 to-transparent" />

      {/* Content */}
      <div
        className="relative z-10 mx-auto w-full max-w-6xl px-6"
        style={{ opacity, transform: `translateY(${-parallax * 0.2}px)` }}
      >
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span className="text-xs font-medium text-primary">Open to Opportunities</span>
          </div>

          <h1 className="mb-4 text-balance text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl">
            Harshit Sharma
          </h1>

          <p className="mb-2 text-xl font-medium text-primary md:text-2xl">
            AI Product Manager
          </p>

          <p className="mb-8 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
            Bridging engineering depth with product vision. Building the next generation of AI-powered tools at the frontier.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="rounded-lg border border-border bg-transparent px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ opacity: Math.max(1 - scrollY / 200, 0) }}
      >
        <ArrowDown className="h-5 w-5 animate-bounce text-muted-foreground" />
      </div>
    </section>
  );
}
