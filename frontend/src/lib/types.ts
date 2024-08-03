export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Blog {
    content: string;
    title: string;
    id: string
    author: {
        name: string
    }
    createdAt: string
}