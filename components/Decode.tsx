"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}=+*^?#01";

type Props = {
  text: string;
  className?: string;
  /** ms per character reveal */
  speed?: number;
  /** start when scrolled into view (default) or immediately on mount */
  trigger?: "view" | "mount";
};

/**
 * Renders `text` with a hacker-style scramble that resolves to the final string.
 * - a hidden ghost copy reserves the final width so the heading never reflows
 * - the scrambling glyphs are hidden from assistive tech; an sr-only copy holds
 *   the real accessible name
 * - reduced-motion users see the final text immediately
 */
export default function Decode({ text, className, speed = 28, trigger = "view" }: Props) {
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(text);
      return;
    }

    let raf = 0;
    let last = 0;
    let revealed = 0;

    const run = (now: number) => {
      if (now - last >= speed) {
        last = now;
        revealed += 1;
        let out = "";
        for (let i = 0; i < text.length; i++) {
          if (i < revealed || text[i] === " ") out += text[i];
          else out += GLYPHS[Math.floor((now * 0.05 + i * 7) % GLYPHS.length)];
        }
        setDisplay(out);
      }
      if (revealed <= text.length) raf = requestAnimationFrame(run);
      else setDisplay(text);
    };

    const begin = () => {
      if (started.current) return;
      started.current = true;
      raf = requestAnimationFrame(run);
    };

    if (trigger === "mount") {
      begin();
      return () => cancelAnimationFrame(raf);
    }

    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          begin();
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text, speed, trigger]);

  return (
    <span ref={ref} style={{ display: "inline-grid" }}>
      {/* ghost: reserves the final width so layout never shifts */}
      <span aria-hidden className={className} style={{ gridArea: "1 / 1", visibility: "hidden" }}>
        {text}
      </span>
      {/* animated, decorative */}
      <span aria-hidden className={className} style={{ gridArea: "1 / 1" }}>
        {display}
      </span>
      {/* stable accessible name for screen readers */}
      <span className="sr-only">{text}</span>
    </span>
  );
}
