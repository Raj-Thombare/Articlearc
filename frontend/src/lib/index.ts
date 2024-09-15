import { User } from "./types";

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const setUser = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = (): string | null => {
  const userString = localStorage.getItem("user");
  return userString;
};

export const removeUser = () => {
  localStorage.removeItem("user");
};





