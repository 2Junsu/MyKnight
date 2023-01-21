import { Cookies } from "react-cookie";

const cookie = new Cookies();

export const getCookie = (name: string) => {
  return cookie.get(name);
};
