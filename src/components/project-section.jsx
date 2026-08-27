"use client";

import React, { Fragment, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaCode, FaFolderOpen } from "react-icons/fa";
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
      delay: index * 0.1,
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
        <div className="p-4 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400 mb-4">
          <FaFolderOpen className="text-3xl" />
        </div>
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
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
            className="group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 hover:-translate-y-1.5"
          >
            {/* Top Content Block */}
            <div>
              {/* Category / Tags Header */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-medium rounded-md text-[11px] uppercase tracking-wider"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight mb-3 group-hover:text-primary transition-colors line-clamp-1">
                {project.title}
              </h2>

              {/* Tech Stack Badges */}
              {techList.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {techList.slice(0, 4).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-100/80 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 rounded-md text-xs font-medium border border-neutral-200/60 dark:border-neutral-700/60"
                    >
                      <FaCode className="text-[10px] text-neutral-400" />
                      {tech}
                    </span>
                  ))}
                  {techList.length > 4 && (
                    <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-400 rounded-md text-xs font-medium">
                      +{techList.length - 4}
                    </span>
                  )}
                </div>
              )}

              {/* Description Snippet */}
              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6 line-clamp-4">
                {getPlainTextSnippet(project.description, 220)}
              </p>
            </div>

            {/* Bottom Action Area */}
            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <Link
                href={`/projects/${project.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-800 text-white dark:text-accent text-xs sm:text-sm font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-700 transition-all duration-200 group/btn"
              >
                <span>View Project</span>
                <FaArrowRight className="text-xs transition-transform duration-200 group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
};

export default ProjectSection;