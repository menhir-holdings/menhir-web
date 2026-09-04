export type Kind = "image" | "video" | "audio";

export type JobStatus = "queued" | "running" | "done";

export type Generation = {
  id: string;
  kind: Kind;
  prompt: string;
  model: string;
  aspect: string;
  duration: string;
  status: JobStatus;
  createdAt: number;
  plate: string;
  title: string;
};

export type CinemaProject = {
  id: string;
  name: string;
  edited: string;
  count: number;
};
