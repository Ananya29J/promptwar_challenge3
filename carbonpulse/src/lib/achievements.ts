// ============================================
// CarbonPulse — Achievement / Quest Definitions
// ============================================

import type { Quest } from "@/types";

export const quests: Quest[] = [
  // --- COMMON ---
  {
    id: "first-steps",
    title: "First Steps",
    description: "Complete your first carbon footprint calculation",
    icon: "👣",
    rarity: "common",
    category: "lifestyle",
    status: "in-progress",
    progress: 100,
    requirement: "Calculate your carbon footprint once",
    reward: "Unlock your personal dashboard",
    co2Impact: 0,
    unlockedAt: "2025-09-15",
  },
  {
    id: "green-explorer",
    title: "Green Explorer",
    description: "Track your carbon footprint for 7 consecutive days",
    icon: "🌿",
    rarity: "common",
    category: "streak",
    status: "in-progress",
    progress: 100,
    requirement: "7-day tracking streak",
    reward: "Explorer badge + Custom theme color",
    co2Impact: 5,
    unlockedAt: "2025-09-22",
  },
  {
    id: "bike-curious",
    title: "Bike Curious",
    description: "Log 3 cycling trips instead of driving",
    icon: "🚲",
    rarity: "common",
    category: "transport",
    status: "in-progress",
    progress: 100,
    requirement: "3 cycling trips logged",
    reward: "Transport Pioneer badge",
    co2Impact: 8.4,
    unlockedAt: "2025-10-03",
  },
  {
    id: "light-switch",
    title: "Light Switch",
    description: "Reduce energy consumption by 10% in one week",
    icon: "💡",
    rarity: "common",
    category: "energy",
    status: "in-progress",
    progress: 100,
    requirement: "10% energy reduction in 7 days",
    reward: "Energy Saver badge",
    co2Impact: 3.2,
    unlockedAt: "2025-10-10",
  },
  {
    id: "meatless-monday",
    title: "Meatless Monday",
    description: "Go plant-based for one full day",
    icon: "🥗",
    rarity: "common",
    category: "lifestyle",
    status: "in-progress",
    progress: 75,
    requirement: "1 fully plant-based day",
    reward: "Green Gastronome badge",
    co2Impact: 2.5,
  },

  // --- RARE ---
  {
    id: "solar-pioneer",
    title: "Solar Pioneer",
    description: "Reduce energy footprint by 30% over a month",
    icon: "☀️",
    rarity: "rare",
    category: "energy",
    status: "in-progress",
    progress: 100,
    requirement: "30% energy reduction over 30 days",
    reward: "Solar badge + Dashboard glow effect",
    co2Impact: 45,
    unlockedAt: "2025-11-15",
  },
  {
    id: "public-transit-pro",
    title: "Public Transit Pro",
    description: "Use public transport for 20 commutes",
    icon: "🚇",
    rarity: "rare",
    category: "transport",
    status: "in-progress",
    progress: 65,
    requirement: "20 public transport commutes",
    reward: "Transit Master badge",
    co2Impact: 62,
  },
  {
    id: "zero-waste-week",
    title: "Zero Waste Week",
    description: "Achieve near-zero consumption waste for 7 days",
    icon: "♻️",
    rarity: "rare",
    category: "lifestyle",
    status: "in-progress",
    progress: 42,
    requirement: "7 days of minimal waste",
    reward: "Zero Waste Warrior badge",
    co2Impact: 15,
  },
  {
    id: "community-catalyst",
    title: "Community Catalyst",
    description: "Inspire 5 friends to join CarbonPulse",
    icon: "🤝",
    rarity: "rare",
    category: "community",
    status: "in-progress",
    progress: 60,
    requirement: "5 friend referrals",
    reward: "Community Leader badge",
    co2Impact: 120,
  },
  {
    id: "30-day-streak",
    title: "Month of Change",
    description: "Maintain a 30-day tracking streak",
    icon: "📅",
    rarity: "rare",
    category: "streak",
    status: "in-progress",
    progress: 47,
    requirement: "30-day streak",
    reward: "Dedication badge + Streak multiplier",
    co2Impact: 25,
  },

  // --- EPIC ---
  {
    id: "climate-champion",
    title: "Climate Champion",
    description: "Achieve a carbon score of 85+ for 2 consecutive weeks",
    icon: "🏆",
    rarity: "epic",
    category: "streak",
    status: "locked",
    progress: 0,
    requirement: "Score 85+ for 14 consecutive days",
    reward: "Champion crown + Exclusive avatar frame",
    co2Impact: 200,
  },
  {
    id: "carbon-cutter",
    title: "Carbon Cutter",
    description: "Reduce total footprint by 50% from your baseline",
    icon: "✂️",
    rarity: "epic",
    category: "lifestyle",
    status: "locked",
    progress: 0,
    requirement: "50% reduction from initial baseline",
    reward: "Carbon Cutter badge + Special effects",
    co2Impact: 500,
  },
  {
    id: "electric-dreamer",
    title: "Electric Dreamer",
    description: "Switch to 100% renewable energy for transport and home",
    icon: "⚡",
    rarity: "epic",
    category: "energy",
    status: "locked",
    progress: 0,
    requirement: "Full renewable energy adoption",
    reward: "Electric badge + Aurora theme",
    co2Impact: 800,
  },
  {
    id: "flight-free-year",
    title: "Flight Free Explorer",
    description: "Go 6 months without flying",
    icon: "✈️",
    rarity: "epic",
    category: "transport",
    status: "locked",
    progress: 0,
    requirement: "180 days flight-free",
    reward: "Ground Explorer badge",
    co2Impact: 1200,
  },

  // --- LEGENDARY ---
  {
    id: "net-zero-hero",
    title: "Net Zero Hero",
    description: "Achieve net-zero carbon footprint for a full month",
    icon: "🌍",
    rarity: "legendary",
    category: "lifestyle",
    status: "locked",
    progress: 0,
    requirement: "Net-zero emissions for 30 days",
    reward: "Legendary holographic badge + Net Zero title",
    co2Impact: 2000,
  },
  {
    id: "earth-guardian",
    title: "Earth Guardian",
    description: "Complete all other quests and maintain score 90+ for 3 months",
    icon: "🛡️",
    rarity: "legendary",
    category: "streak",
    status: "locked",
    progress: 0,
    requirement: "All quests + 90 days at 90+ score",
    reward: "Guardian title + Exclusive animated avatar",
    co2Impact: 5000,
  },
];

