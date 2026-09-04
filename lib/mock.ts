import type { CinemaProject, Generation } from "./types";

export const MODELS: Record<string, string[]> = {
  image: ["Nano Plate", "Recraft Shell", "Flux Still"],
  video: ["Seedance Shell", "Kling Shell", "Cinema 3.5"],
  audio: ["Voice Cairn", "Score Quarry"],
};

export const ASPECTS = ["16:9", "9:16", "1:1", "4:5"];
export const DURATIONS = ["4s", "5s", "8s", "10s"];
export const RESOLUTIONS = ["480p", "720p", "1080p"];

export const FEATURED = [
  {
    href: "/video",
    kicker: "Motion",
    title: "Adit transfer",
    copy: "One still in. Recast the move without a model behind it.",
    plate: "p-adit",
  },
  {
    href: "/image",
    kicker: "Still",
    title: "Cairn flash",
    copy: "A new suite of controls, wired to placeholders.",
    plate: "p-cairn",
  },
  {
    href: "/cinema",
    kicker: "Cinema",
    title: "The lintel",
    copy: "Eight minutes of blocking. No render farm.",
    plate: "p-lintel",
  },
  {
    href: "/video",
    kicker: "Upscale",
    title: "Grain, not stretch",
    copy: "Pretend 4K. The plate is CSS.",
    plate: "p-grain",
  },
];

export const TOOLS = [
  { href: "/video", tag: "Top", title: "Seedance shell", copy: "Advanced video, mock queue" },
  { href: "/image", tag: "Image", title: "Nano plate", copy: "High-quality stills, fake" },
  { href: "/supercomputer", tag: "Agent", title: "Supercomputer", copy: "One prompt bar, no stack" },
  { href: "/cinema", tag: "Cinema", title: "Cinema Studio", copy: "Projects and genre chips" },
  { href: "/mcp", tag: "New", title: "MCP & CLI", copy: "Docs surface only" },
  { href: "/community", tag: "Feed", title: "Community", copy: "Public plates, no comments API" },
];

export const COMMUNITY = [
  { id: "seed-1", title: "Zephyr: Special", author: "Menhir Studio", plate: "p-zephyr" },
  { id: "seed-2", title: "Holo grind", author: "Menhir Studio", plate: "p-holo" },
  { id: "seed-3", title: "Red flagstone", author: "Menhir Studio", plate: "p-flag" },
  { id: "seed-4", title: "Kok boru cut", author: "Menhir Studio", plate: "p-boru" },
  { id: "seed-5", title: "Oneiric", author: "Menhir Studio", plate: "p-oneiric" },
  { id: "seed-6", title: "Adiliada", author: "Menhir Studio", plate: "p-adi" },
];

export const SEED_LIBRARY: Generation[] = [
  {
    id: "seed-desk",
    kind: "video",
    prompt: "Operator at twin monitors, side key, no logo burn.",
    model: "Seedance Shell",
    aspect: "16:9",
    duration: "8s",
    status: "done",
    createdAt: Date.now() - 86_400_000,
    plate: "p-desk",
    title: "Twin desk",
  },
  {
    id: "seed-hunter",
    kind: "video",
    prompt: "Night rider on a quarry road, title lock APEX.",
    model: "Kling Shell",
    aspect: "16:9",
    duration: "8s",
    status: "done",
    createdAt: Date.now() - 172_800_000,
    plate: "p-hunter",
    title: "Apex hunter",
  },
  {
    id: "seed-noir",
    kind: "image",
    prompt: "Doorway silhouette, hard key, crushed blacks.",
    model: "Cinema 3.5",
    aspect: "16:9",
    duration: "4s",
    status: "done",
    createdAt: Date.now() - 259_200_000,
    plate: "p-noir",
    title: "Noir doorway",
  },
];

export const CINEMA_PROJECTS: CinemaProject[] = [
  { id: "p1", name: "Calm screen portrait", edited: "11m ago", count: 4 },
  { id: "p2", name: "Design harmony", edited: "3d ago", count: 3 },
  { id: "p3", name: "Quarry night", edited: "5d ago", count: 5 },
  { id: "p4", name: "JSmith", edited: "1w ago", count: 2 },
];

export const GENRES = ["Action", "Horror", "Comedy", "Noir", "Drama", "Epic", "General"];
export const STYLES = ["Auto", "Hyper neon", "Bleached warm", "Minimal"];

export function plateClass(id: string) {
  return `plate ${id}`;
}
