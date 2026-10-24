import React, { Fragment } from "react";
import axios from "axios";
import parse from "html-react-parser";
import Link from "next/link";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import Header from "@/components/Header";
import ImageComponent from "@/components/Images";
import Footer from "@/components/Footer";

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const response = await axios.get(`https://softgenie.org/api/blogs/${id}`);
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

const estimateReadTime = (content) => {
  if (!content) return "2 min read";
  const words = content.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes || 1} min read`;
};

const PostDetailPage = async ({ params }) => {
  const { id } = await params;

  let post = null;

  try {
    const response = await axios.get(`https://softgenie.org/api/blogs/${id}`);
    post = response.data;
  } catch (error) {
    console.error("Error fetching post details:", error);
    return (
      <Fragment>
        <Header />
        <main className="min-h-[70vh] flex items-center justify-center pt-24 pb-12 px-4 bg-neutral-50/50">
          <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl border border-neutral-200/80 shadow-sm">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-50 text-rose-500 mb-4 font-bold text-xl">
              !
            </div>
            <h1 className="text-xl font-bold text-neutral-900 mb-2">
              Failed to load post
            </h1>
            <p className="text-sm text-neutral-500 mb-6">
              The article you are looking for might have been moved or is currently unavailable.
            </p>
            <Link
              href="/posts"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors"
            >
              &larr; Back to Articles
            </Link>
          </div>
        </main>
        <Footer />
      </Fragment>
    );
  }

  const formattedCreatedDate = post.date_posted
    ? new Date(post.date_posted).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const formattedUpdatedDate = post.date_updated
    ? new Date(post.date_updated).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <Fragment>
      <Header />
      <main className="min-h-screen pt-24 pb-16 bg-neutral-50/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav className="mb-6 flex items-center text-xs sm:text-sm text-neutral-400 space-x-2">
            <Link href="/" className="hover:text-neutral-700 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/posts" className="hover:text-neutral-700 transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-neutral-600 font-medium truncate max-w-[200px] sm:max-w-xs">
              {post.title}
            </span>
          </nav>

          {/* Article Container */}
          <article className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden p-6 sm:p-10">
            
            {/* Header Section */}
            <header className="border-b border-neutral-100 pb-8 mb-8">
              {/* Category Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-0.5 bg-neutral-100 text-neutral-700 font-medium rounded-full text-xs tracking-wide uppercase"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight mb-4">
                {post.title}
              </h1>

              {/* Metadata Details */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-neutral-500">
                {formattedCreatedDate && (
                  <div className="flex items-center gap-1.5">
                    <FaCalendarAlt className="text-neutral-400 text-xs" />
                    <span>Published on {formattedCreatedDate}</span>
                  </div>
                )}
                {formattedUpdatedDate && formattedUpdatedDate !== formattedCreatedDate && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-neutral-400">•</span>
                    <span>Updated on {formattedUpdatedDate}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <FaClock className="text-neutral-400 text-xs" />
                  <span>{estimateReadTime(post.content)}</span>
                </div>
              </div>
            </header>

            {/* Content Body */}
            {post.content && (
              <div className="prose prose-neutral max-w-none text-neutral-700 leading-relaxed space-y-4 mb-10">
                {parse(post.content)}
              </div>
            )}

            {/* Associated Images / Gallery Section */}
            {post.images && post.images.length > 0 && (
              <section className="pt-8 border-t border-neutral-100">
                <h2 className="text-lg font-bold text-neutral-900 mb-4">
                  Post Media
                </h2>
                <div className="w-full">
                  <ImageComponent images={post.images} />
                </div>
              </section>
            )}
          </article>
        </div>
      </main>
      <Footer />
    </Fragment>
  );
};

export default PostDetailPage;