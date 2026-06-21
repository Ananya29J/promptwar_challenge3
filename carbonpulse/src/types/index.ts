// ============================================
// CarbonPulse — Core Type Definitions
// ============================================

// --- Carbon Data Types ---

export type CarbonCategory = "energy" | "transport" | "consumption" | "diet";

export interface DailyCarbon {
  date: string; // ISO date
  total: number; // kg CO₂
  breakdown: Record<CarbonCategory, number>;
  score: number; // 0-100
}

export interface WeeklyCarbon {
  weekStart: string;
  weekEnd: string;
  total: number;
  average: number;
  breakdown: Record<CarbonCategory, number>;
  trend: number; // percentage change from previous week
}

export interface MonthlyCarbon {
  month: string; // "2026-06"
  total: number;
  average: number;
  breakdown: Record<CarbonCategory, number>;
  trend: number;
}

export interface CarbonScore {
  current: number; // 0-100
  previousMonth: number;
  improvement: number; // percentage
  streak: number; // days
  rank: "beginner" | "explorer" | "pioneer" | "champion" | "hero";
}

export interface ClimateRingData {
  energy: number; // 0-100 percentage
  transport: number;
  consumption: number;
}

// --- User Profile Types ---

export interface UserProfile {
  name: string;
  avatar: string;
  joinedDate: string;
  carbonScore: CarbonScore;
  ecoTwinHealth: number; // 0-100
  totalTreesSaved: number;
  totalWaterConserved: number; // liters
  totalCO2Reduced: number; // kg
}

// --- Achievement / Quest Types ---

export type QuestRarity = "common" | "rare" | "epic" | "legendary";
export type QuestStatus = "locked" | "in-progress" | "completed";
export type QuestCategory = "energy" | "transport" | "lifestyle" | "community" | "streak";

export interface Quest {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: QuestRarity;
  category: QuestCategory;
  status: QuestStatus;
  progress: number; // 0-100
  requirement: string;
  reward: string;
  co2Impact: number; // kg CO₂ saved
  unlockedAt?: string;
}

// --- Simulator Types ---

export type ScenarioCategory = "transport" | "energy" | "diet" | "travel";

export interface Scenario {
  id: string;
  category: ScenarioCategory;
  title: string;
  description: string;
  icon: string;
  currentValue: number;
  proposedValue: number;
  unit: string;
  carbonSavings: number; // kg CO₂ per year
  moneySaved: number; // $ per year
  treesEquivalent: number;
}

export interface SimulationResult {
  totalCarbonSaved: number;
  totalMoneySaved: number;
  totalTreesEquivalent: number;
  projectedScore: number;
  yearlyProjection: number[];
  waterSaved: number; // liters
}

// --- AI Coach Types ---

export interface CoachMessage {
  id: string;
  role: "user" | "coach";
  content: string;
  timestamp: string;
  suggestions?: string[];
}

// --- Earth Impact Types ---

export interface CollectiveImpact {
  treesSaved: number;
  waterConserved: number; // liters
  co2Reduced: number; // tons
  usersActive: number;
  countriesReached: number;
}

// --- Timeline Types ---

export interface TimelineEntry {
  date: string;
  value: number;
  category: CarbonCategory;
  milestone?: {
    title: string;
    icon: string;
  };
}

// --- UI Types ---

export type ThemeMode = "dark" | "light" | "system";

export interface AnimationConfig {
  reducedMotion: boolean;
  duration: "fast" | "normal" | "slow";
}

export type LoaderSize = "sm" | "md" | "lg";

export type ScrollRevealPreset =
  | "fadeUp"
  | "fadeIn"
  | "slideLeft"
  | "slideRight"
  | "scale"
  | "blur";
