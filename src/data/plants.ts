import { Plant } from "@/types/plant";

const now = new Date();
export const plants: Plant[] = [
  {
    slug: "zzplant",
    imageSrc:
      "https://inbloomflorist.flowermanager.net/wp-content/uploads/sites/23/2020/10/ZZ-Plant-50-of-6-1-960x1200.jpg",
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
  },
];
