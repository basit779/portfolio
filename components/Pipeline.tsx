"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import Decode from "./Decode";
import type { ReactNode } from "react";

/* ── minimal stroke icons (color via currentColor on the parent) ── */
const ico = "h-5 w-5";
const Code = () => (
  <svg className={ico} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m9 9-3 3 3 3M15 9l3 3-3 3M13 5l-2 14" /></svg>
);
const Build = () => (
  <svg className={ico} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="m12 12 8-4.5M12 12v9M12 12 4 7.5" /></svg>
);
const Test = () => (
  <svg className={ico} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 5 6v6c0 4 3 6.5 7 9 4-2.5 7-5 7-9V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></svg>
);
const Container = () => (
  <svg className={ico} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="11" rx="1.5" /><path d="M7 8V6M11 8V6M15 8V6M7 12v3M11 12v3M15 12v3" /></svg>
);
const Deploy = () => (
  <svg className={ico} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c3 1.5 5 5 5 9l-2 4H9l-2-4c0-4 2-7.5 5-9Z" /><circle cx="12" cy="9" r="1.6" /><path d="M9 19c-1 1-1 2-1 2M15 19c1 1 1 2 1 2" /></svg>
);
const Observe = () => (
  <svg className={ico} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l2-6 4 12 2-6h6" /></svg>
);

type Tone = { text: string; badge: string; cmd: string };
const TONES: Record<"green" | "cyan" | "violet", Tone> = {
  green:  { text: "text-accent", badge: "border-accent/25 bg-accent/10", cmd: "text-accent/80" },
  cyan:   { text: "text-cyan",   badge: "border-cyan/25 bg-cyan/10",     cmd: "text-cyan/80"   },
  violet: { text: "text-violet", badge: "border-violet/25 bg-violet/10", cmd: "text-violet/80" },
};

type Stage = { icon: ReactNode; label: string; cmd: string; note: string; tone: keyof typeof TONES };

const STAGES: Stage[] = [
  { icon: <Code />,      label: "Code",        cmd: "git push",     note: "branches · PRs", tone: "green"  },
  { icon: <Build />,     label: "Build",       cmd: "next build",   note: "node · deps",    tone: "green"  },
  { icon: <Test />,      label: "Test",        cmd: "ci checks",    note: "lint · types",   tone: "cyan"   },
  { icon: <Container />, label: "Containerize",cmd: "docker build", note: "images",         tone: "cyan"   },
  { icon: <Deploy />,    label: "Deploy",      cmd: "ship it",      note: "vercel · cloud", tone: "violet" },
  { icon: <Observe />,   label: "Observe",     cmd: "tail -f",      note: "logs · uptime",  tone: "violet" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};
const node = {
  hidden: { opacity: 0, y: 14, scale: 0.92 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function Connector() {
  return (
    <>
      {/* horizontal (desktop) */}
      <div className="relative hidden h-px flex-1 overflow-hidden bg-border sm:block">
        <div className="flow-x-seg absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-accent to-transparent" />
      </div>
      {/* vertical (mobile) */}
      <div className="relative mx-auto h-6 w-px overflow-hidden bg-border sm:hidden">
        <div className="flow-y-seg absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-accent to-transparent" />
      </div>
    </>
  );
}

export default function Pipeline() {
  return (
    <section id="pipeline" className="scroll-mt-20 py-16">
      <Reveal>
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
          // devops journey
        </p>
        <h2 className="mb-3 text-2xl font-semibold tracking-tight text-t1 sm:text-3xl">
          <Decode text="The pipeline I'm learning to own" />
        </h2>
        <p className="mb-9 max-w-[540px] text-[15px] leading-[1.8] text-t2">
          Code is only half the job — getting it tested, packaged, and running
          reliably is the other half. This is the loop I&apos;m working to own
          end-to-end, one stage at a time.
        </p>
      </Reveal>

      <Reveal y={24}>
        <div className="rounded-2xl border border-border bg-surface/85 p-6 sm:p-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col items-stretch sm:flex-row sm:items-center"
          >
            {STAGES.map((s, i) => (
              <div
                key={s.label}
                className="flex flex-col items-center sm:flex-1 sm:flex-row"
              >
                <motion.div
                  variants={node}
                  className="group flex w-full flex-col items-center gap-2 rounded-xl border border-border bg-white/[0.02] px-3 py-4 text-center transition-colors hover:border-border-hover sm:w-auto sm:flex-1"
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border shadow-glow-soft ${TONES[s.tone].text} ${TONES[s.tone].badge}`}
                  >
                    {s.icon}
                  </span>
                  <span className="text-[13px] font-semibold text-t1">
                    {s.label}
                  </span>
                  <span className={`font-mono text-[10px] ${TONES[s.tone].cmd}`}>
                    {s.cmd}
                  </span>
                  <span className="font-mono text-[10px] text-t3">{s.note}</span>
                </motion.div>

                {i < STAGES.length - 1 && <Connector />}
              </div>
            ))}
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}
