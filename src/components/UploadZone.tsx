"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Image as ImageIcon,
  X,
  Loader2,
  Sparkles,
  Check,
  AlertCircle,
} from "lucide-react";
import { analyzeRoom, AnalysisResult, SELECTABLE_STYLES } from "@/lib/design-engine";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

interface UploadZoneProps {
  onAnalysisComplete: (result: AnalysisResult, imageUrl: string) => void;
}

export default function UploadZone({ onAnalysisComplete }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleFile = useCallback((file: File) => {
    setError(null);

    if (!file.type.startsWith("image/")) {
      setError("Formato inválido. Use JPG, PNG ou WebP.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("Ficheiro demasiado grande. Máximo 10MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.onerror = () => {
      setError("Erro ao ler o ficheiro. Tente novamente.");
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
    intervalRef.current = setInterval(() => {
      step++;
      setProgress((step / steps.length) * 100);
      if (step >= steps.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
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
    setError(null);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDropzoneKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  };

  return (
    <section id="upload" className="py-20 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-amber-600 mb-4">
            Passo 1
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4">
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
          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {!preview ? (
              <motion.div
                key="dropzone"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                role="button"
                tabIndex={0}
                aria-label="Carregar foto da divisão"
                onKeyDown={handleDropzoneKeyDown}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`
                  relative cursor-pointer rounded-2xl border-2 border-dashed p-8 md:p-20
                  transition-all duration-300 group focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2
                  focus-visible:ring-offset-stone-950
                  ${
                    isDragging
                      ? "border-amber-500 bg-amber-500/5 upload-zone-active"
                      : "border-stone-700 hover:border-stone-500 bg-stone-900/30"
                  }
                `}
              >
                <div className="flex flex-col items-center gap-4 md:gap-6">
                  <div
                    className={`
                    w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center transition-all duration-300
                    ${
                      isDragging
                        ? "bg-amber-500/20 scale-110"
                        : "bg-stone-800 group-hover:bg-stone-700"
                    }
                  `}
                  >
                    <Upload
                      className={`w-6 h-6 md:w-8 md:h-8 transition-colors ${isDragging ? "text-amber-400" : "text-stone-400"}`}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-base md:text-lg font-medium text-stone-200 mb-2">
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
                    alt="Foto da divisão carregada"
                    className="w-full h-full object-cover"
                  />

                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-stone-950/80 flex flex-col items-center justify-center gap-6">
                      <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
                      <div className="w-64" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
                        <div className="h-1.5 bg-stone-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-amber-600 to-orange-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        <p className="text-sm text-stone-400 text-center mt-3" aria-live="polite">
                          A analisar a sua divisão...
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Style Selector */}
                {!isAnalyzing && (
                  <div className="p-4 md:p-6 bg-stone-900/60 border-t border-stone-800">
                    <p className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-3 md:mb-4">
                      Escolha o estilo pretendido
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                      {SELECTABLE_STYLES.map((style) => (
                        <button
                          key={style.id}
                          onClick={() => setSelectedStyle(style.id)}
                          aria-pressed={selectedStyle === style.id}
                          className={`relative group/style rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
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
                            <p className="text-xs font-medium text-white/90 truncate">{style.name}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-4 md:p-6 bg-stone-900/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-stone-800">
                  <div className="flex items-center gap-3">
                    <ImageIcon className="w-5 h-5 text-stone-400 shrink-0" />
                    <span className="text-sm text-stone-300 truncate">
                      {selectedStyle
                        ? `Estilo: ${SELECTABLE_STYLES.find((s) => s.id === selectedStyle)?.name}`
                        : "Foto carregada — escolha um estilo"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={clearPreview}
                      disabled={isAnalyzing}
                      aria-label="Remover foto"
                      className="px-4 py-2 rounded-lg text-sm text-stone-400 hover:text-stone-200
                        border border-stone-700 hover:border-stone-500 transition-all disabled:opacity-50
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing || !selectedStyle}
                      className="px-4 md:px-6 py-2.5 rounded-lg text-sm font-medium bg-gradient-to-r
                        from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500
                        text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span className="truncate">
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
