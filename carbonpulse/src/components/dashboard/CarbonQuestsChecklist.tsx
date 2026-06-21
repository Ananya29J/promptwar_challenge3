"use client";

import { useState } from "react";
import { quests, rarityColors } from "@/lib/achievements";
import BentoCard from "@/components/shared/BentoCard";
import { CheckCircle2, Circle, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export default function CarbonQuestsChecklist({ onQuestsChange }: { onQuestsChange?: (completedCount: number) => void }) {
  const [activeQuests, setActiveQuests] = useState(quests.slice(0, 5));

  const toggleQuest = (id: string) => {
    setActiveQuests(prev => {
      const next = prev.map(q => {
        if (q.id === id) {
          return { ...q, status: q.status === "completed" ? "in-progress" : "completed" as any };
        }
        return q;
      });
      if (onQuestsChange) {
        onQuestsChange(next.filter(q => q.status === "completed").length);
      }
      return next;
    });
  };

  const completedCount = activeQuests.filter(q => q.status === "completed").length;
  const progress = Math.round((completedCount / activeQuests.length) * 100);

  return (
    <BentoCard padding="lg" className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[1rem] bg-amber-50 flex items-center justify-center text-amber-500">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-stone-800">Carbon Quests</h3>
            <p className="text-xs font-bold text-stone-500">Build sustainable habits</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-black text-emerald-600">{completedCount} / {activeQuests.length}</div>
          <div className="text-xs text-stone-400 font-bold uppercase">Completed</div>
        </div>
      </div>

      <div className="h-2 bg-stone-100 rounded-full overflow-hidden mb-6 shadow-inner">
        <motion.div 
          className="h-full bg-emerald-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto pr-2 scrollbar-hide">
        {activeQuests.map((quest, i) => {
          const isCompleted = quest.status === "completed";
          return (
            <motion.button
              key={quest.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => toggleQuest(quest.id)}
              className={cn(
                "w-full flex items-center gap-4 p-3 rounded-[1.2rem] border transition-all text-left",
                isCompleted 
                  ? "bg-emerald-50/50 border-emerald-100 opacity-70" 
                  : "bg-white border-stone-200 hover:bg-stone-50 hover:border-stone-300 shadow-sm"
              )}
            >
              <div className={cn(
                "shrink-0 transition-colors",
                isCompleted ? "text-emerald-500" : "text-stone-300"
              )}>
                {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
              </div>
              <div className="flex-1">
                <h4 className={cn(
                  "font-bold text-sm mb-0.5",
                  isCompleted ? "text-stone-500 line-through" : "text-stone-800"
                )}>
                  {quest.title}
                </h4>
                <div className="flex gap-2 text-xs">
                  <span className={cn(
                    "font-bold",
                    quest.rarity === "common" ? "text-stone-400" :
                    quest.rarity === "rare" ? "text-blue-500" :
                    quest.rarity === "epic" ? "text-purple-500" :
                    "text-amber-500"
                  )}>
                    {quest.rarity}
                  </span>
                  <span className="text-stone-300">•</span>
                  <span className="text-stone-500">{quest.reward}</span>
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>
    </BentoCard>
  );
}
