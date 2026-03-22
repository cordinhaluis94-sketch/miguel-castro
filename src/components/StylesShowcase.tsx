"use client";

import { motion } from "framer-motion";
import { SELECTABLE_STYLES } from "@/lib/design-engine";

export default function StylesShowcase() {
  return (
    <section id="styles" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-amber-600 mb-4">
            Galeria
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold gradient-text mb-4">
            Estilos que Dominamos
          </h2>
          <p className="text-stone-400 max-w-lg mx-auto">
            A nossa IA reconhece e sugere entre dezenas de estilos de design de
            interiores contemporâneos e clássicos.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {SELECTABLE_STYLES.map((style, i) => (
            <motion.div
              key={style.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="room-card group relative rounded-2xl overflow-hidden aspect-[4/3] border border-stone-800"
            >
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                style={{ background: style.gradient }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-lg font-semibold mb-2">{style.name}</h3>
                <div className="flex gap-2">
                  {style.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] text-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
