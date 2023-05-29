import { LocalStorage, hourMS, minMS } from "../../constants";

// TODO: Cookie with expiry would make more sense

export const clearToken = () => {
  localStorage.removeItem(LocalStorage.Token);
  localStorage.removeItem(LocalStorage.TokenExp);
};

export const setGoogleToken = (token: string) => {
  localStorage.setItem(LocalStorage.Token, token);
  localStorage.setItem(LocalStorage.TokenExp, (Date.now() + hourMS).toString());
};

export const getGoogleToken = () => {
  const token = localStorage.getItem(LocalStorage.Token);
  if (!token) {
    return null;
  }
  const ts = parseInt(localStorage.getItem(LocalStorage.TokenExp) ?? "0");
  const soon = Date.now() + minMS * 5;

  if (soon > ts) {
    clearToken();
    return null;
  }

  return token;
};
