"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, X, Sparkles } from "lucide-react";
import AICoach from "@/components/dashboard/AICoach";

export default function FloatingAICoach() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.9, pointerEvents: "none" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 w-[350px] z-50 drop-shadow-2xl"
          >
            <div className="relative">
              {/* Close Button */}
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute -top-3 -right-3 w-8 h-8 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 z-10 shadow-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/20">
                <AICoach />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-tr from-emerald-600 to-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] z-50 text-white transition-shadow"
      >
        <motion.div
          animate={isOpen ? { rotate: 180, scale: 0 } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          <Bot className="w-6 h-6" />
        </motion.div>
        <motion.div
          animate={isOpen ? { rotate: 0, scale: 1 } : { rotate: -180, scale: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          <X className="w-6 h-6" />
        </motion.div>
        
        {/* Subtle sparkle indicator when closed */}
        {!isOpen && (
          <motion.div 
            className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(250,204,21,0.6)]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-2.5 h-2.5 text-yellow-900" />
          </motion.div>
        )}
      </motion.button>
    </>
  );
}
