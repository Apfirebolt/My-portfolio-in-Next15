"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowRight, FaCamera, FaImages } from "react-icons/fa";
import useStore from "@/store";
import Loader from "./Loader";

// Safely strip HTML tags to avoid breaking markup during snippet generation
const getPlainTextSnippet = (htmlString, maxLength = 150) => {
  if (!htmlString) return "";
  const plainText = htmlString.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength) + "...";
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

const GallerySection = () => {
  const { gallery, fetchGallery, isGalleryLoading } = useStore();

  useEffect(() => {
    if (!gallery?.results?.length && fetchGallery) {
      fetchGallery();
    }
  }, [gallery, fetchGallery]);

  if (isGalleryLoading) {
    return <Loader message="Fetching photo albums..." />;
  }

  const galleryList = gallery?.results || [];

  if (!galleryList.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="p-4 rounded-full bg-[var(--tertiary)]/20 border border-[var(--primary)]/20 text-[var(--accent)] mb-4">
          <FaCamera className="text-3xl text-[var(--accent)]" />
        </div>
        <h3 className="text-lg font-bold text-[var(--foreground)]">
          No gallery posts available
        </h3>
        <p className="text-sm text-[var(--primary)] max-w-sm mt-1">
          Photos and visual stories will appear here soon.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch py-6">
      {galleryList.map((item, index) => {
        const coverImage = item.images?.[0]?.image;
        const totalImages = item.images?.length || 0;

        return (
          <motion.article
            key={item.id || index}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="group flex flex-col justify-between overflow-hidden rounded-3xl bg-[var(--tertiary)]/15 border border-[var(--primary)]/20 shadow-lg hover:shadow-2xl hover:border-[var(--accent)]/50 transition-all duration-300 hover:-translate-y-1.5 backdrop-blur-md"
          >
            <div>
              {/* Cover Photo Header */}
              <div className="relative w-full h-52 sm:h-56 bg-[var(--background)] overflow-hidden border-b border-[var(--primary)]/20">
                {coverImage ? (
                  <Image
                    src={
                      coverImage.startsWith("http")
                        ? coverImage
                        : `https://softgenie.org${coverImage}`
                    }
                    alt={item.images?.[0]?.caption || item.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[var(--tertiary)]/30 text-[var(--primary)]">
                    <FaCamera className="text-3xl opacity-40 text-[var(--accent)]" />
                  </div>
                )}

                {/* Photo Count Pill */}
                {totalImages > 0 && (
                  <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--background)]/80 backdrop-blur-md text-[var(--foreground)] text-[11px] font-semibold border border-[var(--primary)]/20 shadow-xs">
                    <FaImages className="text-[var(--accent)] text-xs" />
                    <span>{totalImages} {totalImages === 1 ? "Photo" : "Photos"}</span>
                  </div>
                )}
              </div>

              {/* Card Details */}
              <div className="p-6">
                {/* Category Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 bg-[var(--tertiary)]/40 text-[var(--foreground)] font-semibold rounded-md text-[11px] uppercase tracking-wider border border-[var(--primary)]/20"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h2 className="text-xl font-extrabold text-[var(--foreground)] tracking-tight mb-2 group-hover:text-[var(--accent)] transition-colors line-clamp-1">
                  {item.title}
                </h2>

                {/* Description Snippet */}
                <p className="text-sm text-[var(--primary)] leading-relaxed line-clamp-3 mb-4">
                  {getPlainTextSnippet(item.description, 160)}
                </p>
              </div>
            </div>

            {/* Card Action Link */}
            <div className="px-6 pb-6 pt-2 border-t border-[var(--primary)]/20 flex items-center justify-between">
              <Link
                href={`/gallery/${item.id}`}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[var(--foreground)] hover:text-[var(--accent)] transition-colors group/link"
              >
                <span>View Story</span>
                <FaArrowRight className="text-xs transition-transform duration-200 group-hover/link:translate-x-1" />
              </Link>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
};

export default GallerySection;