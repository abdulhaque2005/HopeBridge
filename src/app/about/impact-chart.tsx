"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Translate } from "@/components/translate";
import { useLanguage } from "@/lib/language-provider";

const data = [
  { year: "2019", donations: 400000, impact: 2400 },
  { year: "2020", donations: 600000, impact: 3600 },
  { year: "2021", donations: 900000, impact: 5800 },
  { year: "2022", donations: 1200000, impact: 8000 },
  { year: "2023", donations: 1800000, impact: 12500 },
  { year: "2024", donations: 2400000, impact: 15000 },
];

export default function ImpactChart() {
  const { t } = useLanguage();

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis
            dataKey="year"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))" }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))" }}
            tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
            dx={-10}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              borderColor: "hsl(var(--border))",
              borderRadius: "0.5rem"
            }}
            formatter={(value) => [`₹${Number(value).toLocaleString()}`, t("Donations Raised")]}
          />
          <Area
            type="monotone"
            dataKey="donations"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorDonations)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
