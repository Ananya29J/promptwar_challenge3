"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks";

interface AnimatedEarthProps {
  mouseX?: number;
  mouseY?: number;
}

export default function AnimatedEarth({ mouseX = 0, mouseY = 0 }: AnimatedEarthProps) {
  const reducedMotion = useReducedMotion();

  // Calculate parallax offsets (subtle)
  const xOffset = mouseX ? (mouseX - window.innerWidth / 2) * 0.02 : 0;
  const yOffset = mouseY ? (mouseY - window.innerHeight / 2) * 0.02 : 0;

  return (
    <motion.div
      className="relative flex justify-center items-center"
      animate={{ x: xOffset, y: yOffset }}
      transition={{ type: "spring", stiffness: 50, damping: 20 }}
    >
      {/* Outer Glow / Atmosphere */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "120%",
          height: "120%",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)",
        }}
        animate={!reducedMotion ? { opacity: [0.6, 1, 0.6], scale: [0.95, 1.05, 0.95] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* The Globe */}
      <motion.div
        className="relative rounded-full overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.4)]"
        style={{
          width: "clamp(200px, 40vw, 400px)",
          height: "clamp(200px, 40vw, 400px)",
          // Gradient simulating continents and oceans
          background: "radial-gradient(circle at 30% 30%, #06b6d4 0%, #0f172a 70%)",
          boxShadow: "inset -20px -20px 40px rgba(0,0,0,0.8), inset 10px 10px 30px rgba(255,255,255,0.2)",
        }}
        animate={!reducedMotion ? { rotate: 360 } : {}}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {/* Subtle continent shapes (using CSS shapes) */}
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-emerald-500/40 rounded-[40%_60%_70%_30%] blur-md" />
        <div className="absolute top-1/2 right-1/4 w-1/3 h-1/3 bg-emerald-400/30 rounded-[60%_40%_30%_70%] blur-md" />
        
        {/* Data points */}
        <div className="absolute top-[30%] left-[60%] w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#fff]" />
        <div className="absolute top-[60%] left-[40%] w-1.5 h-1.5 bg-yellow-300 rounded-full shadow-[0_0_8px_#fde047]" />
        <div className="absolute top-[45%] left-[25%] w-2 h-2 bg-emerald-300 rounded-full shadow-[0_0_10px_#6ee7b7]" />
      </motion.div>
    </motion.div>
  );
}
