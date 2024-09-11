export interface User {
    id: string;
    name: string;
    email: string;
    username: string;
}

export interface Blog {
    content: string;
    title: string;
    id: string
    authorId: string;
    category: string[];
    author: {
        name: string;
        id: string;
        email: string;
    }
    createdAt: string;
}

export interface BlogCardProps {
    authorName: string;
    authorId: string;
    title: string;
    content: string;
    publishedDate: string;
    id: string;
    bookmarks: Bookmark[] | null;
}

export interface AuthState {
    authUser: User | null;
    isAuthenticated: boolean;
    error: string | null;
    isLoading: boolean;
    message: string | null;
    signin: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    signout: () => void;
    checkAuth: () => void;
}

export interface BlogsState {
    blogs: Blog[] | null;
    blog: null;
    error: string | null;
    isLoading: boolean;
    fetchBlogs: () => void;
    fetchBlog: (id: string) => void;
}

export interface Bookmark {
    userId: string;
    postId: string;
    post: Blog;
}

export interface UserState {
    user: User | null;
    users: User[] | null;
    posts: Blog[];
    bookmarks: Bookmark[] | null;
    isLoading: boolean;
    error: string | null;
    fetchUser: (id: string) => void;
    fetchAllUsers: () => void;
    fetchBookmarks: (id: string) => void;
    createBookmark: (userId: string, postId: string) => Promise<void>;
    removeBookmark: (userId: string, postId: string) => Promise<void>;
}

export interface AvatarProps {
    name: string;
    size?: string;
    font?: "bold" | "light";
    styles?: string;
}