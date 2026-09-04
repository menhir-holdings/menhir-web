"use client";

import Link from "next/link";
import { COMMUNITY } from "@/lib/mock";
import { useStore } from "@/lib/store";

export default function CommunityPage() {
  const { toast } = useStore();

  return (
    <main className="page">
      <div className="row-title">
        <h2>Community</h2>
        <button className="ghost" type="button" onClick={() => toast("Follow is local chrome.")}>
          Follow studio
        </button>
      </div>
      <div className="grid">
        {COMMUNITY.map((c) => (
          <Link key={c.id} href={`/library/${c.id}`} className="card">
            <div className={`plate tall ${c.plate}`} />
            <div className="meta">
              <h3>{c.title}</h3>
              <p>{c.author} · Public</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
