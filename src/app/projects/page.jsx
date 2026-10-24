import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectSection from "@/components/Project";
import { FaCode } from "react-icons/fa";

export const metadata = {
  title: "Projects | APGIIIT",
  description: "Explore my latest software engineering projects, web applications, open-source work, and technical architecture.",
};

const ProjectsPage = () => {
  return (
    <Fragment>
      <Header />
      <main className="min-h-screen pt-28 pb-20 bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--accent)] selection:text-[var(--background)] transition-colors duration-300">
        
        {/* Hero Section Banner */}
        <section className="relative w-full overflow-hidden border-b border-[var(--primary)]/20 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          
          {/* Background Image with Next.js Image */}
          <div className="absolute inset-0 -z-20">
            <Image
              src="https://images.ctfassets.net/2htm8llflwdx/1LEJIT9KGRC4nwTJ5vuS6H/a912e31c468fd32986f2818816135cc4/OnlineLearning_SouthAsia_Learning_Indoor_GettyImages-1071652068.jpg"
              alt="Projects Banner Background"
              fill
              priority
              quality={80}
              className="object-cover object-center opacity-20 filter blur-[1px] scale-105"
            />
          </div>

          {/* Ambient Glows & Gradient Mask */}
          <div 
            aria-hidden="true" 
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[var(--accent)]/15 rounded-full blur-[120px] -z-10" 
          />
          <div 
            aria-hidden="true" 
            className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--background)]/80 via-[var(--background)]/90 to-[var(--background)]" 
          />

          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center text-xs sm:text-sm text-[var(--primary)] space-x-2">
              <Link href="/" className="hover:text-[var(--accent)] transition-colors">
                Home
              </Link>
              <span className="opacity-60">/</span>
              <span className="text-[var(--accent)] font-medium">Projects</span>
            </nav>

            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--tertiary)]/20 border border-[var(--primary)]/20 text-xs font-medium text-[var(--foreground)] mb-4 backdrop-blur-md shadow-xs">
                <FaCode className="text-[var(--accent)] text-xs" />
                <span>Portfolio & Projects</span>
              </div>

              {/* Title & Tagline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[var(--foreground)] mb-4 leading-tight">
                Featured <span className="text-[var(--accent)]">Projects</span>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-[var(--primary)] leading-relaxed max-w-2xl">
                List of projects I worked on through my career and personal endeavors. These include mostly full-stack projects, some desktop apps
                and AI applications as well.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <ProjectSection />
        </section>
      </main>
      <Footer />
    </Fragment>
  );
};

export default ProjectsPage;