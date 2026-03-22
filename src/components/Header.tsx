"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-orange-800 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold tracking-tight gradient-text">
              InteriorAI
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500">
              Design Intelligence
            </p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#upload"
            className="text-sm text-stone-400 hover:text-stone-200 transition-colors"
          >
            Analisar
          </a>
          <a
            href="#how-it-works"
            className="text-sm text-stone-400 hover:text-stone-200 transition-colors"
          >
            Como Funciona
          </a>
          <a
            href="#styles"
            className="text-sm text-stone-400 hover:text-stone-200 transition-colors"
          >
            Estilos
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
