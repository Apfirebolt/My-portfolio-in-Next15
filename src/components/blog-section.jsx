"use client";

import React, { Fragment, useEffect } from "react";
import parse from "html-react-parser";
import Link from "next/link";
import useStore from "@/store";
import Loader from "./loader";
import { motion } from "framer-motion";

const ProjectSection = () => {
  const { posts, fetchPosts, isPostLoading } = useStore();

  useEffect(() => {
    if (!posts?.results?.length) {
      fetchPosts();
    }
  }, [posts]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Fragment>
      {isPostLoading && <Loader />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts?.results?.map((post, index) => (
          <motion.div
            key={index}
            className="post-card p-6 bg-white rounded-lg shadow-lg"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: index * 0.2, ease: "easeOut" }}
          >
            <h2 className="text-2xl font-semibold mb-4">{post.title}</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
                >
                  {tag.name}
                </span>
              ))}
            </div>
            <div className="text-gray-700 mb-4">
              {parse(post.content.substring(0, 300) +  "...")}
            </div>
            <Link
              href={`/posts/${post.id}`}
              className="text-accent bg-secondary mx-auto px-3 py-2 rounded-lg hover:underline font-medium"
            >
              View Post
            </Link>
          </motion.div>
        ))}
      </div>
    </Fragment>
  );
};

export default ProjectSection;
