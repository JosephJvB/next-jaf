import dotenv from "dotenv";
dotenv.config();
import { getRows, rowToPlant } from "./sheets.mjs";

const authToken = "123";

export const getAppAlbums = async () => {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${authToken}`);
  const searchParams = new URLSearchParams();
  searchParams.append("excludeNonAppCreatedData", "true");
  const res = await fetch(
    `https://photoslibrary.googleapis.com/v1/albums?${searchParams.toString()}`,
    {
      method: "GET",
      headers,
    }
  );
  if (!res.ok) {
    throw res;
  }
  return res.json();
};

export const createAlbum = async (albumTitle) => {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${authToken}`);
  headers.append("Content-Type", "application/json");
  const res = await fetch("https://photoslibrary.googleapis.com/v1/albums", {
    method: "POST",
    headers,
    body: JSON.stringify({
      album: {
        title: albumTitle,
      },
    }),
  });
  if (!res.ok) {
    throw res;
  }
  const j = await res.json();
  console.log({ j });
};

const setupAlbums = async () => {
  const rows = await getRows("A:H");
  const plants = rows.slice(1).map((r) => rowToPlant(r));
  console.log(plants.map((p) => p.slug));
  const res = await getAppAlbums();
  console.log(res.albums.map((a) => a.title));
  for (const p of plants) {
    const found = res.albums.find((a) => a.title === p.slug);
    if (!found) {
      console.log("try create", p.slug);
      // await createAlbum(p.slug);
    }
  }
};

// setupAlbums();
const e = async () => {
  const res = await getAppAlbums();
  for (const a of res.albums) {
    console.log(a.title, a.id);
  }
};

// e();

// caladium AA6CZZhByy-ihxrBvQjFtYr4VqZ91I0AYJI-IWiJUuus7arbQPERNRP4YasnW_s1YJ991HNySH6L
// snakeplant AA6CZZiLQjinC1etY4RV5AExXVKIG7-yFUhlk12x2PVUa591icXE3FVBRn1TeKo5eFoQqTxPFZm9
// pig AA6CZZgri61mz2E5fqODJcJdcWfcrMf4kT5KhqtKOjNYqdu7J_xydjDCC4FysjAXSKdkyQntyLoE
// zzplant AA6CZZinMUKhP9Mi20Z1EtRf5lvAJ2XrSbtxXdFRYEvZ0P3T7iDS5pnUtEcoGapCzStEv5vL8V9C
