"use client";

import { motion } from "motion/react";
import { getCurrentScore } from "@/lib/carbon-data";
import BentoCard from "@/components/shared/BentoCard";
import { useAnimatedCounter } from "@/hooks";
import { TrendingDown, Flame } from "lucide-react";

export default function CarbonScore({ scoreOverride }: { scoreOverride?: number }) {
  const baseScore = getCurrentScore();
  const score = { ...baseScore, current: scoreOverride ?? baseScore.current };
  const { count, ref } = useAnimatedCounter(score.current, 2500, true);

  return (
    <BentoCard padding="xl" className="flex flex-col items-center h-full">
      <div className="relative flex justify-center items-center w-48 h-48 mb-6">
        {/* Pulsing glow behind */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Ring */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full -rotate-90">
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" /> {/* emerald-500 */}
              <stop offset="100%" stopColor="#06b6d4" /> {/* cyan-500 */}
            </linearGradient>
          </defs>
          <circle 
            cx="100" cy="100" r="90" 
            fill="none" 
            stroke="rgba(0,0,0,0.03)" 
            strokeWidth="8" 
          />
          <motion.circle 
            cx="100" cy="100" r="90" 
            fill="none" 
            stroke="url(#scoreGradient)" 
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={565.48}
            initial={{ strokeDashoffset: 565.48 }}
            animate={{ strokeDashoffset: 565.48 - (565.48 * score.current) / 100 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
          />
        </svg>

        {/* Score Number */}
        <div ref={ref} className="relative z-10 flex flex-col items-center">
          <span className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-cyan-400">
            {count}
          </span>
          <span className="text-sm font-medium text-stone-500 uppercase tracking-widest mt-1">Score</span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 w-full">
        {/* Rank Badge */}
        <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-widest shadow-sm">
          {score.rank.replace("-", " ")} 🌱
        </div>

        {/* Metrics Row */}
        <div className="flex gap-4 w-full mt-2">
          <div className="flex-1 bg-stone-50 rounded-xl p-3 flex flex-col items-center border border-stone-100">
            <span className="text-xs text-stone-500 mb-1">Trend</span>
            <span className="flex items-center text-emerald-500 font-medium text-sm gap-1">
              <TrendingDown className="w-4 h-4" />
              {score.improvement}%
            </span>
          </div>
          <div className="flex-1 bg-stone-50 rounded-xl p-3 flex flex-col items-center border border-stone-100">
            <span className="text-xs text-stone-500 mb-1">Streak</span>
            <span className="flex items-center text-orange-400 font-medium text-sm gap-1">
              <Flame className="w-4 h-4" />
              {score.streak} days
            </span>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}
