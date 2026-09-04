"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";

export default function ProfilePage() {
  const { credits, generations, toast } = useStore();
  const [name, setName] = useState("Menhir Web");

  return (
    <main className="page">
      <h2>Profile</h2>
      <p className="banner-note">Local only. Sign-in is a field.</p>
      <div className="profile">
        <div className="stat">
          <div className="kicker">Handle</div>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="stat">
          <div className="kicker">Credits</div>
          <strong style={{ fontSize: 28 }}>{credits}</strong>
          <p className="muted">Decrement on Generate. Not a ledger.</p>
        </div>
        <div className="stat">
          <div className="kicker">Library</div>
          <strong>{generations.length} jobs in this browser</strong>
        </div>
        <button className="lime" type="button" onClick={() => toast(`Saved ${name} in memory, not an account.`)}>
          Save profile
        </button>
      </div>
    </main>
  );
}
