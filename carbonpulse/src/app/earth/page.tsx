"use client";

import { motion } from "motion/react";
import EarthIllustration from "@/components/landing/EarthIllustration";
import BentoCard from "@/components/shared/BentoCard";
import { getUserProfile } from "@/lib/carbon-data";
import {
  TreePine,
  Wind,
  Droplets,
  Sun,
  Globe,
  Sparkles,
  Thermometer,
  CloudOff,
} from "lucide-react";
import { useAnimatedCounter } from "@/hooks";

const ecosystemStats = [
  {
    id: "health",
    label: "Core Health",
    value: 85,
    unit: "/ 100",
    icon: TreePine,
    color: "emerald",
  },
  {
    id: "air",
    label: "Air Quality",
    value: 92,
    unit: "AQI",
    icon: Wind,
    color: "cyan",
  },
  {
    id: "water",
    label: "Oceans",
    value: 78,
    unit: "pH",
    icon: Droplets,
    color: "blue",
  },
  {
    id: "temp",
    label: "Temperature",
    value: 1.2,
    unit: "°C",
    icon: Sun,
    color: "amber",
  },
];

const colorMap: Record<string, { bg: string; text: string; bar: string }> = {
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600", bar: "bg-emerald-400" },
  cyan: { bg: "bg-cyan-50", text: "text-cyan-600", bar: "bg-cyan-400" },
  blue: { bg: "bg-blue-50", text: "text-blue-600", bar: "bg-blue-400" },
  amber: { bg: "bg-orange-50", text: "text-orange-600", bar: "bg-orange-400" },
};

export default function EarthPage() {
  const profile = getUserProfile();
  const overallHealth = 85;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-[1rem] bg-emerald-100 flex items-center justify-center shadow-sm border border-emerald-200">
            <Globe className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-stone-800 tracking-tight">
              Your Living Earth
            </h1>
            <p className="text-stone-500 font-medium">
              Your digital ecosystem evolving with your actions.
            </p>
          </div>
        </div>
        <BentoCard padding="sm" className="bg-white max-w-sm">
          <p className="text-xs text-stone-500 font-medium leading-relaxed">
            <span className="font-bold text-emerald-600">Context:</span> This visualization is a dynamic representation of your collective sustainability impact. Your daily habits—like reducing emissions and saving water—directly influence the health, temperature, and vibrancy of this digital earth in real-time.
          </p>
        </BentoCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Panel: Earth Visualization */}
        <div className="lg:col-span-8 flex flex-col h-full space-y-8">
          <BentoCard padding="none" className="relative w-full h-[500px] flex items-center justify-center bg-[#FAF9F6] shadow-sm overflow-hidden">
             <EarthIllustration />
             <div className="absolute top-6 left-6 right-6 flex justify-between items-center bg-white/80 backdrop-blur-md px-6 py-4 rounded-[1.5rem] shadow-sm border border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-bold text-stone-700">Live Sync Active</span>
                </div>
                <div className="flex items-center gap-4 text-sm font-bold text-stone-600">
                  <span className="flex items-center gap-1.5"><Thermometer className="w-4 h-4 text-orange-500" /> +1.2°C</span>
                  <span className="flex items-center gap-1.5"><Wind className="w-4 h-4 text-cyan-500" /> 419 ppm</span>
                </div>
              </div>
          </BentoCard>

          {/* Ecosystem Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ecosystemStats.map((stat, i) => {
              const colors = colorMap[stat.color];
              return (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <BentoCard padding="sm" hoverable>
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-8 h-8 rounded-[1rem] ${colors.bg} flex items-center justify-center`}>
                        <stat.icon className={`w-4 h-4 ${colors.text}`} />
                      </div>
                      <span className="text-xs font-bold text-stone-500">
                        {stat.label}
                      </span>
                    </div>
                    <div className="flex items-end gap-1 mb-2">
                      <span className={`text-2xl font-black ${colors.text}`}>
                        {stat.value}
                      </span>
                      <span className="text-xs font-bold text-stone-400 mb-1">
                        {stat.unit}
                      </span>
                    </div>
                    <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${colors.bar}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.id === 'temp' ? 20 : stat.value}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </BentoCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Data and Actions */}
        <div className="lg:col-span-4 space-y-6">
          <BentoCard padding="lg">
             <h3 className="text-xl font-bold text-stone-800 mb-6">Recent Changes</h3>
             <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-[1.5rem] bg-stone-50">
                  <div className="w-10 h-10 rounded-[1rem] bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <TreePine className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-stone-500">Forests</div>
                    <div className="text-lg font-black text-stone-800">Flourishing</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-[1.5rem] bg-stone-50">
                  <div className="w-10 h-10 rounded-[1rem] bg-cyan-100 flex items-center justify-center text-cyan-600">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-stone-500">Oceans</div>
                    <div className="text-lg font-black text-stone-800">Stabilizing</div>
                  </div>
                </div>
             </div>
          </BentoCard>

          <BentoCard padding="lg" className="bg-emerald-500 text-white shadow-[0_10px_40px_rgba(34,197,94,0.3)]">
            <h3 className="font-bold mb-2">Global Impact Goal</h3>
            <p className="text-emerald-50 text-sm mb-4 font-medium">
              Join 1.2M users in reducing global temperatures by 1.5°C before 2030.
            </p>
            <div className="h-3 bg-emerald-900/20 rounded-full overflow-hidden shadow-inner">
              <motion.div 
                className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                initial={{ width: 0 }}
                animate={{ width: "65%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between text-xs text-emerald-100 mt-3 font-bold">
              <span>Current: 65%</span>
              <span>Target: 100%</span>
            </div>
          </BentoCard>
        </div>
      </div>
    </div>
  );
}
