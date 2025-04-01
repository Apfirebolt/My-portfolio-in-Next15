"use client";

import React, { Fragment, useEffect } from "react";
import Link from "next/link";
import useStore from "@/store";

const ProjectSection = () => {
  const { posts, fetchPosts } = useStore();

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Fragment>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts?.results?.map((post, index) => (
          <div key={index} className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">{post.title}</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
                >
                  {tag.name}
                </span>
              ))}
            </div>
            <Link
              href={`/posts/${post.id}`}
              className="text-blue-500 hover:underline font-medium"
            >
              View Post
            </Link>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default ProjectSection;
