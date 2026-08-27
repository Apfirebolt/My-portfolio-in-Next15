"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowRight, FaCode, FaFolderOpen, FaGithub, FaEye } from "react-icons/fa";
import useStore from "@/store";
import Loader from "./loader";

// Safely strip HTML tags to avoid breaking markup during truncation
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
      delay: index * 0.08,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  }),
};

const ProjectSection = () => {
  const { projects, fetchProjects, isProjectLoading } = useStore();

  useEffect(() => {
    if (!projects?.results?.length && fetchProjects) {
      fetchProjects();
    }
  }, [projects, fetchProjects]);

  if (isProjectLoading) {
    return <Loader message="Fetching projects..." />;
  }

  const projectList = projects?.results || [];

  if (!projectList.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="p-4 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 mb-4">
          <FaFolderOpen className="text-3xl text-accent/80" />
        </div>
        <h3 className="text-lg font-semibold text-neutral-200">
          No projects available
        </h3>
        <p className="text-sm text-neutral-500 max-w-sm mt-1">
          Check back soon for upcoming project releases and case studies.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch py-6">
      {projectList.map((project, index) => {
        const coverImage = project.images?.[0]?.image;
        const techList = project.technology
          ? project.technology.split(",").map((tech) => tech.trim()).filter(Boolean)
          : [];

        return (
          <motion.article
            key={project.id || index}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-neutral-900/80 border border-neutral-800 shadow-sm hover:shadow-2xl hover:border-neutral-700 transition-all duration-300 hover:-translate-y-1.5"
          >
            <div>
              {/* Cover Image Thumbnail / Fallback Banner */}
              <div className="relative w-full h-48 sm:h-52 bg-neutral-950 overflow-hidden border-b border-neutral-800">
                {coverImage ? (
                  <Image
                    src={
                      coverImage.startsWith("http")
                        ? coverImage
                        : `https://softgenie.org${coverImage}`
                    }
                    alt={project.images?.[0]?.caption || project.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-900 to-black text-neutral-600">
                    <FaCode className="text-3xl opacity-40" />
                  </div>
                )}

                {/* View Count Badge */}
                {typeof project.views !== "undefined" && (
                  <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-medium border border-white/10">
                    <FaEye className="text-accent text-xs" />
                    <span>{project.views}</span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6">
                {/* Category Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 bg-neutral-800 text-neutral-300 font-medium rounded-md text-[11px] uppercase tracking-wider"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Project Title */}
                <h2 className="text-xl font-bold text-white tracking-tight mb-3 group-hover:text-accent transition-colors line-clamp-1">
                  {project.title}
                </h2>

                {/* Tech Stack Badges */}
                {techList.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {techList.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-800/80 text-neutral-300 rounded-md text-xs font-medium border border-neutral-700/60"
                      >
                        <FaCode className="text-[10px] text-accent" />
                        {tech}
                      </span>
                    ))}
                    {techList.length > 4 && (
                      <span className="px-2 py-1 bg-neutral-800 text-neutral-400 rounded-md text-xs font-medium">
                        +{techList.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* Description Snippet */}
                <p className="text-sm text-neutral-400 leading-relaxed line-clamp-3 mb-4">
                  {getPlainTextSnippet(project.description, 160)}
                </p>
              </div>
            </div>

            {/* Bottom Actions Area */}
            <div className="px-6 pb-6 pt-3 border-t border-neutral-800/80 flex items-center justify-between">
              <Link
                href={`/projects/${project.id}`}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-200 hover:text-accent transition-colors group/link"
              >
                <span>View Details</span>
                <FaArrowRight className="text-xs transition-transform duration-200 group-hover/link:translate-x-1" />
              </Link>

              {project.project_link && (
                <a
                  href={project.project_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View source repository"
                  className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                >
                  <FaGithub className="text-lg" />
                </a>
              )}
            </div>
          </motion.article>
        );
      })}
    </div>
  );
};

export default ProjectSection;