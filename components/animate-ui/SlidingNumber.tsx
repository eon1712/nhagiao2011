"use client";

import React from "react";
import { motion } from "framer-motion";

interface SlidingNumberProps {
  value: number;
  className?: string;
  padLength?: number;
}

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function DigitColumn({ digit }: { digit: number }) {
  return (
    <div className="relative inline-block h-[1em] w-[0.62em] overflow-hidden align-baseline leading-none">
      <motion.div
        animate={{ y: `-${digit * 10}%` }}
        transition={{
          type: "spring",
          stiffness: 140,
          damping: 18,
          mass: 0.8,
        }}
        className="absolute top-0 left-0 flex flex-col w-full"
      >
        {DIGITS.map((num) => (
          <span
            key={num}
            className="flex items-center justify-center h-[1em] leading-none"
          >
            {num}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export const SlidingNumber: React.FC<SlidingNumberProps> = ({
  value,
  className = "",
  padLength = 0,
}) => {
  const str = Math.floor(Math.abs(value))
    .toString()
    .padStart(padLength, "0");

  return (
    <span className={`inline-flex items-center font-mono ${className}`}>
      {str.split("").map((char, index) => {
        const num = parseInt(char, 10);
        if (isNaN(num)) {
          return <span key={index}>{char}</span>;
        }
        return <DigitColumn key={`${index}-${char}`} digit={num} />;
      })}
    </span>
  );
};
