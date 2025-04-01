import { create } from "zustand";
import axiosInstance from "./plugins/interceptor.js";

const useStore = create((set, get) => ({
    projects: [],
    posts: [],
    gallery: [],
    isPostLoading: false,
    isProjectLoading: false,
    isGalleryLoading: false,
    error: null,

    // Getters
    getProjects: () => get().projects,
    getPosts: () => get().posts,
    getGallery: () => get().gallery,

    // Fetch functions
    fetchProjects: async () => {
        set({ isProjectLoading: true });
        try {
            const { data } = await axiosInstance.get(`projects`);
            set({ projects: data });
        } catch (error) {
            console.error(error);
            set({ error });
        } finally {
            set({ isProjectLoading: false });
        }
    },
    fetchPosts: async () => {
        set({ isPostLoading: true });
        try {
            const { data } = await axiosInstance.get(`blogs`);
            set({ posts: data });
        } catch (error) {
            console.error(error);
            set({ error });
        } finally {
            set({ isPostLoading: false });
        }
    },
    fetchGallery: async () => {
        set({ isGalleryLoading: true });
        try {
            const { data } = await axiosInstance.get(`gallery-posts`);
            set({ gallery: data });
        } catch (error) {
            console.error(error);
            set({ error });
        } finally {
            set({ isGalleryLoading: false });
        }
    },
}));

export default useStore;
