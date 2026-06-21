import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "motion/react";

interface BentoCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  hoverable?: boolean;
}

export default function BentoCard({ 
  children, 
  className, 
  padding = "md",
  hoverable = false,
  ...props 
}: BentoCardProps) {
  return (
    <motion.div
      className={cn(
        "bg-white rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.05)] overflow-hidden",
        "border border-stone-200/60", // More distinct border for definition
        padding === "sm" && "p-4",
        padding === "md" && "p-6",
        padding === "lg" && "p-8",
        padding === "xl" && "p-10",
        hoverable && "transition-shadow duration-300 hover:shadow-[0_10px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
