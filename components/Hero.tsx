"use client";

import { motion } from "framer-motion";
import Magnetic from "./Magnetic";
import Terminal from "./Terminal";
import Decode from "./Decode";

const STATS = [
  { value: "2", label: "live projects" },
  { value: "BSIT-2", label: "@ NUML" },
  { value: "DevOps", label: "deep focus" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section id="top" className="pb-20 pt-16 sm:pt-24">
      <motion.div variants={container} initial="hidden" animate="show">
        {/* available badge */}
        <motion.div variants={item} className="mb-7 flex items-center gap-2">
          <span className="relative flex h-[7px] w-[7px]">
            <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-accent" />
            <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-accent" />
          </span>
          <span className="font-mono text-[12px] text-t2">
            open to internships — Islamabad / remote
          </span>
        </motion.div>

        {/* name */}
        <motion.h1
          variants={item}
          className="mb-3 text-[clamp(48px,10vw,80px)] font-semibold leading-[1.02] tracking-[-0.04em] drop-shadow-[0_0_45px_rgba(62,207,142,0.22)]"
        >
          <Decode text="Abdul Basit" trigger="mount" speed={45} className="text-gradient" />
        </motion.h1>

        {/* role */}
        <motion.p
          variants={item}
          className="mb-5 text-lg font-medium tracking-tight text-t1 sm:text-xl"
        >
          Aspiring{" "}
          <span className="text-accent-gradient font-semibold">DevOps Engineer</span>{" "}
          <span className="text-t3" aria-hidden>·</span> IT Student
        </motion.p>

        {/* bio */}
        <motion.p
          variants={item}
          className="mb-8 max-w-[540px] text-[15px] leading-[1.8] text-t2"
        >
          I&apos;m learning to{" "}
          <strong className="font-medium text-t1">build, ship &amp; run</strong>{" "}
          software the right way — going deep into Linux, Docker, and CI/CD while
          staying curious about AI. The terminal below is live —{" "}
          <span className="font-mono text-accent">try it</span>.
        </motion.p>

        {/* playable terminal */}
        <motion.div variants={item} className="mb-9 max-w-[600px]">
          <Terminal />
        </motion.div>

        {/* CTAs */}
        <motion.div variants={item} className="mb-10 flex flex-wrap items-center gap-3">
          <Magnetic>
            <a
              href="#work"
              data-cursor
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-bg shadow-glow-soft transition-all hover:shadow-glow active:scale-[0.98]"
            >
              View Projects
              <span aria-hidden>→</span>
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a
              href="https://github.com/basit779"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm text-t2 transition-colors hover:border-border-hover hover:text-t1"
            >
              GitHub <span aria-hidden>↗</span>
            </a>
          </Magnetic>
        </motion.div>

        {/* stats */}
        <motion.div
          variants={item}
          className="flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6"
        >
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="font-mono text-xl font-semibold text-t1">{s.value}</div>
              <div className="text-[12px] text-t3">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
