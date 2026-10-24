"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import parse from "html-react-parser";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { FaImages, FaCamera } from "react-icons/fa";

const GalleryDetailClient = ({ gallery, error }) => {
  if (error || !gallery) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center pt-28 pb-16 px-4">
        <div className="max-w-md w-full text-center bg-[var(--tertiary)]/20 p-8 rounded-3xl border border-[var(--primary)]/25 shadow-xl backdrop-blur-md">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] mb-4 font-bold text-2xl border border-[var(--accent)]/30">
            !
          </div>
          <h1 className="text-xl font-extrabold text-[var(--foreground)] mb-2 tracking-tight">
            Failed to load gallery
          </h1>
          <p className="text-sm text-[var(--primary)] mb-6 leading-relaxed">
            The requested gallery item could not be retrieved or has been removed.
          </p>
          <Link
            href="/gallery"
            className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-[var(--background)] bg-[var(--accent)] hover:opacity-90 rounded-xl transition-all shadow-sm"
          >
            &larr; Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  const formattedCreatedDate = gallery.date_posted
    ? new Date(gallery.date_posted).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const formattedUpdatedDate = gallery.date_updated
    ? new Date(gallery.date_updated).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const images = gallery.images || [];

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 flex items-center text-xs sm:text-sm text-[var(--primary)] space-x-2">
          <Link href="/" className="hover:text-[var(--accent)] transition-colors">
            Home
          </Link>
          <span className="opacity-60">/</span>
          <Link href="/gallery" className="hover:text-[var(--accent)] transition-colors">
            Gallery
          </Link>
          <span className="opacity-60">/</span>
          <span className="text-[var(--foreground)] font-medium truncate max-w-[200px] sm:max-w-xs">
            {gallery.title}
          </span>
        </nav>

        {/* Article Container */}
        <article className="bg-[var(--tertiary)]/15 rounded-3xl border border-[var(--primary)]/20 shadow-lg backdrop-blur-md overflow-hidden p-6 sm:p-12">
          
          {/* Header / Meta Section */}
          <header className="border-b border-[var(--primary)]/20 pb-8 mb-8">
            {/* Tags */}
            {gallery.tags && gallery.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {gallery.tags.map((tag, tagIndex) => (
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
              {gallery.title}
            </h1>

            {/* Timestamp Metadata Details */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-[var(--primary)]">
              {formattedCreatedDate && (
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-[var(--foreground)] opacity-90">Published:</span>
                  <time dateTime={gallery.date_posted}>{formattedCreatedDate}</time>
                </div>
              )}
              {formattedUpdatedDate && formattedUpdatedDate !== formattedCreatedDate && (
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-[var(--foreground)] opacity-90">Updated:</span>
                  <time dateTime={gallery.date_updated}>{formattedUpdatedDate}</time>
                </div>
              )}
            </div>
          </header>

          {/* Content Body */}
          {gallery.description && (
            <div className="prose max-w-none text-[var(--primary)] leading-relaxed space-y-4 mb-12 [&>p]:text-[var(--primary)] [&>h2]:text-[var(--foreground)] [&>h3]:text-[var(--foreground)]">
              {parse(gallery.description)}
            </div>
          )}

          {/* Swiper Slideshow Stream */}
          <section className="pt-8 border-t border-[var(--primary)]/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)]"></span>
                Captured Moments Slideshow
              </h2>
              {images.length > 0 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--background)]/80 text-[var(--foreground)] text-xs font-semibold border border-[var(--primary)]/20 shadow-xs">
                  <FaImages className="text-[var(--accent)] text-xs" />
                  <span>{images.length} {images.length === 1 ? "Photo" : "Photos"}</span>
                </span>
              )}
            </div>

            {images.length > 0 ? (
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
                    const coverImage = imgObj.image;
                    const imgSrc = coverImage?.startsWith("http")
                      ? coverImage
                      : `https://softgenie.org${coverImage}`;

                    return (
                      <SwiperSlide key={idx} className="relative w-full h-full">
                        <Image
                          src={imgSrc}
                          alt={imgObj.caption || `${gallery.title} photo ${idx + 1}`}
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
            ) : (
              <div className="p-10 text-center bg-[var(--background)]/50 rounded-2xl border border-dashed border-[var(--primary)]/30">
                <p className="text-sm text-[var(--primary)]">
                  No visual assets available for this post.
                </p>
              </div>
            )}
          </section>
        </article>
      </div>
    </div>
  );
};

export default GalleryDetailClient;