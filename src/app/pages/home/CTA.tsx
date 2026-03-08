"use client";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative py-28 px-6 lg:px-12 bg-black dark:bg-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute w-full h-full opacity-[0.06]"
          viewBox="0 0 1440 400"
          fill="none"
        >
          <motion.path
            d="M -100 400 Q 300 50 700 200 T 1500 100"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5 }}
          />
          <circle
            cx="720"
            cy="200"
            r="300"
            stroke="white"
            strokeWidth="0.5"
            fill="none"
          />
          <circle
            cx="720"
            cy="200"
            r="500"
            stroke="white"
            strokeWidth="0.3"
            fill="none"
          />
        </svg>
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-white/40 dark:text-black/40">
              Let&apos;s collaborate
            </p>
            <h2 className="text-4xl sm:text-6xl font-black text-white dark:text-black tracking-tight leading-tight">
              Let&apos;s Build
              <br />
              Something Amazing
            </h2>
          </div>
          <p className="text-lg text-white/60 dark:text-black/60 max-w-2xl mx-auto leading-relaxed">
            Ready to elevate your project with world-class development and
            quality assurance? Let&apos;s discuss how I can help you achieve
            your goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 px-8 py-4 bg-white dark:bg-black text-black dark:text-white font-bold rounded-xl text-sm"
            >
              <Mail className="w-4 h-4" /> Get In Touch
            </motion.a>
            <motion.a
              href="/projects"
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 px-8 py-4 border border-white/20 dark:border-black/20 text-white dark:text-black font-semibold rounded-xl text-sm hover:bg-white/8 dark:hover:bg-black/8 transition-colors"
            >
              View All Projects <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
