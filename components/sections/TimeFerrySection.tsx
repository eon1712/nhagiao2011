"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Sparkles, BookOpen, Clock, Heart, Maximize2 } from "lucide-react";

const LOCAL_GALLERY = [
  {
    src: "/assets/825329851_1721919033274053_8035046475159388948_n.jpg",
    title: "Tận Tụy Từng Bài Giảng",
    caption: "Ân cần chỉ dẫn từng bài học, mở ra chân trời tri thức mới cho các thế hệ học trò thân yêu.",
    rotation: "-2deg",
  },
  {
    src: "/assets/834018282_1731097372356219_1165087414328172268_n.jpg",
    title: "Bài Học Về Trách Nhiệm",
    caption: "Không chỉ dạy chữ, thầy cô còn gieo mầm nhân cách và rèn giũa tinh thần trách nhiệm làm người.",
    rotation: "1.5deg",
  },
  {
    src: "/assets/842056025_1734243325374957_3180125388798128_n.jpg",
    title: "Tâm Huyết Dưới Mái Trường",
    caption: "Những nụ cười rạng ngời và ngọn lửa nhiệt huyết son sắt của tập thể thầy cô vì sự nghiệp trồng người.",
    rotation: "-1.2deg",
  },
  {
    src: "/assets/846137088_1740119368120686_7436062164744033092_n.jpg",
    title: "Khoảnh Khắc Vinh Danh",
    caption: "Ánh mắt tự hào của thầy cô khi chứng kiến những bông hoa thành tích nở rộ sau bao ngày nỗ lực.",
    rotation: "2deg",
  },
];

const CHAPTERS = [
  { id: 0, tag: "01", title: "Bụi Phấn Trắng", subtitle: "Bảng đen, phấn trắng & bài học đầu đời" },
  { id: 1, tag: "02", title: "Trang Giáo Án", subtitle: "Trang thơ tri ân & giọt mực thời gian" },
  { id: 2, tag: "03", title: "Khoảnh Khắc Kỷ Niệm", subtitle: "Phòng trưng bày ảnh thực tế của trường" },
];

