"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageReveal from "./ImageReveal";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Antes",
  afterLabel = "Depois",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(100);
  const [isDragging, setIsDragging] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showSlider, setShowSlider] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isRevealed) {
      const timer = setTimeout(() => {
        setShowSlider(true);
        setPosition(50);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isRevealed]);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percentage);
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!showSlider) return;
      setIsDragging(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updatePosition(e.clientX);
    },
    [showSlider, updatePosition]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    },
    [isDragging, updatePosition]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!showSlider) return;
      const step = e.shiftKey ? 10 : 2;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setPosition((prev) => Math.max(0, prev - step));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setPosition((prev) => Math.min(100, prev + step));
      }
    },
    [showSlider]
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none touch-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 rounded-2xl"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="slider"
      aria-label="Comparar antes e depois do redesign"
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* After image (redesigned) - full background */}
      <div className="absolute inset-0">
        <ImageReveal
          src={afterImage}
          alt="Design redesenhado"
          duration={2.5}
          onComplete={() => setIsRevealed(true)}
        />
      </div>

      {/* Before image (original) - clipped */}
      <div
        className="absolute inset-0 transition-[clip-path] ease-out"
        style={{
          clipPath: `inset(0 ${100 - position}% 0 0)`,
          transitionDuration: isDragging ? "0ms" : "700ms",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={beforeImage}
          alt="Foto original"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Slider handle */}
      <AnimatePresence>
        {showSlider && (
          <motion.div
            className="absolute top-0 bottom-0 z-10 pointer-events-none"
            style={{ left: `${position}%` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-amber-500 to-orange-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass border border-amber-500/30 flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg">
              <div className="flex gap-0.5">
                <div className="w-0.5 h-4 bg-amber-500/60 rounded-full" />
                <div className="w-0.5 h-4 bg-amber-500/60 rounded-full" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Labels */}
      <AnimatePresence>
        {showSlider && (
          <>
            <motion.div
              className="absolute top-3 left-3 z-10 pointer-events-none"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <span className="px-2.5 py-1 rounded-full bg-stone-900/70 backdrop-blur-sm text-xs uppercase tracking-[0.15em] text-stone-300 border border-stone-700/50">
                {beforeLabel}
              </span>
            </motion.div>
            <motion.div
              className="absolute top-3 right-3 z-10 pointer-events-none"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <span className="px-2.5 py-1 rounded-full bg-amber-500/20 backdrop-blur-sm text-xs uppercase tracking-[0.15em] text-amber-400 border border-amber-500/30">
                {afterLabel}
              </span>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
