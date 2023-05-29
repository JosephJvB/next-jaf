import { dayMS, hourMS, minMS, secMS } from "./constants";
import { Plant } from "./types/plant";

export const toDateStr = (d: Date) => {
  return [
    d.toDateString().split(" ").slice(0, 3).join(" "),
    d.toTimeString().split(" ")[0],
  ].join(", ");
};

export const slugify = (s: string) => {
  return s.replace(/ /g, "").toLowerCase();
};

// not used but dont wanna get rid of yet
const getCountdown = (plant: Plant) => {
  const next = plant.lastHydrated + plant.hydrationInterval;
  const now = Date.now();
  if (now >= next) {
    return "Water me!";
  }
  const diff = plant.lastHydrated + plant.hydrationInterval - Date.now();
  const days = Math.floor(diff / dayMS);
  const hrs = Math.floor((diff % dayMS) / hourMS);
  const mins = Math.floor((diff % hourMS) / minMS);
  const secs = Math.floor((diff % minMS) / secMS);
  return [`${days} days`, `${hrs} hrs`, `${mins} mins`, `${secs} secs`]
    .filter((str) => !str.startsWith("0 ") && !str.startsWith("-"))
    .join(" ");
};

export type ValueOf<T> = T[keyof T];
