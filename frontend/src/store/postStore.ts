import { create } from 'zustand';
import axios from 'axios';
import { BACKEND } from '../config';
import { PostStateType } from '../lib/types';
import { getToken } from '../lib';

export const usePostStore = create<PostStateType>((set) => ({
    posts: null,
    post: null,
    userPosts: [],
    bookmarks: [],
    postsByTag: [],
    tags: null,
    isLoading: true,
    error: null,
    title: null,
    content: "",
    coverImage: "",
    postId: null,
    resetPost: () => {
        set({
            post: null
        })
    },
    resetPostStore: () =>
        set({
            postId: null,
            title: "",
            content: "",
            coverImage: "",
        }),
    setPostId: (postId) => set({ postId }),
    setCoverImage: (coverImage: File | string) => set({ coverImage }),
    setTitle: (title: string) => set({ title }),
    setContent: (content: string) => set({ content }),
    publishPost: async (formData: FormData) => {
        set({ isLoading: true, error: null });
        try {
            const token = getToken();
            await axios.post(`${BACKEND}/api/v1/post`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            const { data } = await axios.get(`${BACKEND}/api/v1/post/all`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            set({ posts: data.posts, isLoading: false });
        } catch (error) {
            console.error("Failed to publish post:", error);
            set({ error: "Failed to publish post", isLoading: false });
        }
    },

    editPost: async (id: string, formData: FormData) => {
        set({ isLoading: true, error: null });
        try {
            const token = getToken();
            await axios.patch(`${BACKEND}/api/v1/post/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                }
            });
            const { data } = await axios.get(`${BACKEND}/api/v1/post/all`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            set({ posts: data.posts, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to update post', isLoading: false });
        }
    },

    fetchAllPosts: async () => {
        set({ isLoading: true, error: null });
        try {
            const token = getToken();
            const { data } = await axios.get(`${BACKEND}/api/v1/post/all`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            set({ posts: data.posts, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch posts', isLoading: false });
        }
    },

    fetchPost: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            const token = getToken();
            const { data } = await axios.get(`${BACKEND}/api/v1/post/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            set({ post: data.post, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch post', isLoading: false });
        }
    },

    fetchUserPosts: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
            const token = getToken();
            const { data } = await axios.get(`${BACKEND}/api/v1/post/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            set({ userPosts: data.posts.posts, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch post', isLoading: false });
        }
    },

    deletePost: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            const token = getToken();
            await axios.delete(`${BACKEND}/api/v1/post/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const { data } = await axios.get(`${BACKEND}/api/v1/post/all`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            set({ posts: data.posts, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to delete post', isLoading: false });
        }
    },

    fetchAllTags: async () => {
        set({ isLoading: true, error: null });
        try {
            const token = getToken();
            const { data } = await axios.get(`${BACKEND}/api/v1/post/tags/all`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            set({ tags: data.tags, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch tags', isLoading: false });
        }
    },

    fetchPostByTag: async (tag: string) => {
        set({ isLoading: true, error: null });
        try {
            const token = getToken();
            const { data } = await axios.get(`${BACKEND}/api/v1/post/tag/${tag}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            set({ postsByTag: data.posts, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch posts by tag', isLoading: false });
        }
    }
}))