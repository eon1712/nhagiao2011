"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export const Cursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useSpring(-100, { stiffness: 500, damping: 28, mass: 0.1 });
  const cursorY = useSpring(-100, { stiffness: 500, damping: 28, mass: 0.1 });

  const dotX = useSpring(-100, { stiffness: 1200, damping: 35, mass: 0.05 });
  const dotY = useSpring(-100, { stiffness: 1200, damping: 35, mass: 0.05 });

  useEffect(() => {
    const match = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!match.matches) {
      setEnabled(false);
      return;
    }
    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest("button") ||
          target.closest("a") ||
          target.closest("input") ||
          target.closest("textarea") ||
          target.closest("[role='button']") ||
          target.getAttribute("data-cursor-hover")
        );
        setIsPointer(isInteractive);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible, cursorX, cursorY, dotX, dotY]);

  if (!enabled || !isVisible) return null;

  return (
    <>
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isPointer ? 1.7 : 1,
          borderColor: isPointer ? "rgba(200, 90, 50, 0.7)" : "rgba(26, 25, 23, 0.35)",
          backgroundColor: isPointer ? "rgba(200, 90, 50, 0.08)" : "transparent",
        }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-dashed pointer-events-none z-[9999]"
      />
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isPointer ? 0.6 : 1,
          backgroundColor: isPointer ? "#C85A32" : "#1A1917",
        }}
        transition={{ duration: 0.1 }}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999]"
      />
    </>
  );
};
