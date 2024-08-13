import { create } from "zustand";
import axios from "axios";
import { BACKEND } from "../config";
import { AuthState } from "../lib/types";
import { getToken, removeToken, setToken, setUser, removeUser } from "../lib";

const API_URL = import.meta.env.MODE === "development" ? "http://127.0.0.1:8787" : `${BACKEND}`;

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    message: null,

    signin: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/api/v1/auth/signin`, { email, password });
            setToken(response.data.token)
            setUser(response.data.userInfo)
            set({
                isAuthenticated: true,
                user: response.data.userInfo,
                error: null,
                isLoading: false,
            });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
            throw error;
        }
    },

    signout: () => {
        removeToken();
        removeUser();
        set({ isAuthenticated: false, user: null });
    },

    checkAuth: async () => {
        const token = getToken();
        if (token) {
            set({ isAuthenticated: true });
        } else {
            set({ isAuthenticated: false, user: null });
            removeToken();
            removeUser();
        }
    },
}))