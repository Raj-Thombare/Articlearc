import { atom, selector, selectorFamily } from "recoil";
import { User, Blog } from '../lib/types';
import { fetchBlogData } from "../hooks/blog";

export const authTokenState = atom<string | null>({
    key: 'authTokenState',
    default: null,
});

export const currentUserState = atom<User | null>({
    key: 'currentUserState',
    default: null,
});

export const isAuthenticatedState = atom<boolean>({
    key: 'isAuthenticatedState',
    default: false,
});

export const blogListState = atom<Blog[]>({
    key: "blogListState",
    default: []
});

export const blogState = atom<Blog>({
    key: "blogState",
    default: {
        id: "",
        title: "",
        content: "",
        createdAt: "",
        author: {
            name: ""
        }
    }
})

export const blogListQuery = selector<Blog[]>({
    key: 'blogListQuery',
    get: async ({ get }) => {
        const cachedBlogs = get(blogListState);
        if (cachedBlogs.length > 0) {
            return cachedBlogs;
        }

        const data = await fetchBlogData('bulk');
        return data.posts;
    },
});

export const blogQuery = selectorFamily<Blog, string>({
    key: 'blogQuery',
    get: (id: string) => async ({ get }) => {
        const cachedBlog = get(blogState);
        if (cachedBlog && cachedBlog.id === id) {
            return cachedBlog;
        }

        const data = await fetchBlogData(id);
        return data.post;
    },
});