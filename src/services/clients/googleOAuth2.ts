import { Auth, google } from "googleapis";
import { GoogleScopes } from "../../constants";

let _oauth2Client: Auth.OAuth2Client;

const getOAuth2Client = () => {
  if (!_oauth2Client) {
    _oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_OAUTH_client_id,
      process.env.GOOGLE_OAUTH_client_secret,
      "http://localhost:3000/plants"
    );
  }
  return _oauth2Client;
};

export const getOAuth2Url = () => {
  const client = getOAuth2Client();
  return client.generateAuthUrl({
    scope: GoogleScopes,
  });
};

export const getAccessTokenFromCode = async (code: string) => {
  const client = getOAuth2Client();
  const res = await client.getToken(code);
  client.setCredentials(res.tokens);
  const at = await client.getAccessToken();
  return at.token as string;
};
