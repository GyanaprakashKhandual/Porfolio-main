"use client";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { BackgroundStrokes } from "./Strokes";
import { testimonials } from "./Data";

export default function Testimonials() {
  return (
    <section className="relative py-28 px-6 lg:px-12">
      <BackgroundStrokes />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-black/40 dark:text-white/40 mb-3">
            Testimonials
          </p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
            What People Say
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="group p-8 rounded-2xl bg-white dark:bg-[#111113] border border-black/6 dark:border-white/6 relative overflow-hidden"
            >
              <div className="absolute top-6 right-8 text-7xl font-black text-black/4 dark:text-white/4 leading-none select-none">
                &ldquo;
              </div>

              <MessageSquare className="w-6 h-6 text-black/25 dark:text-white/25 mb-6" />
              <p className="text-sm text-black/65 dark:text-white/65 leading-relaxed mb-8 italic">
                &ldquo;{t.feedback}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div
                  className={`w-11 h-11 rounded-full bg-linear-to-br ${t.color} flex items-center justify-center text-white text-sm font-black shadow-md`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold text-sm text-black dark:text-white">
                    {t.name}
                  </p>
                  <p className="text-xs text-black/45 dark:text-white/45">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
