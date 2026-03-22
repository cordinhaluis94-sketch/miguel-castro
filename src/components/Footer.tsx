"use client";

import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-stone-800/50 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-600 to-orange-800 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-serif text-lg font-bold gradient-text">
            InteriorAI
          </span>
        </div>
        <p className="text-sm text-stone-600">
          © 2026 InteriorAI — Design de Interiores por Inteligência Artificial
        </p>
        <div className="flex items-center gap-6">
          <a href="#" className="text-xs text-stone-500 hover:text-stone-300 transition-colors">
            Privacidade
          </a>
          <a href="#" className="text-xs text-stone-500 hover:text-stone-300 transition-colors">
            Termos
          </a>
          <a href="#" className="text-xs text-stone-500 hover:text-stone-300 transition-colors">
            Contacto
          </a>
        </div>
      </div>
    </footer>
  );
}
