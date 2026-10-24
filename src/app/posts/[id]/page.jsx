import React from "react";
import httpClient from "@/plugins/interceptor";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogDetailClient from "@/components/BlogDetailClient";

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const response = await httpClient.get(`blogs/${id}`);
    const post = response.data;

    return {
      title: `${post.title} | Blog`,
      description: post.meta_description || "Read full article and insights.",
    };
  } catch (error) {
    console.error("Error fetching post metadata:", error);
    return {
      title: "Post Details | Blog",
      description: "Details about the post.",
    };
  }
}

const PostDetailPage = async ({ params }) => {
  const { id } = await params;

  let post = null;
  let fetchError = false;

  try {
    const response = await httpClient.get(`blogs/${id}`);
    post = response.data;
  } catch (error) {
    console.error("Error fetching post details:", error);
    fetchError = true;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--accent)] selection:text-[var(--background)] transition-colors duration-300">
      <Header />
      <main className="flex-1">
        <BlogDetailClient post={post} error={fetchError} />
      </main>
      <Footer />
    </div>
  );
};

export default PostDetailPage;