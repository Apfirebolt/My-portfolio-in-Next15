"use client";

import { motion } from "framer-motion";

const Hero = () => {
  return (
    <motion.div
      className="bg-black bg-opacity-50 p-6 rounded-lg text-center"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1 className="text-5xl font-bold mb-4">Welcome to my Portfolio</h1>
      <p className="text-lg mb-4">
        This is a showcase of my work, skills, and projects. Feel free to explore!
      </p>
      <p>
        Please check out the projects I've built, the places I've been to and the blog posts I've written.
      </p>
    </motion.div>
  );
};

export default Hero;
