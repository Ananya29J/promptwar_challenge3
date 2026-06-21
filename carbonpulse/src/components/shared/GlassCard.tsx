"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  glowColor?: string;
  padding?: "sm" | "md" | "lg";
  onClick?: () => void;
}

const paddingMap = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function GlassCard({
  children,
  className,
  hover = true,
  glow = false,
  glowColor = "var(--color-emerald)",
  padding = "md",
  onClick,
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "relative rounded-2xl overflow-hidden",
        "bg-white/70 dark:bg-white/[0.05]",
        "backdrop-blur-2xl",
        "border border-white dark:border-white/[0.08]",
        paddingMap[padding],
        hover && "cursor-pointer",
        className
      )}
      style={
        glow
          ? {
              boxShadow: `0 0 40px ${glowColor}15, 0 8px 32px rgba(0,0,0,0.06)`,
            }
          : {
              boxShadow: "0 8px 32px rgba(0,0,0,0.04)",
            }
      }
      whileHover={
        hover
          ? {
              y: -4,
              boxShadow: glow
                ? `0 0 60px ${glowColor}25, 0 16px 48px rgba(0,0,0,0.12)`
                : "0 16px 48px rgba(0,0,0,0.08)",
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }
          : undefined
      }
      whileTap={hover ? { scale: 0.98 } : undefined}
      onClick={onClick}
    >
      {/* Gradient border overlay */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-[0.15] dark:opacity-30"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,1) 0%, transparent 50%, rgba(255,255,255,0.4) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// Floating variant for metric cards
interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FloatingCard({
  children,
  className,
  delay = 0,
}: FloatingCardProps) {
  return (
    <motion.div
      className={cn(
        "relative rounded-2xl overflow-hidden",
        "bg-white/80 dark:bg-white/[0.06]",
        "backdrop-blur-2xl",
        "border border-white dark:border-white/[0.1]",
        "p-5",
        className
      )}
      style={{
        boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
      }}
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 16px 48px rgba(0,0,0,0.1)",
      }}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
