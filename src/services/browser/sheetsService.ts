import { GoogleSpreadsheetId } from "../../constants";
import {
  Plant,
  PlantEditableStartChar,
  PlantEndChar,
  plantToRow,
} from "../../types/plant";
import { getAuthCookie } from "./auth";

const baseUrl = "https://sheets.googleapis.com/v4";

export const updatePlant = async (plant: Plant) => {
  const authToken = getAuthCookie();
  if (!authToken) {
    throw new Error("missing Auth Cookie");
  }
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${authToken}`);
  headers.append("Content-Type", "application/json");

  const searchParams = new URLSearchParams();
  searchParams.append("valueInputOption", "RAW");

  const range = `${process.env.NEXT_PUBLIC_GOOGLE_SHEETNAME}!${PlantEditableStartChar}${plant.sheetRow}:${PlantEndChar}${plant.sheetRow}`;

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
