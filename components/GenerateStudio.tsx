"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ASPECTS, DURATIONS, MODELS, RESOLUTIONS } from "@/lib/mock";
import { useStore } from "@/lib/store";
import type { Kind } from "@/lib/types";

const TABS = [
  { id: "create", label: "Create" },
  { id: "edit", label: "Edit" },
  { id: "motion", label: "Motion" },
] as const;

export function GenerateStudio({ kind }: { kind: Kind }) {
  const router = useRouter();
  const { generations, enqueue, toast } = useStore();
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("create");
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState(MODELS[kind][0]);
  const [aspect, setAspect] = useState("16:9");
  const [duration, setDuration] = useState(kind === "image" ? "4s" : "8s");
  const [res, setRes] = useState("1080p");
  const [busy, setBusy] = useState(false);
  const [attached, setAttached] = useState(false);

  const mine = generations.filter((g) => g.kind === kind);

  function generate() {
    if (tab !== "create") {
      toast("Edit / motion are chrome only.");
      return;
    }
    setBusy(true);
    toast("Queued locally — no model behind this.");
    const id = enqueue({ kind, prompt, model, aspect, duration });
    window.setTimeout(() => {
      setBusy(false);
      router.push(`/library/${id}`);
    }, 1900);
  }

  return (
    <div className="page wide">
      <p className="banner-note">
        {kind.toUpperCase()} studio · Generate fakes a job into Library. {res} is a chip, not an encode.
      </p>
      <div className="studio">
        <aside className="side">
          <div className="tabs">
            {TABS.map((t) => (
              <button key={t.id} type="button" className={tab === t.id ? "on" : ""} onClick={() => setTab(t.id)}>
                {t.label} {kind === "audio" && t.id !== "create" ? "—" : kind}
              </button>
            ))}
          </div>
          <button className={`drop ${attached ? "on" : ""}`} type="button" onClick={() => setAttached((v) => !v)}>
            {attached ? "Plate attached (fake)" : "Upload media / image, video or audio"}
          </button>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={
              kind === "audio"
                ? "Describe a cue — score, VO, room tone."
                : "Describe your scene. Use @ to pretend-reference assets."
            }
          />
          <div className="chips">
            {MODELS[kind].map((m) => (
              <button key={m} className={`chip ${model === m ? "on" : ""}`} type="button" onClick={() => setModel(m)}>
                {m}
              </button>
            ))}
          </div>
          <div className="chips">
            {ASPECTS.map((a) => (
              <button key={a} className={`chip ${aspect === a ? "on" : ""}`} type="button" onClick={() => setAspect(a)}>
                {a}
              </button>
            ))}
            {DURATIONS.map((d) => (
              <button key={d} className={`chip ${duration === d ? "on" : ""}`} type="button" onClick={() => setDuration(d)}>
                {d}
              </button>
            ))}
            {RESOLUTIONS.map((r) => (
              <button key={r} className={`chip ${res === r ? "on" : ""}`} type="button" onClick={() => setRes(r)}>
                {r}
              </button>
            ))}
          </div>
          <button className="gen-btn" type="button" disabled={busy} onClick={generate}>
            GENERATE
            <div className="cost">
              <s>24</s>14
            </div>
          </button>
        </aside>
        <section className="feed">
          {mine.length === 0 ? (
            <p className="muted">No {kind} jobs yet. Generate writes a card here.</p>
          ) : (
            mine.map((g) => (
              <Link key={g.id} href={`/library/${g.id}`} className="job">
                <div className={`plate tall ${g.plate}`} />
                <div className="job-meta">
                  <h3>{g.title}</h3>
                  <div>
                    {g.model} · {g.aspect} · {g.duration}
                  </div>
                  <div>{g.status === "running" ? "Generating…" : "Done (shell)"}</div>
                  {g.status === "running" ? (
                    <div className="progress">
                      <span style={{ width: "55%" }} />
                    </div>
                  ) : null}
                </div>
              </Link>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
