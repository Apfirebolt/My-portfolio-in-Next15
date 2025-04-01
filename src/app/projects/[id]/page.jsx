import React, { Fragment } from "react";
import axios from "axios";
import parse from "html-react-parser";
import Header from "@/components/header-component";
import Footer from "@/components/Footer";

export async function generateMetadata({ params }) {
  const { id } = await params; // Await params here

  try {
    const response = await axios.get(
      `https://softgenie.org/api/projects/${id}`
    );
    const project = response.data;

    return {
      title: project.title,
      description: project.meta_description,
    };
  } catch (error) {
    console.error("Error fetching project metadata:", error);
    return {
      title: "Project Details",
      description: "Details about the project.",
    };
  }
}

const ProjectDetailPage = async ({ params }) => {
  const { id } = await params; // Await params here

  let project = null;

  try {
    const response = await axios.get(
      `https://softgenie.org/api/projects/${id}`
    );
    project = response.data;
  } catch (error) {
    console.error("Error fetching project details:", error);
    return (
      <Fragment>
        <Header />
        <div className="container mx-auto my-4">
          <h1 className="text-center text-2xl font-semibold text-red-500">
            Failed to load project details.
          </h1>
        </div>
        <Footer />
      </Fragment>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto my-4">
        <article className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold text-center mb-2">
            {project.title}
          </h1>
          <div className="flex justify-between items-center mb-4">
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
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}
          </div>
          {parse(project.description)}
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Details:</h3>
            <p className="text-gray-600 mt-2">
              Created On: {new Date(project.date_posted).toLocaleDateString()}
            </p>
            <p className="text-gray-600 mt-2">
              Updated On: {new Date(project.date_updated).toLocaleDateString()}
            </p>
            <p className="text-gray-600 mt-2">
              Github Link:{" "}
              <a
                href={project.project_link}
                className="text-blue-500 underline"
              >
                {project.project_link}
              </a>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            {project.images.map((image, index) => (
              <img
                key={index}
                src={`https://softgenie.org${image.image}`}
                alt={`Project Image ${index + 1}`}
                className="w-full h-auto rounded-lg shadow-md"
              />
            ))}
          </div>
        </article>
      </div>
      <Footer />
    </>
  );
};

export default ProjectDetailPage;
