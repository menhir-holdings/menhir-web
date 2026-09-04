"use client";

import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/lib/store";

const CHIPS = [
  { href: "/image", label: "Image" },
  { href: "/video", label: "Video" },
  { href: "/cinema", label: "Cinema" },
  { href: "/community", label: "Run marketing" },
];

export default function SupercomputerPage() {
  const { toast, enqueue } = useStore();
  const [q, setQ] = useState("");

  return (
    <main className="page">
      <div className="ask">
        <h1>WHAT ARE WE CREATING TODAY?</h1>
        <div className="ask-row">
          <textarea value={q} onChange={(e) => setQ(e.target.value)} placeholder="Make product shots for my campaign" />
          <button
            className="ask-go"
            type="button"
            aria-label="Ask"
            onClick={() => {
              enqueue({
                kind: "video",
                prompt: q || "Make product shots for my campaign",
                model: "Supercomputer",
                aspect: "16:9",
                duration: "8s",
              });
              toast("Agent routed to a fake video job.");
            }}
          >
            ↑
          </button>
        </div>
        <div className="chips" style={{ marginTop: 12 }}>
          {CHIPS.map((c) => (
            <Link key={c.href} href={c.href} className="chip">
              {c.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="row-title">
        <h2>What Supercomputer can do</h2>
      </div>
      <div className="tools">
        <button className="tool" type="button" onClick={() => toast("Remix is a label.")}>
          <span className="tag">New</span>
          <h3>Remix</h3>
          <p className="muted">Make it low poly — no mesh.</p>
        </button>
        <Link href="/cinema" className="tool">
          <span className="tag">Popular</span>
          <h3>Campaign pack</h3>
          <p className="muted">Strategy cards with nowhere to send.</p>
        </Link>
        <Link href="/community" className="tool">
          <span className="tag">Viral</span>
          <h3>Carousels</h3>
          <p className="muted">Five slides of CSS.</p>
        </Link>
      </div>
    </main>
  );
}
