import { create } from 'zustand';
import axios from 'axios';
import { BACKEND } from '../config';
import { BlogsState } from '../lib/types';
import { getToken } from '../lib';

export const useBlogStore = create<BlogsState>((set) => ({
    blogs: null,
    blog: null,
    bookmarks: [],
    isLoading: true,
    error: null,

    fetchBlogs: async () => {
        set({ isLoading: true, error: null });
        try {
            const token = getToken();
            const { data } = await axios.get(`${BACKEND}/api/v1/post/all`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            set({ blogs: data.posts, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch blogs', isLoading: false });
        }
    },

    fetchBlog: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            const token = getToken();
            const { data } = await axios.get(`${BACKEND}/api/v1/post/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            set({ blog: data.post, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch blog', isLoading: false });
        }
    },
}))