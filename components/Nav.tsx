"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";

const links = [
  { label: "Work",     href: "#work",     id: "work"     },
  { label: "Pipeline", href: "#pipeline", id: "pipeline" },
  { label: "Stack",    href: "#stack",    id: "stack"    },
  { label: "About",    href: "#about",    id: "about"    },
  { label: "Contact",  href: "#contact",  id: "contact"  },
];

export default function Nav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[];

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <nav aria-label="Primary" className="sticky top-0 z-50 glass">
      {/* scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-accent via-cyan to-violet"
      />

      <div className="mx-auto flex h-[54px] max-w-[760px] items-center justify-between px-6">
        <a href="#top" className="group flex items-center gap-2">
          <span className="font-mono text-[13px] text-accent">~/</span>
          <span className="text-sm font-medium tracking-tight text-t1 transition-colors group-hover:text-white">
            abdul-basit
          </span>
        </a>

        <div className="flex items-center gap-0.5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={active === l.id ? "true" : undefined}
              className={`relative hidden rounded-md px-[10px] py-1.5 text-[13px] transition-colors sm:block ${
                active === l.id ? "text-t1" : "text-t2 hover:text-t1"
              }`}
            >
              {l.label}
              {active === l.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 -z-10 rounded-md bg-white/[0.06]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
          <a
            href="https://github.com/basit779"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 hidden rounded-md border border-border px-3 py-1.5 text-[13px] text-t2 transition-colors hover:border-border-hover hover:text-t1 sm:block"
          >
            GitHub <span aria-hidden>↗</span>
          </a>

          {/* mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-t1 transition-colors hover:border-border-hover sm:hidden"
          >
            <span className="relative block h-[10px] w-[18px]">
              <span
                className={`absolute left-0 block h-[1.5px] w-full bg-current transition-all duration-300 ${
                  open ? "top-[4px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-[8px] block h-[1.5px] w-full bg-current transition-all duration-300 ${
                  open ? "-rotate-45 !top-[4px]" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border glass sm:hidden"
          >
            <div className="mx-auto flex max-w-[760px] flex-col px-6 py-2">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={active === l.id ? "true" : undefined}
                  className={`rounded-md px-2 py-2.5 text-sm transition-colors ${
                    active === l.id ? "text-accent" : "text-t2 hover:text-t1"
                  }`}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="https://github.com/basit779"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm text-t2 transition-colors hover:text-t1"
              >
                GitHub <span aria-hidden>↗</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
