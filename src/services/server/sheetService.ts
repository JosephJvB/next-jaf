import { google, sheets_v4 } from "googleapis";
import { getServiceAccountAuth } from "./auth/serviceAccount";
import { GoogleSheetName, GoogleSpreadsheetId } from "../../constants";
import { rowToPlant } from "../../types/plant";

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
  const rows = await getRows("A1:I100");
  const plants = rows.slice(1).map((row, idx) => rowToPlant(row, idx));
  return plants;
};

const getRows = async (range: string) => {
  const client = getClient();
  const res = await client.spreadsheets.values.get({
    spreadsheetId: GoogleSpreadsheetId,
    range: `${GoogleSheetName}!${range}`,
  });
  return res.data.values || [];
};
