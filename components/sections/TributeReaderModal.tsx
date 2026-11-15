"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tribute, encodeTributeToUrl } from "../../utils/storage";
import { X, Share2, Check, QrCode } from "lucide-react";
import QRCode from "qrcode";

interface TributeReaderModalProps {
  tribute: Tribute | null;
  onClose: () => void;
}

export const TributeReaderModal: React.FC<TributeReaderModalProps> = ({
  tribute,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [showQr, setShowQr] = useState(false);

  useEffect(() => {
    if (tribute) {
      setShowQr(false);
      const url = encodeTributeToUrl(tribute);
      QRCode.toDataURL(url, { width: 220, margin: 1 })
        .then(setQrDataUrl)
        .catch(console.error);
    }
  }, [tribute]);

  if (!tribute) return null;

  const handleCopyLink = () => {
    const url = encodeTributeToUrl(tribute);
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getThemeStyles = () => {
    switch (tribute.theme) {
      case "bang-den":
        return "bg-[#182620] text-white border-white/20";
      case "son-mai":
        return "bg-[#351613] text-[#F9F5EE] border-[#C59B27]/40";
      default:
        return "bg-[#FAF7F2] text-ink-primary border-ink-primary/20";
    }
  };

  const getThemeName = () => {
    switch (tribute.theme) {
      case "bang-den":
        return "Bảng Đen Phấn";
      case "son-mai":
        return "Sơn Mài Son";
      default:
        return "Giấy Dó Cổ";
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 sm:p-6 bg-ink-primary/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          className="relative w-full max-w-xl max-h-[90dvh] overflow-y-auto bg-paper rounded-sm p-6 sm:p-8 shadow-2xl border border-ink-primary/15"
        >
          <button
            onClick={onClose}
            aria-label="Đóng thư"
            className="absolute top-4 right-4 p-2 bg-ink-primary/10 hover:bg-ink-primary/20 rounded-full transition-colors z-30 cursor-pointer"
          >
            <X className="w-5 h-5 text-ink-primary" />
          </button>

          <div className="flex items-center justify-between border-b border-ink-primary/10 pb-3 mb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-terracotta font-semibold">
              LỜI TRI ÂN LƯU TRỮ VĨNH VIỄN
            </span>
            <span className="font-mono text-[10px] text-ink-faint">
              SỔ VÀNG 20/11
            </span>
          </div>

          <div className="relative w-full flex flex-col items-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`w-full p-6 sm:p-8 rounded-sm shadow-lg border relative ${getThemeStyles()}`}
            >
              <div className="flex justify-between items-start mb-6 border-b border-current/15 pb-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider opacity-60 block">
                    Học sinh gửi trọn tri ân:
                  </span>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-terracotta mt-0.5">
                    {tribute.author}
                  </h3>
                </div>

                <span className="px-3 py-1 rounded-full border border-current/30 font-mono text-xs uppercase tracking-wider opacity-80">
                  {getThemeName()}
                </span>
              </div>

              <div className="my-6 py-2">
                <p className="font-display text-lg sm:text-xl md:text-2xl leading-relaxed italic whitespace-pre-line">
                  "{tribute.message}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-current/15 text-xs font-mono opacity-80">
                <span className="text-terracotta font-semibold">✦ ĐÃ LƯU TRỮ VĨNH CỬU</span>
                <span>VIỆT NAM • 20/11</span>
              </div>
            </motion.div>
          </div>

          <div className="mt-6 pt-4 border-t border-ink-primary/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-4 py-2 bg-ink-primary text-paper rounded-full font-mono text-xs uppercase tracking-wider hover:bg-terracotta transition-colors active:scale-95 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-300" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? "Đã Sao Chép Liên Kết" : "Sao Chép Liên Kết"}</span>
              </button>

              <button
                onClick={() => setShowQr(!showQr)}
                className="flex items-center gap-1.5 px-3 py-2 border border-ink-primary/20 rounded-full font-mono text-xs uppercase tracking-wider text-ink-primary hover:border-terracotta transition-colors cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5 text-terracotta" />
                <span>{showQr ? "Ẩn Mã QR" : "Mã QR"}</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 font-mono text-xs uppercase tracking-wider text-ink-muted hover:text-ink-primary cursor-pointer"
            >
              Đóng
            </button>
          </div>

          {showQr && qrDataUrl && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-ink-primary/10 flex flex-col items-center justify-center text-center"
            >
              <img
                src={qrDataUrl}
                alt="QR Code Lời Tri Ân"
                className="w-40 h-40 p-2 bg-white rounded shadow border border-ink-primary/10"
              />
              <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted mt-2">
                Quét mã để mở và lưu giữ lời tri ân này trên thiết bị di động
              </span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
