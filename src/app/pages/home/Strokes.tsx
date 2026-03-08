"use client";
import { motion } from "framer-motion";

export const BackgroundStrokes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg
      className="absolute w-full h-full opacity-[0.04] dark:opacity-[0.06]"
      viewBox="0 0 1440 900"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M -100 900 Q 400 100 900 500 Q 1200 800 1600 200"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      />
      <motion.path
        d="M 1540 0 Q 1100 400 700 200 Q 300 0 -50 500"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3.5, ease: "easeInOut", delay: 0.3 }}
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={`v${i}`}
          x1={i * 360}
          y1="0"
          x2={i * 360}
          y2="900"
          stroke="currentColor"
          strokeWidth="0.5"
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <line
          key={`h${i}`}
          x1="0"
          y1={i * 300}
          x2="1440"
          y2={i * 300}
          stroke="currentColor"
          strokeWidth="0.5"
        />
      ))}
      <circle
        cx="720"
        cy="450"
        r="300"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
      />
      <circle
        cx="720"
        cy="450"
        r="500"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
      />
      <motion.path
        d="M 200 0 L 800 900 M 600 0 L 1400 900 M 0 300 L 1440 600"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 4, ease: "easeInOut", delay: 0.5 }}
      />
      <path
        d="M 0 0 L 80 0 L 0 80"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M 1440 0 L 1360 0 L 1440 80"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M 0 900 L 80 900 L 0 820"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M 1440 900 L 1360 900 L 1440 820"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  </div>
);

export const SectionStrokes = ({ variant = "a" }: { variant?: string }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg
      className="absolute w-full h-full opacity-[0.035] dark:opacity-[0.05]"
      viewBox="0 0 1440 600"
      fill="none"
    >
      {variant === "a" && (
        <>
          <motion.path
            d="M -50 300 C 200 100 500 500 800 250 S 1200 50 1500 300"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
          />
          <motion.path
            d="M 0 500 Q 300 200 600 400 T 1200 200 T 1500 400"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, delay: 0.2 }}
          />
        </>
      )}
      {variant === "b" && (
        <>
          {[0, 100, 200, 300, 400, 500].map((y) => (
            <motion.path
              key={y}
              d={`M 0 ${y} Q 360 ${y - 80} 720 ${y} T 1440 ${y}`}
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: y / 2000 }}
            />
          ))}
        </>
      )}
    </svg>
  </div>
);
