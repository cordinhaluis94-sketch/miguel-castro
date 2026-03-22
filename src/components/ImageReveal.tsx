"use client";

import { motion } from "framer-motion";

interface ImageRevealProps {
  src: string;
  alt: string;
  duration?: number;
  onComplete?: () => void;
}

export default function ImageReveal({
  src,
  alt,
  duration = 2.5,
  onComplete,
}: ImageRevealProps) {
  return (
    <motion.img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
      initial={{ filter: "blur(40px)", opacity: 0, scale: 1.05 }}
      animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
      transition={{
        duration,
        ease: [0.16, 1, 0.3, 1],
      }}
      onAnimationComplete={onComplete}
    />
  );
}
