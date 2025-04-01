import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary text-accent py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        <div className="bg-secondary p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Projects</h3>
          <p className="text-sm">
            Discover the projects I’ve worked on, including detailed
            descriptions and technologies used.
          </p>
        </div>

        <div className="bg-secondary p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Blog</h3>
          <p className="text-sm">
            Read my blog for insights, tutorials, and updates on topics I’m
            passionate about.
          </p>
        </div>

        <div className="bg-secondary p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Gallery</h3>
          <p className="text-sm">
            Browse through my gallery to see visual highlights of my work and
            experiences.
          </p>
        </div>
      </div>
      <div className="container mx-auto text-center mt-2 mb-4 rounded-lg py-4 shadow-lg">
        <p className="text-2xl font-bold">
          &copy; {new Date().getFullYear()} My Portfolio. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
