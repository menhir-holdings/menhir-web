"use client";

import Link from "next/link";
import { useState } from "react";
import { CINEMA_PROJECTS, GENRES, STYLES } from "@/lib/mock";
import { useStore } from "@/lib/store";

export function CinemaStudio() {
  const { enqueue, toast } = useStore();
  const [pane, setPane] = useState("home");
  const [kind, setKind] = useState<"image" | "video">("video");
  const [prompt, setPrompt] = useState("");
  const [genre, setGenre] = useState("Noir");
  const [style, setStyle] = useState("Auto");
  const [modal, setModal] = useState<"genre" | "style" | null>(null);
  const [projects, setProjects] = useState(CINEMA_PROJECTS);

  function generate() {
    enqueue({
      kind,
      prompt: prompt || `${genre} scene, ${style} style.`,
      model: "Cinema 3.5",
      aspect: "16:9",
      duration: "4s",
    });
    toast("Cinema job queued locally.");
  }

  return (
    <div className="page wide">
      <div className="cinema">
        <aside className="side cine-nav">
          <strong>Cinema Studio</strong>
          {["home", "generations", "elements", "favorites", "community"].map((id) => (
            <button key={id} type="button" className={pane === id ? "on" : ""} onClick={() => setPane(id)}>
              {id === "home" ? "Home" : id[0].toUpperCase() + id.slice(1)}
            </button>
          ))}
          <p className="kicker" style={{ marginTop: 16 }}>
            Projects
          </p>
          <button
            type="button"
            onClick={() => {
              setProjects((p) => [{ id: crypto.randomUUID(), name: "New project", edited: "now", count: 0 }, ...p]);
              toast("Folder added. Nothing renders.");
            }}
          >
            + New project
          </button>
          {projects.map((p) => (
            <button key={p.id} type="button">
              {p.name} · {p.count}
            </button>
          ))}
        </aside>
        <div>
          {pane === "community" ? (
            <p className="muted">
              Community feed lives on <Link href="/community">/community</Link>.
            </p>
          ) : null}
          {pane === "generations" ? (
            <p className="muted">
              Generations live in <Link href="/library">Library</Link>.
            </p>
          ) : null}
          {pane === "home" || pane === "elements" || pane === "favorites" ? (
            <>
              <div className="hero-copy">
                <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 12 }}>
                  <div className="plate p-noir" style={{ width: 88, minHeight: 56, borderRadius: 10 }} />
                  <div className="plate p-zephyr" style={{ width: 88, minHeight: 56, borderRadius: 10 }} />
                  <div className="plate p-hunter" style={{ width: 88, minHeight: 56, borderRadius: 10 }} />
                </div>
                <h1>
                  CREATE YOUR FIRST PROJECT.
                  <br />
                  <span className="lime-t">GENERATE THE IMPOSSIBLE.</span>
                </h1>
              </div>
              <div className="chips" style={{ justifyContent: "center" }}>
                <button className="chip on" type="button" onClick={() => setModal("genre")}>
                  Genre: {genre}
                </button>
                <button className="chip" type="button" onClick={() => setModal("style")}>
                  Style: {style}
                </button>
                <button className="chip" type="button" onClick={() => toast("Camera stays Auto on this shell.")}>
                  Camera: Auto
                </button>
              </div>
              <div className="prompt-bar">
                <div className="mode-col">
                  <button type="button" className={kind === "image" ? "on" : ""} onClick={() => setKind("image")}>
                    Image
                  </button>
                  <button type="button" className={kind === "video" ? "on" : ""} onClick={() => setKind("video")}>
                    Video
                  </button>
                </div>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your scene — use @ to add characters & locations"
                />
                <button className="gen-btn" type="button" onClick={generate}>
                  GENERATE
                  <div className="cost">24</div>
                </button>
              </div>
              <div className="row-title">
                <h2>My projects</h2>
              </div>
              <div className="projects">
                <button
                  className="project plus"
                  type="button"
                  onClick={() => {
                    setProjects((p) => [{ id: crypto.randomUUID(), name: "New project", edited: "now", count: 0 }, ...p]);
                  }}
                >
                  +
                </button>
                {projects.map((p) => (
                  <div key={p.id} className="project">
                    <div className={`plate ${p.id === "p1" ? "p-noir" : "p-desk"}`} />
                    <div className="body">
                      <strong>{p.name}</strong>
                      <p className="muted">
                        Last edited {p.edited} · Private
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>

      {modal ? (
        <div className="modal-back" onClick={() => setModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{modal === "genre" ? "Genre" : "Style"}</h2>
            <div className="chips">
              {(modal === "genre" ? GENRES : STYLES).map((g) => (
                <button
                  key={g}
                  className={`chip ${(modal === "genre" ? genre : style) === g ? "on" : ""}`}
                  type="button"
                  onClick={() => {
                    if (modal === "genre") setGenre(g);
                    else setStyle(g);
                    setModal(null);
                  }}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
