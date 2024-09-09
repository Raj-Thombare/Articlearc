export const slugify = (texts: string[]): string[] => {
    // Helper function to slugify a single string
    const slugifyString = (text: string) => {
        return text
            .toLowerCase()                    // Convert to lowercase
            .replace(/\s+/g, '-')              // Replace spaces with hyphens
            .replace(/[^\w\-]+/g, '')         // Remove all non-word characters (except hyphens)
            .replace(/\-\-+/g, '-')            // Replace multiple hyphens with a single hyphen
            .trim();                           // Trim leading and trailing hyphens
    };

    // Map over each string in the array and slugify it
    return texts.map(slugifyString);
};