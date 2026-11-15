"use client";

import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import { Preloader } from "../components/sections/Preloader";
import { Cursor } from "../components/animate-ui/Cursor";
import { HeroSection } from "../components/sections/HeroSection";
import { TimeFerrySection } from "../components/sections/TimeFerrySection";
import { TributeStudio } from "../components/sections/TributeStudio";
import { Footer } from "../components/sections/Footer";
import { TributeReaderModal } from "../components/sections/TributeReaderModal";
import { Tribute, decodeTributeFromUrl, getTributes } from "../utils/storage";

export default function HomePage() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [sharedTribute, setSharedTribute] = useState<Tribute | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const reqId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(reqId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const tributeId = params.get("tributeId");

    if (tributeId) {
      const fromUrl = decodeTributeFromUrl(params);
      if (fromUrl) {
        setSharedTribute(fromUrl);
      } else {
        getTributes().then((list) => {
          const match = list.find((t) => t.id === tributeId);
          if (match) {
            setSharedTribute(match);
          }
        });
      }
    }
  }, []);

  const handleScrollToFerry = () => {
    const el = document.getElementById("time-ferry");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-[100dvh] w-full overflow-x-hidden">
      <Cursor />
      <Preloader onComplete={() => setPreloaderDone(true)} />
      <HeroSection onExploreClick={handleScrollToFerry} />
      <TimeFerrySection />
      <TributeStudio />
      <Footer />
      <TributeReaderModal
        tribute={sharedTribute}
        onClose={() => setSharedTribute(null)}
      />
    </main>
  );
}
