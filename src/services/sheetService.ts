import { google, sheets_v4 } from "googleapis";
import { Plant } from "../types/plant";

// https://raw.githubusercontent.com/JosephJvB/gsheets-api/main/src/database/sheetClient.ts

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
let spreadsheetId = "156cZe81ntgR_2-dyfpv8l-n_Xq3o3hnBXNC6GiRv18s";
let sheetName = "plants";

let _client: sheets_v4.Sheets;

const getClient = () => {
  if (!_client) {
    // https://stackoverflow.com/questions/30400341/environment-variables-containing-newlines-in-node
    const privateKey = process.env.GOOGLE_ACCOUNT_private_key.replace(
      /\\n/g,
      "\n"
    );
    const authClient = new google.auth.GoogleAuth({
      scopes: SCOPES,
      credentials: {
        private_key: privateKey,
        client_email: process.env.GOOGLE_ACCOUNT_client_email,
      },
    });
    _client = google.sheets({
      version: "v4",
      auth: authClient,
    });
  }
  return _client;
};

export const getRows = async (range: string) => {
  const client = getClient();
  const res = await client.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!${range}`,
  });
  return res.data.values || [];
};
export const addRow = async (range: string, row: string[]) => {
  const client = getClient();
  await client.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!${range}`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    includeValuesInResponse: true,
    requestBody: {
      majorDimension: "ROWS",
      values: [row],
    },
  });
};
export const updateRow = async (range: string, row: string[]) => {
  const client = getClient();
  await client.spreadsheets.values.update({
    spreadsheetId,
    range: `${sheetName}!${range}`,
    valueInputOption: "RAW",
    includeValuesInResponse: true,
    requestBody: {
      majorDimension: "ROWS",
      values: [row],
    },
  });
};

export const deleteRow = async (range: string) => {
  const client = getClient();
  await client.spreadsheets.values.clear({
    spreadsheetId,
    range: `${sheetName}!${range}`,
  });
};

export const rowToPlant = (row: string[]) => ({
  slug: row[0],
  plantName: row[1],
  imageSrc: row[2],
  imageAlt: row[3],
  hydrationInterval: parseInt(row[4]),
  lastHydrated: parseInt(row[5]),
  foodInterval: parseInt(row[6]),
  lastFed: parseInt(row[7]),
});

export const plantToRow = (plant: Plant) => [
  plant.slug,
  plant.plantName,
  plant.imageSrc,
  plant.imageAlt,
  plant.hydrationInterval,
  plant.lastHydrated,
  plant.foodInterval,
  plant.lastFed,
];
