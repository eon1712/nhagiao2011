import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Be_Vietnam_Pro, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["vietnamese", "latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-be-vietnam",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Người Lái Đò Thầm Lặng — Tri Ân Ngày Nhà Giáo Việt Nam 20/11",
  description: "Trang tri ân tương tác lưu giữ kỷ niệm và gửi gắm những lời tri ân thiêng liêng đến thầy cô giáo nhân ngày Nhà Giáo Việt Nam 20/11.",
  keywords: ["20/11", "Nhà giáo Việt Nam", "Người lái đò", "Tri ân thầy cô", "Tribute Web"],
  authors: [{ name: "Học Trò Tri Ân" }],
  openGraph: {
    title: "Người Lái Đò Thầm Lặng — Tri Ân Ngày Nhà Giáo Việt Nam 20/11",
    description: "Nghề dạy học là nghề cao quý nhất trong những nghề cao quý, nghề sáng tạo nhất trong những nghề sáng tạo. — Cố Thủ tướng Phạm Văn Đồng",
    url: "https://nguoilaido.vn",
    siteName: "Tri Ân 20/11",
    locale: "vi_VN",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F3EB",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${cormorant.variable} ${beVietnam.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-paper text-ink-primary font-body relative selection:bg-terracotta selection:text-white">
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
