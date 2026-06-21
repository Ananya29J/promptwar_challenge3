"use client";

import { motion } from "motion/react";
import { getClimateRings } from "@/lib/carbon-data";
import BentoCard from "@/components/shared/BentoCard";
import { Zap, Car, ShoppingBag } from "lucide-react";

export default function ClimateRings({ ringsOverride }: { ringsOverride?: { energy: number, transport: number, consumption: number } }) {
  const rings = ringsOverride ?? getClimateRings();
  const overall = Math.round((rings.energy + rings.transport + rings.consumption) / 3);

  const ringConfigs = [
    { value: rings.energy, color: "#10b981", radius: 80, name: "Energy", icon: Zap }, // emerald-500
    { value: rings.transport, color: "#06b6d4", radius: 60, name: "Transport", icon: Car }, // cyan-500
    { value: rings.consumption, color: "#3b82f6", radius: 40, name: "Consumption", icon: ShoppingBag }, // blue-500
  ];

  return (
    <BentoCard padding="xl" className="flex flex-col items-center h-full">
      <h3 className="text-xl font-black text-stone-800 mb-8 self-start tracking-tight">Impact Rings</h3>
      
      <div className="relative flex justify-center items-center w-64 h-64 mb-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.05)]">
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full -rotate-90">
          {ringConfigs.map((ring, i) => {
            const circumference = 2 * Math.PI * ring.radius;
            const offset = circumference - (ring.value / 100) * circumference;
            return (
              <g key={ring.name}>
                {/* Background Ring */}
                <circle
                  cx="100"
                  cy="100"
                  r={ring.radius}
                  fill="none"
                  stroke={ring.color}
                  strokeOpacity="0.1"
                  strokeWidth="16"
                />
                {/* Foreground Ring */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r={ring.radius}
                  fill="none"
                  stroke={ring.color}
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: offset }}
                  transition={{ duration: 2.5, delay: i * 0.3, type: "spring", bounce: 0.2 }}
                />
              </g>
            );
          })}
        </svg>

        {/* Center Overall Score */}
        <motion.div 
          className="absolute flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <span className="text-5xl font-black text-stone-800 tracking-tighter">{overall}%</span>
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest mt-1">Overall</span>
        </motion.div>
      </div>

      {/* Legend */}
      <div className="w-full space-y-3 mt-auto">
        {ringConfigs.map((ring) => (
          <div key={ring.name} className="flex items-center justify-between bg-stone-50 rounded-2xl p-3 border border-stone-100 transition-colors hover:bg-stone-100/50">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-opacity-20 shadow-sm"
                style={{ backgroundColor: `${ring.color}15`, color: ring.color }}
              >
                <ring.icon className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-stone-700">{ring.name}</span>
            </div>
            <span className="text-base font-black" style={{ color: ring.color }}>{ring.value}%</span>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
