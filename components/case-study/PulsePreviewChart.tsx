"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  date: string;
  jobOpenings: number;
  unemploymentRate: number;
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number; dataKey: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-[#0d1326] px-4 py-3 shadow-xl">
      <p className="mb-2 text-[13px] font-medium text-white/70">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="text-[13px] font-semibold" style={{ color: entry.dataKey === "jobOpenings" ? "#00c896" : "#f59e0b" }}>
          {entry.dataKey === "jobOpenings" ? "Job Openings" : "Unemployment Rate"}:{" "}
          {entry.dataKey === "jobOpenings" ? `${entry.value}M` : `${entry.value}%`}
        </p>
      ))}
    </div>
  );
}

export function PulsePreviewChart() {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    fetch("/data/fred-snapshot.json")
      .then((res) => res.json())
      .then((json: DataPoint[]) => setData(json));
  }, []);

  if (data.length === 0) {
    return (
      <div className="flex h-[350px] items-center justify-center rounded-2xl border border-white/5 bg-white/[0.02]">
        <p className="text-sm text-muted-foreground">Loading chart data...</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 md:p-6">
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis
            dataKey="date"
            tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
            interval={5}
          />
          <YAxis
            yAxisId="left"
            tick={{ fill: "#00c896", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v: number) => `${v}M`}
            domain={[5, 13]}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fill: "#f59e0b", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v: number) => `${v}%`}
            domain={[2, 8]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="jobOpenings"
            stroke="#00c896"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "#00c896" }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="unemploymentRate"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "#f59e0b" }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4 flex items-center gap-6 border-t border-white/5 pt-4">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#00c896]" />
          <span className="text-[12px] text-white/50">Job Openings (M)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" />
          <span className="text-[12px] text-white/50">Unemployment Rate (%)</span>
        </div>
      </div>
    </div>
  );
}
