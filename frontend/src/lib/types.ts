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

export interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    error: string | null;
    isLoading: boolean;
    message: string | null;
    signin: (email: string, password: string) => Promise<void>;
    signout: () => void;
    checkAuth: () => void;
}

export interface AvatarProps {
    name: string;
    size?: string;
    font?: "bold" | "light";
    styles?: string;
}