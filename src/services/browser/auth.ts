import { LocalStorage, hour, min } from "../../constants";

export const clearToken = () => {
  localStorage.removeItem(LocalStorage.Token);
  localStorage.removeItem(LocalStorage.TokenExp);
};

export const setGoogleToken = (token: string) => {
  localStorage.setItem(LocalStorage.Token, token);
  localStorage.setItem(LocalStorage.TokenExp, (Date.now() + hour).toString());
};

export const getGoogleToken = () => {
  const token = localStorage.getItem(LocalStorage.Token);
  if (!token) {
    return null;
  }
  const ts = parseInt(localStorage.getItem(LocalStorage.TokenExp) ?? "0");
  const soon = Date.now() + min;

  if (soon > ts) {
    clearToken();
    return null;
  }

  return token;
};
