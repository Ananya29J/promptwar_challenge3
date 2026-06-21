"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { LoaderSize } from "@/types";

interface CarbonPulseLoaderProps {
  size?: LoaderSize;
  className?: string;
}

const sizeMap: Record<LoaderSize, { container: number; orb: number; orbit: number; icon: number }> = {
  sm: { container: 80, orb: 16, orbit: 32, icon: 14 },
  md: { container: 140, orb: 28, orbit: 56, icon: 22 },
  lg: { container: 200, orb: 40, orbit: 80, icon: 32 },
};

const particles = [
  { emoji: "🍃", delay: 0, duration: 3.2 },
  { emoji: "💧", delay: 0.8, duration: 3.6 },
  { emoji: "⚡", delay: 1.6, duration: 2.8 },
  { emoji: "🌬️", delay: 2.4, duration: 3.4 },
];

export default function CarbonPulseLoader({
  size = "md",
  className,
}: CarbonPulseLoaderProps) {
  const dims = sizeMap[size];
  const center = dims.container / 2;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        className
      )}
      style={{ width: dims.container, height: dims.container }}
      role="status"
      aria-label="Loading"
    >
      {/* Central glowing orb */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: dims.orb,
          height: dims.orb,
          background: "radial-gradient(circle, var(--color-emerald) 0%, var(--color-cyan) 50%, transparent 100%)",
          boxShadow: "0 0 30px var(--color-emerald), 0 0 60px var(--color-cyan-dim)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Aurora ring */}
      <motion.div
        className="absolute rounded-full border"
        style={{
          width: dims.orbit * 1.6,
          height: dims.orbit * 1.6,
          borderColor: "var(--color-emerald-dim)",
          borderWidth: 1,
        }}
        animate={{ rotate: 360, opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Second ring */}
      <motion.div
        className="absolute rounded-full border"
        style={{
          width: dims.orbit * 2.2,
          height: dims.orbit * 2.2,
          borderColor: "var(--color-cyan-dim)",
          borderWidth: 1,
        }}
        animate={{ rotate: -360, opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Orbiting particles */}
      {particles.map((particle, i) => {
        const angle = (i * Math.PI * 2) / particles.length;
        const orbitRadius = dims.orbit + (i % 2 === 0 ? 0 : dims.orbit * 0.4);

        return (
          <motion.div
            key={i}
            className="absolute flex items-center justify-center"
            style={{
              fontSize: dims.icon,
              width: dims.icon + 4,
              height: dims.icon + 4,
              left: center - (dims.icon + 4) / 2,
              top: center - (dims.icon + 4) / 2,
              filter: "drop-shadow(0 0 8px var(--color-emerald))",
            }}
            animate={{
              x: [
                Math.cos(angle) * orbitRadius,
                Math.cos(angle + Math.PI / 2) * orbitRadius,
                Math.cos(angle + Math.PI) * orbitRadius,
                Math.cos(angle + (Math.PI * 3) / 2) * orbitRadius,
                Math.cos(angle + Math.PI * 2) * orbitRadius,
              ],
              y: [
                Math.sin(angle) * orbitRadius,
                Math.sin(angle + Math.PI / 2) * orbitRadius,
                Math.sin(angle + Math.PI) * orbitRadius,
                Math.sin(angle + (Math.PI * 3) / 2) * orbitRadius,
                Math.sin(angle + Math.PI * 2) * orbitRadius,
              ],
              scale: [1, 1.2, 0.8, 1.1, 1],
              opacity: [0.7, 1, 0.6, 1, 0.7],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {particle.emoji}
          </motion.div>
        );
      })}

      {/* Pulse rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`pulse-${i}`}
          className="absolute rounded-full"
          style={{
            width: dims.orb,
            height: dims.orb,
            border: "1px solid var(--color-emerald)",
          }}
          animate={{
            scale: [1, 3.5],
            opacity: [0.4, 0],
          }}
          transition={{
            duration: 2.5,
            delay: i * 0.8,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      <span className="sr-only">Loading CarbonPulse...</span>
    </div>
  );
}
