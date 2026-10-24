"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowRight, FaCode, FaFolderOpen, FaGithub, FaEye } from "react-icons/fa";
import useStore from "@/store";
import Loader from "@/components/Loader";

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
        <div className="p-4 rounded-full bg-[var(--tertiary)]/20 border border-[var(--primary)]/20 text-[var(--accent)] mb-4">
          <FaFolderOpen className="text-3xl text-[var(--accent)]" />
        </div>
        <h3 className="text-lg font-bold text-[var(--foreground)]">
          No projects available
        </h3>
        <p className="text-sm text-[var(--primary)] max-w-sm mt-1">
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
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[var(--tertiary)]/15 border border-[var(--primary)]/20 shadow-lg hover:shadow-2xl hover:border-[var(--accent)]/50 transition-all duration-300 hover:-translate-y-1.5 backdrop-blur-md"
          >
            <div>
              {/* Cover Image Thumbnail / Fallback Banner */}
              <div className="relative w-full h-48 sm:h-52 bg-[var(--background)] overflow-hidden border-b border-[var(--primary)]/20">
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
                  <div className="w-full h-full flex items-center justify-center bg-[var(--tertiary)]/30 text-[var(--primary)]">
                    <FaCode className="text-3xl opacity-40 text-[var(--accent)]" />
                  </div>
                )}

                {/* View Count Badge */}
                {typeof project.views !== "undefined" && (
                  <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--background)]/80 backdrop-blur-md text-[var(--foreground)] text-[11px] font-semibold border border-[var(--primary)]/20 shadow-xs">
                    <FaEye className="text-[var(--accent)] text-xs" />
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
                        className="px-2.5 py-0.5 bg-[var(--tertiary)]/40 text-[var(--foreground)] font-semibold rounded-md text-[11px] uppercase tracking-wider border border-[var(--primary)]/20"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Project Title */}
                <h2 className="text-xl font-extrabold text-[var(--foreground)] tracking-tight mb-3 group-hover:text-[var(--accent)] transition-colors line-clamp-1">
                  {project.title}
                </h2>

                {/* Tech Stack Badges */}
                {techList.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {techList.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-[var(--background)]/80 text-[var(--foreground)] rounded-lg text-xs font-medium border border-[var(--primary)]/20 shadow-xs"
                      >
                        <FaCode className="text-[10px] text-[var(--accent)]" />
                        {tech}
                      </span>
                    ))}
                    {techList.length > 4 && (
                      <span className="px-2 py-1 bg-[var(--background)]/80 text-[var(--primary)] rounded-lg text-xs font-medium border border-[var(--primary)]/20">
                        +{techList.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* Description Snippet */}
                <p className="text-sm text-[var(--primary)] leading-relaxed line-clamp-3 mb-4">
                  {getPlainTextSnippet(project.description, 160)}
                </p>
              </div>
            </div>

            {/* Bottom Actions Area */}
            <div className="px-6 pb-6 pt-3 border-t border-[var(--primary)]/20 flex items-center justify-between">
              <Link
                href={`/projects/${project.id}`}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--foreground)] hover:text-[var(--accent)] transition-colors group/link"
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
                  className="p-2.5 rounded-xl text-[var(--primary)] hover:text-[var(--accent)] hover:bg-[var(--tertiary)]/30 border border-transparent hover:border-[var(--primary)]/20 transition-all"
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