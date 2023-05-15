import { Plant } from "../types/plant";

const now = new Date();
export const plants: Plant[] = [
  {
    slug: "zzplant",
    imageSrc:
      "https://inbloomflorist.flowermanager.net/wp-content/uploads/sites/23/2020/10/ZZ-Plant-50-of-6-1-960x1200.jpg",
    imageAlt: "image of zzplant1",
    plantName: "zz plant",
    hydrationInterval: 1000 * 60 * 60 * 24 * 7,
    lastHydrated: new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 3,
      now.getHours(),
      now.getMinutes(),
      now.getSeconds()
    ).getTime(),
    foodInterval: 1000 * 60 * 60 * 24 * 7 * 4,
    lastFed: new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 3,
      now.getHours(),
      now.getMinutes(),
      now.getSeconds()
    ).getTime(),
  },
  {
    slug: "zzplant2",
    imageSrc:
      "https://inbloomflorist.flowermanager.net/wp-content/uploads/sites/23/2020/10/ZZ-Plant-50-of-6-1-960x1200.jpg",
    imageAlt: "image of zzplant2",
    plantName: "zz plant2",
    hydrationInterval: 1000 * 60 * 60 * 24 * 7,
    lastHydrated: new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 3,
      now.getHours(),
      now.getMinutes(),
      now.getSeconds()
    ).getTime(),
    foodInterval: 1000 * 60 * 60 * 24 * 7 * 4,
    lastFed: new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 3,
      now.getHours(),
      now.getMinutes(),
      now.getSeconds()
    ).getTime(),
  },
  {
    slug: "zzplant3",
    imageSrc:
      "https://inbloomflorist.flowermanager.net/wp-content/uploads/sites/23/2020/10/ZZ-Plant-50-of-6-1-960x1200.jpg",
    imageAlt: "image of zzplant3",
    plantName: "zz plant3",
    hydrationInterval: 1000 * 60 * 60 * 24 * 7,
    lastHydrated: new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 3,
      now.getHours(),
      now.getMinutes(),
      now.getSeconds()
    ).getTime(),
    foodInterval: 1000 * 60 * 60 * 24 * 7 * 4,
    lastFed: new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 3,
      now.getHours(),
      now.getMinutes(),
      now.getSeconds()
    ).getTime(),
  },
];
