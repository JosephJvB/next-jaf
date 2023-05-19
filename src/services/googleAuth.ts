import { GoogleAuth } from "google-auth-library";
import { JSONClient } from "google-auth-library/build/src/auth/googleauth";
import { google } from "googleapis";

const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/photoslibrary",
];

let _client: GoogleAuth<JSONClient>;

export const getGoogleAuthClient = () => {
  if (!_client) {
    // https://stackoverflow.com/questions/30400341/environment-variables-containing-newlines-in-node
    const privateKey = process.env.GOOGLE_ACCOUNT_private_key.replace(
      /\\n/g,
      "\n"
    );
    _client = new google.auth.GoogleAuth({
      scopes: SCOPES,
      credentials: {
        private_key: privateKey,
        client_email: process.env.GOOGLE_ACCOUNT_client_email,
      },
    });
  }
  return _client;
};
