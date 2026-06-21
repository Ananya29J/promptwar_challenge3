"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { generateDailyData, generateWeeklyData, generateMonthlyData } from "@/lib/carbon-data";
import BentoCard from "@/components/shared/BentoCard";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

type TimeRange = "Daily" | "Weekly" | "Monthly";

export default function CarbonTimeline() {
  const [range, setRange] = useState<TimeRange>("Daily");

  // Memoize data generation so it doesn't shift on every re-render
  const { dailyData, weeklyData, monthlyData } = useMemo(() => ({
    dailyData: generateDailyData(30),
    weeklyData: generateWeeklyData(12),
    monthlyData: generateMonthlyData(6)
  }), []);

  const data = useMemo(() => {
    switch (range) {
      case "Weekly": return weeklyData.map(d => ({ label: d.weekStart.slice(5), value: d.total }));
      case "Monthly": return monthlyData.map(d => ({ label: d.month, value: d.total }));
      case "Daily":
      default: return dailyData.map(d => ({ label: d.date.slice(5), value: d.total }));
    }
  }, [range, dailyData, weeklyData, monthlyData]);

  const maxValue = Math.max(...data.map(d => d.value)) * 1.1; // Add 10% headroom

  const pathData = useMemo(() => {
    const width = 800;
    const height = 200;
    const points = data.map((d, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - (d.value / maxValue) * height;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    }).join(" ");
    return points;
  }, [data, maxValue]);

  const areaData = useMemo(() => {
    return `${pathData} L 800 200 L 0 200 Z`;
  }, [pathData]);

  return (
    <BentoCard className="flex flex-col w-full h-[400px]" padding="lg">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-semibold text-stone-800">Carbon Timeline</h3>
        <div className="flex bg-stone-100 rounded-lg p-1 border border-stone-200 shadow-inner">
          {(["Daily", "Weekly", "Monthly"] as TimeRange[]).map((t) => (
            <button
              key={t}
              onClick={() => setRange(t)}
              className={cn(
                "px-3 py-1 text-sm rounded-md transition-colors relative z-10",
                range === t ? "text-stone-800" : "text-stone-500 hover:text-stone-700"
              )}
            >
              {range === t && (
                <motion.div
                  layoutId="timelineTab"
                  className="absolute inset-0 bg-white border border-stone-200 rounded-md -z-10 shadow-sm"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 relative flex items-end">
        <svg viewBox="0 0 800 200" className="w-full h-full overflow-visible preserve-3d">
          <motion.path
            d={areaData}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fill-emerald-500/10"
          />
          <motion.path
            d={pathData}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-emerald-500"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </svg>
      </div>
      <div className="flex justify-between mt-3 text-xs font-medium text-stone-500">
        <span>{data[0]?.label}</span>
        <span>{data[Math.floor(data.length/2)]?.label}</span>
        <span>{data[data.length-1]?.label}</span>
      </div>
    </BentoCard>
  );
}
