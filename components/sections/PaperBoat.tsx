"use client";

import React from "react";
import { motion } from "framer-motion";

interface PaperBoatProps {
  onScrollClick: () => void;
}

export const PaperBoat: React.FC<PaperBoatProps> = ({ onScrollClick }) => {
  return (
    <motion.div
      onClick={onScrollClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onScrollClick();
        }
      }}
      aria-label="Cuộn xuống khám phá chuyến đò thời gian"
      className="flex flex-col items-center cursor-pointer group focus:outline-none"
    >
      <span className="font-mono text-xs sm:text-sm font-medium uppercase tracking-[0.25em] text-ink-faint group-hover:text-terracotta transition-colors mb-3">
        Theo Dòng Sang Sông ↓
      </span>

      <motion.div
        animate={{
          y: [0, -6, 0],
          rotate: [0, 2, -1.5, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-28 h-20 sm:w-36 sm:h-24 drop-shadow-md"
      >
        <svg
          viewBox="0 0 100 65"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <polygon
            points="50,5 50,42 75,42"
            fill="#FAF7F2"
            stroke="#1A1917"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <polygon
            points="50,5 25,42 50,42"
            fill="#EFE9DE"
            stroke="#1A1917"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <polygon
            points="10,42 90,42 68,60 32,60"
            fill="#F7F3EB"
            stroke="#1A1917"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <polygon
            points="10,42 50,55 32,60"
            fill="#E8DFD0"
            stroke="#1A1917"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <polygon
            points="90,42 50,55 68,60"
            fill="#DFD2BF"
            stroke="#1A1917"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <line
            x1="50"
            y1="5"
            x2="50"
            y2="55"
            stroke="#C85A32"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
        </svg>
      </motion.div>

      <div className="w-24 sm:w-28 h-1.5 mt-1.5 bg-ink-primary/10 rounded-full blur-[1px] group-hover:w-32 sm:group-hover:w-36 group-hover:bg-terracotta/20 transition-all duration-300" />
    </motion.div>
  );
};
