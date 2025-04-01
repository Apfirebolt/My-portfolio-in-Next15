"use client";

import React, { Fragment, useEffect } from "react";
import useStore from "@/store";

const ProjectSection = () => {
  const { projects, fetchProjects } = useStore();

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Fragment>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects?.results?.map((project, index) => (
          <div key={index} className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">{project.title}</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technology.split(",").map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
            <a
              href={project.project_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline font-medium"
            >
              View Project
            </a>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default ProjectSection;
