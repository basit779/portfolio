"use client";

import Reveal from "./Reveal";
import Magnetic from "./Magnetic";
import Decode from "./Decode";

const EMAIL = "basitraja334411@gmail.com";

const LINKS = [
  { label: "GitHub",   handle: "@basit779", href: "https://github.com/basit779" },
  { label: "LinkedIn", handle: "basit-py",  href: "https://www.linkedin.com/in/basit-py-b940053aa/" },
  { label: "Email",    handle: EMAIL,       href: `mailto:${EMAIL}` },
];

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 py-16">
      <Reveal>
        <div className="conic-border relative overflow-hidden rounded-2xl border border-border bg-surface/90 p-8 sm:p-12">
          {/* glow accent */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-accent/15 blur-[90px]" />

          <p className="relative mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            // contact
          </p>
          <h2 className="relative mb-4 text-3xl font-semibold tracking-[-0.025em] text-t1 sm:text-4xl">
            <Decode text="Let's build something." />
          </h2>
          <p className="relative mb-8 max-w-[460px] text-[15px] leading-[1.8] text-t2">
            I&apos;m open to DevOps / software internships in Islamabad or remote.
            Got an opportunity, a question, or just want to talk shop? I reply
            fast.
          </p>

          <div className="relative mb-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-bg shadow-glow-soft transition-all hover:shadow-glow active:scale-[0.98]"
              >
                Email me <span aria-hidden>→</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a
                href="https://github.com/basit779"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm text-t2 transition-colors hover:border-border-hover hover:text-t1"
              >
                GitHub <span aria-hidden>↗</span>
              </a>
            </Magnetic>
          </div>

          <div className="relative grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex flex-col gap-1 bg-surface px-5 py-4 transition-colors hover:bg-surface2"
              >
                <span className="font-mono text-[10px] uppercase tracking-wider text-t3">
                  {l.label}
                </span>
                <span className="truncate text-[13.5px] text-t2 transition-colors group-hover:text-accent">
                  {l.handle}
                </span>
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
