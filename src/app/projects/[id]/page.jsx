import React, { Fragment } from "react";
import axios from "axios";
import parse from "html-react-parser";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt, FaCalendarAlt, FaCode } from "react-icons/fa";
import Header from "@/components/Header";
import ImageComponent from "@/components/Images";
import Footer from "@/components/Footer";

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
        <main className="min-h-[70vh] flex items-center justify-center pt-28 pb-16 px-4 bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
          <div className="max-w-md w-full text-center bg-[var(--tertiary)]/20 p-8 rounded-2xl border border-[var(--primary)]/25 shadow-xl backdrop-blur-md">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] mb-4 font-bold text-2xl border border-[var(--accent)]/30">
              !
            </div>
            <h1 className="text-xl font-extrabold text-[var(--foreground)] mb-2 tracking-tight">
              Failed to load project details
            </h1>
            <p className="text-sm text-[var(--primary)] mb-6 leading-relaxed">
              The project you are looking for might have been moved, deleted, or is temporarily unavailable.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-[var(--background)] bg-[var(--accent)] hover:opacity-90 rounded-xl transition-all shadow-sm"
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
      <main className="min-h-screen pt-28 pb-20 bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav className="mb-6 flex items-center text-xs sm:text-sm text-[var(--primary)] space-x-2">
            <Link href="/" className="hover:text-[var(--accent)] transition-colors">
              Home
            </Link>
            <span className="opacity-60">/</span>
            <Link href="/projects" className="hover:text-[var(--accent)] transition-colors">
              Projects
            </Link>
            <span className="opacity-60">/</span>
            <span className="text-[var(--foreground)] font-medium truncate max-w-[200px] sm:max-w-xs">
              {project.title}
            </span>
          </nav>

          {/* Article Container */}
          <article className="bg-[var(--tertiary)]/15 rounded-3xl border border-[var(--primary)]/20 shadow-lg backdrop-blur-md overflow-hidden p-6 sm:p-12">
            
            {/* Header Section */}
            <header className="border-b border-[var(--primary)]/20 pb-8 mb-8">
              
              {/* Category / Project Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3.5 py-1 bg-[var(--tertiary)]/40 border border-[var(--primary)]/20 text-[var(--foreground)] font-semibold rounded-full text-xs tracking-wider uppercase"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl font-black text-[var(--foreground)] tracking-tight leading-tight mb-5">
                {project.title}
              </h1>

              {/* Tech Stack Pills */}
              {techList.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)] uppercase tracking-wider mr-1">
                    <FaCode className="text-xs" /> Stack:
                  </span>
                  {techList.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[var(--background)]/80 text-[var(--foreground)] rounded-lg text-xs font-medium border border-[var(--primary)]/20 shadow-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Project Quick Overview / Meta Card */}
            <div className="bg-[var(--background)]/60 rounded-2xl border border-[var(--primary)]/20 p-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5 text-xs sm:text-sm text-[var(--primary)]">
                {formattedCreatedDate && (
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-[var(--accent)] text-xs" />
                    <span><strong className="text-[var(--foreground)]">Created:</strong> {formattedCreatedDate}</span>
                  </div>
                )}
                {formattedUpdatedDate && (
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-[var(--accent)] text-xs" />
                    <span><strong className="text-[var(--foreground)]">Last Updated:</strong> {formattedUpdatedDate}</span>
                  </div>
                )}
              </div>

              {/* GitHub Repository CTA Button */}
              {project.project_link && (
                <a
                  href={project.project_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-[var(--background)] rounded-xl text-xs sm:text-sm font-semibold hover:opacity-90 transition-all shadow-sm group"
                >
                  <FaGithub className="text-base" />
                  <span>View Repository</span>
                  <FaExternalLinkAlt className="text-xs opacity-70 group-hover:translate-x-0.5 transition-transform" />
                </a>
              )}
            </div>

            {/* Description Body */}
            {project.description && (
              <div className="prose max-w-none text-[var(--primary)] leading-relaxed space-y-4 mb-12 [&>p]:text-[var(--primary)] [&>h2]:text-[var(--foreground)] [&>h3]:text-[var(--foreground)]">
                {parse(project.description)}
              </div>
            )}

            {/* Media / Screenshots Section */}
            <section className="pt-8 border-t border-[var(--primary)]/20">
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)]"></span>
                Screenshots & Previews
              </h2>
              {project.images && project.images.length > 0 ? (
                <div className="w-full">
                  <ImageComponent images={project.images} />
                </div>
              ) : (
                <div className="p-10 text-center bg-[var(--background)]/50 rounded-2xl border border-dashed border-[var(--primary)]/30">
                  <p className="text-sm text-[var(--primary)]">
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