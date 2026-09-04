"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { COMMUNITY } from "@/lib/mock";
import { useStore } from "@/lib/store";
import type { Kind } from "@/lib/types";

export default function LibraryPage() {
  const { generations } = useStore();
  const [kind, setKind] = useState<"all" | Kind>("all");
  const shown = useMemo(
    () => generations.filter((g) => kind === "all" || g.kind === kind),
    [generations, kind],
  );

  return (
    <main className="page">
      <div className="row-title">
        <h2>Library</h2>
        <span className="muted">{shown.length} plates</span>
      </div>
      <div className="chips">
        {(["all", "image", "video", "audio"] as const).map((k) => (
          <button key={k} className={`chip ${kind === k ? "on" : ""}`} type="button" onClick={() => setKind(k)}>
            {k}
          </button>
        ))}
      </div>
      <div className="grid" style={{ marginTop: 16 }}>
        {shown.map((g) => (
          <Link key={g.id} href={`/library/${g.id}`} className="card">
            <div className={`plate ${g.plate}`} />
            <div className="meta">
              <h3>{g.title}</h3>
              <p>
                {g.kind} · {g.status}
              </p>
            </div>
          </Link>
        ))}
        {COMMUNITY.filter((c) => !shown.some((g) => g.id === c.id)).map((c) => (
          <Link key={c.id} href={`/library/${c.id}`} className="card">
            <div className={`plate ${c.plate}`} />
            <div className="meta">
              <h3>{c.title}</h3>
              <p>community · public</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
