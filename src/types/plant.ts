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
