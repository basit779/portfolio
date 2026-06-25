"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* ── data ──────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    key: "studysnap",
    name: "StudySnap",
    tag: "AI study-pack generator with a 5-provider model fallback chain",
    live: "https://studysnap-cyan.vercel.app",
    repo: "https://github.com/basit779/NotesSummarizer",
  },
  {
    key: "fluxbid",
    name: "FluxBid",
    tag: "Real-time auction marketplace — live bids + countdowns, SSR",
    live: "https://ebay-se.vercel.app",
    repo: "https://github.com/basit779/FluxBid",
  },
];

const STACK: Record<string, string[]> = {
  "devops & cloud": ["Docker", "Linux", "Git", "GitHub Actions", "CI/CD", "Vercel", "Nginx"],
  languages: ["TypeScript", "JavaScript", "Python", "Java", "Bash"],
  web: ["Next.js", "React", "Node.js", "Tailwind"],
  data: ["PostgreSQL", "Prisma", "Neon", "Supabase"],
  "leveling up": ["Kubernetes", "Terraform", "AWS", "Prometheus", "Grafana"],
};

const EMAIL = "basitraja334411@gmail.com";
const GITHUB = "https://github.com/basit779";

/* ── render helpers ────────────────────────────────────────────── */
function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      data-cursor
      className="text-cyan underline decoration-cyan/30 underline-offset-2 hover:decoration-cyan"
    >
      {children}
    </a>
  );
}
const Head = ({ children }: { children: ReactNode }) => (
  <div className="mt-1 text-accent">{children}</div>
);
const Dim = ({ children }: { children: ReactNode }) => (
  <span className="text-t3">{children}</span>
);

/* ── commands ──────────────────────────────────────────────────── */
type Cmd = { desc: string; run: (args: string[]) => ReactNode };

