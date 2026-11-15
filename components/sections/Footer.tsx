"use client";

import React from "react";
import { motion } from "framer-motion";
import { Magnetic } from "../animate-ui/Magnetic";
import { ArrowUp } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const marqueeText =
    "TÔN SƯ TRỌNG ĐẠO ✦ NHỚ ƠN THẦY CÔ ✦ 20.11 ✦ NGƯỜI LÁI ĐÒ THẦM LẶNG ✦ ";

  return (
    <footer className="relative w-full bg-[#16211C] text-white pt-10 pb-8 overflow-hidden border-t border-white/10">
      <div className="relative w-full overflow-hidden border-y border-white/10 py-3.5 bg-chalk-surface select-none">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex whitespace-nowrap"
        >
          <span className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-[#FFDF73]/90 tracking-[0.25em] uppercase">
            {marqueeText}
          </span>
          <span className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-[#FFDF73]/90 tracking-[0.25em] uppercase">
            {marqueeText}
          </span>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-terracotta rounded-full" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold font-medium">
              20.11 — NGÀY NHÀ GIÁO VIỆT NAM
            </span>
          </div>
          <p className="font-display italic text-lg sm:text-xl text-white/80 max-w-md">
            "Muốn sang thì bắc cầu Kiều, muốn con hay chữ thì yêu lấy thầy."
          </p>
          <span className="font-mono text-[10px] text-[#FFDF73]/90 uppercase tracking-widest mt-1">
            — Ca dao / Tục ngữ Việt Nam
          </span>
          <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">
            LƯU GIỮ VĨNH VIỄN BỞI CÁC THẾ HỆ HỌC TRÒ
          </span>
        </div>

        <Magnetic strength={0.4}>
          <button
            onClick={scrollToTop}
            aria-label="Cuộn về đầu trang"
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 hover:bg-terracotta text-white border border-white/20 transition-all shadow-md group"
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em] font-semibold">
              Về Đầu Trang
            </span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </Magnetic>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-white/40 font-mono text-[10px] uppercase tracking-wider gap-2">
        <span>© 2026 NGƯỜI LÁI ĐÒ THẦM LẶNG • BẢN QUYỀN TRI ÂN</span>
        <span>LƯU NIỆM NGÀY NHÀ GIÁO VIỆT NAM 20/11</span>
      </div>
    </footer>
  );
};
