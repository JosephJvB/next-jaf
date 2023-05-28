export interface Plant {
  slug: string;
  plantName: string;
  hydrationInterval: number;
  foodInterval: number;
  albumId: string;
  mediaItemId: string;
  imageTS: number;
  lastHydrated: number;
  lastFed: number;
  sheetRow: number;
}

export const rowToPlant = (row: string[], idx: number): Plant => ({
  slug: row[0], // A
  plantName: row[1], // B
  hydrationInterval: parseInt(row[2]), // C
  foodInterval: parseInt(row[3]), // D
  albumId: row[4], // E
  mediaItemId: row[5], // F
  imageTS: parseInt(row[6]), // G
  lastHydrated: parseInt(row[7]), // H
  lastFed: parseInt(row[8]), // I
  sheetRow: idx + 2,
});

// only update these props, Cols: F->H
export const plantToRow = (plant: Plant) => [
  plant.mediaItemId, // F
  plant.imageTS.toString(), // G
  plant.lastHydrated.toString(), // H
  plant.lastFed.toString(), // I
];
