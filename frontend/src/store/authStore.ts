import { create } from "zustand";
import axios from "axios";
import { BACKEND } from "../config";
import { AuthState } from "../lib/types";
import { getToken, removeToken, setToken, setUser, removeUser, getUser } from "../lib";

export const useAuthStore = create<AuthState>((set) => ({
    authUser: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    message: null,

    signin: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${BACKEND}/api/v1/auth/signin`, { email, password });
            setToken(response.data.token)
            setUser(response.data.userInfo)
            set({
                isAuthenticated: true,
                authUser: response.data.userInfo,
                error: null,
                isLoading: false,
            });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error signing in", isLoading: false });
            throw error;
        }
    },

    signup: async (name: string, email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${BACKEND}/api/v1/auth/signup`, { name, email, password });
            setToken(response.data.token)
            setUser(response.data.userInfo)
            set({
                isAuthenticated: true,
                authUser: response.data.userInfo,
                error: null,
                isLoading: false,
            });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error signing up", isLoading: false });
            throw error;
        }
    },

    signout: () => {
        removeToken();
        removeUser();
        set({ isAuthenticated: false, authUser: null });
    },

    checkAuth: async () => {
        const token = getToken();
        const storedUser = getUser();
        if (token) {
            set({ isAuthenticated: true, authUser: JSON.parse(storedUser!) });
        } else {
            set({ isAuthenticated: false, authUser: null });
            removeToken();
            removeUser();
        }
    },
}))