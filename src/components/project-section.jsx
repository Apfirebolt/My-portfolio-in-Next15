"use client";

import React, { Fragment, useEffect } from "react";
import Loader from "./loader";
import Link from "next/link";
import useStore from "@/store";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const ProjectSection = () => {
  const { projects, fetchProjects, isProjectLoading } = useStore();

  useEffect(() => {
    if (!projects?.results?.length) {
      fetchProjects();
    }
  }, [projects]);

  return (
    <Fragment>
      {isProjectLoading && <Loader />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects?.results?.map((project, index) => (
          <motion.div
            key={index}
            className="p-6 bg-white rounded-lg shadow-lg"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-4">{project.title}</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technology.split(",").map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
            <Link
              href={`/projects/${project.id}`}
              className="text-accent bg-secondary mx-auto px-3 py-2 rounded-lg hover:underline font-medium"
            >
              View Project
            </Link>
          </motion.div>
        ))}
      </div>
    </Fragment>
  );
};

export default ProjectSection;
