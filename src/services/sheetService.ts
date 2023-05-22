import { google, sheets_v4 } from "googleapis";
import { Plant } from "../types/plant";
import { getServiceAccountAuth } from "./clients/googleServiceAccount";
import { GoogleSheetName, GoogleSpreadsheetId } from "../constants";

// probably move away from this since I'm using oauth2 now
// can ONLY be used on Backend cos of googleapis package

// https://raw.githubusercontent.com/JosephJvB/gsheets-api/main/src/database/sheetClient.ts

let _client: sheets_v4.Sheets;

const getClient = () => {
  if (!_client) {
    const authClient = getServiceAccountAuth();
    _client = google.sheets({
      version: "v4",
      auth: authClient,
    });
  }
  return _client;
};

export const getAllPlants = async () => {
  const rows = await getRows("A1:H100");
  const plants = rows.slice(1).map((row, idx) => rowToPlant(row, idx));
  return plants;
};

export const updatePlant = async (plant: Plant) => {
  const values = plantToRow(plant);
  await updateRow(`F:${plant.sheetRow}:H${plant.sheetRow}`, values);
};

const getRows = async (range: string) => {
  const client = getClient();
  const res = await client.spreadsheets.values.get({
    spreadsheetId: GoogleSpreadsheetId,
    range: `${GoogleSheetName}!${range}`,
  });
  return res.data.values || [];
};

const updateRow = async (range: string, row: string[]) => {
  const client = getClient();
  await client.spreadsheets.values.update({
    spreadsheetId: GoogleSpreadsheetId,
    range: `${GoogleSheetName}!${range}`,
    valueInputOption: "RAW",
    includeValuesInResponse: true,
    requestBody: {
      majorDimension: "ROWS",
      values: [row],
    },
  });
};

const addRow = async (range: string, row: string[]) => {
  const client = getClient();
  await client.spreadsheets.values.append({
    spreadsheetId: GoogleSpreadsheetId,
    range: `${GoogleSheetName}!${range}`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    includeValuesInResponse: true,
    requestBody: {
      majorDimension: "ROWS",
      values: [row],
    },
  });
};

const deleteRow = async (range: string) => {
  const client = getClient();
  await client.spreadsheets.values.clear({
    spreadsheetId: GoogleSpreadsheetId,
    range: `${GoogleSheetName}!${range}`,
  });
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
  sheetRow: idx + 2,
});

// only update these props, Cols: F->H
const plantToRow = (plant: Plant) => [
  plant.imageSrc, // F
  plant.lastHydrated.toString(), // F
  plant.lastFed.toString(), // G
];