const COMMANDS: Record<string, Cmd> = {
  help: {
    desc: "list everything you can run",
    run: () => (
      <div className="grid grid-cols-[110px_1fr] gap-x-3 gap-y-0.5">
        {Object.entries(COMMANDS).map(([k, c]) => (
          <div key={k} className="contents">
            <span className="text-accent">{k}</span>
            <span className="text-t2">{c.desc}</span>
          </div>
        ))}
        <span className="text-accent">clear</span>
        <span className="text-t2">wipe the screen</span>
      </div>
    ),
  },
  whoami: {
    desc: "who is this",
    run: () => (
      <span className="text-t2">
        abdul basit — aspiring devops engineer · IT student @ NUML Islamabad
      </span>
    ),
  },
  about: {
    desc: "the short story",
    run: () => (
      <div className="max-w-[60ch] text-t2">
        2nd-year IT student going all-in on DevOps. Started in full-stack web,
        got hooked on build/test/ship/run. I build with AI tools (Claude Code) +
        my own understanding — moving fast while making sure I understand what I
        ship. Learning Linux, Docker & CI/CD, curious about AI. Looking for an
        internship to grow fast.
      </div>
    ),
  },
  ls: {
    desc: "list projects",
    run: () => (
      <div className="text-t2">
        {PROJECTS.map((p) => (
          <span key={p.key} className="mr-4 text-accent">
            {p.key}/
          </span>
        ))}
        <Dim> — run `projects` for details</Dim>
      </div>
    ),
  },
  projects: {
    desc: "what i've shipped",
    run: () => (
      <div className="space-y-2">
        {PROJECTS.map((p) => (
          <div key={p.key}>
            <Head>▸ {p.name}</Head>
            <div className="text-t2">{p.tag}</div>
            <div className="text-[12px]">
              <A href={p.live}>live ↗</A> <Dim>·</Dim> <A href={p.repo}>source ↗</A>{" "}
              <Dim>·</Dim> <Dim>`open {p.key}`</Dim>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  open: {
    desc: "open a project (e.g. open studysnap)",
    run: (args) => {
      const p = PROJECTS.find((x) => x.key === (args[0] || "").toLowerCase());
      if (!p) return <span className="text-t2">usage: open [studysnap|fluxbid]</span>;
      if (typeof window !== "undefined") window.open(p.live, "_blank", "noopener");
      return (
        <span className="text-t2">
          opening {p.name} → <A href={p.live}>{p.live}</A>
        </span>
      );
    },
  },
  stack: {
    desc: "tools i build with",
    run: () => (
      <div className="space-y-0.5">
        {Object.entries(STACK).map(([cat, items]) => (
          <div key={cat} className="grid grid-cols-[120px_1fr] gap-2">
            <span className="text-accent">{cat}</span>
            <span className="text-t2">{items.join(" · ")}</span>
          </div>
        ))}
      </div>
    ),
  },
  pipeline: {
    desc: "the devops loop i'm learning",
    run: () => (
      <pre className="whitespace-pre-wrap text-accent">
        {"code → build → test → containerize → deploy → observe ↺"}
      </pre>
    ),
  },
  neofetch: {
    desc: "system info",
    run: () => (
      <div className="flex gap-4">
        <pre className="text-accent" aria-hidden>{"  ┌─┐\n  ├─┤\n  └─┘"}</pre>
        <div className="text-t2">
          <div>
            <span className="text-accent">abdul</span>@
            <span className="text-cyan">portfolio</span>
          </div>
          <div className="text-t3" aria-hidden>─────────────────</div>
          <div><span className="text-accent">role</span>   Aspiring DevOps Engineer</div>
          <div><span className="text-accent">edu</span>    BSIT-2 @ NUML Islamabad</div>
          <div><span className="text-accent">focus</span>  Linux · Docker · CI/CD</div>
          <div><span className="text-accent">build</span>  Claude Code + my own understanding</div>
          <div><span className="text-accent">status</span> open to internships</div>
        </div>
      </div>
    ),
  },
  contact: {
    desc: "how to reach me",
    run: () => (
      <div className="text-t2">
        <div>email · <A href={`mailto:${EMAIL}`}>{EMAIL}</A></div>
        <div>github · <A href={GITHUB}>@basit779</A></div>
      </div>
    ),
  },
  email: { desc: "email me", run: () => <span className="text-t2"><A href={`mailto:${EMAIL}`}>{EMAIL}</A></span> },
  github: {
    desc: "open github",
    run: () => {
      if (typeof window !== "undefined") window.open(GITHUB, "_blank", "noopener");
      return <span className="text-t2">opening <A href={GITHUB}>github.com/basit779</A></span>;
    },
  },
  sudo: {
    desc: "try it 😏",
    run: () => <span className="text-t2">user is not in the sudoers file. This incident will be reported. 🚓</span>,
  },
};

/* ── component ─────────────────────────────────────────────────── */
type Line = { id: number; node: ReactNode };

function PromptLabel() {
  return (
    <span className="select-none whitespace-nowrap">
      <span className="text-accent">visitor</span>
      <span className="text-t3">@</span>
      <span className="text-cyan">abdul-basit</span>
      <span className="text-t3">:~$</span>{" "}
    </span>
  );
}

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const idRef = useRef(0);
  const history = useRef<string[]>([]);
  const histIdx = useRef(0);
  const booted = useRef(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const print = (node: ReactNode) =>
    setLines((l) => [...l, { id: idRef.current++, node }]);

  // boot banner (guard against React StrictMode double-invoke in dev)
  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    print(
      <div className="text-t2">
        <span className="text-accent">abdul-basit</span> portfolio shell{" "}
        <Dim>v2.0</Dim> — type <span className="text-accent">help</span> to explore,{" "}
        <span className="text-accent">projects</span> to see my work.
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // autoscroll
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const runCommand = (raw: string) => {
    const cmd = raw.trim();
    print(
      <div className="flex">
        <PromptLabel />
        <span className="text-t1">{cmd}</span>
      </div>
    );
    if (!cmd) return;
    history.current.push(cmd);
    histIdx.current = history.current.length;

    const [name, ...args] = cmd.split(/\s+/);
    const key = name.toLowerCase();

    if (key === "clear") {
      setLines([]);
      return;
    }
    const entry = COMMANDS[key];
    if (!entry) {
      print(
        <span className="text-violet">
          command not found: {name} — type <span className="text-accent">help</span>
        </span>
      );
      return;
    }
    print(<div>{entry.run(args)}</div>);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (histIdx.current > 0) {
        histIdx.current -= 1;
        setInput(history.current[histIdx.current] ?? "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx.current < history.current.length) {
        histIdx.current += 1;
        setInput(history.current[histIdx.current] ?? "");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const matches = ["clear", ...Object.keys(COMMANDS)].filter((c) =>
        c.startsWith(input.toLowerCase())
      );
      if (matches.length === 1) setInput(matches[0]);
      else if (matches.length > 1) print(<span className="text-t3">{matches.join("  ")}</span>);
    }
  };

  return (
    <div className="conic-border rounded-xl" data-cursor>
      <div className="overflow-hidden rounded-xl border border-border bg-surface/95 shadow-card">
        {/* chrome */}
        <div className="flex items-center gap-2 border-b border-border bg-white/[0.02] px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-[11px] text-t3">
            visitor@abdul-basit — try me ↓
          </span>
        </div>

        {/* body */}
        <div
          ref={bodyRef}
          onClick={() => inputRef.current?.focus({ preventScroll: true })}
          tabIndex={0}
          aria-label="Terminal output, scrollable"
          className="h-[300px] cursor-text overflow-y-auto px-4 py-3 font-mono text-[12.5px] leading-relaxed outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent sm:h-[340px] sm:text-[13px]"
        >
          <div role="log" aria-live="polite" aria-atomic="false" className="space-y-1">
            {lines.map((l) => (
              <div key={l.id}>{l.node}</div>
            ))}
          </div>

          {/* input line (outside the live region so typing isn't re-announced) */}
          <div className="mt-1 flex items-center">
            <PromptLabel />
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              aria-label="Terminal input — type a command"
              className="flex-1 bg-transparent text-t1 caret-accent outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
