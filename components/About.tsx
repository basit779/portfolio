"use client";

import Reveal from "./Reveal";
import Decode from "./Decode";

const FACTS = [
  { k: "Location", v: "Islamabad, PK · remote-friendly" },
  { k: "Studying", v: "BSIT-2 @ NUML Islamabad" },
  { k: "Focus",    v: "DevOps — Linux · Docker · CI/CD" },
  { k: "Also",     v: "Freelancing automation on Fiverr" },
  { k: "Status",   v: "Open to internships" },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 py-16">
      <Reveal>
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
          // about
        </p>
        <h2 className="mb-8 text-2xl font-semibold tracking-tight text-t1 sm:text-3xl">
          <Decode text="Student now, shipping already" />
        </h2>
      </Reveal>

      <div className="grid gap-8 sm:grid-cols-[1fr_280px]">
        <Reveal>
          <div className="space-y-4 text-[15px] leading-[1.85] text-t2">
            <p>
              I&apos;m a second-year IT student at{" "}
              <strong className="font-medium text-t1">NUML Islamabad</strong>, and
              right now my whole focus is becoming a{" "}
              <strong className="font-medium text-t1">DevOps engineer</strong>.
            </p>
            <p>
              I started in full-stack web — shipping real apps with Next.js and
              TypeScript — but I got hooked on the part most people skip: getting
              software to build, test, and{" "}
              <em className="text-t1 not-italic">actually run reliably</em>. So
              I&apos;m going deep on Linux, Docker, and CI/CD, and staying curious
              about how AI fits into the workflow.
            </p>
            <p>
              I build fast by pairing AI tools like{" "}
              <strong className="font-medium text-t1">Claude Code</strong> with my
              own understanding — I use them to move quickly, but I make sure I
              actually understand everything I ship.
            </p>
            <p>
              I&apos;m not here pretending to know it all — I&apos;m a student who
              learns fast, ships often, and isn&apos;t afraid to break things and
              figure out why. I&apos;m looking for an{" "}
              <strong className="font-medium text-t1">internship</strong> where I
              can get my hands dirty, contribute, and grow fast.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="glass rounded-xl p-5">
            {FACTS.map((f, i) => (
              <div
                key={f.k}
                className={`flex flex-col gap-0.5 py-3 ${
                  i !== FACTS.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <dt className="font-mono text-[10px] uppercase tracking-wider text-t3">
                  {f.k}
                </dt>
                <dd className="text-[13.5px] text-t1">{f.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
