"use client";

import { motion } from "framer-motion";
import {
  Palette,
  Sofa,
  Lightbulb,
  TrendingUp,
  Star,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { AnalysisResult } from "@/lib/design-engine";
import BeforeAfterSlider from "./BeforeAfterSlider";

interface AnalysisResultsProps {
  result: AnalysisResult;
  imageUrl: string;
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function AnalysisResults({
  result,
  imageUrl,
}: AnalysisResultsProps) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-sm text-amber-400">Análise Completa</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold gradient-text mb-4">
            O Seu Relatório de Design
          </h2>
          <p className="text-stone-400 max-w-lg mx-auto">
            Baseado na análise da sua foto, eis as nossas recomendações
            profissionais.
          </p>
        </motion.div>

        {/* Score + Room overview */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {/* Photo - Before/After comparison */}
          <div className={`${result.generatedImageUrl ? "md:col-span-2" : "md:col-span-1"} rounded-2xl overflow-hidden border border-stone-800 aspect-video`}>
            {result.generatedImageUrl ? (
              <BeforeAfterSlider
                beforeImage={imageUrl}
                afterImage={result.generatedImageUrl}
              />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={imageUrl}
                alt="Divisão analisada"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Score Card */}
          <div className="glass rounded-2xl p-8 flex flex-col items-center justify-center">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-4">
              Pontuação de Design
            </p>
            <div className="relative w-40 h-40 mb-4">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50" cy="50" r="42"
                  fill="none" stroke="#292524" strokeWidth="6"
                />
                <circle
                  cx="50" cy="50" r="42"
                  fill="none"
                  stroke="url(#scoreGradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${result.overallScore * 2.64} 264`}
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#ea580c" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-stone-100">
                  {result.overallScore}
                </span>
                <span className="text-xs text-stone-500">/100</span>
              </div>
            </div>
            <p className="text-sm text-stone-400 text-center">
              {result.overallScore >= 80
                ? "Excelente base para trabalhar!"
                : result.overallScore >= 60
                  ? "Bom potencial com margem para melhorar."
                  : "Grandes oportunidades de transformação."}
            </p>
          </div>

          {/* Room Info */}
          <div className="glass rounded-2xl p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-6">
              Detalhes da Divisão
            </p>
            <div className="space-y-5">
              <div>
                <p className="text-sm text-stone-500 mb-1">Tipo</p>
                <p className="text-lg font-medium">
                  {result.roomTypeIcon} {result.roomType}
                </p>
              </div>
              <div>
                <p className="text-sm text-stone-500 mb-1">Estilo Detetado</p>
                <p className="text-lg font-medium">
                  {result.currentStyle.icon} {result.currentStyle.name}
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  {(result.currentStyle.confidence * 100).toFixed(0)}% de
                  confiança
                </p>
              </div>
              <div>
                <p className="text-sm text-stone-500 mb-2">Mood</p>
                <div className="flex flex-wrap gap-2">
                  {result.moodKeywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-3 py-1 rounded-full bg-stone-800 text-xs text-stone-300 border border-stone-700"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Suggested Styles */}
        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }} className="mb-12">
          <SectionHeader icon={Star} title="Estilos Recomendados" />
          <div className="grid md:grid-cols-3 gap-6">
            {result.suggestedStyles.map((style, i) => (
              <div
                key={style.name}
                className={`room-card glass rounded-2xl p-6 ${i === 0 ? "border-amber-500/30 ring-1 ring-amber-500/10" : ""}`}
              >
                {i === 0 && (
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-xs text-amber-400 mb-4">
                    Recomendação Top
                  </span>
                )}
                <div className="text-3xl mb-3">{style.icon}</div>
                <h4 className="text-lg font-semibold mb-2">{style.name}</h4>
                <p className="text-sm text-stone-400 leading-relaxed mb-4">
                  {style.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="h-1.5 flex-1 bg-stone-800 rounded-full overflow-hidden mr-4">
                    <div
                      className="h-full bg-gradient-to-r from-amber-600 to-orange-500 rounded-full"
                      style={{ width: `${style.confidence * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-stone-500 whitespace-nowrap">
                    {(style.confidence * 100).toFixed(0)}% match
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Color Palettes */}
        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.3 }} className="mb-12">
          <SectionHeader icon={Palette} title="Paletas de Cores" />
          <div className="grid md:grid-cols-3 gap-6">
            {result.colorPalettes.map((palette) => (
              <div key={palette.name} className="room-card glass rounded-2xl p-6">
                <div className="flex gap-1 mb-4 h-20 rounded-xl overflow-hidden">
                  {palette.colors.map((color, i) => (
                    <div
                      key={i}
                      className="flex-1 transition-all hover:flex-[2]"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <h4 className="text-lg font-semibold mb-2">{palette.name}</h4>
                <p className="text-sm text-stone-400 leading-relaxed mb-4">
                  {palette.description}
                </p>
                <div className="flex gap-2">
                  {palette.colors.map((color, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <div
                        className="w-3 h-3 rounded-full border border-stone-600"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-[10px] text-stone-500 font-mono">
                        {color}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Furniture Suggestions */}
        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.4 }} className="mb-12">
          <SectionHeader icon={Sofa} title="Sugestões de Mobiliário" />
          <div className="grid md:grid-cols-2 gap-6">
            {result.furnitureSuggestions.map((item) => (
              <div key={item.name} className="room-card glass rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-stone-800 text-[10px] uppercase tracking-wider text-stone-400 mb-2">
                      {item.category}
                    </span>
                    <h4 className="text-lg font-semibold">{item.name}</h4>
                  </div>
                  <span className="text-sm font-medium text-amber-500">
                    {item.priceRange}
                  </span>
                </div>
                <p className="text-sm text-stone-400 mb-3">
                  {item.description}
                </p>
                <div className="flex items-start gap-2 p-3 rounded-lg bg-stone-800/50">
                  <ChevronRight className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <p className="text-xs text-stone-400">{item.placement}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Lighting Tips */}
        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.5 }} className="mb-12">
          <SectionHeader icon={Lightbulb} title="Dicas de Iluminação" />
          <div className="grid md:grid-cols-3 gap-6">
            {result.lightingTips.map((tip) => (
              <div key={tip.type} className="room-card glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-wider text-stone-500">
                    {tip.type}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider ${
                      tip.impact === "alto"
                        ? "bg-green-500/10 text-green-400"
                        : tip.impact === "médio"
                          ? "bg-amber-500/10 text-amber-400"
                          : "bg-stone-700 text-stone-400"
                    }`}
                  >
                    Impacto {tip.impact}
                  </span>
                </div>
                <p className="text-sm text-stone-300 leading-relaxed">
                  {tip.suggestion}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Improvements */}
        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.6 }}>
          <SectionHeader icon={TrendingUp} title="Melhorias Prioritárias" />
          <div className="glass rounded-2xl p-8">
            <div className="space-y-4">
              {result.improvements.map((improvement, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-600/20 to-orange-600/20 border border-amber-500/20 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-amber-400">
                      {i + 1}
                    </span>
                  </div>
                  <p className="text-sm text-stone-300 leading-relaxed pt-1.5">
                    {improvement}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SectionHeader({
  icon: Icon,
  title,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-10 h-10 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center">
        <Icon className="w-5 h-5 text-amber-500" />
      </div>
      <h3 className="font-serif text-2xl font-bold gradient-text">{title}</h3>
    </div>
  );
}
