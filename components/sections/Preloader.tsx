"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CountingNumber } from "../animate-ui/CountingNumber";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setDay(20);
    }, 200);

    const t2 = setTimeout(() => {
      setMonth(11);
    }, 600);

    const t3 = setTimeout(() => {
      setIsFinishing(true);
    }, 2100);

    const t4 = setTimeout(() => {
      setIsHidden(true);
      onComplete();
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  if (isHidden) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex flex-col">
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isFinishing ? "-100%" : 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="w-full h-1/2 bg-[#16211C] border-b border-white/10 relative overflow-hidden flex items-end justify-center pointer-events-auto"
      >
        <div className="absolute inset-0 chalk-pattern opacity-30" />
      </motion.div>

      <motion.div
        animate={{
          opacity: isFinishing ? 0 : 1,
          scale: isFinishing ? 0.95 : 1,
        }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-6"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/50 mb-3">
          [ 20 . 11 ] — LƯU NIỆM TRI ÂN
        </span>

        <div className="flex items-center text-5xl sm:text-7xl font-display font-bold text-white tracking-wider">
          <CountingNumber
            value={day}
            duration={1500}
            padLength={2}
            className="text-[#FFDF73]"
          />
          <span className="mx-3 text-terracotta font-serif">/</span>
          <CountingNumber
            value={month}
            duration={1500}
            padLength={2}
            className="text-white"
          />
        </div>

        <div className="w-48 sm:w-64 my-4">
          <svg
            viewBox="0 0 200 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-3"
          >
            <motion.path
              d="M 5 6 C 50 2, 100 10, 150 4 S 195 7, 195 7"
              stroke="#FFDF73"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="220"
              initial={{ strokeDashoffset: 220 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.4, delay: 0.5, ease: "easeInOut" }}
            />
          </svg>
        </div>

        <p className="font-display italic text-lg sm:text-xl text-white/80 text-center max-w-sm">
          "Người Lái Đò Thầm Lặng"
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isFinishing ? "100%" : 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="w-full h-1/2 bg-[#16211C] border-t border-white/10 relative overflow-hidden pointer-events-auto"
      >
        <div className="absolute inset-0 chalk-pattern opacity-30" />
      </motion.div>
    </div>
  );
};
