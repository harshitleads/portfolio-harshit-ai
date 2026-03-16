"use client";

import { useEffect, useState } from "react";
import { Smartphone, Monitor } from "lucide-react";

export function DeviceSplitBar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div>
      <div className="flex h-12 overflow-hidden rounded-lg">
        <div
          className="flex items-center justify-center gap-1.5 border-r border-emerald-500/20 bg-emerald-500/20 transition-all duration-700"
          style={{ width: mounted ? "78%" : "0%" }}
        >
          <Smartphone size={13} className="text-emerald-400" />
          <span className="text-[13px] font-semibold text-white">78% Mobile</span>
        </div>
        <div
          className="flex items-center justify-center gap-1.5 bg-white/[0.04] transition-all duration-700"
          style={{ width: mounted ? "22%" : "0%" }}
        >
          <Monitor size={13} className="text-slate-400" />
          <span className="text-[13px] font-semibold text-slate-400">22% Desktop</span>
        </div>
      </div>
      <p className="mt-2 text-[13px] text-slate-400">204 direct &middot; 26 LinkedIn &middot; 20 Instagram &middot; zero paid distribution</p>
    </div>
  );
}