export const TimeFerrySection: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof LOCAL_GALLERY[0] | null>(null);
  const [activeChapter, setActiveChapter] = useState(0);

  const nextChapter = () => {
    setActiveChapter((prev) => (prev + 1) % CHAPTERS.length);
  };

  const prevChapter = () => {
    setActiveChapter((prev) => (prev - 1 + CHAPTERS.length) % CHAPTERS.length);
  };

  return (
    <section
      id="time-ferry"
      className="relative w-full bg-[#16211C] text-white py-16 sm:py-24 border-b border-white/10 transition-colors duration-700 overflow-hidden"
    >
      <div className="absolute inset-0 chalk-pattern opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold font-medium">
                CHƯƠNG [02] — BẢO TÀNG KÝ ỨC
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              Chuyến Đò Thời Gian
            </h2>
            <p className="font-body text-white/70 text-sm sm:text-base mt-2 max-w-xl">
              Lần giở từng hồi ức về mái trường xưa, bảng đen phấn trắng và những chuyến đò đưa bao thế hệ học trò cập bến tương lai.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {CHAPTERS.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setActiveChapter(ch.id)}
                className={`relative px-4 py-2 rounded-full text-xs font-mono transition-all flex items-center gap-2 ${
                  activeChapter === ch.id
                    ? "text-white font-semibold"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {activeChapter === ch.id && (
                  <motion.div
                    layoutId="activeChapterPill"
                    className="absolute inset-0 bg-terracotta rounded-full shadow-md z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10 font-bold">{ch.tag}</span>
                <span className="relative z-10">{ch.title}</span>
              </button>
            ))}

            <div className="flex items-center gap-1 ml-2 border-l border-white/15 pl-3">
              <button
                onClick={prevChapter}
                aria-label="Chương trước"
                className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextChapter}
                aria-label="Chương tiếp theo"
                className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {activeChapter === 0 && (
              <motion.div
                key="chapter-0"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="w-full bg-[#18261F] border-8 border-[#6B4226] p-6 sm:p-10 md:p-12 rounded-lg shadow-2xl relative overflow-hidden select-none"
              >
                <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-[#4A2D19] via-[#85512F] to-[#4A2D19] shadow" />

                <div className="flex items-center justify-between border-b border-white/20 pb-4 mb-8">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FFDF73] animate-pulse" />
                    <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-[#FFDF73] font-semibold">
                      01 • TIẾT HỌC BÊN BỤI PHẤN TRẮNG
                    </span>
                  </div>
                  <span className="font-mono text-xs text-white/70 uppercase tracking-wider">
                    NĂM THÁNG KHÔNG QUÊN
                  </span>
                </div>

                <div className="text-center py-4 relative z-10 max-w-3xl mx-auto">
                  <div className="font-display italic text-2xl sm:text-3xl md:text-4xl text-white/95 leading-relaxed tracking-wide drop-shadow-[0_2px_12px_rgba(255,255,255,0.18)]">
                    <p className="mb-2">"Nghề dạy học là nghề cao quý nhất trong những nghề cao quý,</p>
                    <p>nghề sáng tạo nhất trong những nghề sáng tạo."</p>
                  </div>
                  <div className="mt-4 font-mono text-xs sm:text-sm text-[#FFDF73] uppercase tracking-[0.2em] font-semibold">
                    — Cố Thủ tướng Phạm Văn Đồng
                  </div>

                  <div className="my-8 flex justify-center">
                    <div className="inline-flex items-center gap-3 sm:gap-4 px-6 py-2.5 rounded-full border border-dashed border-[#FFDF73]/60 bg-white/[0.06] backdrop-blur-sm shadow-md">
                      <span className="text-sm text-[#FFDF73] select-none">✦</span>
                      <span className="font-display italic text-lg sm:text-2xl text-[#FFDF73] font-semibold tracking-wider">
                        Công Ơn Dạy Dỗ = Vô Cực (∞) • 20.11
                      </span>
                      <span className="text-sm text-[#FFDF73] select-none">✦</span>
                    </div>
                  </div>

                  <div className="mt-8 pt-4">
                    <div className="relative w-full h-9 bg-gradient-to-r from-[#7D4E2D] via-[#A0673B] to-[#7D4E2D] rounded border border-[#54331C] shadow-lg flex items-center justify-between px-4 sm:px-8 select-none">
                      {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((val) => (
                        <div key={val} className="flex flex-col items-center">
                          <span className="h-2.5 w-[1.5px] bg-[#FFDF73]/80 mb-0.5" />
                          <span className="text-[10px] font-mono text-[#FFDF73] font-medium hidden sm:inline">
                            {val} cm
                          </span>
                          <span className="text-[9px] font-mono text-[#FFDF73] font-medium sm:hidden">
                            {val}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-3 px-2 text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-2 bg-white/90 rounded-sm shadow-sm inline-block rotate-[-2deg]" title="Phấn trắng" />
                        <span className="w-6 h-2 bg-[#FFDF73]/90 rounded-sm shadow-sm inline-block rotate-[3deg]" title="Phấn vàng" />
                        <span className="w-5 h-2 bg-terracotta/90 rounded-sm shadow-sm inline-block rotate-[-1deg]" title="Phấn đỏ" />
                        <span className="text-white/60 text-[11px] ml-1 hidden md:inline">Máng phấn bục giảng</span>
                      </div>

                      <div className="flex items-center gap-1.5 bg-[#422915]/60 px-2.5 py-1 rounded border border-[#754727]/60">
                        <span className="w-3 h-2 bg-[#D4A373] rounded-[1px] inline-block" />
                        <span className="text-amber-200/80 text-[11px]">Xốp lau bảng</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="font-mono text-xs sm:text-sm text-white/85 text-center mt-6 tracking-wide">
                  ✦ "Vì lợi ích mười năm thì phải trồng cây, vì lợi ích trăm năm thì phải trồng người." — Chủ tịch Hồ Chí Minh (1958) ✦
                </p>

                <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-[#422915] via-[#754727] to-[#422915] flex items-center justify-between px-6 text-[10px] font-mono text-amber-200/70 border-t border-[#8E5832]/40">
                  <span>MÁNG PHẤN GỖ LIM</span>
                  <span>TRƯỜNG THPT NGÔ GIA TỰ • 20.11</span>
                </div>
              </motion.div>
            )}

            {activeChapter === 1 && (
              <motion.div
                key="chapter-1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="w-full bg-[#FAF7F2] text-ink-primary p-6 sm:p-12 rounded shadow-2xl relative border border-ink-primary/20 overflow-hidden"
              >
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_27px,#e5ded1_28px)] bg-[size:100%_28px] opacity-75" />
                <div className="absolute top-0 bottom-0 left-8 sm:left-14 w-[1.5px] bg-red-400/80 pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between border-b border-ink-primary/10 pb-4 mb-6 pl-6 sm:pl-12">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
                    02 • GIÁO ÁN ĐÊM KHUYA
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 border border-terracotta/40 rounded text-terracotta font-mono text-[10px] font-bold">
                      ĐÃ PHÊ: ĐẠT ĐIỂM 10 TRI ÂN
                    </span>
                  </div>
                </div>

                <div className="relative z-10 pl-6 sm:pl-12 py-4">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7">
                      <span className="font-mono text-xs text-terracotta uppercase tracking-widest block mb-3 font-semibold">
                        Tác Phẩm: "Lời Ru Của Thầy" — Nhà Thơ Đoàn Vị Thượng
                      </span>

                      <div className="space-y-4 font-display text-xl sm:text-2xl md:text-3xl text-ink-primary leading-relaxed italic">
                        <p>
                          "Mỗi nghề có một lời ru,
                          <br />
                          Dở hay thầy cũng chọn ru khúc này.
                        </p>
                        <p>
                          Lời ru hoá hạt giống cày,
                          <br />
                          Công thầy vun xới cho cây đơm mầm."
                        </p>
                        <p className="text-terracotta font-medium">
                          "Mai rồi con lớn khôn hơn,
                          <br />
                          Vẫn ghi trong dạ nguồn cơn ơn thầy..."
                        </p>
                      </div>

                      <div className="mt-8 pt-4 border-t border-ink-primary/10 flex flex-col sm:flex-row sm:items-center justify-between text-ink-muted text-xs font-mono gap-2">
                        <span>TRÍCH TÁC PHẨM VĂN HỌC TRI ÂN</span>
                        <span className="text-terracotta font-semibold">— Nhà thơ Đoàn Vị Thượng</span>
                      </div>
                    </div>

                    <div className="lg:col-span-5 flex flex-col items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.03, rotate: 0 }}
                        onClick={() =>
                          setSelectedPhoto({
                            src: "/assets/834018282_1731097372356219_1165087414328172268_n.jpg",
                            title: "Bài Học Về Trách Nhiệm",
                            caption: "Không chỉ dạy chữ, thầy cô còn gieo mầm nhân cách và rèn giũa tinh thần trách nhiệm làm người.",
                            rotation: "0deg",
                          })
                        }
                        className="relative w-full max-w-[340px] bg-white p-3.5 pb-5 rounded shadow-xl border border-ink-primary/15 rotate-[2deg] transition-all cursor-pointer group"
                      >
                        <div className="washi-tape absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 rotate-[-2deg] rounded-sm pointer-events-none z-10" />

                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-black/5 border border-ink-primary/10">
                          <Image
                            src="/assets/834018282_1731097372356219_1165087414328172268_n.jpg"
                            alt="Tiết học say mê bên bục giảng"
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-[1.03]"
                          />
                          <div className="absolute inset-0 bg-ink-primary/0 group-hover:bg-ink-primary/15 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <span className="px-3 py-1.5 rounded-full bg-white/90 text-ink-primary font-mono text-[10px] uppercase font-bold flex items-center gap-1 shadow">
                              <Maximize2 className="w-3 h-3 text-terracotta" />
                              <span>Phóng To</span>
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between text-left">
                          <div>
                            <span className="font-mono text-[9px] uppercase tracking-wider text-terracotta font-bold block">
                              KỶ NIỆM BỤI PHẤN & BẢNG ĐEN
                            </span>
                            <p className="font-display italic text-xs text-ink-muted mt-0.5">
                              Tiết học say mê cùng trang giáo án
                            </p>
                          </div>
                          <span className="px-1.5 py-0.5 rounded border border-terracotta/40 text-terracotta font-mono text-[8px] font-bold rotate-[-6deg] bg-[#FAF7F2]">
                            20/11
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeChapter === 2 && (
              <motion.div
                key="chapter-2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FFDF73] font-semibold">
                      03 • PHÒNG TRƯNG BÀY KỶ NIỆM
                    </span>
                    <span className="hidden sm:inline text-white/40 font-mono text-xs">• 4 KHOẢNH KHẮC THÂN THƯƠNG</span>
                  </div>
                  <span className="font-mono text-xs text-white/60">
                    NHẤP VÀO ẢNH ĐỂ PHÓNG TO
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {LOCAL_GALLERY.map((item, idx) => (
                    <motion.div
                      key={item.src}
                      whileHover={{ scale: 1.05, rotate: 0, y: -6 }}
                      style={{ rotate: item.rotation }}
                      onClick={() => setSelectedPhoto(item)}
                      className="bg-paper p-4 pb-6 rounded-sm shadow-xl cursor-pointer group text-ink-primary transition-all border border-ink-primary/15 relative"
                    >
                      <div className="washi-tape absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 rotate-[-2deg] rounded-sm pointer-events-none z-10" />

                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-primary/5 border border-ink-primary/15 rounded-sm">
                        <Image
                          src={item.src}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          className="object-cover group-hover:scale-108 transition-transform duration-500 filter contrast-[1.03]"
                        />
                        <div className="absolute inset-0 bg-ink-primary/0 group-hover:bg-ink-primary/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <span className="px-3 py-1.5 rounded-full bg-white/90 text-ink-primary font-mono text-[10px] uppercase font-bold flex items-center gap-1 shadow">
                            <Maximize2 className="w-3 h-3 text-terracotta" />
                            <span>Phóng To</span>
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 text-center">
                        <h3 className="font-display font-bold text-base sm:text-lg text-ink-primary leading-tight">
                          {item.title}
                        </h3>
                        <p className="font-body text-ink-muted text-xs mt-2 italic leading-relaxed">
                          "{item.caption}"
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 text-center text-white/50 font-mono text-xs">
                  Những khoảnh khắc chân thực, mộc mạc ghi dấu tình thầy trò dưới mái trường thân yêu. Nhấp vào ảnh để xem chi tiết.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-ink-primary/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-paper p-5 sm:p-7 rounded-sm shadow-2xl text-ink-primary border border-ink-primary/20"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                aria-label="Đóng ảnh"
                className="absolute top-4 right-4 p-2 bg-ink-primary/10 hover:bg-ink-primary/20 rounded-full transition-colors z-20"
              >
                <X className="w-5 h-5 text-ink-primary" />
              </button>

              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-ink-primary/20 bg-black/5">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="mt-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-terracotta mb-1 font-semibold">
                    <span>BẢO TÀNG KÝ ỨC 20/11</span>
                    <span>• KỶ NIỆM MÁI TRƯỜNG</span>
                  </div>
                  <h4 className="font-display font-bold text-2xl text-ink-primary">
                    {selectedPhoto.title}
                  </h4>
                  <p className="font-body text-ink-muted text-sm mt-1.5 italic max-w-lg">
                    "{selectedPhoto.caption}"
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const idx = LOCAL_GALLERY.findIndex((p) => p.src === selectedPhoto.src);
                      const prevIdx = (idx - 1 + LOCAL_GALLERY.length) % LOCAL_GALLERY.length;
                      setSelectedPhoto(LOCAL_GALLERY[prevIdx]);
                    }}
                    aria-label="Ảnh trước"
                    className="p-2 rounded-full border border-ink-primary/20 hover:border-terracotta hover:text-terracotta transition-colors flex items-center justify-center bg-white/50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="font-mono text-xs text-ink-faint">
                    {LOCAL_GALLERY.findIndex((p) => p.src === selectedPhoto.src) + 1} / {LOCAL_GALLERY.length}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const idx = LOCAL_GALLERY.findIndex((p) => p.src === selectedPhoto.src);
                      const nextIdx = (idx + 1) % LOCAL_GALLERY.length;
                      setSelectedPhoto(LOCAL_GALLERY[nextIdx]);
                    }}
                    aria-label="Ảnh sau"
                    className="p-2 rounded-full border border-ink-primary/20 hover:border-terracotta hover:text-terracotta transition-colors flex items-center justify-center bg-white/50"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
