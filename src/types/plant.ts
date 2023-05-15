export interface Plant {
  slug: string;
  imageSrc: string;
  imageAlt: string;
  plantName: string;
  hydrationInterval: number;
  lastHydrated: number;
  foodInterval: number;
  lastFed: number;
}
