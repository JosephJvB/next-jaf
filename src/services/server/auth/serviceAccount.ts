import { GoogleAuth } from "google-auth-library";
import { JSONClient } from "google-auth-library/build/src/auth/googleauth";
import { google } from "googleapis";
import { GoogleScopes } from "../../../constants";

let _client: GoogleAuth<JSONClient>;

export const getServiceAccountAuth = () => {
  if (!_client) {
    // https://stackoverflow.com/questions/30400341/environment-variables-containing-newlines-in-node
    const privateKey = process.env.GOOGLE_SERVICEACCOUNT_private_key.replace(
      /\\n/g,
      "\n"
    );
    _client = new google.auth.GoogleAuth({
      scopes: GoogleScopes,
      credentials: {
        private_key: privateKey,
        client_email: process.env.GOOGLE_SERVICEACCOUNT_client_email,
      },
    });
  }
  return _client;
};
