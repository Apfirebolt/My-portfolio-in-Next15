"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowRight, FaPenNib, FaCalendarAlt, FaClock } from "react-icons/fa";
import useStore from "@/store";
import Loader from "@/components/Loader";

// Safely strip HTML tags to avoid breaking markup during summary extraction
const getPlainTextSnippet = (htmlString, maxLength = 160) => {
  if (!htmlString) return "";
  const plainText = htmlString.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength) + "...";
};

// Estimate read time based on raw content word count
const estimateReadTime = (htmlString) => {
  if (!htmlString) return "2 min read";
  const words = htmlString.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes || 1} min read`;
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: index * 0.08,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  }),
};

const BlogSection = () => {
  const { posts, fetchPosts, isPostLoading } = useStore();

  useEffect(() => {
    if (!posts?.results?.length && fetchPosts) {
      fetchPosts();
    }
  }, [posts, fetchPosts]);

  if (isPostLoading) {
    return <Loader message="Fetching articles..." />;
  }

  const postList = posts?.results || [];

  if (!postList.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="p-4 rounded-full bg-[var(--tertiary)]/20 border border-[var(--primary)]/20 text-[var(--accent)] mb-4">
          <FaPenNib className="text-3xl text-[var(--accent)]" />
        </div>
        <h3 className="text-lg font-bold text-[var(--foreground)]">
          No articles published yet
        </h3>
        <p className="text-sm text-[var(--primary)] max-w-sm mt-1">
          Articles, tutorials, and travel insights will appear here soon.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch py-6">
      {postList.map((post, index) => {
        const coverImage = post.images?.[0]?.image || post.featured_image;
        const postContent = post.content || post.description || "";
        const formattedDate = post.date_posted
          ? new Date(post.date_posted).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : null;

        return (
          <motion.article
            key={post.id || index}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="group flex flex-col justify-between overflow-hidden rounded-3xl bg-[var(--tertiary)]/15 border border-[var(--primary)]/20 shadow-lg hover:shadow-2xl hover:border-[var(--accent)]/50 transition-all duration-300 hover:-translate-y-1.5 backdrop-blur-md"
          >
            <div>
              {/* Optional Cover Banner */}
              {coverImage && (
                <div className="relative w-full h-48 bg-[var(--background)] overflow-hidden border-b border-[var(--primary)]/20">
                  <Image
                    src={
                      coverImage.startsWith("http")
                        ? coverImage
                        : `https://softgenie.org${coverImage}`
                    }
                    alt={post.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              <div className="p-6">
                {/* Header: Tags & Read Time */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  {post.tags && post.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 2).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 bg-[var(--tertiary)]/40 text-[var(--foreground)] font-semibold rounded-md text-[11px] uppercase tracking-wider border border-[var(--primary)]/20"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--primary)]">
                      Article
                    </span>
                  )}

                  <span className="inline-flex items-center gap-1 text-[11px] text-[var(--primary)]">
                    <FaClock className="text-[10px] text-[var(--accent)]" />
                    {estimateReadTime(postContent)}
                  </span>
                </div>

                {/* Article Title */}
                <h2 className="text-xl font-extrabold text-[var(--foreground)] tracking-tight mb-3 group-hover:text-[var(--accent)] transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h2>

                {/* Summary Snippet */}
                <p className="text-sm text-[var(--primary)] leading-relaxed line-clamp-3 mb-4">
                  {getPlainTextSnippet(postContent, 160)}
                </p>
              </div>
            </div>

            {/* Footer Action & Timestamp */}
            <div className="px-6 pb-6 pt-3 border-t border-[var(--primary)]/20 flex items-center justify-between text-xs">
              {formattedDate ? (
                <span className="inline-flex items-center gap-1.5 text-[var(--primary)] font-medium">
                  <FaCalendarAlt className="text-[var(--accent)] text-[11px]" />
                  {formattedDate}
                </span>
              ) : (
                <span />
              )}

              <Link
                href={`/posts/${post.id}`}
                className="inline-flex items-center gap-1.5 font-bold text-[var(--foreground)] hover:text-[var(--accent)] transition-colors group/link"
              >
                <span>Read Post</span>
                <FaArrowRight className="text-[10px] transition-transform duration-200 group-hover/link:translate-x-1" />
              </Link>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
};

export default BlogSection;