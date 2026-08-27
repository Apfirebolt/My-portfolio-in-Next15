"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowRight, FaCamera, FaImages } from "react-icons/fa";
import useStore from "@/store";
import Loader from "./loader";

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
        <div className="p-4 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 mb-4">
          <FaCamera className="text-3xl text-accent/80" />
        </div>
        <h3 className="text-lg font-semibold text-neutral-200">
          No gallery posts available
        </h3>
        <p className="text-sm text-neutral-500 max-w-sm mt-1">
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
            className="group flex flex-col justify-between overflow-hidden rounded-2xl bg-neutral-900/80 border border-neutral-800 shadow-sm hover:shadow-2xl hover:border-neutral-700 transition-all duration-300 hover:-translate-y-1.5"
          >
            <div>
              {/* Cover Photo Header */}
              <div className="relative w-full h-52 sm:h-56 bg-neutral-950 overflow-hidden border-b border-neutral-800">
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
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-900 to-black text-neutral-600">
                    <FaCamera className="text-3xl opacity-40" />
                  </div>
                )}

                {/* Photo Count Pill */}
                {totalImages > 0 && (
                  <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-medium border border-white/10">
                    <FaImages className="text-accent text-xs" />
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
                        className="px-2.5 py-0.5 bg-neutral-800 text-neutral-300 font-medium rounded-md text-[11px] uppercase tracking-wider"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h2 className="text-xl font-bold text-white tracking-tight mb-2 group-hover:text-accent transition-colors line-clamp-1">
                  {item.title}
                </h2>

                {/* Description Snippet */}
                <p className="text-sm text-neutral-400 leading-relaxed line-clamp-3 mb-4">
                  {getPlainTextSnippet(item.description, 160)}
                </p>
              </div>
            </div>

            {/* Card Action Link */}
            <div className="px-6 pb-6 pt-2 border-t border-neutral-800/80 flex items-center justify-between">
              <Link
                href={`/gallery/${item.id}`}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-200 hover:text-accent transition-colors group/link"
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