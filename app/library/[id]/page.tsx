"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { COMMUNITY } from "@/lib/mock";
import { useStore } from "@/lib/store";

export default function LibraryItemPage() {
  const { id } = useParams<{ id: string }>();
  const { generations, enqueue, toast } = useStore();
  const job = generations.find((g) => g.id === id);
  const comm = COMMUNITY.find((c) => c.id === id);
  const title = job?.title ?? comm?.title ?? "Missing plate";
  const plate = job?.plate ?? comm?.plate ?? "p-new";
  const prompt = job?.prompt ?? "Public community plate — no prompt store.";

  return (
    <main className="page">
      <p className="banner-note">
        <Link href="/library">Library</Link> / {title}
      </p>
      <div className="detail">
        <div className={`plate hero ${plate}`} style={{ borderRadius: 20, border: "1px solid var(--line)" }} />
        <aside className="side">
          <div className="kicker">Information</div>
          <h2 style={{ margin: "0 0 8px" }}>{title}</h2>
          <p className="muted">{prompt}</p>
          <p className="muted" style={{ marginTop: 8 }}>
            {job ? `${job.model} · ${job.aspect} · ${job.duration}` : "Menhir Studio · Public"}
          </p>
          <div className="actions" style={{ marginTop: 16 }}>
            <button
              className="lime"
              type="button"
              onClick={() => {
                enqueue({
                  kind: job?.kind ?? "video",
                  prompt,
                  model: job?.model ?? "Cinema 3.5",
                  aspect: job?.aspect ?? "16:9",
                  duration: job?.duration ?? "8s",
                });
                toast("Recreate queued locally.");
              }}
            >
              Recreate
            </button>
            <button className="ghost" type="button" onClick={() => toast("Publish is chrome.")}>
              Publish
            </button>
            <button className="ghost" type="button" onClick={() => toast("No file. CSS plate.")}>
              Download
            </button>
            <button className="ghost" type="button" onClick={() => toast("Liked in this browser only.")}>
              Like
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}
