"use client";

import { useRef } from "react";
import Reveal from "./Reveal";
import Decode from "./Decode";

type Project = {
  index: string;
  name: string;
  tagline: string;
  desc: string;
  highlights: string[];
  tags: string[];
  live?: string;
  repo?: string;
  status: string;
};

const PROJECTS: Project[] = [
  {
    index: "01",
    name: "StudySnap",
    tagline: "AI study-pack generator with a self-healing model chain",
    desc: "Turns messy notes into clean study packs. The real engineering is the multi-provider fallback chain — Gemini → Groq → Mistral → OpenRouter → DeepSeek — so if one model rate-limits or times out, the request quietly fails over to the next.",
    highlights: [
      "5-provider AI fallback chain",
      "Chunked processing + AbortSignal timeouts",
      "Per-model token budgets",
      "Continuous deploy on Vercel",
    ],
    tags: ["Next.js", "TypeScript", "Prisma", "Neon", "Gemini", "Groq", "Vercel"],
    live: "https://studysnap-cyan.vercel.app",
    repo: "https://github.com/basit779/NotesSummarizer",
    status: "Live",
  },
  {
    index: "02",
    name: "FluxBid",
    tagline: "Real-time auction marketplace",
    desc: "An eBay-style bidding platform with live countdown timers, search, and real-time bids. Built with Suspense-safe server-side rendering so listings stream in fast without hydration mismatches.",
    highlights: [
      "Live countdowns + real-time bidding",
      "Suspense-safe SSR",
      "Search across listings",
      "Shipped & deployed on Vercel",
    ],
    tags: ["Next.js", "TypeScript", "SSR", "Vercel"],
    live: "https://ebay-se.vercel.app",
    repo: "https://github.com/basit779/FluxBid",
    status: "Live",
  },
];

function SpotlightCard({ p }: { p: Project }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className="group conic-border relative overflow-hidden rounded-2xl border border-border bg-surface/90 p-7 transition-colors duration-300 hover:border-border-hover sm:p-8"
    >
      {/* cursor spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(380px circle at var(--mx) var(--my), rgba(62,207,142,0.10), transparent 60%)",
        }}
      />

      <div className="relative">
        {/* header */}
        <div className="mb-3 flex items-start justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-xs text-t3">{p.index}</span>
            <h3 className="text-xl font-semibold tracking-tight text-t1 sm:text-2xl">
              {p.name}
            </h3>
          </div>
          <span className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 font-mono text-[10px] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent pulse-dot" />
            {p.status}
          </span>
        </div>

        <p className="mb-4 text-sm font-medium text-accent/90">{p.tagline}</p>
        <p className="mb-6 max-w-[560px] text-[14px] leading-[1.7] text-t2">
          {p.desc}
        </p>

        {/* highlights */}
        <ul className="mb-6 grid gap-2 sm:grid-cols-2">
          {p.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-[13px] text-t2">
              <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
              {h}
            </li>
          ))}
        </ul>

        {/* tags */}
        <div className="mb-6 flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <span
              key={t}
              className="rounded-md border border-border bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-t3 transition-colors group-hover:text-t2"
            >
              {t}
            </span>
          ))}
        </div>

        {/* links */}
        <div className="flex items-center gap-4 border-t border-border pt-5">
          {p.live && (
            <a
              href={p.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.name} live demo`}
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-t1 transition-colors hover:text-accent"
            >
              Live demo <span aria-hidden>↗</span>
            </a>
          )}
          {p.repo && (
            <a
              href={p.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.name} source code`}
              className="inline-flex items-center gap-1.5 text-[13px] text-t2 transition-colors hover:text-t1"
            >
              Source <span aria-hidden>↗</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="work" className="scroll-mt-20 py-16">
      <Reveal>
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
          // selected work
        </p>
        <h2 className="mb-8 text-2xl font-semibold tracking-tight text-t1 sm:text-3xl">
          <Decode text="Things I've built & shipped" />
        </h2>
      </Reveal>

      <div className="flex flex-col gap-5">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08}>
            <SpotlightCard p={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
