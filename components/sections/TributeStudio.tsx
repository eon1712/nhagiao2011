"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { RippleButton } from "../animate-ui/RippleButton";
import { Tribute, getTributes, saveTribute, encodeTributeToUrl } from "../../utils/storage";
import { TributeReaderModal } from "./TributeReaderModal";
import {
  Sparkles,
  Send,
  Search,
  BookOpen,
  CheckCircle,
  Share2,
  Eye,
  Heart,
} from "lucide-react";

const CURATED_POEMS = [
  "\"Khi thầy viết bảng, bụi phấn rơi rơi, có hạt bụi nào rơi trên bục giảng, có hạt bụi nào rơi trên tóc thầy... Em yêu phút giây này, thầy em tóc như bạc thêm vì bụi phấn, để cho chúng em bài học hay.\" — Trích ca khúc \"Bụi Phấn\" (Nhạc & Lời: Vũ Hoàng & Lê Văn Lộc)",
  "\"Người thầy giáo tốt – thầy giáo xứng đáng là thầy giáo – là người vẻ vang nhất. Dù tên tuổi không đăng trên báo, không được thưởng huân chương, song những người thầy giáo tốt là những người anh hùng vô danh.\" — Chủ tịch Hồ Chí Minh (Phát biểu tại ĐH Sư phạm Hà Nội, 1964)",
  "\"Hiền tài là nguyên khí của quốc gia, nguyên khí thịnh thì thế nước mạnh, rồi lên cao; nguyên khí suy thì thế nước yếu, rồi xuống thấp. Vì thế việc chăm lo bồi dưỡng nhân tài, tôn vinh người thầy luôn là nền tảng quốc gia.\" — Tiến sĩ Thân Nhân Trung (Văn bia Quốc Tử Giám, 1484)",
  "\"Bàn chân thầy gửi lại chiến trường, để lại một phần máu xương vì Tổ quốc. Về lại mái trường xưa bục giảng thân thương, tiếng gõ phấn vẫn dạt dào mơ ước, dẫn lối đưa bao thế hệ học trò vào đời.\" — Trích bài thơ \"Bàn Chân Thầy Giáo\" (Nhà thơ Trần Đăng Khoa)",
  "\"Bàn tay cô giáo tết tóc cho em, về nhà mẹ khen tay cô khéo quá. Bàn tay cô giáo vá áo cho em, như tay chị cả, như tay mẹ hiền... Nắn từng nét chữ đầu đời nâng bước tương lai.\" — Trích bài thơ \"Bàn Tay Cô Giáo\" (Nhà thơ Định Hải)",
  "\"Ngọc không mài không thành đồ vật, người không học không biết rõ đạo lý làm người. Kính trọng người thầy và chăm chỉ học hành chính là gốc rễ của sự thành nhân và hưng thịnh non sông.\" — Danh sĩ La Sơn Phu Tử Nguyễn Thiếp (Tấu bàn việc học gửi vua Quang Trung, 1791)",
];

