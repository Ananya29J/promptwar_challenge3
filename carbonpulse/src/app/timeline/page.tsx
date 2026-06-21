"use client";

import CarbonTimeline from "@/components/dashboard/CarbonTimeline";
import EarthImpact from "@/components/dashboard/EarthImpact";
import BentoCard from "@/components/shared/BentoCard";
import { motion } from "motion/react";
import { BarChart3, TrendingDown, Calendar, Zap } from "lucide-react";

export default function TimelinePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-stone-100 pb-6"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-emerald-500" />
            </div>
            <h1 className="text-3xl font-bold text-stone-800 tracking-tight">
              Carbon Timeline
            </h1>
          </div>
          <p className="text-stone-500 ml-[52px]">
            Track your emissions over time and discover patterns.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full"
          >
            <TrendingDown className="w-4 h-4 text-emerald-500" />
            <span className="text-sm text-emerald-600 font-medium">
              -8.2% this week
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full"
          >
            <Zap className="w-4 h-4 text-emerald-500" />
            <span className="text-sm text-emerald-600 font-medium">
              14-day streak
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Collective Impact Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-4 h-4 text-stone-500" />
          <h2 className="text-sm font-medium text-stone-500 uppercase tracking-wider">
            Global Impact
          </h2>
        </div>
        <EarthImpact />
      </motion.section>

      {/* Timeline Chart Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-4 h-4 text-stone-500" />
          <h2 className="text-sm font-medium text-stone-500 uppercase tracking-wider">
            Emissions Over Time
          </h2>
        </div>
        <CarbonTimeline />
      </motion.section>

      {/* Insights Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {[
          {
            title: "Best Day",
            value: "4.2 kg",
            label: "Lowest daily emissions",
            color: "emerald",
            icon: "🏆",
          },
          {
            title: "Average",
            value: "14.1 kg",
            label: "Daily CO₂ average",
            color: "emerald",
            icon: "📊",
          },
          {
            title: "Saved",
            value: "156 kg",
            label: "CO₂ reduced this month",
            color: "emerald",
            icon: "🌱",
          },
        ].map((insight, i) => (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
          >
            <BentoCard padding="md" hoverable={true} className="h-full">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-stone-500">
                  {insight.title}
                </span>
                <span className="text-xl">{insight.icon}</span>
              </div>
              <p className="text-3xl font-bold text-emerald-500 mb-1">
                {insight.value}
              </p>
              <p className="text-xs text-stone-500">{insight.label}</p>
            </BentoCard>
          </motion.div>
        ))}
      </motion.section>
    </div>
  );
}
