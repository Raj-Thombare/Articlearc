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
    isLoading: true,
    error: null,
    title: "",
    content: "",
    setTitle: (title) => set({ title }), // Action to update title
    setContent: (content) => set({ content }),

    publishPost: async (title: string, content: string) => {
        set({ isLoading: true, error: null });
        try {
            const token = getToken();
            // if (title && content) {
            //     set({ isPublished: true })
            // }
            const { data } = await axios.post(`${BACKEND}/api/v1/post`, { title, content }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            set({ posts: data, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to publish post', isLoading: false });
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

    createPost: async (title: string, content: string) => {
        set({ isLoading: true, error: null });
        try {
            const token = getToken();
            const { data } = await axios.post(`${BACKEND}/api/v1/post`, { title, content }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            set({ posts: data.posts, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to delete post', isLoading: false });
        }
    },

    deletePost: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            const token = getToken();
            await axios.delete(`${BACKEND}/api/v1/post/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            set({ error: 'Failed to delete post', isLoading: false });
        }
    }
}))