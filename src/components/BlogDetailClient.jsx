"use client";

import React, { useState, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import parse from "html-react-parser";
import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { FaCalendarAlt, FaClock, FaImages, FaTimes, FaExpand } from "react-icons/fa";

const estimateReadTime = (content) => {
  if (!content) return "2 min read";
  const words = content.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes || 1} min read`;
};

const BlogDetailClient = ({ post, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

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

  const openModal = (imgSrc, caption) => {
    setActiveImage({ src: imgSrc, caption });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setActiveImage(null);
  };

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

          {/* Swiper Slideshow for Post Media (Moved to Top) */}
          {images.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
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
                  className="w-full h-[320px] sm:h-[450px]"
                >
                  {images.map((imgObj, idx) => {
                    const coverImage = imgObj.image || imgObj;
                    const imgSrc = typeof coverImage === "string" && coverImage.startsWith("http")
                      ? coverImage
                      : `https://softgenie.org${coverImage}`;

                    return (
                      <SwiperSlide key={idx} className="relative w-full h-full group cursor-pointer" onClick={() => openModal(imgSrc, imgObj.caption)}>
                        <Image
                          src={imgSrc}
                          alt={imgObj.caption || `${post.title} slide ${idx + 1}`}
                          fill
                          className="object-cover object-center"
                        />
                        <div className="absolute top-3 right-3 z-10 bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                          <FaExpand className="text-xs" />
                        </div>
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

          {/* Content Body */}
          {post.content && (
            <div className="prose max-w-none text-[var(--primary)] leading-relaxed space-y-4 mb-12 [&>p]:text-[var(--primary)] [&>h2]:text-[var(--foreground)] [&>h3]:text-[var(--foreground)]">
              {parse(post.content)}
            </div>
          )}

          {/* All Images Gallery Grid Section (At the Bottom) */}
          {images.length > 0 && (
            <section className="pt-8 border-t border-[var(--primary)]/20">
              <h2 className="text-lg sm:text-xl font-bold text-[var(--foreground)] mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)]"></span>
                All Article Media Gallery
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((imgObj, idx) => {
                  const coverImage = imgObj.image || imgObj;
                  const imgSrc = typeof coverImage === "string" && coverImage.startsWith("http")
                    ? coverImage
                    : `https://softgenie.org${coverImage}`;

                  return (
                    <div
                      key={idx}
                      onClick={() => openModal(imgSrc, imgObj.caption)}
                      className="group relative h-48 rounded-2xl overflow-hidden border border-[var(--primary)]/20 bg-[var(--background)] shadow-md cursor-pointer transition-transform hover:scale-[1.02]"
                    >
                      <Image
                        src={imgSrc}
                        alt={imgObj.caption || `${post.title} gallery item ${idx + 1}`}
                        fill
                        className="object-cover object-center group-hover:opacity-90 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <FaExpand className="text-xl" />
                      </div>
                      {imgObj.caption && (
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-white text-xs truncate">
                          {imgObj.caption}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </article>
      </div>

      {/* Headless UI Modal with Smooth Transitions */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          
          {/* Backdrop Transition */}
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md" aria-hidden="true" />
          </TransitionChild>

          <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6">
            
            {/* Modal Panel Transition */}
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative max-w-5xl w-full max-h-[90vh] bg-[var(--background)] rounded-3xl border border-[var(--primary)]/30 overflow-hidden shadow-2xl flex flex-col">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-black transition-colors backdrop-blur-sm cursor-pointer"
                  aria-label="Close modal"
                >
                  <FaTimes className="text-sm" />
                </button>

                <div className="relative w-full h-[60vh] sm:h-[75vh] bg-black/40 flex items-center justify-center">
                  {activeImage && (
                    <Image
                      src={activeImage.src}
                      alt={activeImage.caption || "Expanded post media view"}
                      fill
                      className="object-contain"
                    />
                  )}
                </div>

                {activeImage?.caption && (
                  <div className="p-4 sm:p-6 bg-[var(--tertiary)]/30 border-t border-[var(--primary)]/20 text-center">
                    <p className="text-sm text-[var(--foreground)] font-medium">
                      {activeImage.caption}
                    </p>
                  </div>
                )}
              </Dialog.Panel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default BlogDetailClient;