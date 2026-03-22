"use client";

import { motion } from "framer-motion";
import { Camera, Cpu, FileText, Wand2 } from "lucide-react";

const steps = [
  {
    icon: Camera,
    title: "Fotografe",
    description:
      "Tire uma foto da divisão que pretende redesenhar. Funciona com qualquer ângulo e condição de luz.",
  },
  {
    icon: Cpu,
    title: "IA Analisa",
    description:
      "O nosso motor de inteligência artificial processa a imagem, identificando estilo, cores, layout e potencial.",
  },
  {
    icon: FileText,
    title: "Relatório Detalhado",
    description:
      "Receba um relatório profissional com paletas, mobiliário, iluminação e melhorias prioritárias.",
  },
  {
    icon: Wand2,
    title: "Transforme",
    description:
      "Aplique as sugestões ao seu ritmo. Cada recomendação inclui dicas de posicionamento e gama de preços.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-900/30 to-transparent" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-amber-600 mb-4">
            Processo
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold gradient-text mb-4">
            Como Funciona
          </h2>
          <p className="text-stone-400 max-w-lg mx-auto">
            Quatro passos simples para transformar qualquer divisão num espaço
            profissionalmente desenhado.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-stone-700 to-transparent" />
              )}
              <div className="w-14 h-14 rounded-2xl bg-stone-800 border border-stone-700 flex items-center justify-center mb-6 relative">
                <step.icon className="w-6 h-6 text-amber-500" />
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-stone-900 border border-stone-700 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-stone-400">
                    {i + 1}
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-stone-400 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
