"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface SplittingTextProps {
  text: string;
  type?: "words" | "chars";
  delay?: number;
  stagger?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

export const SplittingText: React.FC<SplittingTextProps> = ({
  text,
  type = "words",
  delay = 0.1,
  stagger = 0.04,
  className = "",
  as = "span",
}) => {
  let items: string[] = [];
  if (type === "words") {
    items = text.split(" ");
  } else {
    items = Array.from(text);
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 18,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const Component = motion[as];

  return (
    <Component
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`inline-block ${className}`}
    >
      {items.map((item, idx) => (
        <motion.span
          key={`${idx}-${item}`}
          variants={itemVariants}
          className="inline-block"
        >
          {item}
          {type === "words" && idx < items.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </Component>
  );
};
