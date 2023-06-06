import { ValueOf } from "./util";

export const Cookie = {
  Auth: "PlantAuth",
};

export const GoogleScopes = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/photoslibrary",
  "https://www.googleapis.com/auth/cloud-vision",
];

export const GoogleSpreadsheetId =
  "156cZe81ntgR_2-dyfpv8l-n_Xq3o3hnBXNC6GiRv18s";
export const GoogleSheetName = process.env.NEXT_PUBLIC_GOOGLE_SHEETNAME;

export const secMS = 1000;
export const minMS = secMS * 60;
export const hourMS = minMS * 60;
export const dayMS = hourMS * 24;

export const minSec = 60;
export const hourSec = minSec * 60;

// type stuff
export type RGBValue = ValueOf<typeof RGB>;
export const RGB = {
  Blue: "96, 165, 250",
  Green: "34, 197, 94",
} as const;
