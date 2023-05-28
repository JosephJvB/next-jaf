import { google } from "googleapis";

// https://raw.githubusercontent.com/JosephJvB/gsheets-api/main/src/database/sheetClient.ts
let spreadsheetId = "156cZe81ntgR_2-dyfpv8l-n_Xq3o3hnBXNC6GiRv18s";
let sheetName = "plants";

let _client;

export const getGoogleAuthClient = () => {
  // https://stackoverflow.com/questions/30400341/environment-variables-containing-newlines-in-node
  const privateKey = process.env.GOOGLE_SERVICEACCOUNT_private_key.replace(
    /\\n/g,
    "\n"
  );
  return new google.auth.GoogleAuth({
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/photoslibrary",
    ],
    credentials: {
      private_key: privateKey,
      client_email: process.env.GOOGLE_SERVICEACCOUNT_client_email,
    },
  });
};

const getClient = () => {
  if (!_client) {
    const authClient = getGoogleAuthClient();
    _client = google.sheets({
      version: "v4",
      auth: authClient,
    });
  }
  return _client;
};

export const getRows = async (range) => {
  const client = getClient();
  const res = await client.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!${range}`,
  });
  return res.data.values || [];
};

export const rowToPlant = (row) => ({
  slug: row[0],
  plantName: row[1],
  mediaItemId: row[2],
  hydrationInterval: parseInt(row[3]),
  lastHydrated: parseInt(row[4]),
  foodInterval: parseInt(row[5]),
  lastFed: parseInt(row[6]),
});

export const plantToRow = (plant) => [
  plant.slug,
  plant.plantName,
  plant.mediaItemId,
  plant.hydrationInterval,
  plant.lastHydrated,
  plant.foodInterval,
  plant.lastFed,
];
