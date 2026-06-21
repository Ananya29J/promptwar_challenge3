"use client";

import { Trees, CloudOff, Droplets, Users } from "lucide-react";
import BentoCard from "@/components/shared/BentoCard";
import ScrollReveal, { StaggerContainer, StaggerChild } from "@/components/shared/ScrollReveal";
import { useAnimatedCounter } from "@/hooks";

function StatCard({ 
  icon: Icon, 
  value, 
  label, 
  suffix = "" 
}: { 
  icon: any; 
  value: number; 
  label: string; 
  suffix?: string 
}) {
  const { count, ref } = useAnimatedCounter(value, 2000, true);

  return (
    <StaggerChild>
      <BentoCard className="flex flex-col items-center text-center group" hoverable>
        <div className="w-16 h-16 rounded-[1.2rem] bg-emerald-50 flex items-center justify-center mb-6 text-emerald-600 group-hover:-translate-y-1 transition-transform duration-300">
          <Icon className="w-7 h-7" />
        </div>
        <div ref={ref} className="text-3xl md:text-4xl font-black text-stone-800 mb-2 tracking-tight">
          {count.toLocaleString()}{suffix}
        </div>
        <div className="text-sm font-bold text-stone-500">
          {label}
        </div>
      </BentoCard>
    </StaggerChild>
  );
}

export default function ImpactStats() {
  const stats = [
    { icon: Trees, value: 2400000, label: "Trees Planted", suffix: "+" },
    { icon: CloudOff, value: 156000, label: "Tons CO₂ Reduced", suffix: "K" }, // Using K as visual suffix, actual number is 156 but we want 156K visual, let's pass 156 and suffix "K"
    { icon: Droplets, value: 890, label: "Million Liters Saved", suffix: "M" },
    { icon: Users, value: 1200000, label: "Active Users", suffix: "+" },
  ];

  // Adjust values for display
  stats[1].value = 156;
  stats[3].value = 1200000;

  return (
    <section className="py-24 relative z-10 bg-[#FAF9F6] border-y border-stone-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal preset="fadeUp" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-stone-800 tracking-tight">Our Collective Impact</h2>
          <p className="text-stone-500 max-w-2xl mx-auto font-medium">
            Small individual actions compound into massive global change. Join the movement.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          <StatCard icon={Trees} value={2400000} suffix="+" label="Trees Planted" />
          <StatCard icon={CloudOff} value={156} suffix="K Tons" label="CO₂ Reduced" />
          <StatCard icon={Droplets} value={890} suffix="M Liters" label="Water Saved" />
          <StatCard icon={Users} value={1200000} suffix="+" label="Active Users" />
        </StaggerContainer>
      </div>
    </section>
  );
}
