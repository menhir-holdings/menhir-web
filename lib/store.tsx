"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { SEED_LIBRARY } from "./mock";
import type { Generation, Kind } from "./types";

type Toast = { id: string; text: string };

type Store = {
  credits: number;
  generations: Generation[];
  toasts: Toast[];
  toast: (text: string) => void;
  dismiss: (id: string) => void;
  enqueue: (input: { kind: Kind; prompt: string; model: string; aspect: string; duration: string }) => string;
};

const Ctx = createContext<Store | null>(null);
const KEY = "menhir-web-shell-v1";

function load(): { credits: number; generations: Generation[] } {
  if (typeof window === "undefined") return { credits: 240, generations: SEED_LIBRARY };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { credits: 240, generations: SEED_LIBRARY };
    return JSON.parse(raw) as { credits: number; generations: Generation[] };
  } catch {
    return { credits: 240, generations: SEED_LIBRARY };
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [credits, setCredits] = useState(240);
  const [generations, setGenerations] = useState<Generation[]>(SEED_LIBRARY);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const s = load();
    setCredits(s.credits);
    setGenerations(s.generations);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEY, JSON.stringify({ credits, generations }));
  }, [credits, generations, hydrated]);

  const value = useMemo<Store>(
    () => ({
      credits,
      generations,
      toasts,
      toast: (text) => {
        const id = crypto.randomUUID();
        setToasts((t) => [...t, { id, text }]);
        window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
      },
      dismiss: (id) => setToasts((t) => t.filter((x) => x.id !== id)),
      enqueue: ({ kind, prompt, model, aspect, duration }) => {
        const id = crypto.randomUUID();
        const title = prompt.trim().slice(0, 42) || "Untitled plate";
        const job: Generation = {
          id,
          kind,
          prompt: prompt.trim() || "Empty prompt — shell still queued.",
          model,
          aspect,
          duration,
          status: "running",
          createdAt: Date.now(),
          plate: "p-new",
          title,
        };
        setGenerations((g) => [job, ...g]);
        setCredits((c) => Math.max(0, c - 14));
        window.setTimeout(() => {
          setGenerations((g) => g.map((x) => (x.id === id ? { ...x, status: "done", plate: kind === "audio" ? "p-grain" : "p-cairn" } : x)));
        }, 1800);
        return id;
      },
    }),
    [credits, generations, toasts],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore outside provider");
  return s;
}
