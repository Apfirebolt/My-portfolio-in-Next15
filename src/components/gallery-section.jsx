"use client";

import React, { Fragment, useEffect } from "react";
import Link from "next/link";
import Loader from "./loader";
import useStore from "@/store";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const GallerySection = () => {
  const { gallery, fetchGallery, isGalleryLoading } = useStore();

  useEffect(() => {
    if (!gallery || !gallery.results || gallery.results.length === 0) {
      fetchGallery();
    }
  }, [gallery, fetchGallery]);

  return (
    <Fragment>
      {isGalleryLoading && <Loader />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {gallery?.results?.map((gallery, index) => (
          <motion.div
            key={index}
            className="p-6 bg-white rounded-lg shadow-lg"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h2 className="text-2xl font-semibold mb-4">{gallery.title}</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {gallery.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
                >
                  {tag.name}
                </span>
              ))}
            </div>
            <Link
              href={`/gallery/${gallery.id}`}
              className="text-accent bg-secondary mx-auto px-3 py-2 rounded-lg hover:underline font-medium"
            >
              View Gallery
            </Link>
          </motion.div>
        ))}
      </div>
    </Fragment>
  );
};

export default GallerySection;
