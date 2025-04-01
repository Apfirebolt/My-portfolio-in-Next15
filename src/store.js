import { create } from "zustand";
import axiosInstance from "./plugins/interceptor.js";

const useStore = create((set, get) => ({
    projects: [],
    posts: [],
    gallery: [],
    error: null,

    // Getters
    getProjects: () => get().projects,
    getPosts: () => get().posts,
    getGallery: () => get().gallery,

    // Fetch functions
    fetchProjects: async () => {
        try {
            const { data } = await axiosInstance.get(`projects`);
            set({ projects: data });
        } catch (error) {
            console.error(error);
        }
    },
    fetchPosts: async () => {
        try {
            const { data } = await axiosInstance.get(`blogs`);
            set({ posts: data });
        } catch (error) {
            console.error(error);
        }
    },
    fetchGallery: async () => {
        try {
            const { data } = await axiosInstance.get(`gallery-posts`);
            set({ gallery: data });
        } catch (error) {
            console.error(error);
        }
    },
}));

export default useStore;
