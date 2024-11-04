export interface User {
    id: string;
    name: string;
    email: string;
    username: string;
    about: string
}

export interface Post {
    content: string;
    title: string;
    id: string
    authorId: string;
    coverImage: string;
    tags: Tag[];
    author: {
        name: string;
        id: string;
        email: string;
        username: string;
    }
    createdAt: string;
}

export interface PostCardType {
    authorName: string;
    authorId: string;
    title: string;
    content: string;
    coverImage: string;
    publishedDate: string;
    id: string;
    bookmarks: Bookmark[] | null;
    isOwner?: boolean;
    tags?: [] | null;
}

export interface AuthStateType {
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

export interface Tag {
    id: string;
    name: string;
}

export interface PostStateType {
    posts: Post[] | null;
    post: Post | null;
    userPosts: Post[];
    tags: [] | null;
    error: string | null;
    postsByTag: Post[] | null;
    isLoading: boolean;
    title: string | null;
    content: string;
    coverImage: File | string;
    postId: string | null;
    resetPostStore: () => void;
    resetPost: () => void;
    setPostId: (postId: string) => void,
    setTitle: (title: string) => void;
    setCoverImage: (coverImage: File | string) => void;
    setContent: (content: string) => void;
    publishPost: (formData: FormData) => Promise<void>;
    fetchAllPosts: () => void;
    fetchPost: (id: string) => void;
    fetchUserPosts: (id: string) => void;
    deletePost: (id: string) => Promise<void>;
    editPost: (id: string, formData: FormData) => Promise<void>;
    fetchAllTags: () => void;
    fetchPostByTag: (tag: string) => void;
}

export interface Bookmark {
    userId: string;
    postId: string;
    post: Post;
}

export interface UserStateType {
    user: User | null;
    users: User[] | null;
    bookmarks: Bookmark[] | null;
    isLoading: boolean;
    error: string | null;
    fetchUser: (id: string) => void;
    fetchAllUsers: () => void;
    fetchBookmarks: (id: string) => void;
    createBookmark: (userId: string, postId: string) => Promise<void>;
    removeBookmark: (userId: string, postId: string) => Promise<void>;
    updateUser: (userId: string, name: string, email: string, about: string) => Promise<void>;
    deleteUser: (userId: string) => Promise<void>;
}

export interface AvatarProps {
    name: string;
    size?: string;
    font?: "bold" | "light";
    styles?: string;
}