"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";
import { useIsTouchDevice } from "@/hooks";

export default function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [visible, setVisible] = useState(false);
  const trailsRef = useRef<{ x: number; y: number; id: number }[]>([]);
  const [trails, setTrails] = useState<{ x: number; y: number; id: number }[]>([]);
  const trailIdRef = useRef(0);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springX = useSpring(cursorX, { stiffness: 500, damping: 28, mass: 0.5 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28, mass: 0.5 });

  const ringX = useSpring(cursorX, { stiffness: 150, damping: 20, mass: 1 });
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 20, mass: 1 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setVisible(true);

      // Add trail particle occasionally
      if (Math.random() > 0.85) {
        const id = trailIdRef.current++;
        const newTrail = { x: e.clientX, y: e.clientY, id };
        trailsRef.current = [...trailsRef.current.slice(-5), newTrail];
        setTrails([...trailsRef.current]);

        setTimeout(() => {
          trailsRef.current = trailsRef.current.filter((t) => t.id !== id);
          setTrails([...trailsRef.current]);
        }, 800);
      }
    },
    [cursorX, cursorY]
  );

  useEffect(() => {
    if (isTouch) return;

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[data-hoverable]") ||
        target.closest("input") ||
        target.closest("textarea")
      ) {
        setIsHovering(true);
      }
    };

    const handleHoverEnd = () => setIsHovering(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleHoverStart, { passive: true });
    document.addEventListener("mouseout", handleHoverEnd, { passive: true });
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Hide default cursor
    document.body.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleHoverStart);
      document.removeEventListener("mouseout", handleHoverEnd);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.body.style.cursor = "";
    };
  }, [isTouch, handleMouseMove]);

  if (isTouch) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden="true"
    >
      {/* Trail particles */}
      {trails.map((trail) => (
        <motion.div
          key={trail.id}
          className="absolute rounded-full"
          style={{
            left: trail.x - 3,
            top: trail.y - 3,
            width: 6,
            height: 6,
            background: "var(--color-emerald)",
          }}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      ))}

      {/* Outer ring */}
      <motion.div
        className="absolute rounded-full border-2 transition-colors duration-200"
        style={{
          x: ringX,
          y: ringY,
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          marginLeft: isHovering ? -24 : -16,
          marginTop: isHovering ? -24 : -16,
          borderColor: isHovering
            ? "var(--color-emerald)"
            : "var(--color-foreground-dim)",
          opacity: visible ? 0.5 : 0,
          background: isHovering
            ? "rgba(16, 185, 129, 0.08)"
            : "transparent",
        }}
        animate={{
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />

      {/* Inner dot */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: springX,
          y: springY,
          width: isHovering ? 8 : 6,
          height: isHovering ? 8 : 6,
          marginLeft: isHovering ? -4 : -3,
          marginTop: isHovering ? -4 : -3,
          background: "var(--color-emerald)",
          opacity: visible ? 1 : 0,
          boxShadow: isHovering
            ? "0 0 12px var(--color-emerald), 0 0 24px var(--color-emerald-dim)"
            : "0 0 6px var(--color-emerald-dim)",
        }}
        animate={{
          scale: isClicking ? 0.6 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />
    </div>
  );
}
