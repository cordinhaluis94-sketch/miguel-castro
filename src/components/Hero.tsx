"use client";

import { motion } from "framer-motion";
import { ArrowDown, Camera, Palette, Lightbulb } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900/50 to-stone-950" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-900/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-amber-600 mb-6">
            Inteligência Artificial para Design de Interiores
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-8">
            <span className="gradient-text">Transforme</span>
            <br />
            <span className="text-stone-400">o Seu Espaço</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Carregue uma foto de qualquer divisão e receba sugestões
            profissionais de design — estilos, paletas de cores, mobiliário e
            iluminação, tudo gerado por IA.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-8 mb-16"
        >
          {[
            { icon: Camera, label: "Fotografe", desc: "Tire uma foto" },
            { icon: Palette, label: "Analise", desc: "IA processa" },
            { icon: Lightbulb, label: "Transforme", desc: "Receba sugestões" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-stone-800/50 border border-stone-700/50 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-amber-500" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-stone-200">
                  {item.label}
                </p>
                <p className="text-xs text-stone-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.a
          href="#upload"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-300 transition-colors"
        >
          <span>Começar agora</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </motion.a>
      </div>
    </section>
  );
}
