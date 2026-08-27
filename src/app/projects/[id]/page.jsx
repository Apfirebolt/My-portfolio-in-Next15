import React, { Fragment } from "react";
import axios from "axios";
import parse from "html-react-parser";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt, FaCalendarAlt, FaCode } from "react-icons/fa";
import Header from "@/components/header-component";
import ImageComponent from "@/components/images";
import Footer from "@/components/footer";

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const response = await axios.get(
      `https://softgenie.org/api/projects/${id}`
    );
    const project = response.data;

    return {
      title: `${project.title} | Projects`,
      description: project.meta_description || "Detailed overview of the project architecture, features, and source code.",
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
  const { id } = await params;

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
        <main className="min-h-[70vh] flex items-center justify-center pt-24 pb-12 px-4 bg-neutral-50/50">
          <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl border border-neutral-200/80 shadow-sm">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-50 text-rose-500 mb-4 font-bold text-xl">
              !
            </div>
            <h1 className="text-xl font-bold text-neutral-900 mb-2">
              Failed to load project details
            </h1>
            <p className="text-sm text-neutral-500 mb-6">
              The project you are looking for might have been moved, deleted, or is temporarily unavailable.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors"
            >
              &larr; Back to Projects
            </Link>
          </div>
        </main>
        <Footer />
      </Fragment>
    );
  }

  const techList = project.technology
    ? project.technology.split(",").map((tech) => tech.trim()).filter(Boolean)
    : [];

  const formattedCreatedDate = project.date_posted
    ? new Date(project.date_posted).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  const formattedUpdatedDate = project.date_updated
    ? new Date(project.date_updated).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <Fragment>
      <Header />
      <main className="min-h-screen pt-24 pb-16 bg-neutral-50/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav className="mb-6 flex items-center text-xs sm:text-sm text-neutral-400 space-x-2">
            <Link href="/" className="hover:text-neutral-700 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-neutral-700 transition-colors">
              Projects
            </Link>
            <span>/</span>
            <span className="text-neutral-600 font-medium truncate max-w-[200px] sm:max-w-xs">
              {project.title}
            </span>
          </nav>

          {/* Article Container */}
          <article className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden p-6 sm:p-10">
            
            {/* Header Section */}
            <header className="border-b border-neutral-100 pb-8 mb-8">
              
              {/* Category / Project Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-0.5 bg-neutral-100 text-neutral-700 font-medium rounded-full text-xs tracking-wide uppercase"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight mb-4">
                {project.title}
              </h1>

              {/* Tech Stack Pills */}
              {techList.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 uppercase tracking-wider mr-1">
                    <FaCode className="text-xs" /> Stack:
                  </span>
                  {techList.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-neutral-100/80 text-neutral-800 rounded-md text-xs font-medium border border-neutral-200/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Project Quick Overview / Meta Card */}
            <div className="bg-neutral-50/80 rounded-xl border border-neutral-200/70 p-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5 text-xs sm:text-sm text-neutral-600">
                {formattedCreatedDate && (
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-neutral-400 text-xs" />
                    <span><strong className="text-neutral-800">Created:</strong> {formattedCreatedDate}</span>
                  </div>
                )}
                {formattedUpdatedDate && (
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-neutral-400 text-xs" />
                    <span><strong className="text-neutral-800">Last Updated:</strong> {formattedUpdatedDate}</span>
                  </div>
                )}
              </div>

              {/* GitHub Repository CTA Button */}
              {project.project_link && (
                <a
                  href={project.project_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-900 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-neutral-800 transition-colors shadow-xs group"
                >
                  <FaGithub className="text-base" />
                  <span>View Repository</span>
                  <FaExternalLinkAlt className="text-xs opacity-70 group-hover:translate-x-0.5 transition-transform" />
                </a>
              )}
            </div>

            {/* Description Body */}
            {project.description && (
              <div className="prose prose-neutral max-w-none text-neutral-700 leading-relaxed space-y-4 mb-10">
                {parse(project.description)}
              </div>
            )}

            {/* Media / Screenshots Section */}
            <section className="pt-8 border-t border-neutral-100">
              <h2 className="text-lg font-bold text-neutral-900 mb-4">
                Screenshots & Previews
              </h2>
              {project.images && project.images.length > 0 ? (
                <div className="w-full">
                  <ImageComponent images={project.images} />
                </div>
              ) : (
                <div className="p-8 text-center bg-neutral-50 rounded-xl border border-dashed border-neutral-200">
                  <p className="text-sm text-neutral-500">
                    No preview images available for this project.
                  </p>
                </div>
              )}
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </Fragment>
  );
};

export default ProjectDetailPage;