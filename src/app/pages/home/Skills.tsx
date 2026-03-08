"use client";
import { motion } from "framer-motion";
import { SectionStrokes } from "./Strokes";
import { SkillIcon } from "./Skill.icon";
import { skills, containerVariants, itemVariants } from "./Data";

export default function Skills() {
  return (
    <section className="relative py-28 px-6 lg:px-12 bg-white dark:bg-[#0d0d0f]">
      <SectionStrokes variant="b" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-black/40 dark:text-white/40 mb-3">
            What I work with
          </p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
            Technical Expertise
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.03 }}
              className={`relative group p-6 rounded-2xl bg-linear-to-br ${skill.color} border border-black/6 dark:border-white/6 bg-white dark:bg-[#111113] cursor-default overflow-hidden`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-br from-black/2 to-transparent dark:from-white/2" />
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="text-black/70 dark:text-white/70 group-hover:text-black dark:group-hover:text-white transition-colors">
                  <SkillIcon name={skill.name} />
                </div>
                <p className="font-semibold text-sm text-black dark:text-white">
                  {skill.name}
                </p>
                <span className="text-[10px] tracking-wider uppercase text-black/40 dark:text-white/40 font-medium">
                  {skill.category}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
