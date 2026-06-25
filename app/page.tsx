import Background from "@/components/Background";
import Cursor     from "@/components/Cursor";
import Nav       from "@/components/Nav";
import Hero      from "@/components/Hero";
import Projects  from "@/components/Projects";
import Pipeline  from "@/components/Pipeline";
import Stack     from "@/components/Stack";
import About     from "@/components/About";
import Contact   from "@/components/Contact";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-3 focus:py-1.5 focus:text-sm focus:font-medium focus:text-bg"
      >
        Skip to content
      </a>
      <Background />
      <Cursor />
      <Nav />
      <main id="main" className="relative z-10 mx-auto max-w-[760px] px-6">
        <Hero />
        <Projects />
        <Pipeline />
        <Stack />
        <About />
        <Contact />
      </main>
      <footer className="relative z-10 mx-auto flex max-w-[760px] flex-col gap-2 border-t border-border px-6 pb-16 pt-7 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-xs text-t3">Abdul Basit © 2026</span>
        <span className="font-mono text-[11px] text-t3">
          built with next.js · deployed on vercel
        </span>
      </footer>
    </>
  );
}
