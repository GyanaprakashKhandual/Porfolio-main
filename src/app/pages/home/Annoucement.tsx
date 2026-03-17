"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Music2,
  Headphones,
  Radio,
  ArrowUpRight,
  X,
  ChevronRight,
  Volume2,
} from "lucide-react";

const languages = [
  { label: "Hindi", script: "हिन्दी", flag: "🇮🇳" },
  { label: "English", script: "English", flag: "🌐" },
  { label: "Odia", script: "ଓଡ଼ିଆ", flag: "🪷" },
];

const TICKER_TEXT =
  "✦ NEW  Music is now live on the app  ·  Stream Hindi, English & Odia tracks  ·  Open the Music section to listen  ·  More languages coming soon  ✦  नई संगीत सेवा शुरू हो गई है  ·  ਸੁਣੋ ਹਿੰਦੀ, ਅੰਗਰੇਜ਼ੀ ਅਤੇ ਓਡ਼ਿਆ  ·  ନୂଆ ସଂଗୀତ ଏବେ ଲାଇଭ  ·  ";

export default function AnnouncementSection() {
  const [dismissed, setDismissed] = useState(false);
  const [activeLang, setActiveLang] = useState(0);
  const [visible] = useState(true);

  /* cycle language pill every 2.5 s */
  useEffect(() => {
    const id = setInterval(() => {
      setActiveLang((p) => (p + 1) % languages.length);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24, scale: 0.97 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-full bg-white dark:bg-black border-b border-black/10 dark:border-white/10 overflow-hidden"
        >
          {/* Subtle grid overlay — same as Hero */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none" />

          {/* Ambient emerald glow — echoes the pulse dot in Hero */}
          <div className="absolute left-0 top-0 w-64 h-full bg-[linear-gradient(to-right,rgba(16,185,129,0.6),transparent)] pointer-events-none" />

          {/* ── TOP STRIP: scrolling ticker ─────────────────────── */}
          <div className="relative border-b border-black/6 dark:border-white/6 overflow-hidden py-1.5 bg-black/2 dark:bg-white/2">
            <motion.div
              className="flex whitespace-nowrap gap-0"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            >
              {[...Array(2)].map((_, i) => (
                <span
                  key={i}
                  className="text-[10px] font-medium tracking-[0.12em] uppercase text-black/40 dark:text-white/40 pr-8"
                >
                  {TICKER_TEXT}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── MAIN ANNOUNCEMENT ROW ───────────────────────────── */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4 flex items-center gap-4 sm:gap-6">
            {/* Left: animated music icon badge */}
            <div className="shrink-0 relative">
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-black/5 dark:bg-white/8 border border-black/10 dark:border-white/10 flex items-center justify-center"
              >
                <Music2 className="w-5 h-5 sm:w-6 sm:h-6 text-black/70 dark:text-white/70" />
              </motion.div>
              {/* live pulse */}
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-black">
                <motion.span
                  animate={{ scale: [1, 2], opacity: [0.6, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-emerald-500"
                />
              </span>
            </div>

            {/* Middle: text content */}
            <div className="flex-1 min-w-0">
              {/* Label row */}
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full border border-black/10 dark:border-white/10 bg-black/3 dark:bg-white/3 text-black/50 dark:text-white/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  New Feature
                </span>

                {/* Cycling language pill */}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeLang}
                    initial={{ opacity: 0, y: 6, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/8 border border-black/8 dark:border-white/8 text-black/60 dark:text-white/60"
                  >
                    <span>{languages[activeLang].flag}</span>
                    <span>{languages[activeLang].script}</span>
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Headline */}
              <p className="text-sm sm:text-base font-black tracking-tight text-black dark:text-white leading-tight truncate">
                Music is now live —{" "}
                <span className="font-medium text-black/60 dark:text-white/55">
                  stream Hindi, English & Odia tracks inside the app
                </span>
              </p>
            </div>

            {/* Right: language pills + CTA */}
            <div className="shrink-0 flex items-center gap-2 sm:gap-3">
              {/* Static language tags — visible on sm+ */}
              <div className="hidden sm:flex items-center gap-1.5">
                {languages.map((l) => (
                  <span
                    key={l.label}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/8 border border-black/8 dark:border-white/8 text-black/70 dark:text-white/70"
                  >
                    {l.label}
                  </span>
                ))}
              </div>

              {/* CTA button — mirrors Hero's secondary button style */}
              <motion.a
                href="/music"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="group hidden sm:flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-xs font-semibold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
              >
                <Headphones className="w-3.5 h-3.5" />
                Listen Now
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>

              {/* Mobile CTA — icon only */}
              <motion.a
                href="/music"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="sm:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-black dark:bg-white text-white dark:text-black"
              >
                <Headphones className="w-4 h-4" />
              </motion.a>

              {/* Dismiss */}
              <motion.button
                onClick={() => setDismissed(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center w-7 h-7 rounded-lg border border-black/10 dark:border-white/10 text-black/40 dark:text-white/40 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black/60 dark:hover:text-white/60 transition-colors"
                aria-label="Dismiss announcement"
              >
                <X className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </div>

          {/* ── BOTTOM: feature detail chips ────────────────────── */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
            {[
              { icon: Radio, text: "Multi-language streaming" },
              { icon: Volume2, text: "High quality audio" },
              { icon: Music2, text: "New tracks added weekly" },
            ].map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="shrink-0 inline-flex items-center gap-1.5 text-[10px] text-black/40 dark:text-white/40 font-medium"
              >
                <Icon className="w-3 h-3" />
                {text}
                <span className="text-black/20 dark:text-white/20 last:hidden">
                  ·
                </span>
              </span>
            ))}

            {/* right edge: "go to music" text link */}
            <motion.a
              href="/music"
              className="ml-auto shrink-0 flex items-center gap-1 text-[10px] font-semibold text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
              whileHover={{ x: 2 }}
            >
              Go to Music
              <ChevronRight className="w-3 h-3" />
            </motion.a>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
