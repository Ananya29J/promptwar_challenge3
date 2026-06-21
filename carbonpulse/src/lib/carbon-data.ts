// ============================================
// CarbonPulse — Mock Carbon Data Generation
// ============================================

import type {
  DailyCarbon,
  WeeklyCarbon,
  MonthlyCarbon,
  CarbonScore,
  ClimateRingData,
  UserProfile,
  CollectiveImpact,
  TimelineEntry,
  CarbonCategory,
  CoachMessage,
} from "@/types";

// --- Seed-based pseudo-random for consistent data ---
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

const rand = seededRandom(42);

function randomBetween(min: number, max: number): number {
  return Math.round((min + rand() * (max - min)) * 100) / 100;
}

// --- Daily Carbon Data ---
export function generateDailyData(days: number = 30): DailyCarbon[] {
  const data: DailyCarbon[] = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    const energy = randomBetween(2, 8);
    const transport = randomBetween(1, 12);
    const consumption = randomBetween(0.5, 5);
    const diet = randomBetween(1, 6);
    const total = Math.round((energy + transport + consumption + diet) * 100) / 100;

    // Score inversely proportional to emissions (lower emissions = higher score)
    const maxDaily = 31; // max possible
    const score = Math.round(Math.max(0, Math.min(100, (1 - total / maxDaily) * 100)));

    data.push({
      date: date.toISOString().split("T")[0],
      total,
      breakdown: { energy, transport, consumption, diet },
      score,
    });
  }

  return data;
}

// --- Weekly Carbon Data ---
export function generateWeeklyData(weeks: number = 12): WeeklyCarbon[] {
  const dailyData = generateDailyData(weeks * 7);
  const weeklyData: WeeklyCarbon[] = [];

  for (let w = 0; w < weeks; w++) {
    const weekDays = dailyData.slice(w * 7, (w + 1) * 7);
    const total = weekDays.reduce((sum, d) => sum + d.total, 0);
    const average = Math.round((total / 7) * 100) / 100;

    const breakdown: Record<CarbonCategory, number> = {
      energy: Math.round(weekDays.reduce((s, d) => s + d.breakdown.energy, 0) * 100) / 100,
      transport: Math.round(weekDays.reduce((s, d) => s + d.breakdown.transport, 0) * 100) / 100,
      consumption: Math.round(weekDays.reduce((s, d) => s + d.breakdown.consumption, 0) * 100) / 100,
      diet: Math.round(weekDays.reduce((s, d) => s + d.breakdown.diet, 0) * 100) / 100,
    };

    const prevTotal = w > 0 ? weeklyData[w - 1].total : total * 1.1;
    const trend = Math.round(((total - prevTotal) / prevTotal) * 100 * 10) / 10;

    weeklyData.push({
      weekStart: weekDays[0].date,
      weekEnd: weekDays[6].date,
      total: Math.round(total * 100) / 100,
      average,
      breakdown,
      trend,
    });
  }

  return weeklyData;
}

// --- Monthly Carbon Data ---
export function generateMonthlyData(months: number = 6): MonthlyCarbon[] {
  const data: MonthlyCarbon[] = [];
  const now = new Date();

  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = date.toISOString().slice(0, 7);
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    const energy = randomBetween(60, 200);
    const transport = randomBetween(40, 300);
    const consumption = randomBetween(20, 150);
    const diet = randomBetween(30, 180);
    const total = Math.round((energy + transport + consumption + diet) * 100) / 100;
    const average = Math.round((total / daysInMonth) * 100) / 100;

    const prevTotal = i < months - 1 ? data[data.length - 1]?.total || total * 1.1 : total * 1.1;
    const trend = Math.round(((total - prevTotal) / prevTotal) * 100 * 10) / 10;

    data.push({
      month,
      total,
      average,
      breakdown: { energy, transport, consumption, diet },
      trend,
    });
  }

  return data;
}

// --- Carbon Score ---
export function getCurrentScore(): CarbonScore {
  return {
    current: 0,
    previousMonth: 0,
    improvement: 0,
    streak: 0,
    rank: "beginner",
  };
}

// --- Climate Rings ---
export function getClimateRings(): ClimateRingData {
  return {
    energy: 0,
    transport: 0,
    consumption: 0,
  };
}

// --- User Profile ---
export function getUserProfile(): UserProfile {
  return {
    name: "Alex Rivera",
    avatar: "/avatar.png",
    joinedDate: "2025-09-15",
    carbonScore: getCurrentScore(),
    ecoTwinHealth: 0,
    totalTreesSaved: 0,
    totalWaterConserved: 0,
    totalCO2Reduced: 0,
  };
}

