"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface MotionContextValue {
  reducedMotion: boolean;
  setReducedMotion: (reduced: boolean) => void;
  springConfig: {
    stiffness: number;
    damping: number;
    mass: number;
  };
  transition: {
    type: string;
    duration: number;
  };
}

const MotionContext = createContext<MotionContextValue | undefined>(undefined);

export function MotionProvider({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check system preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Check stored preference
  useEffect(() => {
    const stored = localStorage.getItem("carbonpulse-reduced-motion");
    if (stored !== null) {
      setReducedMotion(stored === "true");
    }
  }, []);

  const handleSetReducedMotion = (reduced: boolean) => {
    setReducedMotion(reduced);
    localStorage.setItem("carbonpulse-reduced-motion", String(reduced));
  };

  const springConfig = reducedMotion
    ? { stiffness: 500, damping: 50, mass: 0.5 }
    : { stiffness: 260, damping: 20, mass: 1 };

  const transition = reducedMotion
    ? { type: "tween" as const, duration: 0 }
    : { type: "spring" as const, duration: 0.6 };

  return (
    <MotionContext.Provider
      value={{
        reducedMotion,
        setReducedMotion: handleSetReducedMotion,
        springConfig,
        transition,
      }}
    >
      {children}
    </MotionContext.Provider>
  );
}

export function useMotionConfig() {
  const context = useContext(MotionContext);
  if (!context) {
    throw new Error("useMotionConfig must be used within a MotionProvider");
  }
  return context;
}
