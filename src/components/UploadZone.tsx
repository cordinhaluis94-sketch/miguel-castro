"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Image as ImageIcon,
  X,
  Loader2,
  Sparkles,
  Check,
} from "lucide-react";
import { analyzeRoom, AnalysisResult, SELECTABLE_STYLES } from "@/lib/design-engine";

interface UploadZoneProps {
  onAnalysisComplete: (result: AnalysisResult, imageUrl: string) => void;
}

export default function UploadZone({ onAnalysisComplete }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleAnalyze = useCallback(() => {
    if (!preview || !selectedStyle) return;
    setIsAnalyzing(true);
    setProgress(0);

    const steps = [
      "Detetando divisão...",
      "Analisando composição...",
      "Avaliando paleta de cores...",
      `Aplicando estilo ${SELECTABLE_STYLES.find((s) => s.id === selectedStyle)?.name}...`,
      "Gerando novo design...",
      "Aplicando transformações...",
      "Compilando relatório...",
    ];

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setProgress((step / steps.length) * 100);
      if (step >= steps.length) {
        clearInterval(interval);
        const result = analyzeRoom(selectedStyle);
        setTimeout(() => {
          setIsAnalyzing(false);
          onAnalysisComplete(result, preview);
        }, 500);
      }
    }, 600);
  }, [preview, selectedStyle, onAnalysisComplete]);

  const clearPreview = () => {
    setPreview(null);
    setProgress(0);
    setSelectedStyle(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <section id="upload" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-amber-600 mb-4">
            Passo 1
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold gradient-text mb-4">
            Carregue a Sua Foto
          </h2>
          <p className="text-stone-400 max-w-lg mx-auto">
            Arraste uma foto da divisão que pretende transformar ou clique para
            selecionar do seu dispositivo.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {!preview ? (
              <motion.div
                key="dropzone"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`
                  relative cursor-pointer rounded-2xl border-2 border-dashed p-20
                  transition-all duration-300 group
                  ${
                    isDragging
                      ? "border-amber-500 bg-amber-500/5 upload-zone-active"
                      : "border-stone-700 hover:border-stone-500 bg-stone-900/30"
                  }
                `}
              >
                <div className="flex flex-col items-center gap-6">
                  <div
                    className={`
                    w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300
                    ${
                      isDragging
                        ? "bg-amber-500/20 scale-110"
                        : "bg-stone-800 group-hover:bg-stone-700"
                    }
                  `}
                  >
                    <Upload
                      className={`w-8 h-8 transition-colors ${isDragging ? "text-amber-400" : "text-stone-400"}`}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-medium text-stone-200 mb-2">
                      {isDragging
                        ? "Solte a imagem aqui"
                        : "Arraste a foto ou clique"}
                    </p>
                    <p className="text-sm text-stone-500">
                      JPG, PNG ou WebP — Máx. 10MB
                    </p>
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                  }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="relative rounded-2xl overflow-hidden border border-stone-800"
              >
                <div className="relative aspect-video">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview}
                    alt="Foto da divisão"
                    className="w-full h-full object-cover"
                  />

                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-stone-950/80 flex flex-col items-center justify-center gap-6">
                      <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
                      <div className="w-64">
                        <div className="h-1.5 bg-stone-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-amber-600 to-orange-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        <p className="text-sm text-stone-400 text-center mt-3">
                          A analisar a sua divisão...
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Style Selector */}
                {!isAnalyzing && (
                  <div className="p-6 bg-stone-900/60 border-t border-stone-800">
                    <p className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-4">
                      Escolha o estilo pretendido
                    </p>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                      {SELECTABLE_STYLES.map((style) => (
                        <button
                          key={style.id}
                          onClick={() => setSelectedStyle(style.id)}
                          className={`relative group/style rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all duration-200 ${
                            selectedStyle === style.id
                              ? "border-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.3)]"
                              : "border-stone-700/50 hover:border-stone-500"
                          }`}
                        >
                          <div
                            className="absolute inset-0 transition-transform duration-500 group-hover/style:scale-110"
                            style={{ background: style.gradient }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent" />
                          {selectedStyle === style.id && (
                            <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center">
                              <Check className="w-3 h-3 text-stone-950" />
                            </div>
                          )}
                          <div className="absolute bottom-0 left-0 right-0 p-2">
                            <p className="text-xs font-medium text-white/90">{style.name}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-6 bg-stone-900/80 flex items-center justify-between border-t border-stone-800">
                  <div className="flex items-center gap-3">
                    <ImageIcon className="w-5 h-5 text-stone-400" />
                    <span className="text-sm text-stone-300">
                      {selectedStyle
                        ? `Estilo: ${SELECTABLE_STYLES.find((s) => s.id === selectedStyle)?.name}`
                        : "Foto carregada — escolha um estilo"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={clearPreview}
                      disabled={isAnalyzing}
                      className="px-4 py-2 rounded-lg text-sm text-stone-400 hover:text-stone-200
                        border border-stone-700 hover:border-stone-500 transition-all disabled:opacity-50"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing || !selectedStyle}
                      className="px-6 py-2.5 rounded-lg text-sm font-medium bg-gradient-to-r
                        from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500
                        text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>
                        {selectedStyle
                          ? `Reimaginar em ${SELECTABLE_STYLES.find((s) => s.id === selectedStyle)?.name}`
                          : "Selecione um estilo"}
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
