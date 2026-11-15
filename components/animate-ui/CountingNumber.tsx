"use client";

import React, { useEffect, useState, useRef } from "react";

interface CountingNumberProps {
  value: number;
  duration?: number;
  decimals?: number;
  padLength?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export const CountingNumber: React.FC<CountingNumberProps> = ({
  value,
  duration = 2000,
  decimals = 0,
  padLength = 2,
  className = "",
  prefix = "",
  suffix = "",
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const startTimestamp = useRef<number | null>(null);
  const currentValRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    let startTime: number | null = null;
    const startVal = currentValRef.current;
    const diff = value - startVal;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const nextVal = startVal + diff * ease;

      currentValRef.current = nextVal;
      setDisplayValue(nextVal);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        currentValRef.current = value;
        setDisplayValue(value);
      }
    };

    frameRef.current = requestAnimationFrame(step);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [value, duration]);

  const formatted = displayValue
    .toFixed(decimals)
    .padStart(padLength, "0");

  return (
    <span className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};
