"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import parse from "html-react-parser";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { FaCalendarAlt, FaClock, FaImages } from "react-icons/fa";

const estimateReadTime = (content) => {
  if (!content) return "2 min read";
  const words = content.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes || 1} min read`;
};

const BlogDetailClient = ({ post, error }) => {
  if (error || !post) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center pt-28 pb-16 px-4">
        <div className="max-w-md w-full text-center bg-[var(--tertiary)]/20 p-8 rounded-3xl border border-[var(--primary)]/25 shadow-xl backdrop-blur-md">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] mb-4 font-bold text-2xl border border-[var(--accent)]/30">
            !
          </div>
          <h1 className="text-xl font-extrabold text-[var(--foreground)] mb-2 tracking-tight">
            Failed to load post
          </h1>
          <p className="text-sm text-[var(--primary)] mb-6 leading-relaxed">
            The article you are looking for might have been moved or is currently unavailable.
          </p>
          <Link
            href="/posts"
            className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-[var(--background)] bg-[var(--accent)] hover:opacity-90 rounded-xl transition-all shadow-sm"
          >
            &larr; Back to Articles
          </Link>
        </div>
      </div>
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

  const images = post.images || [];

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 flex items-center text-xs sm:text-sm text-[var(--primary)] space-x-2">
          <Link href="/" className="hover:text-[var(--accent)] transition-colors">
            Home
          </Link>
          <span className="opacity-60">/</span>
          <Link href="/posts" className="hover:text-[var(--accent)] transition-colors">
            Blog
          </Link>
          <span className="opacity-60">/</span>
          <span className="text-[var(--foreground)] font-medium truncate max-w-[200px] sm:max-w-xs">
            {post.title}
          </span>
        </nav>

        {/* Article Container */}
        <article className="bg-[var(--tertiary)]/15 rounded-3xl border border-[var(--primary)]/20 shadow-lg backdrop-blur-md overflow-hidden p-6 sm:p-12">
          
          {/* Header Section */}
          <header className="border-b border-[var(--primary)]/20 pb-8 mb-8">
            {/* Category Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3.5 py-1 bg-[var(--tertiary)]/40 border border-[var(--primary)]/20 text-[var(--foreground)] font-semibold rounded-full text-xs tracking-wider uppercase shadow-xs"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl font-black text-[var(--foreground)] tracking-tight leading-tight mb-5">
              {post.title}
            </h1>

            {/* Metadata Details */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-[var(--primary)]">
              {formattedCreatedDate && (
                <div className="flex items-center gap-1.5">
                  <FaCalendarAlt className="text-[var(--accent)] text-xs" />
                  <span>Published on {formattedCreatedDate}</span>
                </div>
              )}
              {formattedUpdatedDate && formattedUpdatedDate !== formattedCreatedDate && (
                <div className="flex items-center gap-1.5">
                  <span className="opacity-60">•</span>
                  <span>Updated on {formattedUpdatedDate}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <FaClock className="text-[var(--accent)] text-xs" />
                <span>{estimateReadTime(post.content)}</span>
              </div>
            </div>
          </header>

          {/* Content Body */}
          {post.content && (
            <div className="prose max-w-none text-[var(--primary)] leading-relaxed space-y-4 mb-12 [&>p]:text-[var(--primary)] [&>h2]:text-[var(--foreground)] [&>h3]:text-[var(--foreground)]">
              {parse(post.content)}
            </div>
          )}

          {/* Swiper Slideshow for Post Media */}
          {images.length > 0 && (
            <section className="pt-8 border-t border-[var(--primary)]/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)]"></span>
                  Post Media Slideshow
                </h2>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--background)]/80 text-[var(--foreground)] text-xs font-semibold border border-[var(--primary)]/20 shadow-xs">
                  <FaImages className="text-[var(--accent)] text-xs" />
                  <span>{images.length} {images.length === 1 ? "Image" : "Images"}</span>
                </span>
              </div>

              <div className="w-full rounded-2xl overflow-hidden border border-[var(--primary)]/20 bg-[var(--background)] shadow-xl">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay, EffectFade]}
                  effect="fade"
                  navigation
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  className="w-full h-[350px] sm:h-[480px]"
                >
                  {images.map((imgObj, idx) => {
                    const coverImage = imgObj.image || imgObj;
                    const imgSrc = typeof coverImage === "string" && coverImage.startsWith("http")
                      ? coverImage
                      : `https://softgenie.org${coverImage}`;

                    return (
                      <SwiperSlide key={idx} className="relative w-full h-full">
                        <Image
                          src={imgSrc}
                          alt={imgObj.caption || `${post.title} slide ${idx + 1}`}
                          fill
                          className="object-cover object-center"
                        />
                        {imgObj.caption && (
                          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-4 sm:p-6 text-white text-xs sm:text-sm backdrop-blur-[2px]">
                            <p className="font-medium text-center">{imgObj.caption}</p>
                          </div>
                        )}
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </section>
          )}
        </article>
      </div>
    </div>
  );
};

export default BlogDetailClient;