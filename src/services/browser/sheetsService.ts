import { GoogleSpreadsheetId, LocalStorage } from "../../constants";
import { Plant } from "../../types/plant";
import { plantToRow } from "../../util";

const baseUrl = "https://sheets.googleapis.com/v4";

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

  const range = `F${plant.sheetRow}:I${plant.sheetRow}`;

  const plantRow = plantToRow(plant);

  const res = await fetch(
    `${baseUrl}/spreadsheets/${GoogleSpreadsheetId}/values/${range}?${searchParams.toString()}`,
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
