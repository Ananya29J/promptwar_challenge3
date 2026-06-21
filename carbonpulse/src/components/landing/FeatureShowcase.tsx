"use client";

import { Activity, Bot, TrendingDown } from "lucide-react";
import BentoCard from "@/components/shared/BentoCard";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function FeatureShowcase() {
  return (
    <section className="py-32 relative z-10 overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        
        {/* Feature 1: Rings */}
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          <ScrollReveal preset="slideRight" className="flex-1 space-y-6">
            <div className="w-16 h-16 rounded-[1.2rem] bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6">
              <Activity className="w-8 h-8" />
            </div>
            <h3 className="text-3xl md:text-4xl font-black tracking-tight text-stone-800">
              Close Your Climate Rings
            </h3>
            <p className="text-lg text-stone-500 font-medium">
              Build sustainable habits with our Apple Fitness-inspired daily tracking. 
              Monitor your energy, transport, and consumption impacts in real-time.
            </p>
          </ScrollReveal>
          
          <ScrollReveal preset="scale" delay={0.2} className="flex-1 w-full max-w-md mx-auto">
            <BentoCard padding="lg" className="flex justify-center items-center h-80 bg-stone-50">
              {/* Mock Rings SVG */}
              <div className="relative w-48 h-48 drop-shadow-[0_10px_20px_rgba(16,185,129,0.15)]">
                <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                  {/* Energy - Outer */}
                  <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(16,185,129,0.1)" strokeWidth="16" />
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#10b981" strokeWidth="16" strokeDasharray="502" strokeDashoffset="120" strokeLinecap="round" />
                  
                  {/* Transport - Middle */}
                  <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(6,182,212,0.1)" strokeWidth="16" />
                  <circle cx="100" cy="100" r="60" fill="none" stroke="#06b6d4" strokeWidth="16" strokeDasharray="377" strokeDashoffset="150" strokeLinecap="round" />
                  
                  {/* Consumption - Inner */}
                  <circle cx="100" cy="100" r="40" fill="none" stroke="rgba(59,130,246,0.1)" strokeWidth="16" />
                  <circle cx="100" cy="100" r="40" fill="none" stroke="#3b82f6" strokeWidth="16" strokeDasharray="251" strokeDashoffset="40" strokeLinecap="round" />
                </svg>
              </div>
            </BentoCard>
          </ScrollReveal>
        </div>

        {/* Feature 2: AI Coach */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-24">
          <ScrollReveal preset="slideLeft" className="flex-1 space-y-6">
            <div className="w-16 h-16 rounded-[1.2rem] bg-cyan-50 flex items-center justify-center text-cyan-600 mb-6">
              <Bot className="w-8 h-8" />
            </div>
            <h3 className="text-3xl md:text-4xl font-black tracking-tight text-stone-800">
              Your Personal AI Coach
            </h3>
            <p className="text-lg text-stone-500 font-medium">
              Get personalized insights, answers, and actionable plans to reduce your footprint without sacrificing your lifestyle.
            </p>
          </ScrollReveal>
          
          <ScrollReveal preset="scale" delay={0.2} className="flex-1 w-full max-w-md mx-auto">
            <BentoCard padding="md" className="h-80 flex flex-col justify-end space-y-4 bg-stone-50">
              <div className="bg-white border border-stone-200 text-stone-800 self-start max-w-[80%] rounded-[1.5rem] rounded-bl-sm px-4 py-3 text-sm shadow-sm font-medium">
                How can I reduce my transport emissions?
              </div>
              <div className="bg-emerald-100 text-emerald-900 border border-emerald-200 self-end max-w-[80%] rounded-[1.5rem] rounded-br-sm px-4 py-3 text-sm shadow-sm font-medium">
                Based on your habits, switching to cycling twice a week would save 4.2 kg CO₂ weekly! 🚴
              </div>
              <div className="flex gap-2 mt-4 overflow-hidden pt-2">
                <span className="text-xs font-bold text-stone-500 bg-white border border-stone-200 px-4 py-2 rounded-full whitespace-nowrap shadow-sm">Set Goal</span>
                <span className="text-xs font-bold text-stone-500 bg-white border border-stone-200 px-4 py-2 rounded-full whitespace-nowrap shadow-sm">Show Details</span>
              </div>
            </BentoCard>
          </ScrollReveal>
        </div>

        {/* Feature 3: Simulator */}
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          <ScrollReveal preset="slideRight" className="flex-1 space-y-6">
            <div className="w-16 h-16 rounded-[1.2rem] bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
              <TrendingDown className="w-8 h-8" />
            </div>
            <h3 className="text-3xl md:text-4xl font-black tracking-tight text-stone-800">
              Future Simulator
            </h3>
            <p className="text-lg text-stone-500 font-medium">
              Run 'What if' scenarios. See exactly how lifestyle changes impact your carbon emissions, wallet, and the planet over time.
            </p>
          </ScrollReveal>
          
          <ScrollReveal preset="scale" delay={0.2} className="flex-1 w-full max-w-md mx-auto">
            <BentoCard padding="lg" className="h-80 flex flex-col justify-center gap-6 bg-stone-50">
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-stone-700">Current Trajectory</span>
                  <span className="text-stone-500">4.2t CO₂</span>
                </div>
                <div className="h-4 bg-white border border-stone-200 rounded-full overflow-hidden shadow-sm">
                  <div className="h-full bg-stone-300 w-full" />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-emerald-600">+ Solar Panels</span>
                  <span className="text-emerald-600">1.1t CO₂</span>
                </div>
                <div className="h-4 bg-white border border-stone-200 rounded-full overflow-hidden flex shadow-sm">
                  <div className="h-full bg-emerald-400 w-[26%]" />
                  <div className="h-full bg-stone-100 w-[74%]" />
                </div>
              </div>
            </BentoCard>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
