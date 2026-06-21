// ============================================
// CarbonPulse — Simulator Scenario Calculations
// ============================================

import type { Scenario, SimulationResult } from "@/types";

export const defaultScenarios: Scenario[] = [
  // --- Transport ---
  {
    id: "public-transport",
    category: "transport",
    title: "Switch to Public Transport",
    description: "Replace car commute with bus/train",
    icon: "🚇",
    currentValue: 5,
    proposedValue: 2,
    unit: "car trips/week",
    carbonSavings: 1820, // kg CO₂/year
    moneySaved: 3200,
    treesEquivalent: 83,
  },
  {
    id: "cycling",
    category: "transport",
    title: "Cycle for Short Trips",
    description: "Bike for trips under 5km",
    icon: "🚲",
    currentValue: 0,
    proposedValue: 4,
    unit: "cycling trips/week",
    carbonSavings: 520,
    moneySaved: 890,
    treesEquivalent: 24,
  },
  {
    id: "electric-vehicle",
    category: "transport",
    title: "Switch to Electric Vehicle",
    description: "Replace gasoline car with EV",
    icon: "🔋",
    currentValue: 1,
    proposedValue: 0,
    unit: "gasoline vehicles",
    carbonSavings: 2400,
    moneySaved: 1800,
    treesEquivalent: 109,
  },

  // --- Energy ---
  {
    id: "solar-panels",
    category: "energy",
    title: "Install Solar Panels",
    description: "Generate renewable energy at home",
    icon: "☀️",
    currentValue: 0,
    proposedValue: 80,
    unit: "% solar coverage",
    carbonSavings: 3100,
    moneySaved: 2400,
    treesEquivalent: 141,
  },
  {
    id: "reduce-electricity",
    category: "energy",
    title: "Reduce Electricity Usage",
    description: "Cut unnecessary energy consumption",
    icon: "💡",
    currentValue: 100,
    proposedValue: 80,
    unit: "% of current usage",
    carbonSavings: 890,
    moneySaved: 520,
    treesEquivalent: 40,
  },
  {
    id: "smart-thermostat",
    category: "energy",
    title: "Smart Thermostat",
    description: "Optimize heating and cooling",
    icon: "🌡️",
    currentValue: 0,
    proposedValue: 1,
    unit: "smart thermostat",
    carbonSavings: 680,
    moneySaved: 380,
    treesEquivalent: 31,
  },

  // --- Diet ---
  {
    id: "reduce-meat",
    category: "diet",
    title: "Reduce Meat Consumption",
    description: "Cut meat meals by half",
    icon: "🥗",
    currentValue: 7,
    proposedValue: 3,
    unit: "meat meals/week",
    carbonSavings: 1040,
    moneySaved: 780,
    treesEquivalent: 47,
  },
  {
    id: "local-food",
    category: "diet",
    title: "Buy Local & Seasonal",
    description: "Choose locally sourced food",
    icon: "🌾",
    currentValue: 20,
    proposedValue: 60,
    unit: "% local food",
    carbonSavings: 420,
    moneySaved: 260,
    treesEquivalent: 19,
  },
  {
    id: "reduce-food-waste",
    category: "diet",
    title: "Reduce Food Waste",
    description: "Plan meals and compost",
    icon: "🗑️",
    currentValue: 30,
    proposedValue: 10,
    unit: "% food wasted",
    carbonSavings: 580,
    moneySaved: 920,
    treesEquivalent: 26,
  },

  // --- Travel ---
  {
    id: "fly-less",
    category: "travel",
    title: "Fly Less",
    description: "Reduce annual flights",
    icon: "✈️",
    currentValue: 6,
    proposedValue: 2,
    unit: "flights/year",
    carbonSavings: 3600,
    moneySaved: 4200,
    treesEquivalent: 164,
  },
  {
    id: "train-travel",
    category: "travel",
    title: "Choose Train Over Plane",
    description: "Take trains for trips under 800km",
    icon: "🚄",
    currentValue: 0,
    proposedValue: 3,
    unit: "train trips/year",
    carbonSavings: 1200,
    moneySaved: 600,
    treesEquivalent: 55,
  },
  {
    id: "staycation",
    category: "travel",
    title: "Staycation More",
    description: "Explore locally instead of flying abroad",
    icon: "🏡",
    currentValue: 1,
    proposedValue: 3,
    unit: "staycations/year",
    carbonSavings: 2100,
    moneySaved: 3500,
    treesEquivalent: 95,
  },
];

// --- Calculation Functions ---

export function calculateSimulation(
  activeScenarios: string[],
  scenarios: Scenario[] = defaultScenarios
): SimulationResult {
  const active = scenarios.filter((s) => activeScenarios.includes(s.id));

  const totalCarbonSaved = active.reduce((sum, s) => sum + s.carbonSavings, 0);
  const totalMoneySaved = active.reduce((sum, s) => sum + s.moneySaved, 0);
  const totalTreesEquivalent = active.reduce((sum, s) => sum + s.treesEquivalent, 0);

  // Water savings (approximate: 1 kg CO₂ ≈ 15 liters water footprint)
  const waterSaved = totalCarbonSaved * 15;

  // Project score improvement
  const currentScore = 73;
  const maxImprovement = 27; // to reach 100
  const improvementRatio = Math.min(totalCarbonSaved / 15000, 1);
  const projectedScore = Math.round(currentScore + maxImprovement * improvementRatio);

  // 5-year projection (compound improvement)
  const yearlyProjection = Array.from({ length: 5 }, (_, i) => {
    const yearFactor = 1 + i * 0.15; // 15% compounding improvement per year
    return Math.round(totalCarbonSaved * yearFactor);
  });

  return {
    totalCarbonSaved,
    totalMoneySaved,
    totalTreesEquivalent,
    projectedScore,
    yearlyProjection,
    waterSaved,
  };
}

export function getScenariosByCategory(category: Scenario["category"]): Scenario[] {
  return defaultScenarios.filter((s) => s.category === category);
}

export function formatCO2(kg: number): string {
  if (kg >= 1000) {
    return `${(kg / 1000).toFixed(1)}t`;
  }
  return `${kg}kg`;
}

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}
