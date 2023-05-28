import { day, hour, min, sec } from "./constants";
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

export const rowToPlant = (row: string[], idx: number): Plant => ({
  slug: row[0],
  plantName: row[1],
  hydrationInterval: parseInt(row[2]),
  foodInterval: parseInt(row[3]),
  albumId: row[4],
  mediaItemId: row[5],
  imageTS: parseInt(row[6]),
  lastHydrated: parseInt(row[7]),
  lastFed: parseInt(row[8]),
  sheetRow: idx + 2,
});

// only update these props, Cols: F->H
export const plantToRow = (plant: Plant) => [
  plant.mediaItemId, // F
  plant.imageTS.toString(), // G
  plant.lastHydrated.toString(), // H
  plant.lastFed.toString(), // I
];

// not used but dont wanna get rid of yet
const getCountdown = (plant: Plant) => {
  const next = plant.lastHydrated + plant.hydrationInterval;
  const now = Date.now();
  if (now >= next) {
    return "Water me!";
  }
  const diff = plant.lastHydrated + plant.hydrationInterval - Date.now();
  const days = Math.floor(diff / day);
  const hrs = Math.floor((diff % day) / hour);
  const mins = Math.floor((diff % hour) / min);
  const secs = Math.floor((diff % min) / sec);
  return [`${days} days`, `${hrs} hrs`, `${mins} mins`, `${secs} secs`]
    .filter((str) => !str.startsWith("0 ") && !str.startsWith("-"))
    .join(" ");
};