export const TributeStudio: React.FC = () => {
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [theme, setTheme] = useState<"giay-do" | "bang-den" | "son-mai">("giay-do");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [poemIndex, setPoemIndex] = useState(0);

  const [tributesList, setTributesList] = useState<Tribute[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTheme, setFilterTheme] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [readingTribute, setReadingTribute] = useState<Tribute | null>(null);
  const [newlyCreatedTribute, setNewlyCreatedTribute] = useState<Tribute | null>(null);
  const [shareUrl, setShareUrl] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    loadTributes();
  }, []);

  const loadTributes = async () => {
    const list = await getTributes();
    setTributesList(list);
  };

  const cyclePoemSuggestion = () => {
    const nextIdx = (poemIndex + 1) % CURATED_POEMS.length;
    setPoemIndex(nextIdx);
    setMessage(CURATED_POEMS[nextIdx]);
  };

  const triggerPetalBurst = () => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const end = Date.now() + 3000;

    const frame = () => {
      confetti({
        particleCount: isMobile ? 3 : 6,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ["#C85A32", "#C59B27", "#EFE9DE", "#FFDF73"],
        disableForReducedMotion: true,
      });
      confetti({
        particleCount: isMobile ? 3 : 6,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#C85A32", "#C59B27", "#EFE9DE", "#FFDF73"],
        disableForReducedMotion: true,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleSaveTribute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) {
      alert("Vui lòng nhập tên của bạn và lời tri ân gửi đến thầy cô.");
      return;
    }

    setIsSubmitting(true);

    try {
      const saved = await saveTribute({
        author: author.trim(),
        message: message.trim(),
        theme,
      });

      setNewlyCreatedTribute(saved);
      const permalink = encodeTributeToUrl(saved);
      setShareUrl(permalink);

      triggerPetalBurst();
      setAuthor("");
      setMessage("");
      await loadTributes();
    } catch (err) {
      console.error("Submission failed", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyShareLink = () => {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const filteredTributes = tributesList.filter((item) => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      item.author.toLowerCase().includes(q) ||
      item.message.toLowerCase().includes(q);
    const matchTheme = filterTheme === "all" || item.theme === filterTheme;
    return matchSearch && matchTheme;
  });

  const totalPages = Math.ceil(filteredTributes.length / itemsPerPage) || 1;
  const paginatedTributes = filteredTributes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getThemeClass = (th: string) => {
    switch (th) {
      case "bang-den":
        return "bg-[#182620] text-white border-white/20";
      case "son-mai":
        return "bg-[#351613] text-[#F9F5EE] border-[#C59B27]/40";
      default:
        return "bg-[#FAF7F2] text-ink-primary border-ink-primary/20";
    }
  };

  const getThemeName = (th: string) => {
    switch (th) {
      case "bang-den":
        return "Bảng Đen";
      case "son-mai":
        return "Sơn Mài";
      default:
        return "Giấy Dó";
    }
  };

  return (
    <section
      id="tribute-studio"
      className="relative w-full py-16 sm:py-24 paper-pattern border-b border-ink-primary/10 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 bg-terracotta rounded-full animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-terracotta font-semibold">
              PHẦN [03] — SỔ VÀNG TRI ÂN
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-ink-primary tracking-tight">
            Gửi & Lưu Giữ Lời Tri Ân Vĩnh Viễn
          </h2>
          <p className="font-body text-ink-muted text-sm sm:text-base mt-3 leading-relaxed">
            Nơi các bạn học sinh gửi gắm những dòng tâm sự, lòng biết ơn sâu sắc nhất gửi đến thầy cô kính yêu và lưu giữ vĩnh viễn vào Sổ Vàng.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-[#FCFAF7] border border-ink-primary/15 p-6 sm:p-9 rounded-sm shadow-md">
          <form onSubmit={handleSaveTribute} className="space-y-5">
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-ink-primary font-semibold mb-1.5">
                Họ Và Tên Học Sinh / Lớp <span className="text-terracotta">*</span>
              </label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Ví dụ: Nguyễn Văn An — Lớp 12A3"
                className="w-full px-4 py-2.5 bg-paper border border-ink-primary/20 rounded-sm font-body text-sm focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta/30 transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block font-mono text-xs uppercase tracking-wider text-ink-primary font-semibold">
                  Lời Tri Ân Sâu Sắc <span className="text-terracotta">*</span>
                </label>
                <button
                  type="button"
                  onClick={cyclePoemSuggestion}
                  className="text-xs font-mono text-terracotta hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span>Gợi ý văn học ({poemIndex + 1}/{CURATED_POEMS.length})</span>
                </button>
              </div>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Gửi gắm những tâm sự, lòng biết ơn chân thành nhất của bạn đến thầy cô..."
                className="w-full px-4 py-3 bg-paper border border-ink-primary/20 rounded-sm font-display text-base sm:text-lg italic leading-relaxed focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta/30 transition-all"
              />
            </div>

            <div>
              <span className="block font-mono text-xs uppercase tracking-wider text-ink-faint mb-2 font-semibold">
                Chất Liệu Bức Thiệp Lưu Trữ
              </span>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "giay-do", label: "Giấy Dó Cổ", desc: "Mộc mạc & hoài niệm", bg: "bg-[#FAF7F2] text-ink-primary" },
                  { id: "bang-den", label: "Bảng Đen Phấn", desc: "Nét phấn bảng xưa", bg: "bg-[#182620] text-white" },
                  { id: "son-mai", label: "Sơn Mài Son", desc: "Sang trọng & tôn nghiêm", bg: "bg-[#351613] text-[#FFDF73]" },
                ].map((th) => (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => setTheme(th.id as any)}
                    className={`p-2.5 rounded-sm border text-center transition-all flex flex-col items-center justify-center ${
                      theme === th.id
                        ? "border-terracotta ring-2 ring-terracotta shadow-md font-bold scale-[1.02]"
                        : "border-ink-primary/15 opacity-75 hover:opacity-100"
                    } ${th.bg}`}
                  >
                    <span className="font-mono text-xs uppercase tracking-wider block">
                      {th.label}
                    </span>
                    <span className="text-[10px] opacity-75 mt-0.5 hidden sm:block">
                      {th.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <RippleButton
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-terracotta to-[#B34A26] hover:brightness-105 text-white rounded-full font-mono text-xs uppercase tracking-[0.2em] shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 font-bold cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? "Đang Lưu Vào Sổ Vàng..." : "Lưu Lời Tri Ân Vào Sổ Vàng Vĩnh Viễn"}</span>
              </RippleButton>
            </div>
          </form>

          {newlyCreatedTribute && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-sm bg-emerald-50 border border-emerald-300 text-ink-primary shadow-sm"
            >
              <div className="flex items-center gap-2 text-emerald-800 font-mono text-xs font-bold mb-1">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Lời Tri Ân Đã Được Lưu Trữ Vĩnh Viễn Vào Sổ Vàng!</span>
              </div>
              <p className="font-body text-xs text-ink-muted mb-3">
                Cảm ơn bạn đã gửi gắm lòng biết ơn. Bức thư của bạn đã được ghi danh trên máy chủ và sinh liên kết vĩnh cửu.
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyShareLink}
                  className="flex-1 py-2 px-3 bg-terracotta hover:bg-[#B34A26] text-white rounded font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors font-semibold"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? "Đã Sao Chép!" : "Sao Chép Liên Kết Chia Sẻ"}</span>
                </button>

                <button
                  onClick={() => setReadingTribute(newlyCreatedTribute)}
                  className="py-2 px-3 border border-ink-primary/20 hover:border-terracotta rounded font-mono text-xs uppercase tracking-wider flex items-center gap-1 text-ink-primary transition-colors bg-white"
                >
                  <Eye className="w-3.5 h-3.5 text-terracotta" />
                  <span>Xem Chi Tiết</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>

        <div className="mt-20 pt-10 border-t border-ink-primary/15">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="w-4 h-4 text-terracotta" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-terracotta font-semibold">
                  SỔ VÀNG LƯU NIỆM VĨNH VIỄN
                </span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-ink-primary">
                Tất Cả Lời Tri Ân Của Học Sinh ({filteredTributes.length})
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex items-center gap-1 bg-paper-dark p-1 rounded-full border border-ink-primary/10">
                {[
                  { id: "all", label: "Tất Cả" },
                  { id: "giay-do", label: "Giấy Dó" },
                  { id: "bang-den", label: "Bảng Đen" },
                  { id: "son-mai", label: "Sơn Mài" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      setFilterTheme(f.id);
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                      filterTheme === f.id
                        ? "bg-terracotta text-white font-semibold shadow-sm"
                        : "text-ink-muted hover:text-ink-primary"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-ink-faint absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Tìm theo tên học sinh..."
                  className="w-full pl-9 pr-4 py-2 bg-paper-light border border-ink-primary/20 rounded-full font-body text-xs focus:outline-none focus:border-terracotta transition-colors"
                />
              </div>
            </div>
          </div>

          {filteredTributes.length === 0 ? (
            <div className="py-16 px-4 text-center border border-dashed border-ink-primary/20 rounded-sm bg-white/50 max-w-xl mx-auto my-6">
              <Heart className="w-8 h-8 text-terracotta mx-auto mb-3 opacity-60 animate-pulse" />
              <h4 className="font-display font-bold text-xl text-ink-primary">
                Sổ Vàng Đang Mở Chờ Đón Bạn
              </h4>
              <p className="font-body text-ink-muted text-sm mt-2 max-w-md mx-auto leading-relaxed">
                Chưa có lời tri ân nào được ghi vào Sổ Vàng. Hãy là người đầu tiên gửi gắm những lời tri ân chân thành nhất của mình vào Sổ Vàng để được lưu giữ vĩnh viễn!
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedTributes.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -5 }}
                    onClick={() => setReadingTribute(item)}
                    className={`p-6 rounded-sm border shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden ${getThemeClass(
                      item.theme
                    )}`}
                  >
                    <div className="flex justify-between items-start gap-2 mb-3">
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-terracotta font-semibold block">
                          HỌC SINH TRI ÂN:
                        </span>
                        <h4 className="font-display font-bold text-lg leading-tight group-hover:text-terracotta transition-colors mt-0.5">
                          {item.author}
                        </h4>
                      </div>

                      <span className="px-2 py-0.5 rounded-full border border-current/25 font-mono text-[9px] uppercase tracking-wider opacity-75">
                        {getThemeName(item.theme)}
                      </span>
                    </div>

                    <p className="font-display italic text-sm sm:text-base opacity-95 line-clamp-4 leading-relaxed mb-5">
                      "{item.message}"
                    </p>

                    <div className="border-t border-current/10 pt-2.5 flex items-center justify-between text-[10px] font-mono opacity-80">
                      <span className="text-terracotta font-semibold flex items-center gap-1">
                        <span>Lưu Trữ Vĩnh Viễn</span>
                        <span>✦</span>
                      </span>
                      <span className="group-hover:underline flex items-center gap-1 font-bold text-terracotta">
                        <span>Xem Chi Tiết</span>
                        <span>→</span>
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-8">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="px-4 py-1.5 border border-ink-primary/20 rounded-full font-mono text-xs uppercase disabled:opacity-30 hover:border-terracotta hover:text-terracotta transition-colors"
                  >
                    Trang Trước
                  </button>
                  <span className="font-mono text-xs text-ink-muted">
                    Trang {currentPage} / {totalPages}
                  </span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="px-4 py-1.5 border border-ink-primary/20 rounded-full font-mono text-xs uppercase disabled:opacity-30 hover:border-terracotta hover:text-terracotta transition-colors"
                  >
                    Trang Sau
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <TributeReaderModal
        tribute={readingTribute}
        onClose={() => setReadingTribute(null)}
      />
    </section>
  );
};
