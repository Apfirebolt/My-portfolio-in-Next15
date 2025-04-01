import React, { Fragment } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata = {
  title: "Projects Page",
  description: "Showcasing my latest projects and work.",
};

const ProjectsPage = () => {
  const projects = [
    {
      title: "Portfolio Website",
      description:
        "A personal portfolio website built with Next.js and Tailwind CSS.",
      link: "https://github.com/yourusername/portfolio-website",
    },
    {
      title: "E-commerce Platform",
      description:
        "A full-stack e-commerce platform with React, Node.js, and MongoDB.",
      link: "https://github.com/yourusername/ecommerce-platform",
    },
    {
      title: "Weather App",
      description: "A weather forecasting app using OpenWeather API and React.",
      link: "https://github.com/yourusername/weather-app",
    },
    {
      title: "Task Manager",
      description:
        "A task management app with drag-and-drop functionality using React and Redux.",
      link: "https://github.com/yourusername/task-manager",
    },
  ];

  return (
    <Fragment>
      <Header />
      <main className="min-h-screen bg-gray-100 py-10">
        <section className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">Projects</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">{project.title}</h2>
                <p className="text-gray-700 mb-4">{project.description}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline font-medium"
                >
                  View Project
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </Fragment>
  );
};

export default ProjectsPage;
