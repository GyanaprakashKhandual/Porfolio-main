"use client";
import { motion } from "framer-motion";
import { BackgroundStrokes } from "./Strokes";
import { stats, containerVariants, itemVariants } from "./Data";

export default function Stats() {
  return (
    <section className="relative py-28 px-6 lg:px-12">
      <BackgroundStrokes />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-black/40 dark:text-white/40 mb-3">
            By the numbers
          </p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
            Achievement Stats
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-black/6 dark:bg-white/6 rounded-2xl overflow-hidden border border-black/6 dark:border-white/6"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
              className="group flex flex-col items-center justify-center gap-3 py-10 px-6 bg-white dark:bg-[#09090b] text-center transition-colors"
            >
              <stat.icon className="w-6 h-6 text-black/35 dark:text-white/35 group-hover:text-black dark:group-hover:text-white transition-colors" />
              <span className="text-3xl sm:text-4xl font-black tracking-tight text-black dark:text-white">
                {stat.value}
              </span>
              <span className="text-xs text-black/45 dark:text-white/45 font-medium uppercase tracking-wider">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
