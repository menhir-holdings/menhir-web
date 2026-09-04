"use client";

import { useStore } from "@/lib/store";

export default function McpPage() {
  const { toast } = useStore();

  return (
    <main className="page">
      <h2>MCP & CLI</h2>
      <p className="banner-note">Docs chrome. The real Higgsfield MCP is not this repo.</p>
      <div className="stat">
        <p>
          <code>menhir web generate --kind video</code>
        </p>
        <p className="muted" style={{ marginTop: 8 }}>
          That command is copy, not a binary. This page exists so the top-nav item lands.
        </p>
        <button className="lime" type="button" style={{ marginTop: 16 }} onClick={() => toast("CLI is not installed.")}>
          Copy install
        </button>
      </div>
    </main>
  );
}
