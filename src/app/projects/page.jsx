import React, { Fragment } from "react";
import Header from "@/components/header-component";
import Footer from "@/components/footer";
import ProjectSection from "@/components/project-section";

export const metadata = {
  title: "Projects Page",
  description: "Showcasing my latest projects and work.",
};

const ProjectsPage = () => {

  return (
    <Fragment>
      <Header />
      <main className="min-h-screen bg-gray-100 py-10">
        <section className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center bg-primary py-4 text-accent">Projects</h1>
          <section
            className="relative bg-cover bg-center h-64 flex items-center justify-center text-white"
            style={{ backgroundImage: "url('https://images.ctfassets.net/2htm8llflwdx/1LEJIT9KGRC4nwTJ5vuS6H/a912e31c468fd32986f2818816135cc4/OnlineLearning_SouthAsia_Learning_Indoor_GettyImages-1071652068.jpg')" }}
          >
            <div className="bg-black bg-opacity-50 p-6 rounded">
              <h2 className="text-3xl font-bold">Welcome to My Projects</h2>
              <p className="mt-2 text-lg">Explore my latest work and creations.</p>
            </div>
          </section>
          <ProjectSection />
        </section>
      </main>
      <Footer />
    </Fragment>
  );
};

export default ProjectsPage;
