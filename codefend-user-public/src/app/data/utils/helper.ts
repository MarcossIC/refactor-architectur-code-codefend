import { User } from "..";

/** Gets token in localStorage */
export const getToken = () => localStorage.getItem("token") ?? "";

/** Set token in localStorage */
export const setToken = (token: string) =>
  window.localStorage.setItem("token", token);

/** persist user data in localStorage */
export const persistUser = (userData: any) =>
  window.localStorage.setItem("user", JSON.stringify(userData));

/** persist user data in localStorage */
export const getUser = () => {
  const userData = window.localStorage.getItem("user");
  if (userData) return JSON.parse(userData);
  return userData;
};

/** set token and user data for Auth */
export const setAuth = (token: string, user: User) => {
  if (!(token && user)) return;
  setToken(token);
};

/** clear token and user data for Auth */
export const clearAuth = () => {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("user");
};

/** Date formatter */
export const formatDate = (date?: string | number | Date): string => {
  if (!date || !(date instanceof Date)) return "";

  const formattedDate = new Date(date).toISOString().split("T")[0];
  return formattedDate;
};

/** calculate percentage  */
export const renderPercentage = (value: string, total: string) => {
  if (value === "0") {
    return "0%";
  }
  let percentValue =
    ((parseInt(value) / parseInt(total)) * 100).toFixed() + "%";

  return percentValue;
};

/** check if  data is empty/zeros */
export const isEmptyData = (data: any) => {
  if (data.constructor !== Object) return true;

  return Object.values(data).every(
    (item) => Boolean(item) == false || item == 0
  );
};
