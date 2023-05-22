import { faker } from "@faker-js/faker";
import { Plant } from "../types/plant";
import { slugify } from "../util";

export const getRandomPlant = (): Plant => {
  const hydrationIntervalDays = faker.number.int({ min: 3, max: 14 });
  const diff = faker.number.int({ min: 5, max: 10 });
  const now = new Date();
  const pastDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - diff,
    now.getHours(),
    now.getMinutes(),
    now.getSeconds()
  );
  const name = `${faker.color.human()} ${faker.animal.type()}`;
  const day = 1000 * 60 * 60 * 24;
  return {
    plantName: name,
    slug: slugify(name),
    imageSrc: faker.image.url(),
    hydrationInterval: day * hydrationIntervalDays,
    lastHydrated: pastDate.getTime(),
    foodInterval: day * 7 * faker.number.int({ min: 1, max: 5 }),
    lastFed: pastDate.getTime(),
    albumId: "123",
    imageTS: Date.now(),
    sheetRow: 2,
  };
};
