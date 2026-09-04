"use client";

import Link from "next/link";
import { COMMUNITY, FEATURED, TOOLS } from "@/lib/mock";
import { useStore } from "@/lib/store";

export default function ExplorePage() {
  const { toast } = useStore();

  return (
    <main className="page">
      <p className="banner-note">Explore · plates are CSS, not gens.</p>
      <div className="bento">
        {FEATURED.map((f) => (
          <Link key={f.title} href={f.href} className="card">
            <div className={`plate tall ${f.plate}`} />
            <div className="meta">
              <div className="kicker">{f.kicker}</div>
              <h3>{f.title}</h3>
              <p>{f.copy}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className={`hero-banner plate p-lintel`}>
        <div>
          <h2>
            SIGN UP AND GET YOUR
            <br />
            <span className="lime-t">EXTRA NOTHING</span>
          </h2>
          <ul>
            <li>✓ Unlimited placeholder plates</li>
            <li>✓ Unlock a discount that does not charge</li>
            <li>✓ Access to Seedance shell</li>
          </ul>
          <button className="lime" type="button" onClick={() => toast("No account system on this baptism.")}>
            Get your discount
          </button>
        </div>
      </div>

      <div className="tools">
        {TOOLS.map((t) => (
          <Link key={t.title} href={t.href} className="tool">
            <span className="tag">{t.tag}</span>
            <h3 style={{ margin: "0 0 4px" }}>{t.title}</h3>
            <p className="muted">{t.copy}</p>
          </Link>
        ))}
      </div>

      <div className="row-title">
        <h2>Creating in public</h2>
        <Link href="/community" className="muted">
          Explore community
        </Link>
      </div>
      <div className="film-row">
        {COMMUNITY.map((c) => (
          <Link key={c.id} href={`/library/${c.id}`} className="card">
            <div className={`plate ${c.plate}`} />
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
