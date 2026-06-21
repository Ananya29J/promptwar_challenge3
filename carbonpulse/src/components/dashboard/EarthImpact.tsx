"use client";

import { getCollectiveImpact } from "@/lib/carbon-data";
import { formatNumber } from "@/lib/scenarios";
import BentoCard from "@/components/shared/BentoCard";
import { Trees, Droplets, CloudOff } from "lucide-react";
import { useAnimatedCounter } from "@/hooks";
import { StaggerContainer, StaggerChild } from "@/components/shared/ScrollReveal";

function ImpactCard({ 
  icon: Icon, 
  value, 
  label, 
  unit, 
  colorClass 
}: { 
  icon: any; 
  value: number; 
  label: string; 
  unit?: string;
  colorClass: string;
}) {
  const { count, ref } = useAnimatedCounter(value, 2000, true);

  return (
    <StaggerChild>
      <BentoCard hoverable className="flex items-center gap-4 group">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <div className="text-sm font-medium text-stone-500">{label}</div>
          <div ref={ref} className="text-2xl font-bold text-stone-800 flex items-baseline gap-1">
            {count.toLocaleString()}
            {unit && <span className="text-sm font-normal text-stone-500 ml-1">{unit}</span>}
          </div>
        </div>
      </BentoCard>
    </StaggerChild>
  );
}

export default function EarthImpact() {
  const impact = getCollectiveImpact();

  return (
    <div className="w-full">
      <h3 className="text-sm font-medium text-stone-500 mb-4 uppercase tracking-wider">Collective Global Impact</h3>
      
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ImpactCard 
          icon={Trees} 
          value={impact.treesSaved} 
          label="Trees Saved" 
          colorClass="bg-emerald-500/20 text-emerald-500 border border-emerald-500/30"
        />
        <ImpactCard 
          icon={Droplets} 
          value={impact.waterConserved} 
          label="Water Conserved" 
          unit="Liters"
          colorClass="bg-cyan-500/20 text-cyan-500 border border-cyan-500/30"
        />
        <ImpactCard 
          icon={CloudOff} 
          value={impact.co2Reduced} 
          label="CO₂ Reduced" 
          unit="Tons"
          colorClass="bg-blue-500/20 text-blue-500 border border-blue-500/30"
        />
      </StaggerContainer>
    </div>
  );
}
