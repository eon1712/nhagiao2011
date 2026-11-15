"use client";

import React from "react";
import { motion } from "framer-motion";
import { SplittingText } from "../animate-ui/SplittingText";
import { ChalkWaterCanvas } from "../canvas/ChalkWaterCanvas";
import { PaperBoat } from "./PaperBoat";
import Image from "next/image";

interface HeroSectionProps {
  onExploreClick: () => void;
}

const HERO_GALLERY_PHOTOS = [
  {
    src: "/assets/1WUpukuqeiEaHW28OKkAz32C19BaKybOgQtgHnep6FM0SYQR0J7vPWTHj0toGFcKCo5.jpg",
    code: "ẢNH LƯU NIỆM #02",
    tag: "HỘI THI GIÁO VIÊN GIỎI",
    badge: "KỶ NIỆM 20.11",
    quote: "Rạng rỡ sắc hoa trong ngày hội tôn vinh trí tuệ và tâm huyết nhà giáo.",
    rotate: -1.5,
  },
  {
    src: "/assets/1WUpukuqeiEbiN73jcMVcWVmcnRRKqoSx7q792aXDpOoq31lDYLdsf8bxXhKEzcE8oe.jpg",
    code: "ẢNH LƯU NIỆM #03",
    tag: "BỤI PHẤN BÀI GIẢNG",
    badge: "TIẾT DẠY KỶ NIỆM",
    quote: "Mỗi nét phấn trên bảng đen là cả tấm lòng tận tụy vì thế hệ học trò.",
    rotate: 1.2,
  },
  {
    src: "/assets/2aOboRCJvHGzm64nNx1Gq9Myge4oVjaXujGVuvNQ.jpg",
    code: "ẢNH LƯU NIỆM #04",
    tag: "TRI ÂN THẦY CÔ",
    badge: "TẬP THỂ ĐOÀN KẾT",
    quote: "Một tập thể mạnh là nơi không ai bị bỏ lại phía sau trên hành trình tri thức.",
    rotate: -1,
  },
  {
    src: "/assets/2aOboRCJvHTYD1O6SOiOy1DabOVxFoGt2WxlxbVo.jpg",
    code: "ẢNH LƯU NIỆM #05",
    tag: "BÚT HOA LƯU DẤU",
    badge: "20.11 — 12A1",
    quote: "Bút hoa lưu dấu thời gian, ân sư khai trí dặm ngàn thênh thang.",
    rotate: 1.5,
  },
  {
    src: "/assets/1WUpukuqeiEbiN73jcMVcWUBXgahOnHZrAiJN4FeVWGffujoA3he7XLknvT9PXTJgvL.jpg",
    code: "ẢNH LƯU NIỆM #06",
    tag: "THANH XUÂN BỤI PHẤN",
    badge: "DẤU ẤN TRƯỜNG XƯA",
    quote: "Những khoảnh khắc dịu dàng và ấm áp bên bảng đen phấn trắng thân thương.",
    rotate: -1.2,
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick }) => {
  const heroImage = "/assets/825329851_1721919033274053_8035046475159388948_n.jpg";

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col justify-between paper-pattern border-b border-ink-primary/10 overflow-hidden pt-6 sm:pt-8 pb-8 px-4 sm:px-8 md:px-16">
      <ChalkWaterCanvas />

      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full flex flex-col items-center justify-center text-center pb-4 pt-1 select-none"
      >
        <span className="font-display font-bold text-lg sm:text-2xl md:text-3xl text-ink-primary uppercase tracking-[0.16em] sm:tracking-[0.2em]">
          Trường THPT Ngô Gia Tự
        </span>
        <div className="flex items-center justify-center gap-3 mt-1 sm:mt-1.5">
          <span className="h-[1px] w-6 sm:w-12 bg-terracotta/40" />
          <span className="font-mono text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.22em] text-terracotta font-semibold">
            Tổ Khoa học tự nhiên
          </span>
          <span className="h-[1px] w-6 sm:w-12 bg-terracotta/40" />
        </div>
      </motion.div>

      <div className="relative z-10 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-ink-primary/15 pb-4 gap-2">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2.5 h-2.5 bg-terracotta rounded-full animate-pulse" />
          <span className="font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.25em] text-ink-primary font-medium">
            [20.11] — TRI ÂN NHÀ GIÁO VIỆT NAM
          </span>
        </div>

        <div className="flex items-center gap-4 text-ink-faint font-mono text-[11px] uppercase tracking-wider">
          <span>KỶ NIỆM VĨNH CỬU</span>
          <span className="hidden md:inline">•</span>
          <span className="hidden md:inline">NGƯỜI LÁI ĐÒ THẦM LẶNG</span>
        </div>
      </div>

      <div className="relative z-10 my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-[1px] w-8 bg-terracotta" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-terracotta font-semibold">
              KHÚC CA NGƯỜI LÁI ĐÒ
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-display font-bold text-ink-primary leading-[1.08] tracking-tight mb-6">
            <SplittingText
              as="span"
              text="Nghề cao quý nhất trong những nghề cao quý..."
              type="words"
              stagger={0.06}
              delay={0.2}
            />
          </h1>

          <div className="font-body text-base sm:text-lg md:text-xl text-ink-muted leading-relaxed max-w-2xl mb-8 border-l-2 border-terracotta/40 pl-4 sm:pl-6 italic">
            <SplittingText
              as="span"
              text="&quot;Nghề dạy học là nghề cao quý nhất trong những nghề cao quý, nghề sáng tạo nhất trong những nghề sáng tạo.&quot; — Cố Thủ tướng Phạm Văn Đồng"
              type="words"
              stagger={0.03}
              delay={0.6}
            />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreClick}
              className="px-6 py-3.5 bg-ink-primary text-paper rounded-full font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-terracotta transition-all shadow-md active:scale-95"
            >
              Chuyến Đò Kỷ Niệm ↓
            </button>
            <a
              href="#tribute-studio"
              className="px-6 py-3.5 border border-ink-primary/20 text-ink-primary rounded-full font-mono text-[11px] uppercase tracking-[0.2em] hover:border-terracotta hover:text-terracotta transition-all"
            >
              Viết Lời Tri Ân →
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 1.5 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="relative w-full max-w-[340px] sm:max-w-[400px] bg-paper-light p-4 sm:p-5 border border-ink-primary/15 shadow-xl rotate-1 group"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-ink-primary/20 bg-paper-dark">
              <Image
                src={heroImage}
                alt="Tri ân thầy cô giáo Việt Nam"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover transition-transform duration-700 group-hover:scale-105 filter sepia-[0.15] contrast-[1.05]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-primary/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute top-3 right-3 bg-paper/90 backdrop-blur-sm border border-ink-primary/30 px-2.5 py-1 text-center shadow">
                <span className="font-mono text-[9px] uppercase tracking-widest text-terracotta font-bold block">
                  BƯU CHÍNH 20.11
                </span>
                <span className="font-mono text-[8px] text-ink-primary block">
                  VIỆT NAM
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="font-mono text-[9px] uppercase tracking-widest text-gold block mb-0.5">
                  KHO BÁU KÝ ỨC
                </span>
                <p className="font-display italic text-sm sm:text-base leading-snug drop-shadow">
                  "Ơn dạy dỗ cao dường hơn núi, nghĩa thầy cô như biển rộng bao la."
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-ink-muted">
              <span className="font-mono text-[10px] tracking-wider uppercase">
                ẢNH LƯU NIỆM #01
              </span>
              <span className="font-mono text-[10px] text-terracotta font-bold">
                NGƯỜI LÁI ĐÒ
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 w-full py-6 sm:py-10 flex flex-wrap justify-center gap-6 sm:gap-8">
        {HERO_GALLERY_PHOTOS.map((photo, index) => (
          <motion.div
            key={photo.src}
            initial={{ opacity: 0, y: 20, scale: 0.96, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotate: photo.rotate }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
            className="relative w-full max-w-[340px] sm:max-w-[400px] bg-paper-light p-4 sm:p-5 border border-ink-primary/15 shadow-xl group"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-ink-primary/20 bg-paper-dark">
              <Image
                src={photo.src}
                alt={photo.tag}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover transition-transform duration-700 group-hover:scale-105 filter sepia-[0.15] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-primary/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute top-3 right-3 bg-paper/90 backdrop-blur-sm border border-ink-primary/30 px-2.5 py-1 text-center shadow">
                <span className="font-mono text-[9px] uppercase tracking-widest text-terracotta font-bold block">
                  {photo.badge}
                </span>
                <span className="font-mono text-[8px] text-ink-primary block">
                  VIỆT NAM
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="font-mono text-[9px] uppercase tracking-widest text-gold block mb-0.5">
                  KHO BÁU KÝ ỨC
                </span>
                <p className="font-display italic text-sm sm:text-base leading-snug drop-shadow">
                  &quot;{photo.quote}&quot;
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-ink-muted">
              <span className="font-mono text-[10px] tracking-wider uppercase">
                {photo.code}
              </span>
              <span className="font-mono text-[10px] text-terracotta font-bold">
                {photo.tag}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 w-full flex justify-center pt-4 pb-2">
        <PaperBoat onScrollClick={onExploreClick} />
      </div>
    </section>
  );
};
