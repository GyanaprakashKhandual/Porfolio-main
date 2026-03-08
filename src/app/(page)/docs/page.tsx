"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Code2, Layers, Zap } from "lucide-react";
import docRegistry from "@/app/utils/doc.registry";

const features = [
  {
    icon: BookOpen,
    title: "Basic to Advanced",
    description:
      "Every topic starts from zero and builds up to production-level depth — no experience required to get started.",
  },
  {
    icon: Code2,
    title: "Real Code Examples",
    description:
      "Every concept comes with clean, copy-ready code examples you can run immediately in your own projects.",
  },
  {
    icon: Layers,
    title: "Complete Coverage",
    description:
      "Languages, frameworks, databases, testing tools, and APIs — all documented in one place.",
  },
  {
    icon: Zap,
    title: "Practice Exercises",
    description:
      "Reinforce what you learn with exercises and challenges crafted for each topic and difficulty level.",
  },
];

function DocPageInner() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/docs/javascript");
  };

  const handleTechClick = (slug: string) => {
    router.push(`/docs/${slug}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* ── Hero ── */}
      <section className="flex flex-col items-center justify-center px-6 pt-20 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-medium bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 rounded-full border border-gray-200 dark:border-gray-800"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gray-900 dark:bg-white animate-pulse" />
          {docRegistry.length} technolog{docRegistry.length !== 1 ? "ies" : "y"}{" "}
          documented
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl text-gray-900 dark:text-gray-100"
        >
          Everything you need to master{" "}
          <span className="relative inline-block">
            modern tech
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute bottom-1 left-0 right-0 h-0.5 bg-gray-900 dark:bg-white origin-left"
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-xl mt-5 text-base leading-relaxed text-gray-500 dark:text-gray-400 sm:text-lg"
        >
          Comprehensive documentation for every major language, framework,
          database, and testing tool — from basic syntax to advanced production
          patterns, with exercises included.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-8"
        >
          <button
            onClick={handleStart}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors duration-150"
          >
            Start Learning
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() =>
              document
                .getElementById("tech-grid")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150"
          >
            Browse Topics
          </button>
        </motion.div>
      </section>

      {/* ── Divider ── */}
      <div className="border-t border-gray-200 dark:border-gray-800" />

      {/* ── Features ── */}
      <section className="max-w-5xl px-6 py-16 mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                className="flex flex-col gap-3 p-5 transition-colors duration-200 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-900 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-md"
              >
                <div className="flex items-center justify-center border rounded-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 w-9 h-9">
                  <Icon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {feature.title}
                </p>
                <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="border-t border-gray-200 dark:border-gray-800" />

      {/* ── Tech Grid from docRegistry ── */}
      <section id="tech-grid" className="max-w-5xl px-6 py-16 mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Pick a technology
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Click any topic below to jump straight into the documentation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {docRegistry.map((doc, i) => (
            <motion.button
              key={doc.slug}
              onClick={() => handleTechClick(doc.slug)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="group w-full text-left rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 hover:bg-gray-900 dark:hover:bg-white hover:border-gray-900 dark:hover:border-white shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl shrink-0">{doc.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-white dark:group-hover:text-gray-900 transition-colors">
                      {doc.label}
                    </h3>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 group-hover:bg-white/20 dark:group-hover:bg-black/10 group-hover:text-white/80 dark:group-hover:text-gray-700 group-hover:border-white/20 dark:group-hover:border-black/10 transition-colors">
                      {doc.totalDocs} docs
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed group-hover:text-gray-300 dark:group-hover:text-gray-600 transition-colors line-clamp-2">
                    {doc.description}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="px-6 py-16 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Ready to dive in?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            Choose any technology from the tab bar above or click a topic below
            to start reading. All content is free and updated regularly.
          </p>
          <button
            onClick={handleStart}
            className="inline-flex items-center gap-2 px-6 py-3 mt-6 text-sm font-semibold rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors duration-150"
          >
            Start with JavaScript
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}

export default function DocPage() {
  return (
    <Suspense fallback={null}>
      <DocPageInner />
    </Suspense>
  );
}
