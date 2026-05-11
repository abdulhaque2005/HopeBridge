"use client";

import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useLanguage } from "@/lib/language-provider";

const CHART_COLORS = ["#10b981", "#3b82f6", "#f59e0b"];

const data = [
  { name: "Program Spending", value: 90 },
  { name: "Admin Costs", value: 7 },
  { name: "Fundraising", value: 3 },
];

export function TransparencyChart() {
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

  const translatedData = data.map(item => ({
    ...item,
    name: t(item.name)
  }));

  if (!mounted) {
    return (
      <div className="w-full" style={{ height: 400 }}>
        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
          <div className="animate-pulse text-lg font-medium">Loading chart...</div>
        </div>
      </div>
    );
  }

  const tooltipBg = isDark ? "#1e293b" : "#ffffff";
  const tooltipBorder = isDark ? "#475569" : "#e2e8f0";
  const legendColor = isDark ? "#94a3b8" : "#64748b";

  return (
    <div className="w-full" style={{ height: 400 }}>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={translatedData}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={140}
            paddingAngle={5}
            dataKey="value"
          >
            {translatedData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={CHART_COLORS[index]} strokeWidth={0} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: tooltipBg, 
              borderColor: tooltipBorder,
              borderRadius: "1rem",
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3)",
              padding: "12px 16px",
              color: isDark ? "#f1f5f9" : "#1e293b",
            }}
            formatter={(value) => [`${value}%`, t("Allocation")]}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value) => <span style={{ color: legendColor, fontSize: 14, fontWeight: 600 }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
