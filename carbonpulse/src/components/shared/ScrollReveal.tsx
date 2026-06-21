"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { ScrollRevealPreset } from "@/types";
import { useReducedMotion } from "@/hooks";

interface ScrollRevealProps {
  children: ReactNode;
  preset?: ScrollRevealPreset;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
}

const presets: Record<
  ScrollRevealPreset,
  { initial: Record<string, number>; animate: Record<string, number> }
> = {
  fadeUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  slideLeft: {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
  },
  slideRight: {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.85 },
    animate: { opacity: 1, scale: 1 },
  },
  blur: {
    initial: { opacity: 0, filter: 10 },
    animate: { opacity: 1, filter: 0 },
  },
};

export default function ScrollReveal({
  children,
  preset = "fadeUp",
  delay = 0,
  duration = 0.6,
  className,
  once = true,
  threshold = 0.2,
}: ScrollRevealProps) {
  const reducedMotion = useReducedMotion();
  const config = presets[preset];

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  // Handle blur filter specially
  const initialProps =
    preset === "blur"
      ? { ...config.initial, filter: `blur(${config.initial.filter}px)` }
      : config.initial;

  const animateProps =
    preset === "blur"
      ? { ...config.animate, filter: `blur(${config.animate.filter}px)` }
      : config.animate;

  return (
    <motion.div
      className={cn(className)}
      initial={initialProps}
      whileInView={animateProps}
      viewport={{ once, amount: threshold }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}

// Stagger container for multiple children
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  once = true,
}: StaggerContainerProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerChild({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}
