import CryptoJS from 'crypto-js';

export async function hashPassword(password: string): Promise<string> {
    const encodedPassword = new TextEncoder().encode(password);

    const myDigest = await crypto.subtle.digest(
        {
            name: 'SHA-256',
        },
        encodedPassword
    );

    return [...new Uint8Array(myDigest)]
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
}

export const slugify = (text: string): string => {
    return text
        .toLowerCase()                    // Convert to lowercase
        .replace(/\s+/g, '-')              // Replace spaces with hyphens
        .replace(/[^\w\-]+/g, '')         // Remove all non-word characters (except hyphens)
        .replace(/\-\-+/g, '-')            // Replace multiple hyphens with a single hyphen
        .trim();                           // Trim leading and trailing hyphens
};

export function extractUsername(email: string): string {
    return email.split('@')[0];
}

export function generateSignature(publicId: string, apiSecret: string) {
    const timestamp = Math.floor(Date.now() / 1000);
    const signatureString = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    return CryptoJS.SHA1(signatureString).toString();
}