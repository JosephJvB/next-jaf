import { ValueOf } from "./util";

export const LocalStorage = {
  Token: "GoogleAuthToken",
  TokenExp: "GoogleAuthTokenExp",
};

export const GoogleScopes = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/photoslibrary",
];

export const GoogleSpreadsheetId =
  "156cZe81ntgR_2-dyfpv8l-n_Xq3o3hnBXNC6GiRv18s";
export const GoogleSheetName = process.env.NEXT_PUBLIC_GOOGLE_SHEETNAME;

export const sec = 1000;
export const min = sec * 60;
export const hour = min * 60;
export const day = hour * 24;

// type stuff
export type RGBValue = ValueOf<typeof RGB>;
export const RGB = {
  Blue: "96, 165, 250",
  Green: "34, 197, 94",
} as const;
