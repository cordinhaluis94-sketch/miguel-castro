"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import UploadZone from "@/components/UploadZone";
import HowItWorks from "@/components/HowItWorks";
import StylesShowcase from "@/components/StylesShowcase";
import AnalysisResults from "@/components/AnalysisResults";
import Footer from "@/components/Footer";
import { AnalysisResult } from "@/lib/design-engine";

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [imageUrl, setImageUrl] = useState<string>("");
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup scroll timer on unmount
  useEffect(() => {
    return () => {
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []);

  const handleAnalysisComplete = useCallback(
    (result: AnalysisResult, imgUrl: string) => {
      setAnalysisResult(result);
      setImageUrl(imgUrl);

      scrollTimerRef.current = setTimeout(() => {
        document
          .getElementById("results")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    },
    []
  );

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <UploadZone onAnalysisComplete={handleAnalysisComplete} />
      <HowItWorks />
      <StylesShowcase />

      <AnimatePresence>
        {analysisResult && (
          <motion.div
            id="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-7xl mx-auto px-6">
              <div className="h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent" />
            </div>
            <AnalysisResults result={analysisResult} imageUrl={imageUrl} />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