// --- Helper Functions ---

export function getQuestsByRarity(rarity: Quest["rarity"]): Quest[] {
  return quests.filter((q) => q.rarity === rarity);
}

export function getQuestsByCategory(category: Quest["category"]): Quest[] {
  return quests.filter((q) => q.category === category);
}

export function getQuestsByStatus(status: Quest["status"]): Quest[] {
  return quests.filter((q) => q.status === status);
}

export function getCompletedCount(): number {
  return quests.filter((q) => q.status === "in-progress").length;
}

export function getTotalCO2Impact(): number {
  return quests
    .filter((q) => q.status === "in-progress")
    .reduce((sum, q) => sum + q.co2Impact, 0);
}

export function getNextQuest(): Quest | undefined {
  return quests.find((q) => q.status === "in-progress");
}

export function getQuestById(id: string): Quest | undefined {
  return quests.find((q) => q.id === id);
}

export const rarityColors: Record<Quest["rarity"], string> = {
  common: "from-slate-400 to-slate-500",
  rare: "from-blue-400 to-cyan-500",
  epic: "from-purple-500 to-pink-500",
  legendary: "from-amber-400 via-yellow-300 to-orange-500",
};

export const rarityGlow: Record<Quest["rarity"], string> = {
  common: "shadow-slate-500/20",
  rare: "shadow-cyan-500/30",
  epic: "shadow-purple-500/40",
  legendary: "shadow-amber-500/50",
};
