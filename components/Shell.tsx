"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { useStore } from "@/lib/store";

const TOP = [
  { href: "/", label: "Explore" },
  { href: "/image", label: "Image" },
  { href: "/video", label: "Video" },
  { href: "/audio", label: "Audio" },
  { href: "/supercomputer", label: "Supercomputer", neu: true },
  { href: "/mcp", label: "MCP & CLI", neu: true },
  { href: "/cinema", label: "Cinema Studio" },
];

const SEARCHABLE = [
  ...TOP,
  { href: "/library", label: "Library" },
  { href: "/community", label: "Community" },
  { href: "/profile", label: "Profile" },
];

function Mark() {
  return (
    <span className="mark" aria-hidden>
      <svg width="14" height="14" viewBox="0 0 14 14">
        <path d="M4 12 V4.5 L7 2 l3 2.5 V12" fill="none" stroke="#111" strokeWidth="1.6" />
        <path d="M3 12 h8" stroke="#111" strokeWidth="1.6" />
      </svg>
    </span>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const { credits, toasts, toast, dismiss } = useStore();
  const [search, setSearch] = useState(false);
  const [upgrade, setUpgrade] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearch(true);
      }
      if (e.key === "Escape") {
        setSearch(false);
        setUpgrade(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const on = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));
  const hits = SEARCHABLE.filter((x) => x.label.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="app">
      <div className="promo">Baptism shell · no models attached · Menhir Web</div>
      <header className="top">
        <Link href="/" className="brand">
          <Mark />
          Menhir Web
        </Link>
        <nav className="top-scroll" aria-label="Studio">
          {TOP.map((l) => (
            <Link key={l.href} href={l.href} className={`nav-link ${on(l.href) ? "on" : ""}`}>
              {l.label}
              {"neu" in l && l.neu ? <span className="new">New</span> : null}
            </Link>
          ))}
        </nav>
        <div className="top-right">
          <button className="icon-btn" type="button" onClick={() => setSearch(true)} aria-label="Search">
            ⌘K
          </button>
          <button className="ghost pinkish" type="button" onClick={() => setUpgrade(true)}>
            Upgrade
            <span className="badge">30%</span>
          </button>
          <Link href="/library" className="ghost">
            Assets
          </Link>
          <span className="ghost">{credits} cr</span>
          <Link href="/profile" className="avatar" aria-label="Profile">
            MW
          </Link>
        </div>
      </header>

      {children}

      <nav className="dock" aria-label="Primary">
        <Link href="/" className={path === "/" ? "on" : ""}>
          Home
        </Link>
        <Link href="/community" className={on("/community") ? "on" : ""}>
          Community
        </Link>
        <button
          type="button"
          className="gen"
          aria-label="Generate"
          onClick={() => router.push("/video")}
        >
          ✦
        </button>
        <Link href="/library" className={on("/library") ? "on" : ""}>
          Library
        </Link>
        <Link href="/profile" className={on("/profile") ? "on" : ""}>
          Profile
        </Link>
      </nav>

      {search ? (
        <div className="modal-back" onClick={() => setSearch(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Search</h2>
            <input
              autoFocus
              type="text"
              placeholder="Jump to a surface"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            {hits.map((h) => (
              <Link
                key={h.href}
                href={h.href}
                className="search-hit"
                onClick={() => setSearch(false)}
              >
                {h.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      {upgrade ? (
        <div className="modal-back" onClick={() => setUpgrade(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Plans</h2>
            <p className="muted">Checkout is not wired. This is the baptism shell.</p>
            <div className="actions" style={{ marginTop: 12 }}>
              <button className="lime" type="button" onClick={() => toast("No billing on this shell.")}>
                Creator — fake
              </button>
              <button className="ghost" type="button" onClick={() => toast("No billing on this shell.")}>
                Unlimited — fake
              </button>
              <button className="ghost" type="button" onClick={() => setUpgrade(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="toast-wrap">
        {toasts.map((t) => (
          <button key={t.id} className="toast" type="button" onClick={() => dismiss(t.id)}>
            {t.text}
          </button>
        ))}
      </div>
    </div>
  );
}
