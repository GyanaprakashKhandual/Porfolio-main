"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal, Github, ExternalLink, Package } from "lucide-react";

function AnnouncementWindow() {
  const [isOpen, setIsOpen] = useState(false);
  const hasShownRef = useRef(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("announcement_shown");
    if (alreadyShown || hasShownRef.current) return;

    hasShownRef.current = true;
    sessionStorage.setItem("announcement_shown", "true");

    const openTimer = setTimeout(() => {
      setIsOpen(true);
      const closeTimer = setTimeout(() => setIsOpen(false), 100000);
      return () => clearTimeout(closeTimer);
    }, 5000);

    return () => clearTimeout(openTimer);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 w-85"
          role="dialog"
          aria-label="Announcement"
        >
          <div className="relative bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-2xl shadow-black/10 dark:shadow-black/50 overflow-hidden">
            {/* Glow accent */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close"
              className="absolute top-3 right-3 text-zinc-400 dark:text-zinc-500 hover:text-black dark:hover:text-white transition-colors p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <X size={14} />
            </button>

            {/* Badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-[11px] text-green-600 dark:text-green-400 uppercase tracking-widest font-medium">
                New Release
              </span>
            </div>

            {/* Icon + Title */}
            <div className="flex items-start gap-3 mb-2">
              <div className="mt-0.5 p-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                <Package
                  size={16}
                  className="text-green-600 dark:text-green-400"
                />
              </div>
              <h2 className="text-black dark:text-white text-lg font-semibold leading-snug">
                Assignmate is live
              </h2>
            </div>

            {/* Description */}
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-4 pl-11">
              Just upload your handwriting with image and calligrapher and
              generating assignment in your handwritten format from AI with PDF
              format.
            </p>

            {/*
            <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 mb-4">
              <Terminal
                size={13}
                className="text-zinc-400 dark:text-zinc-500 shrink-0"
              />
              <code className="font-mono text-sm text-zinc-800 dark:text-zinc-300">
                npm i sendenv
              </code>
            </div>
            */}

            {/* CTA Buttons */}
            <div className="flex gap-2.5 mb-3">
              <motion.a
                href="https://asignmate.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 flex items-center justify-center gap-1.5 bg-black dark:bg-white text-white dark:text-zinc-950 text-sm font-semibold rounded-lg py-2.5 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
              >
                <ExternalLink size={13} />
                Visit Site
              </motion.a>
              <motion.a
                href="https://github.com/gyanaprakashkhandual/assignmate"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 flex items-center justify-center gap-1.5 bg-transparent text-zinc-700 dark:text-zinc-300 text-sm font-medium rounded-lg py-2.5 border border-zinc-300 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-black dark:hover:text-white transition-colors"
              >
                <Github size={13} />
                GitHub
              </motion.a>
            </div>

            {/* Dismiss */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-full text-xs text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors text-center py-1"
            >
              Dismiss
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AnnouncementWindow;
