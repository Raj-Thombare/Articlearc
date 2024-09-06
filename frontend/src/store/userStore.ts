import { create } from 'zustand';
import axios from 'axios';
import { BACKEND } from '../config';
import { getToken } from '../lib';
import { UserState } from '../lib/types';

export const useUserStore = create<UserState>((set) => ({
    user: null,
    users: null,
    posts: [],
    bookmarks: null,
    isLoading: true,
    error: null,

    fetchUser: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            const token = getToken();
            const { data } = await axios.get(`${BACKEND}/api/v1/user/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            set({ user: data.user, posts: data.user.posts, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch user', isLoading: false });
        }
    },

    fetchAllUsers: async () => {
        set({ isLoading: true, error: null });
        try {
            const token = getToken();
            const { data } = await axios.get(`${BACKEND}/api/v1/user`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            set({ users: data.users, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch users', isLoading: false });
        }
    },

    fetchBookmarks: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            const token = getToken();
            const { data } = await axios.get(`${BACKEND}/api/v1/user/${id}/bookmarks`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            set({ bookmarks: data.savedPosts, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch saved blogs', isLoading: false });
        }
    },

    createBookmark: async (userId: string, postId: string) => {
        set({ isLoading: true, error: null });
        try {
            const token = getToken(); 
            const response = await axios.post(
                `${BACKEND}/api/v1/user/${userId}/bookmark`,
                { postId: postId },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.status === 200) {
                set({ bookmarks: response.data.savedPosts, isLoading: false });
            } else {
                throw new Error(`Unexpected status code: ${response.status}`);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 403) {
                set({ error: 'Permission denied. Please log in.', isLoading: false });
            } else {
                set({ error: 'Failed to bookmark', isLoading: false });
            }
        }
    },

    removeBookmark: async (userId: string, postId: string) => {
        set({ isLoading: true, error: null });
        try {
            const token = getToken();
            const { data } = await axios.delete(
                `${BACKEND}/api/v1/user/${userId}/bookmark`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    data: { postId: postId },
                }
            );

            set({ bookmarks: data.savedPosts, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to remove bookmark', isLoading: false });
        }
    }
}))