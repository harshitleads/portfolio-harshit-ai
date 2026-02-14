"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowDown } from "lucide-react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseOpacity: number;
  hue: number; /* 0-1 blend between green and blue */
  pulseOffset: number;
}

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const nodesRef = useRef<Node[]>([]);
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef(0);
  const [scrollY, setScrollY] = useState(0);

  const initNodes = useCallback((w: number, h: number) => {
    /* Grid-based seeding: divide viewport into cells, place one node per cell
       with random jitter. This ensures even, dense coverage with no clumping. */
    const cellSize = 55; // smaller = denser
    const cols = Math.ceil(w / cellSize);
    const rows = Math.ceil(h / cellSize);
    const nodes: Node[] = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        /* ~85% fill rate so it doesn't look perfectly gridded */
        if (Math.random() > 0.85) continue;
        nodes.push({
          x: col * cellSize + Math.random() * cellSize,
          y: row * cellSize + Math.random() * cellSize,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1,
          baseOpacity: Math.random() * 0.4 + 0.4,
          hue: Math.random(),
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
    }
    nodesRef.current = nodes;
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

    /* Colour helpers: blend between emerald green and cyan blue */
    const getColor = (hue: number, alpha: number) => {
      const r = Math.round(20 + hue * 10);
      const g = Math.round(180 + (1 - hue) * 40);
      const b = Math.round(130 + hue * 120);
      return `rgba(${r},${g},${b},${alpha})`;
    };

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      timeRef.current += 0.01;
      const t = timeRef.current;

      /* Clear with subtle trail */
      ctx.fillStyle = "rgba(8,14,32,0.15)";
      ctx.fillRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;
      const mouseActive = mouse.x > 0 && mouse.y > 0;

      /* Update positions */
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;

        /* Gentle mouse attraction */
        if (mouseActive) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 300 && dist > 30) {
            node.vx += (dx / dist) * 0.015;
            node.vy += (dy / dist) * 0.015;
          }
          /* Clamp velocity */
          const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
          if (speed > 1.2) {
            node.vx = (node.vx / speed) * 1.2;
            node.vy = (node.vy / speed) * 1.2;
          }
        }
      }

      /* Draw connections -- slightly larger than cell size for a dense mesh */
      const maxDist = 120;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const falloff = 1 - dist / maxDist;
            let alpha = falloff * 0.25;

            /* Boost connections near mouse */
            if (mouseActive) {
              const midX = (nodes[i].x + nodes[j].x) / 2;
              const midY = (nodes[i].y + nodes[j].y) / 2;
              const mDist = Math.sqrt(
                (midX - mouse.x) ** 2 + (midY - mouse.y) ** 2
              );
              if (mDist < 250) {
                alpha += (1 - mDist / 250) * 0.35;
              }
            }

            const avgHue = (nodes[i].hue + nodes[j].hue) / 2;

            /* Draw gradient line */
            const grad = ctx.createLinearGradient(
              nodes[i].x, nodes[i].y,
              nodes[j].x, nodes[j].y
            );
            grad.addColorStop(0, getColor(nodes[i].hue, alpha));
            grad.addColorStop(1, getColor(nodes[j].hue, alpha));

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = falloff * 1.5 + 0.3;
            ctx.stroke();
          }
        }
      }

      /* Draw nodes */
      for (const node of nodes) {
        const dx = node.x - mouse.x;
        const dy = node.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseProximity = mouseActive && dist < 250 ? 1 - dist / 250 : 0;

        /* Pulsing opacity */
        const pulse = Math.sin(t * 2 + node.pulseOffset) * 0.15 + 0.85;
        const opacity = Math.min(
          (node.baseOpacity + mouseProximity * 0.5) * pulse,
          1
        );
        const r = node.radius + mouseProximity * 3;

        /* Outer glow */
        if (mouseProximity > 0.05) {
          const glowR = r + mouseProximity * 15;
          const grd = ctx.createRadialGradient(
            node.x, node.y, r * 0.5,
            node.x, node.y, glowR
          );
          grd.addColorStop(0, getColor(node.hue, mouseProximity * 0.4));
          grd.addColorStop(1, getColor(node.hue, 0));
          ctx.beginPath();
          ctx.arc(node.x, node.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        /* Core node */
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = getColor(node.hue, opacity);
        ctx.fill();

        /* Bright white center for near-mouse nodes */
        if (mouseProximity > 0.4) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, r * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${mouseProximity * 0.6})`;
          ctx.fill();
        }
      }

      /* Mouse cursor glow */
      if (mouseActive) {
        const grd = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 200
        );
        grd.addColorStop(0, "rgba(56,210,180,0.08)");
        grd.addColorStop(0.5, "rgba(56,180,220,0.03)");
        grd.addColorStop(1, "rgba(56,180,220,0)");
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 200, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
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
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />

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
