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
