"use client";

import Reveal from "./Reveal";
import Decode from "./Decode";

const GROUPS: { category: string; items: string[]; learning?: boolean }[] = [
  {
    category: "DevOps & Cloud",
    items: ["Docker", "Linux", "Git", "GitHub Actions", "CI/CD", "Vercel", "Nginx"],
  },
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "Java", "Bash"],
  },
  {
    category: "Web",
    items: ["Next.js", "React", "Node.js", "Tailwind CSS"],
  },
  {
    category: "Data",
    items: ["PostgreSQL", "Prisma", "Neon", "Supabase"],
  },
  {
    category: "Leveling up next",
    items: ["Kubernetes", "Terraform", "AWS", "Prometheus", "Grafana"],
    learning: true,
  },
];

const MARQUEE = [
  "Docker", "Linux", "Kubernetes", "Terraform", "GitHub Actions", "AWS",
  "CI/CD", "Nginx", "Prometheus", "Grafana", "Git", "Bash", "Vercel",
];

export default function Stack() {
  return (
    <section id="stack" className="scroll-mt-20 py-16">
      <Reveal>
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
          // toolbox
        </p>
        <h2 className="mb-8 text-2xl font-semibold tracking-tight text-t1 sm:text-3xl">
          <Decode text="Tools I build & ship with" />
        </h2>
      </Reveal>

      {/* marquee */}
      <Reveal>
        <div className="relative mb-10 overflow-hidden rounded-xl border border-border bg-surface/40 py-3 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
          <div className="flex w-max animate-marquee gap-3 pr-3">
            {[...MARQUEE, ...MARQUEE].map((t, i) => (
              <span
                key={`${t}-${i}`}
                className="whitespace-nowrap rounded-md border border-border bg-white/[0.02] px-3 py-1 font-mono text-[12px] text-t2"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      {/* grouped grid */}
      <div className="flex flex-col gap-5">
        {GROUPS.map(({ category, items, learning }, gi) => (
          <Reveal key={category} delay={gi * 0.06}>
            <div className="grid grid-cols-[110px_1fr] items-start gap-4 max-sm:grid-cols-1 max-sm:gap-2">
              <span className="flex items-center gap-1.5 pt-1 text-[12px] text-t3">
                {learning && (
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" />
                )}
                {category}
              </span>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className={`rounded-lg px-3 py-1.5 text-[13px] transition-all hover:-translate-y-0.5 ${
                      learning
                        ? "border border-dashed border-cyan/30 text-t2 hover:border-cyan/60 hover:text-cyan"
                        : "border border-border text-t2 hover:border-accent/50 hover:text-t1 hover:shadow-glow-soft"
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
