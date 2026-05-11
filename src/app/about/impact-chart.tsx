"use client";
import { useState, useEffect } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useLanguage } from "@/lib/language-provider";

const data = [
  { year: "2019", donations: 400000, impact: 2400 },
  { year: "2020", donations: 600000, impact: 3600 },
  { year: "2021", donations: 900000, impact: 5800 },
  { year: "2022", donations: 1200000, impact: 8000 },
  { year: "2023", donations: 1800000, impact: 12500 },
  { year: "2024", donations: 2400000, impact: 15000 },
  { year: "2025", donations: 3200000, impact: 20000 },
  { year: "2026", donations: 4500000, impact: 28000 },
];

export default function ImpactChart() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  if (!mounted) {
    return (
      <div className="w-full" style={{ height: 400, minWidth: 0 }}>
        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
          <div className="animate-pulse text-lg font-medium">Loading chart...</div>
        </div>
      </div>
    );
  }

  // Use bright, high-contrast colors based on theme
  const strokeColor = "#10b981";
  const gridColor = isDark ? "#334155" : "#e2e8f0";
  const tickColor = isDark ? "#94a3b8" : "#64748b";
  const tooltipBg = isDark ? "#1e293b" : "#ffffff";
  const tooltipBorder = isDark ? "#475569" : "#e2e8f0";
  const dotStroke = isDark ? "#0f172a" : "#ffffff";

  return (
    <div className="w-full" style={{ height: 400, minWidth: 0 }}>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorDonationsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.5} />
              <stop offset="50%" stopColor="#10b981" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
          <XAxis
            dataKey="year"
            axisLine={false}
            tickLine={false}
            tick={{ fill: tickColor, fontSize: 13, fontWeight: 600 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: tickColor, fontSize: 12, fontWeight: 500 }}
            tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
            dx={-10}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBg,
              borderColor: tooltipBorder,
              borderRadius: "0.75rem",
              padding: "12px 16px",
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3)",
              color: isDark ? "#f1f5f9" : "#1e293b",
            }}
            labelStyle={{ color: tickColor, fontWeight: 600, marginBottom: 4 }}
            itemStyle={{ color: "#10b981", fontWeight: 700 }}
            formatter={(value) => [`₹${Number(value).toLocaleString()}`, t("Donations Raised")]}
          />
          <Area
            type="monotone"
            dataKey="donations"
            stroke={strokeColor}
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorDonationsGrad)"
            dot={{ r: 5, fill: "#10b981", strokeWidth: 3, stroke: dotStroke }}
            activeDot={{ r: 8, fill: "#10b981", strokeWidth: 3, stroke: dotStroke }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
