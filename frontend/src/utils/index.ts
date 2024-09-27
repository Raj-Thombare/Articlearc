import { Post } from "../lib/types";

export function formatTimestamp(timestamp: string) {
    const date = new Date(timestamp);

    const month = date.toLocaleString("en-US", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();

    const formattedDate = `${month} ${day}, ${year}`;
    return formattedDate;
}

export function sortposts(posts: Post[]) {
    const sortedposts = posts.sort((a: Post, b: Post) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return sortedposts;
}

export const unslugify = (slug: string): string => {
    return slug
        .replace(/-/g, ' ')                // Replace hyphens with spaces
        .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize the first letter of each word
};