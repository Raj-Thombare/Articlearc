import { Blog } from "../lib/types";

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

export const unslugify = (slug: string): string => {
    return slug
        .replace(/-/g, ' ')                // Replace hyphens with spaces
        .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize the first letter of each word
};