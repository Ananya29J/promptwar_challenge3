"use client";

import { useState } from "react";
import { defaultScenarios, calculateSimulation } from "@/lib/scenarios";
import BentoCard from "@/components/shared/BentoCard";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { DollarSign, Trees, CloudOff, Calculator, ArrowRight, Info } from "lucide-react";
import { useAnimatedCounter } from "@/hooks";

export default function SimulatorPage() {
  const [activeScenarios, setActiveScenarios] = useState<string[]>([]);

  const toggleScenario = (id: string) => {
    setActiveScenarios(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const results = calculateSimulation(activeScenarios);
  const categories = Array.from(new Set(defaultScenarios.map(s => s.category)));

  const { count: co2Count } = useAnimatedCounter(results.totalCarbonSaved, 1500, true);
  const { count: moneyCount } = useAnimatedCounter(results.totalMoneySaved, 1500, true);
  const { count: treesCount } = useAnimatedCounter(results.totalTreesEquivalent, 1500, true);
  const { count: projectedScore } = useAnimatedCounter(results.projectedScore, 1500, true);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 bg-transparent text-stone-800">
      {/* Header and Context */}
      <div className="flex flex-col gap-6 border-b border-stone-200 pb-8">
        <div>
          <h1 className="text-4xl font-black text-stone-800 mb-3 tracking-tight flex items-center gap-3">
            <Calculator className="w-10 h-10 text-emerald-500" />
            Impact Forecaster
          </h1>
          <p className="text-xl text-stone-500 font-medium max-w-3xl">
            Simulate how different lifestyle changes affect your carbon footprint, your wallet, and your overall CarbonPulse score.
          </p>
        </div>
        <BentoCard padding="sm" className="bg-emerald-50/50 border border-emerald-100 max-w-4xl">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-stone-600 leading-relaxed">
              <strong className="text-stone-800">How to use this tool:</strong> Below is a list of potential lifestyle changes or investments (like switching to a plant-based diet or buying an EV). Click on any card to toggle that scenario <span className="font-bold text-emerald-600">"ON"</span>. The Receipt Panel on the right will instantly calculate your projected annual savings and update your 5-year forecast.
            </p>
          </div>
        </BentoCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Scenarios List (Left) */}
        <div className="lg:col-span-7 space-y-10">
          {categories.map(category => (
            <div key={category} className="space-y-4">
              <h2 className="text-2xl font-black text-stone-800 capitalize tracking-tight flex items-center gap-2">
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {defaultScenarios.filter(s => s.category === category).map(scenario => {
                  const isActive = activeScenarios.includes(scenario.id);
                  return (
                    <motion.div
                      key={scenario.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <button
                        onClick={() => toggleScenario(scenario.id)}
                        className={cn(
                          "w-full text-left p-6 rounded-[2rem] border transition-all duration-300 relative overflow-hidden h-full flex flex-col justify-between",
                          isActive 
                            ? "bg-white border-emerald-400 shadow-[0_8px_30px_rgba(16,185,129,0.15)] ring-1 ring-emerald-400" 
                            : "bg-white border-stone-200 hover:border-emerald-200 shadow-sm"
                        )}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className={cn(
                            "w-14 h-14 rounded-[1.2rem] flex items-center justify-center text-2xl shrink-0 transition-colors",
                            isActive ? "bg-emerald-100 text-emerald-600" : "bg-stone-50 text-stone-600 border border-stone-100"
                          )}>
                            {scenario.icon}
                          </div>
                          <div className={cn(
                            "px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider transition-colors",
                            isActive ? "bg-emerald-500 text-white shadow-sm" : "bg-stone-100 text-stone-400"
                          )}>
                            {isActive ? "Active" : "Add"}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-black text-lg text-stone-800 leading-tight mb-2">
                            {scenario.title}
                          </h3>
                          <p className="text-sm font-medium text-stone-500 mb-4 line-clamp-2">{scenario.description}</p>
                          
                          <div className="flex flex-wrap gap-2 text-xs font-bold pt-4 border-t border-stone-100">
                            <span className="bg-stone-50 text-emerald-600 border border-stone-100 px-2.5 py-1 rounded-md">-{scenario.carbonSavings} kg CO₂</span>
                            <span className="bg-stone-50 text-emerald-600 border border-stone-100 px-2.5 py-1 rounded-md">+${scenario.moneySaved}</span>
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Results Panel (Right) */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-24 space-y-6">
            <BentoCard padding="xl" className="bg-stone-800 text-white shadow-xl border-none">
              <h3 className="text-2xl font-black mb-8 text-white tracking-tight flex items-center gap-3">
                <CloudOff className="w-6 h-6 text-emerald-400" />
                Annual Impact Receipt
              </h3>
              
              <div className="space-y-8">
                <div className="flex flex-col gap-2 pb-6 border-b border-stone-700">
                  <div className="flex items-center gap-2 text-stone-400 font-bold uppercase tracking-widest text-xs">
                    Carbon Avoided
                  </div>
                  <div className="text-5xl font-black text-white tracking-tight">
                    {co2Count.toLocaleString()} <span className="text-2xl text-stone-400 font-bold">kg</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pb-6 border-b border-stone-700">
                  <div className="flex items-center gap-2 text-stone-400 font-bold uppercase tracking-widest text-xs">
                    Money Saved
                  </div>
                  <div className="text-5xl font-black text-emerald-400 tracking-tight">
                    ${moneyCount.toLocaleString()}
                  </div>
                </div>

                <div className="flex flex-col gap-2 pb-6 border-b border-stone-700">
                  <div className="flex items-center gap-2 text-stone-400 font-bold uppercase tracking-widest text-xs">
                    Trees Equivalent
                  </div>
                  <div className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
                    {treesCount.toLocaleString()} 
                    <Trees className="w-8 h-8 text-emerald-400" />
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold text-stone-400 uppercase tracking-widest">Projected Score</span>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-stone-500 line-through">0</span>
                    <ArrowRight className="w-4 h-4 text-emerald-500" />
                    <span className="text-3xl font-black text-white">{projectedScore}</span>
                  </div>
                </div>
                <div className="h-3 bg-stone-700 rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400"
                    initial={{ width: "0%" }}
                    animate={{ width: `${projectedScore}%` }}
                    transition={{ type: "spring", bounce: 0 }}
                  />
                </div>
              </div>
            </BentoCard>

            {/* Projection Graph */}
            <BentoCard padding="lg" className="bg-white">
              <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-6">5-Year Cumulative CO₂ Savings</h3>
              <div className="h-48 flex items-end justify-between gap-3">
                {results.yearlyProjection.map((val, i) => {
                  const max = Math.max(...results.yearlyProjection, 1);
                  const height = (val / max) * 100;
                  return (
                    <div key={i} className="relative flex-1 group flex flex-col items-center gap-3">
                      <div className="absolute -top-12 bg-stone-800 text-white text-xs py-1.5 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl font-bold">
                        {val.toLocaleString()} kg
                      </div>
                      <motion.div
                        className="w-full bg-emerald-100 rounded-t-xl group-hover:bg-emerald-300 transition-colors border-t-2 border-emerald-400"
                        initial={{ height: "0%" }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      />
                      <span className="text-xs text-stone-500 font-black">Yr {i+1}</span>
                    </div>
                  );
                })}
              </div>
            </BentoCard>
          </div>
        </div>
      </div>
    </div>
  );
}
