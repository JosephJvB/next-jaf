import dotenv from "dotenv";
dotenv.config();
import { google } from "googleapis";

// https://raw.githubusercontent.com/JosephJvB/gsheets-api/main/src/database/sheetClient.ts
let spreadsheetId = "156cZe81ntgR_2-dyfpv8l-n_Xq3o3hnBXNC6GiRv18s";
let sheetName = "plants";

const getClient = () => {
  // https://stackoverflow.com/questions/30400341/environment-variables-containing-newlines-in-node
  const privateKey = process.env.GOOGLE_SERVICEACCOUNT_private_key.replace(
    /\\n/g,
    "\n"
  );
  const authClient = new google.auth.GoogleAuth({
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/photoslibrary",
    ],
    credentials: {
      private_key: privateKey,
      client_email: process.env.GOOGLE_SERVICEACCOUNT_client_email,
    },
  });
  return google.sheets({
    version: "v4",
    auth: authClient,
  });
};

const day = 1000 * 60 * 60 * 24;
const week = day * 7;
const month = week * 4;

const rows = [
  [
    "slug",
    "plantName",
    "hydrationInterval",
    "foodInterval",
    "albumId",
    "mediaItemId",
    "imageTS",
    "lastHydrated",
    "lastFed",
  ],
  [
    "zzplant",
    "Zanzibar Gem",
    Math.round(week * 3).toString(),
    Math.round(month).toString(),
    "AA6CZZinMUKhP9Mi20Z1EtRf5lvAJ2XrSbtxXdFRYEvZ0P3T7iDS5pnUtEcoGapCzStEv5vL8V9C",
    "AA6CZZhZ9LUAVvhU8tk6Dio3qwRrnmigO996qzgycJrb7hRDn-RgqEFCX7Wm4m0mEIp3qtC77ia1ojHbqjB9AVvytjGBUM3h3w",
    "1684355180885",
    "1684761288620",
    "1684761288620",
  ],
  [
    "caladium",
    "Caladium Mix",
    Math.round(week / 2).toString(),
    Math.round(week * 2).toString(),
    "AA6CZZhByy-ihxrBvQjFtYr4VqZ91I0AYJI-IWiJUuus7arbQPERNRP4YasnW_s1YJ991HNySH6L",
    "AA6CZZiD3yl8wKQTELvSZSOjDY6oZk-bgrFzsHDkD9h4TimuMGp3vvBxT_Wg34PprjHJfcmwubpN",
    "1684355180885",
    "1684782149793",
    "1684782149793",
  ],
  [
    "snakeplant",
    "Snake Plant",
    Math.round(week * 2).toString(),
    Math.round(month * 2).toString(),
    "AA6CZZiLQjinC1etY4RV5AExXVKIG7-yFUhlk12x2PVUa591icXE3FVBRn1TeKo5eFoQqTxPFZm9",
    "AA6CZZivKnCN0698dCPmMfBRYk0Et6ug61mXVuvfJDNbxq3Aqmtew8G1MUK1mlg9MoeoV23aMqnKU9PNic6DG8DFaPW1Xza4Xw",
    "1684782523992",
    "1684782523992",
    "1684782523992",
  ],
  [
    "pig",
    "Philodendron Imperial Green",
    Math.round(week / 3).toString(),
    Math.round(week * 4).toString(),
    "AA6CZZgri61mz2E5fqODJcJdcWfcrMf4kT5KhqtKOjNYqdu7J_xydjDCC4FysjAXSKdkyQntyLoE",
    "AA6CZZjv5ScLxQKcnbRgARZWHRw2JqcE7aqTIJylGC-G1qFWu7Tol_6B3mozeqLPhUMiJn34R_ZaKTFy-3FYtXTrjLOokdIj4Q",
    "1684355180885",
    "1684355180885",
    "1683836894702",
  ],
];

const e = async () => {
  const client = getClient();
  const range = "A1:I5";
  await client.spreadsheets.values.clear({
    spreadsheetId: spreadsheetId,
    range: `${sheetName}!${range}`,
  });
  await client.spreadsheets.values.append({
    spreadsheetId: spreadsheetId,
    range: `${sheetName}!${range}`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    includeValuesInResponse: true,
    requestBody: {
      majorDimension: "ROWS",
      values: rows,
    },
  });
};

e();
