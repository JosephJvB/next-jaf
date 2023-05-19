import { getGoogleAuthClient } from "./googleAuth";

let _token: string;

const getToken = async () => {
  if (!_token) {
    const authClient = getGoogleAuthClient();
    _token = (await authClient.getAccessToken()) as string;
  }
  return _token;
};
