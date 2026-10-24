import React from "react";
import axios from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GalleryDetailClient from "@/components/GalleryDetailClient";

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const response = await axios.get(
      `https://softgenie.org/api/gallery-posts/${id}`
    );
    const gallery = response.data;

    return {
      title: `${gallery.title} | Gallery`,
      description: gallery.meta_description || "Explore photo story and gallery details.",
    };
  } catch (error) {
    console.error("Error fetching gallery metadata:", error);
    return {
      title: "Gallery Details",
      description: "Details about the gallery.",
    };
  }
}

const GalleryDetailPage = async ({ params }) => {
  const { id } = await params;

  let gallery = null;
  let fetchError = false;

  try {
    const response = await axios.get(
      `https://softgenie.org/api/gallery-posts/${id}`
    );
    gallery = response.data;
  } catch (error) {
    console.error("Error fetching gallery details:", error);
    fetchError = true;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--accent)] selection:text-[var(--background)] transition-colors duration-300">
      <Header />
      <main className="flex-1">
        <GalleryDetailClient gallery={gallery} error={fetchError} />
      </main>
      <Footer />
    </div>
  );
};

export default GalleryDetailPage;