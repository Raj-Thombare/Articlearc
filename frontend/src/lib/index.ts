import { Blog, User } from "./types";

export function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp);

  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;
  return formattedDate;
}

export function sortBlogs(blogs: Blog[]) {
  const sortedBlogs = blogs.sort((a: Blog, b: Blog) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return sortedBlogs;
}

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

  // if (userString === null) {
  //   return null;
  // }

  return userString;
};

export const removeUser = () => {
  localStorage.removeItem("user");
};





