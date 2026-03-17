"use client";
import { motion } from "framer-motion";
import { ExternalLink, Github, Users, Download, Code2 } from "lucide-react";
import { SectionStrokes } from "./Strokes";
import { projects, extensions } from "./Data";

export default function Projects() {
  return (
    <section className="relative py-28 px-6 lg:px-12 bg-white dark:bg-[#0d0d0f]">
      <SectionStrokes variant="a" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-black/40 dark:text-white/40 mb-3">
            What I&apos;ve built
          </p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
            Core Projects
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.15,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{ y: -4 }}
              className={`group relative p-8 rounded-2xl bg-linear-to-br ${project.gradient} bg-white dark:bg-[#111113] border border-black/6 dark:border-white/6 overflow-hidden`}
            >
              <svg
                className="absolute top-0 right-0 w-24 h-24 opacity-5"
                viewBox="0 0 100 100"
              >
                <path d="M 100 0 L 100 100 L 0 0 Z" fill="currentColor" />
              </svg>

              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-xs font-medium text-black/40 dark:text-white/40 uppercase tracking-widest block mb-2">
                      {project.tag}
                    </span>
                    <h3 className="text-2xl font-black text-black dark:text-white">
                      {project.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/8 border border-black/5 dark:border-white/5">
                    <Users className="w-3.5 h-3.5 text-black/50 dark:text-white/50" />
                    <span className="text-xs font-semibold text-black/70 dark:text-white/70">
                      {project.users}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-black/55 dark:text-white/55 leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 text-black/50 dark:text-white/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <motion.a
                    href={project.links.app}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold rounded-lg"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Live App
                  </motion.a>
                  <motion.a
                    href={project.links.frontend}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-4 py-2.5 border border-black/10 dark:border-white/10 text-black/70 dark:text-white/70 text-sm font-medium rounded-lg hover:bg-black/3 dark:hover:bg-white/3"
                  >
                    <Github className="w-3.5 h-3.5" /> Frontend
                  </motion.a>
                  <motion.a
                    href={project.links.backend}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-4 py-2.5 border border-black/10 dark:border-white/10 text-black/70 dark:text-white/70 text-sm font-medium rounded-lg hover:bg-black/3 dark:hover:bg-white/3"
                  >
                    <Github className="w-3.5 h-3.5" /> Backend
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-black/40 dark:text-white/40 mb-2">
            Published on Marketplace
          </p>
          <h3 className="text-3xl font-black tracking-tight">
            VS Code Extensions
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {extensions.map((ext, i) => (
            <motion.div
              key={ext.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="group p-8 rounded-2xl bg-white dark:bg-[#111113] border border-black/6 dark:border-white/6"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/8 flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-black/60 dark:text-white/60" />
                  </div>
                  <h3 className="font-black text-lg text-black dark:text-white">
                    {ext.name}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/8">
                  <Download className="w-3.5 h-3.5 text-black/50 dark:text-white/50" />
                  <span className="text-xs font-semibold text-black/70 dark:text-white/70">
                    {ext.installs}
                  </span>
                </div>
              </div>
              <p className="text-sm text-black/55 dark:text-white/55 leading-relaxed mb-6">
                {ext.description}
              </p>
              <motion.a
                href="https://marketplace.visualstudio.com/manage/publishers/gyanaprakashkhandual"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold rounded-lg"
              >
                <ExternalLink className="w-3.5 h-3.5" /> View on Marketplace
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
