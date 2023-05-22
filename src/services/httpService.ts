import { GoogleSpreadsheetId, LocalStorage } from "../constants";
import { Plant } from "../types/plant";

export const updatePlant = async (plant: Plant) => {
  const authToken = localStorage.getItem(LocalStorage.AuthKey);
  if (!authToken) {
    throw new Error("No auth token in localStorage");
  }
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${authToken}`);
  headers.append("Content-Type", "application/json");

  const searchParams = new URLSearchParams();
  searchParams.append("valueInputOption", "RAW");

  const range = `F${plant.sheetRow}:H${plant.sheetRow}`;

  const plantRow = plantToRow(plant);

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${GoogleSpreadsheetId}/values/${range}?${searchParams.toString()}`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify({
        range,
        majorDimension: "ROWS",
        values: [plantRow],
      }),
    }
  );
  if (!res.ok) {
    throw res;
  }

  return res.json();
};

const rowToPlant = (row: string[], idx: number): Plant => ({
  slug: row[0],
  plantName: row[1],
  hydrationInterval: parseInt(row[2]),
  foodInterval: parseInt(row[3]),
  albumId: row[4],
  imageSrc: row[5],
  lastHydrated: parseInt(row[6]),
  lastFed: parseInt(row[7]),
  sheetRow: idx + 2, // 1index + 1header offset
});

// only update these props, Cols: F->H
const plantToRow = (plant: Plant) => [
  plant.imageSrc, // F
  plant.lastHydrated.toString(), // F
  plant.lastFed.toString(), // G
];
