"use client";

import { motion } from "motion/react";
import { useMousePosition } from "@/hooks";
import { Leaf } from "lucide-react";

export default function EarthIllustration() {
  const { position } = useMousePosition();
  
  // Parallax effect based on mouse position
  const rotateX = position.y ? (position.y - window.innerHeight / 2) * -0.01 : 0;
  const rotateY = position.x ? (position.x - window.innerWidth / 2) * 0.01 : 0;

  return (
    <div className="relative w-full h-[550px] flex items-center justify-center">
      {/* Outer ambient glow */}
      <div className="absolute inset-0 bg-emerald-100/50 blur-[100px] rounded-full pointer-events-none" />

      {/* The Sphere */}
      <motion.div
        className="relative w-80 h-80 rounded-full bg-white shadow-[inset_-20px_-20px_60px_rgba(0,0,0,0.05),0_30px_60px_rgba(16,185,129,0.15)] flex items-center justify-center overflow-hidden border border-stone-100"
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Soft pastel gradient representing land and water */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#e0f2fe_0%,#dcfce7_50%,#bbf7d0_100%)] opacity-80" />

        {/* Abstract "continents" using SVG blobs */}
        <motion.svg
          viewBox="0 0 200 200"
          className="absolute inset-0 w-full h-full text-emerald-400/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <path fill="currentColor" d="M45,-78.1C58.3,-71.4,69.2,-58.5,77.5,-44.1C85.7,-29.7,91.3,-14.8,89.5,-1.1C87.6,12.7,78.3,25.4,69.5,37.3C60.7,49.1,52.3,60.1,41.2,67.8C30.1,75.4,16.3,79.8,1.6,76.9C-13.1,74,-27.3,64,-40.4,55.1C-53.4,46.1,-65.4,38.1,-73.4,26.5C-81.4,14.8,-85.5,-0.6,-81.9,-14.2C-78.3,-27.8,-67.1,-39.7,-54.6,-48.6C-42.1,-57.5,-28.4,-63.5,-14.9,-69.2C-1.4,-74.9,11.8,-80.4,25.1,-81.3C38.3,-82.2,51.5,-78.6,45,-78.1Z" transform="translate(100 100) scale(1.1)" />
          <path fill="currentColor" d="M51.9,-65.4C64.6,-53.4,70.2,-34.5,72.4,-15.8C74.6,2.9,73.4,21.5,64.2,35.6C55,49.8,37.8,59.6,18.9,66.6C0,73.5,-20.5,77.6,-36.8,70.6C-53.1,63.6,-65.2,45.5,-70.5,26.4C-75.8,7.3,-74.3,-12.8,-66.2,-29.4C-58,-46,-43.2,-59.1,-27.4,-67C-11.6,-74.8,5.2,-77.3,21.6,-73.2C38.1,-69,54.1,-58.2,51.9,-65.4Z" transform="translate(100 100) scale(0.9) rotate(45)" />
        </motion.svg>

        {/* Center glowing element */}
        <div className="absolute w-20 h-20 bg-white/40 backdrop-blur-md rounded-full shadow-[0_0_40px_rgba(255,255,255,0.8)] flex items-center justify-center">
          <Leaf className="w-8 h-8 text-emerald-600" />
        </div>

        {/* Subtle interior shadow for depth */}
        <div className="absolute inset-0 rounded-full shadow-[inset_-10px_-10px_30px_rgba(0,0,0,0.05)] pointer-events-none" />
      </motion.div>

      {/* Orbiting Elements */}
      <motion.div
        className="absolute w-96 h-96 border border-emerald-500/10 rounded-full pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.8)]" />
        <div className="absolute bottom-1/4 right-0 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
      </motion.div>
    </div>
  );
}
