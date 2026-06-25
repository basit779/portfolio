"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom cursor: an instant blend-mode dot + a spring-lagged ring that grows
 * over links/buttons. Fine-pointer (mouse) only — touch devices keep their
 * native behaviour and this renders nothing.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 26, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 26, mass: 0.5 });

  useEffect(() => {
    const fine =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(pointer: coarse)").matches;
    if (!fine) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setEnabled(true);
    document.documentElement.classList.add("hide-cursor");

    const park = () => {
      x.set(-100);
      y.set(-100);
      setHover(false);
    };
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const interactive = !!(e.target as HTMLElement)?.closest?.(
        "a, button, input, [data-cursor], [role='button']"
      );
      setHover(interactive);
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", park);
    window.addEventListener("blur", park);
    return () => {
      document.documentElement.classList.remove("hide-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", park);
      window.removeEventListener("blur", park);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border border-accent"
        style={{
          x: ringX,
          y: ringY,
          width: 36,
          height: 36,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: down ? 0.8 : hover ? 1.7 : 1,
          opacity: hover ? 1 : 0.6,
          backgroundColor: hover ? "rgba(62,207,142,0.12)" : "rgba(62,207,142,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />
      {/* dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-white mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}