// --- Collective Impact ---
export function getCollectiveImpact(): CollectiveImpact {
  return {
    treesSaved: 2_456_789,
    waterConserved: 890_000_000,
    co2Reduced: 156_432,
    usersActive: 1_234_567,
    countriesReached: 142,
  };
}

// --- Timeline Entries ---
export function getTimelineEntries(days: number = 30): TimelineEntry[] {
  const daily = generateDailyData(days);
  const milestones: Record<string, { title: string; icon: string }> = {};

  // Add some milestone markers
  if (daily.length > 5) {
    milestones[daily[5].date] = { title: "First Green Week", icon: "🌿" };
  }
  if (daily.length > 14) {
    milestones[daily[14].date] = { title: "Solar Pioneer Unlocked", icon: "☀️" };
  }
  if (daily.length > 25) {
    milestones[daily[25].date] = { title: "2-Week Streak!", icon: "🔥" };
  }

  return daily.map((d) => ({
    date: d.date,
    value: d.total,
    category: (["energy", "transport", "consumption", "diet"] as CarbonCategory[])[
      Math.floor(rand() * 4)
    ],
    milestone: milestones[d.date],
  }));
}

// --- AI Coach Messages ---
export function getCoachGreeting(): CoachMessage {
  return {
    id: "greeting",
    role: "coach",
    content:
      "Hey Alex! 🌍 Great to see you back. Your carbon score jumped to 73 this week — that's a 12% improvement! Your transport choices have been stellar. Want me to help you optimize your energy usage next?",
    timestamp: new Date().toISOString(),
    suggestions: [
      "How can I reduce my energy usage?",
      "What's my biggest impact area?",
      "Show me my weekly progress",
      "Suggest a new challenge",
    ],
  };
}

export function getCoachResponses(): Record<string, CoachMessage> {
  return {
    "How can I reduce my energy usage?": {
      id: "energy-tips",
      role: "coach",
      content:
        "Great question! Here are your top 3 energy-saving opportunities:\n\n🔌 **Smart Power Strips** — Your standby power usage is ~2.1 kWh/day. Smart strips could cut this by 75%.\n\n💡 **LED Transition** — Switching remaining bulbs saves ~0.8 kg CO₂/day.\n\n🌡️ **Thermostat Optimization** — Lowering by 2°C saves ~15% on heating. That's roughly 1.2 kg CO₂/day.\n\nTotal potential saving: **4.1 kg CO₂/day** — equivalent to planting 2 trees! 🌳",
      timestamp: new Date().toISOString(),
      suggestions: [
        "Tell me more about smart power strips",
        "What about solar panels?",
        "How does this compare to transport?",
      ],
    },
    "What's my biggest impact area?": {
      id: "impact-area",
      role: "coach",
      content:
        "Looking at your data, **transport** accounts for 42% of your carbon footprint — that's about 8.3 kg CO₂/day. 🚗\n\nThe good news? You've already cut it by 18% this month by cycling twice a week! 🚴\n\nIf you added one more cycling day, you'd save an additional **2.1 kg CO₂/week**. Want me to set up a Transport Challenge?",
      timestamp: new Date().toISOString(),
      suggestions: [
        "Set up the Transport Challenge",
        "What about my diet impact?",
        "Show me transport alternatives",
      ],
    },
    "Show me my weekly progress": {
      id: "weekly-progress",
      role: "coach",
      content:
        "Here's your week at a glance 📊\n\n**Total emissions**: 98.4 kg CO₂ (↓ 8.2% from last week)\n\n✅ Energy: 24.1 kg — On track!\n✅ Transport: 38.7 kg — Great improvement!\n⚠️ Consumption: 19.8 kg — Slightly up\n✅ Diet: 15.8 kg — Below average!\n\nYour **14-day streak** is incredible! Keep it going and you'll unlock the Climate Champion badge next week! 🏆",
      timestamp: new Date().toISOString(),
      suggestions: [
        "Why did consumption go up?",
        "How do I maintain my streak?",
        "What badge am I closest to?",
      ],
    },
    "Suggest a new challenge": {
      id: "new-challenge",
      role: "coach",
      content:
        "Based on your profile, here's a perfect next challenge:\n\n🌱 **Meatless Monday Master**\n*Go plant-based every Monday for 4 weeks*\n\n**Impact**: Save ~6.2 kg CO₂ per week\n**Reward**: Unlock the \"Green Gastronome\" badge\n**Difficulty**: ⭐⭐ (Medium)\n\nDid you know? A single meatless day saves the equivalent water of 13 showers! 🚿\n\nReady to accept this challenge?",
      timestamp: new Date().toISOString(),
      suggestions: [
        "Accept the challenge!",
        "Show me harder challenges",
        "What about a transport challenge?",
      ],
    },
  };
}
