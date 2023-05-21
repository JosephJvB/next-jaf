import { GoogleAuth } from "google-auth-library";
import { JSONClient } from "google-auth-library/build/src/auth/googleauth";
import { Auth, google } from "googleapis";

const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/photoslibrary",
];

let _client: GoogleAuth<JSONClient>;
let _oauth2Client: Auth.OAuth2Client;

export const getOAuth2Client = () => {
  if (!_oauth2Client) {
    _oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_OAUTH_client_id,
      process.env.GOOGLE_OAUTH_client_secret,
      "http://localhost:3000/callback"
    );
  }
  return _oauth2Client;
};

export const getOAuth2Url = () => {
  const client = getOAuth2Client();
  return client.generateAuthUrl({
    scope: SCOPES,
  });
};

export const getAccessTokenFromCode = async (code: string) => {
  const client = getOAuth2Client();
  const res = await client.getToken(code);
  client.setCredentials(res.tokens);
  const at = await client.getAccessToken();
  return at.token as string;
};

export const getGoogleAuthClient = () => {
  if (!_client) {
    // https://stackoverflow.com/questions/30400341/environment-variables-containing-newlines-in-node
    const privateKey = process.env.GOOGLE_SERVICEACCOUNT_private_key.replace(
      /\\n/g,
      "\n"
    );
    _client = new google.auth.GoogleAuth({
      scopes: SCOPES,
      credentials: {
        private_key: privateKey,
        client_email: process.env.GOOGLE_SERVICEACCOUNT_client_email,
      },
    });
  }
  return _client;
};

export const getGoogleAuthToken = async () => {
  const authClient = getGoogleAuthClient();
  const at = await authClient.getAccessToken();
  return at as string;
};
