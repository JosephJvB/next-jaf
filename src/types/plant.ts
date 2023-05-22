export interface Plant {
  slug: string;
  plantName: string;
  hydrationInterval: number;
  foodInterval: number;
  albumId: string;
  imageSrc: string;
  imageTS: number;
  lastHydrated: number;
  lastFed: number;
  sheetRow: number;
}
