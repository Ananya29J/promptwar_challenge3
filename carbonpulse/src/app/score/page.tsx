"use client";

import CarbonScore from "@/components/dashboard/CarbonScore";
import ClimateRings from "@/components/dashboard/ClimateRings";
import EcoTwin from "@/components/dashboard/EcoTwin";
import CarbonQuestsChecklist from "@/components/dashboard/CarbonQuestsChecklist";
import BentoCard from "@/components/shared/BentoCard";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import {
  Leaf,
  ShieldCheck,
  Link2,
  Activity,
  TrendingUp,
  Sparkles,
} from "lucide-react";

export default function ScorePage() {
  const [hasData, setHasData] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [completedQuestsCount, setCompletedQuestsCount] = useState(0);
  const [assessmentStep, setAssessmentStep] = useState(0);
  const [assessmentScores, setAssessmentScores] = useState({ energy: 0, transport: 0, consumption: 0 });

  // Derive new score based on quests completed (each gives 15 points)
  const baseScore = assessmentScores.energy + assessmentScores.transport + assessmentScores.consumption;
  const scoreOverride = Math.min(100, baseScore + (completedQuestsCount * 15));
  const healthOverride = Math.min(100, scoreOverride); // Health follows score
  const ringsOverride = {
    energy: Math.min(100, (assessmentScores.energy * 3) + (completedQuestsCount * 20)),
    transport: Math.min(100, (assessmentScores.transport * 3) + (completedQuestsCount * 15)),
    consumption: Math.min(100, (assessmentScores.consumption * 3) + (completedQuestsCount * 25)),
  };

  const handleConnect = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setHasData(true);
    }, 2500);
  };

  const handleAssessmentAnswer = (value: number, category: 'transport' | 'consumption' | 'energy') => {
    setAssessmentScores(prev => ({ ...prev, [category]: value }));
    if (assessmentStep < 3) {
      setAssessmentStep(prev => prev + 1);
    } else {
      handleConnect();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative">
      {/* Onboarding Overlay */}
      <AnimatePresence>
        {!hasData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 bg-white/80 backdrop-blur-2xl flex flex-col items-center pt-32 rounded-[2rem]"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-md w-full"
            >
              <BentoCard padding="lg">
                {assessmentStep === 0 ? (
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500">
                      <Leaf className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-stone-800 mb-2">
                        Your Carbon Score
                      </h2>
                      <p className="text-stone-500 text-sm">
                        To generate your personalized eco-twin and carbon score,
                        we need to establish your baseline footprint.
                      </p>
                    </div>

                    <div className="w-full space-y-3">
                      <button
                        onClick={handleConnect}
                        disabled={isCalculating}
                        className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                      >
                        {isCalculating ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            >
                              <Activity className="w-4 h-4" />
                            </motion.div>
                            Analyzing Footprint...
                          </>
                        ) : (
                          <>
                            <Link2 className="w-4 h-4" />
                            Connect Smart Data
                          </>
                        )}
                      </button>
                      <button 
                        onClick={() => setAssessmentStep(1)}
                        disabled={isCalculating}
                        className="w-full py-3 px-4 bg-stone-50 hover:bg-stone-100 text-stone-800 font-semibold rounded-xl border border-stone-200 transition-colors text-sm"
                      >
                        Take Quick Assessment
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-stone-400">
                      <ShieldCheck className="w-4 h-4 text-emerald-500/70" />
                      Your data is securely encrypted.
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Question {assessmentStep} of 3</span>
                      <button onClick={() => setAssessmentStep(0)} className="text-stone-400 hover:text-stone-600 text-sm font-medium">Cancel</button>
                    </div>
                    
                    {assessmentStep === 1 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                        <h3 className="text-xl font-bold text-stone-800">How do you primarily commute?</h3>
                        <div className="space-y-2">
                          <button onClick={() => handleAssessmentAnswer(0, 'transport')} className="w-full p-4 rounded-xl border border-stone-200 text-left hover:bg-emerald-50 hover:border-emerald-200 transition-colors">🚗 Personal Car (Gas)</button>
                          <button onClick={() => handleAssessmentAnswer(5, 'transport')} className="w-full p-4 rounded-xl border border-stone-200 text-left hover:bg-emerald-50 hover:border-emerald-200 transition-colors">⚡ Electric Vehicle</button>
                          <button onClick={() => handleAssessmentAnswer(10, 'transport')} className="w-full p-4 rounded-xl border border-stone-200 text-left hover:bg-emerald-50 hover:border-emerald-200 transition-colors">🚇 Public Transit / Bike</button>
                        </div>
                      </motion.div>
                    )}
                    {assessmentStep === 2 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                        <h3 className="text-xl font-bold text-stone-800">What is your diet like?</h3>
                        <div className="space-y-2">
                          <button onClick={() => handleAssessmentAnswer(0, 'consumption')} className="w-full p-4 rounded-xl border border-stone-200 text-left hover:bg-emerald-50 hover:border-emerald-200 transition-colors">🥩 Meat-heavy</button>
                          <button onClick={() => handleAssessmentAnswer(5, 'consumption')} className="w-full p-4 rounded-xl border border-stone-200 text-left hover:bg-emerald-50 hover:border-emerald-200 transition-colors">🥗 Flexitarian</button>
                          <button onClick={() => handleAssessmentAnswer(10, 'consumption')} className="w-full p-4 rounded-xl border border-stone-200 text-left hover:bg-emerald-50 hover:border-emerald-200 transition-colors">🌱 Vegan / Vegetarian</button>
                        </div>
                      </motion.div>
                    )}
                    {assessmentStep === 3 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                        <h3 className="text-xl font-bold text-stone-800">How do you power your home?</h3>
                        <div className="space-y-2">
                          <button onClick={() => handleAssessmentAnswer(0, 'energy')} className="w-full p-4 rounded-xl border border-stone-200 text-left hover:bg-emerald-50 hover:border-emerald-200 transition-colors">🔌 Standard Grid</button>
                          <button onClick={() => handleAssessmentAnswer(5, 'energy')} className="w-full p-4 rounded-xl border border-stone-200 text-left hover:bg-emerald-50 hover:border-emerald-200 transition-colors">☀️ Mixed / Partial Solar</button>
                          <button onClick={() => handleAssessmentAnswer(10, 'energy')} className="w-full p-4 rounded-xl border border-stone-200 text-left hover:bg-emerald-50 hover:border-emerald-200 transition-colors">🔋 100% Renewable</button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </BentoCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-stone-100 pb-6"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <h1 className="text-3xl font-bold text-stone-800 tracking-tight">
              Carbon Score
            </h1>
          </div>
          <p className="text-stone-500 ml-[52px]">
            {hasData
              ? "Your sustainability performance at a glance."
              : "Complete setup to unlock your score."}
          </p>
        </div>
        {hasData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full"
          >
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span className="text-sm text-emerald-600 font-medium">
              Score Rising
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* Main Grid */}
      <div
        className={cn(
          "grid grid-cols-1 lg:grid-cols-12 gap-6",
          !hasData && "opacity-30 pointer-events-none filter blur-sm"
        )}
      >
        {/* Left Column — Score + Rings (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: hasData ? 1 : 0.3, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {hasData ? (
              <CarbonScore scoreOverride={scoreOverride} />
            ) : (
              <div className="h-72 bg-stone-100 animate-pulse rounded-[2rem]" />
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: hasData ? 1 : 0.3, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {hasData ? (
              <ClimateRings ringsOverride={ringsOverride} />
            ) : (
              <div className="h-72 bg-stone-100 animate-pulse rounded-[2rem]" />
            )}
          </motion.div>
        </div>

        {/* Middle Column — Eco Twin (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: hasData ? 1 : 0.3, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:h-full"
          >
            {hasData ? (
              <div className="h-full">
                <EcoTwin healthOverride={healthOverride} />
              </div>
            ) : (
              <div className="h-[600px] bg-stone-100 animate-pulse rounded-[2rem]" />
            )}
          </motion.div>
        </div>

        {/* Right Column — Quests Checklist (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: hasData ? 1 : 0.3, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:h-full"
          >
            {hasData ? (
              <div className="h-full">
                <CarbonQuestsChecklist onQuestsChange={setCompletedQuestsCount} />
              </div>
            ) : (
              <div className="h-[600px] bg-stone-100 animate-pulse rounded-[2rem]" />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
