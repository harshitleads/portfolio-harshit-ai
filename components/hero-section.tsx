"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";

interface Node {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
  speedX: number;
  speedY: number;
  phase: number;
  radius: number;
  baseOpacity: number;
  hue: number;
}

interface Connection {
  i: number;
  j: number;
  baseAlpha: number;
}

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const animFrameRef = useRef<number>(0);
  const lastTimeRef = useRef(0);
  const isVisibleRef = useRef(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 1.5);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Reinitialize nodes and connections on resize
      initNodes(w, h);
    };

    const initNodes = (w: number, h: number) => {
      const cellSize = 55;
      const cols = Math.ceil(w / cellSize);
      const rows = Math.ceil(h / cellSize);
      const nodes: Node[] = [];

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (Math.random() > 0.85) continue;
          const homeX = col * cellSize + Math.random() * cellSize;
          const homeY = row * cellSize + Math.random() * cellSize;
          nodes.push({
            homeX,
            homeY,
            x: homeX,
            y: homeY,
            offsetX: Math.random() * 30 - 15,
            offsetY: Math.random() * 30 - 15,
            speedX: (Math.random() * 0.9 + 0.3) * (Math.random() > 0.5 ? 1 : -1),
            speedY: (Math.random() * 0.9 + 0.3) * (Math.random() > 0.5 ? 1 : -1),
            phase: Math.random() * Math.PI * 2,
            radius: Math.random() * 2 + 1,
            baseOpacity: Math.random() * 0.4 + 0.4,
            hue: Math.random(),
          });
        }
      }
      nodesRef.current = nodes;

      // Pre-determine connections based on home positions
      const maxDist = 120;
      const connections: Connection[] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].homeX - nodes[j].homeX;
          const dy = nodes[i].homeY - nodes[j].homeY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            connections.push({ i, j, baseAlpha: (1 - dist / maxDist) * 0.4 });
          }
        }
      }
      connectionsRef.current = connections;
    };

    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    // Pause when off screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("canvas resumed");
          isVisibleRef.current = true;
          lastTimeRef.current = 0;
          animFrameRef.current = requestAnimationFrame(animate);
        } else {
          console.log("canvas paused");
          isVisibleRef.current = false;
          cancelAnimationFrame(animFrameRef.current);
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const getColor = (hue: number, alpha: number) => {
      const r = Math.round(20 + hue * 10);
      const g = Math.round(180 + (1 - hue) * 40);
      const b = Math.round(130 + hue * 120);
      return `rgba(${r},${g},${b},${alpha})`;
    };

    const animate = (currentTime: number) => {
      if (!isVisibleRef.current) return;

      // 30fps throttle
      if (lastTimeRef.current && currentTime - lastTimeRef.current < 33) {
        animFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTimeRef.current = currentTime;

      const w = window.innerWidth;
      const h = window.innerHeight;
      const t = Date.now() * 0.001;
      const nodes = nodesRef.current;
      const connections = connectionsRef.current;
      const mouse = mouseRef.current;
      const mouseActive = mouse.x > 0 && mouse.y > 0;

      // Clear
      ctx.clearRect(0, 0, w, h);

      // Update node positions via sine waves
      for (const node of nodes) {
        node.x = node.homeX + Math.sin(t * node.speedX + node.phase) * node.offsetX;
        node.y = node.homeY + Math.cos(t * node.speedY + node.phase) * node.offsetY;
      }

      // Draw connections from static list
      for (const conn of connections) {
        const a = nodes[conn.i];
        const b = nodes[conn.j];

        // Distance-based glow on hover
        const midX = (a.x + b.x) / 2;
        const midY = (a.y + b.y) / 2;
        const distToMouse = Math.hypot(midX - mouse.x, midY - mouse.y);
        const glowBoost = mouseActive ? Math.max(0, 1 - distToMouse / 320) : 0;
        const lineAlpha = conn.baseAlpha + glowBoost * 0.55;

        const avgHue = (a.hue + b.hue) / 2;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = getColor(avgHue, lineAlpha);
        ctx.lineWidth = 1.2 + glowBoost * 0.8;
        ctx.stroke();
      }

      // Draw nodes
      for (const node of nodes) {
        const dist = Math.hypot(node.x - mouse.x, node.y - mouse.y);
        const glow = mouseActive && dist < 320 ? Math.max(0, 1 - dist / 320) : 0;

        const opacity = Math.min(node.baseOpacity + glow * 0.5, 1);
        const r = node.radius + glow * 3;

        // Outer glow near cursor
        if (glow > 0.05) {
          const glowR = r + glow * 15;
          const grd = ctx.createRadialGradient(
            node.x, node.y, r * 0.5,
            node.x, node.y, glowR
          );
          grd.addColorStop(0, getColor(node.hue, glow * 0.4));
          grd.addColorStop(1, getColor(node.hue, 0));
          ctx.beginPath();
          ctx.arc(node.x, node.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        // Core node
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = getColor(node.hue, opacity);
        ctx.fill();

        // White center for close nodes
        if (glow > 0.4) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, r * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${glow * 0.6})`;
          ctx.fill();
        }
      }

      // Mouse cursor ambient glow
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

    animFrameRef.current = requestAnimationFrame(animate);

    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

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
            <span className="text-[13px] font-medium text-primary">Open to Opportunities</span>
          </div>

          <h1 className="mb-4 text-balance text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl">
            Harshit Sharma
          </h1>

          <p className="mb-2 text-xl font-medium text-primary md:text-2xl">
            AI Product Manager
          </p>

          <p className="mb-8 max-w-lg text-[17px] leading-relaxed text-slate-400">
            Product manager building at the frontier. I ship real products, work across the AI stack, and think obsessively about evals, reliability, and what makes AI systems trustworthy.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              View Work
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
