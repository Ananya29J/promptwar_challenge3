"use client";

import { motion } from "motion/react";
import { getUserProfile } from "@/lib/carbon-data";
import BentoCard from "@/components/shared/BentoCard";
import { Heart, Droplet, Sun, Sprout } from "lucide-react";
import { cn } from "@/lib/utils";

export default function EcoTwin({ healthOverride }: { healthOverride?: number }) {
  const profile = getUserProfile();
  const health = healthOverride ?? profile.ecoTwinHealth; // 0-100

  // Derive visuals from health
  const stage = health > 80 ? 3 : health > 40 ? 2 : health > 0 ? 1 : 0;
  const statusText = 
    stage === 3 ? "Thriving Ecosystem" : 
    stage === 2 ? "Growing Steady" : 
    stage === 1 ? "Just Sprouted" : 
    "Waiting for Impact";

  const colorClass = 
    stage === 3 ? "text-emerald-500" : 
    stage === 2 ? "text-teal-500" : 
    stage === 1 ? "text-cyan-500" : 
    "text-stone-400";

  return (
    <BentoCard padding="xl" className="flex flex-col items-center justify-between h-full relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-50 via-white to-white" />
      
      <div className="w-full flex justify-between items-start mb-8 relative z-10">
        <div>
          <h3 className="text-xl font-black text-stone-800 tracking-tight flex items-center gap-2">
            Eco Twin <Sprout className={cn("w-5 h-5", colorClass)} />
          </h3>
          <p className="text-sm font-bold text-stone-500">{statusText}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-50 rounded-full border border-stone-200 shadow-sm">
            <Heart className={cn("w-4 h-4", colorClass)} fill="currentColor" />
            <span className="text-sm font-black text-stone-700">{health}/100</span>
          </div>
        </div>
      </div>

      <div className="relative w-56 h-56 flex items-center justify-center z-10 mb-8 mx-auto bg-stone-50 rounded-full shadow-[inset_0_4px_20px_rgba(0,0,0,0.03)] border border-stone-100">
        {/* Abstract Terrarium Dome */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full drop-shadow-sm pointer-events-none">
          <path d="M 40 160 C 40 60, 160 60, 160 160 Z" fill="rgba(255,255,255,0.5)" stroke="#f5f5f4" strokeWidth="2" />
          <ellipse cx="100" cy="160" rx="60" ry="15" fill="#f5f5f4" />
        </svg>

        {/* Dynamic Abstract Plant inside Terrarium */}
        <svg viewBox="0 0 200 200" className="w-full h-full relative z-10 drop-shadow-lg">
          {/* Stem */}
          <motion.path 
            d="M 100 160 Q 95 130 100 100" 
            fill="none" 
            stroke={stage >= 1 ? "#34d399" : "#e2e8f0"} 
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: stage >= 1 ? 1 : 0.2 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          
          {/* Leaves based on stage */}
          {stage >= 2 && (
             <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: "spring" }} style={{ transformOrigin: "100px 120px" }}>
               <path d="M 100 120 Q 80 110 70 120 Q 80 130 100 120" fill="#10b981" />
             </motion.g>
          )}
          {stage >= 2 && (
             <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7, type: "spring" }} style={{ transformOrigin: "100px 110px" }}>
               <path d="M 100 110 Q 120 100 130 110 Q 120 120 100 110" fill="#059669" />
             </motion.g>
          )}
          {stage >= 3 && (
             <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: "spring" }} style={{ transformOrigin: "100px 90px" }}>
               <path d="M 100 90 Q 70 70 60 90 Q 70 110 100 90" fill="#34d399" />
             </motion.g>
          )}
          {stage >= 3 && (
             <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2, type: "spring" }} style={{ transformOrigin: "100px 95px" }}>
               <path d="M 100 95 Q 130 75 140 95 Q 130 115 100 95" fill="#10b981" />
             </motion.g>
          )}
          
          {/* Top Sprout / Bloom */}
          {stage >= 1 && (
            <motion.circle 
              cx="100" cy="95" r="8" fill="#10b981"
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5, type: "spring" }}
            />
          )}
          {stage === 0 && (
             <circle cx="100" cy="155" r="5" fill="#cbd5e1" />
          )}

          {/* Ambient Particles */}
          {stage >= 2 && [1,2,3].map(i => (
             <motion.circle 
                key={i} cx={80 + i*20} cy={140} r="2" fill="#34d399"
                animate={{ y: [0, -20, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 2+i, repeat: Infinity, delay: i*0.5 }}
             />
          ))}
        </svg>

        {/* Aura glow */}
        {stage >= 3 && (
          <div className="absolute inset-0 bg-emerald-400/20 blur-3xl rounded-full mix-blend-multiply animate-pulse" />
        )}
      </div>

      <div className="w-full relative z-10">
        <div className="flex justify-between items-center mb-4 text-xs font-bold text-stone-400">
          <div className="flex items-center gap-1.5"><Droplet className="w-3.5 h-3.5" /> Watering (Habits)</div>
          <div className="flex items-center gap-1.5"><Sun className="w-3.5 h-3.5" /> Sunlight (Action)</div>
        </div>
        <div className="h-3 bg-stone-100 rounded-full overflow-hidden shadow-inner">
          <motion.div 
            className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400"
            initial={{ width: 0 }}
            animate={{ width: `${health}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </BentoCard>
  );
}
