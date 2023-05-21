export interface Plant {
  slug: string;
  imageSrc: string;
  plantName: string;
  hydrationInterval: number;
  lastHydrated: number;
  foodInterval: number;
  lastFed: number;
  albumId: string;
}
