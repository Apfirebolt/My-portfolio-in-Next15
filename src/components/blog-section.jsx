"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaGithub, FaEye, FaArrowRight, FaCode } from "react-icons/fa";
import useStore from "@/store";
import Loader from "./loader";

// Helper to strip HTML tags safely for the card snippet preview
const getPlainTextSnippet = (htmlString, maxLength = 160) => {
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
      delay: index * 0.1,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  }),
};

const ProjectSection = () => {
  const { posts, fetchPosts, isPostLoading } = useStore();

  useEffect(() => {
    if (!posts?.results?.length && fetchPosts) {
      fetchPosts();
    }
  }, [posts, fetchPosts]);

  if (isPostLoading) {
    return <Loader message="Loading projects..." />;
  }

  const projectList = posts?.results || [];

  if (!projectList.length) {
    return (
      <div className="text-center py-16 px-4">
        <p className="text-neutral-500 text-sm sm:text-base">No projects found.</p>
      </div>
    );
  }

  return (
    <section className="w-full py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {projectList.map((project, index) => {
          const featuredImage = project.images?.[0]?.image;
          const techList = project.technology
            ? project.technology.split(",").map((t) => t.trim()).filter(Boolean)
            : [];

          return (
            <motion.article
              key={project.id || index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl bg-white border border-neutral-200/80 shadow-sm hover:shadow-xl hover:border-neutral-300 transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Project Image Preview / Banner */}
                <div className="relative w-full h-48 sm:h-52 bg-neutral-100 overflow-hidden border-b border-neutral-100">
                  {featuredImage ? (
                    <Image
                      src={
                        featuredImage.startsWith("http")
                          ? featuredImage
                          : `https://softgenie.org${featuredImage}`
                      }
                      alt={project.images?.[0]?.caption || project.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-950 text-neutral-400">
                      <FaCode className="text-3xl opacity-40" />
                    </div>
                  )}

                  {/* Views Badge */}
                  {typeof project.views !== "undefined" && (
                    <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium">
                      <FaEye className="text-neutral-300 text-xs" />
                      <span>{project.views}</span>
                    </div>
                  )}
                </div>

                {/* Card Content Area */}
                <div className="p-6">
                  {/* Category Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 bg-neutral-100 text-neutral-600 font-medium rounded-md text-[11px] uppercase tracking-wider"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-xl font-bold text-neutral-900 tracking-tight mb-2 group-hover:text-accent transition-colors line-clamp-1">
                    {project.title}
                  </h3>

                  {/* Plain Text Clean Snippet */}
                  <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3 mb-4">
                    {getPlainTextSnippet(project.description, 150)}
                  </p>

                  {/* Tech Stack Pills */}
                  {techList.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {techList.slice(0, 4).map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          className="px-2 py-0.5 bg-neutral-50 text-neutral-700 border border-neutral-200/70 rounded text-xs font-normal"
                        >
                          {tech}
                        </span>
                      ))}
                      {techList.length > 4 && (
                        <span className="px-1.5 py-0.5 text-xs text-neutral-400">
                          +{techList.length - 4}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-neutral-100 mt-2">
                <Link
                  href={`/projects/${project.id}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 hover:text-accent transition-colors group/link"
                >
                  <span>Details</span>
                  <FaArrowRight className="text-xs transition-transform group-hover/link:translate-x-1" />
                </Link>

                {project.project_link && (
                  <a
                    href={project.project_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View source on GitHub"
                    className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-all"
                  >
                    <FaGithub className="text-lg" />
                  </a>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectSection;