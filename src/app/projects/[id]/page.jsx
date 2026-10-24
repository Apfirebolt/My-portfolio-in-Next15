import React from "react";
import httpClient from "@/plugins/interceptor";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectDetailClient from "@/components/ProjectDetailClient";

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const response = await httpClient.get(
      `projects/${id}`
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
  let fetchError = false;

  try {
    const response = await httpClient.get(
      `projects/${id}`
    );
    project = response.data;
  } catch (error) {
    console.error("Error fetching project details:", error);
    fetchError = true;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--accent)] selection:text-[var(--background)] transition-colors duration-300">
      <Header />
      <main className="flex-1">
        <ProjectDetailClient project={project} error={fetchError} />
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetailPage;