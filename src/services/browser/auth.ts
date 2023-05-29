import cookie from "cookie";
import { Cookie, hourSec } from "../../constants";

export const getAuthCookie = () => {
  return cookie.parse(document.cookie)[Cookie.Auth];
};
export const setAuthCookie = (v: string) => {
  document.cookie = cookie.serialize(Cookie.Auth, v, {
    maxAge: hourSec,
  });
};
export const clearAuthCookie = () => {
  document.cookie = cookie.serialize(Cookie.Auth, "", {
    maxAge: -1,
  });
};
