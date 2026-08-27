"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaCode, FaCompass, FaPenFancy } from "react-icons/fa";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-20">
      {/* Background Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-accent/20 rounded-full blur-[120px] -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-1/4 w-[380px] h-[280px] bg-primary/25 rounded-full blur-[100px] -z-10"
      />

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Status Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 text-xs text-neutral-300 backdrop-blur-md shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for engineering & collaboration</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]"
          >
            Welcome to my{" "}
            <span className="bg-gradient-to-r from-accent via-amber-300 to-accent bg-clip-text text-transparent">
              Portfolio
            </span>
          </motion.h1>

          {/* Description Paragraphs */}
          <motion.div
            variants={itemVariants}
            className="space-y-3 text-base sm:text-xl text-neutral-300 max-w-2xl leading-relaxed mb-10"
          >
            <p className="font-normal text-neutral-200">
              This is a showcase of my work, skills, and projects. Feel free to explore!
            </p>
            <p className="text-sm sm:text-base text-neutral-400">
              Please check out the projects I've built, the places I've been to, and the blog posts I've written.
            </p>
          </motion.div>

          {/* Primary & Quick Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-neutral-950 font-semibold text-sm hover:bg-accent/90 transition-all duration-200 shadow-lg shadow-accent/10 hover:shadow-accent/20 hover:-translate-y-0.5 group"
            >
              <FaCode className="text-sm" />
              <span>Explore Projects</span>
              <FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-900/90 text-neutral-200 border border-neutral-800 text-sm font-medium hover:bg-neutral-800 hover:text-white transition-all duration-200 hover:-translate-y-0.5"
            >
              <FaCompass className="text-xs text-neutral-400" />
              <span>Travel & Gallery</span>
            </Link>

            <Link
              href="/posts"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-900/90 text-neutral-200 border border-neutral-800 text-sm font-medium hover:bg-neutral-800 hover:text-white transition-all duration-200 hover:-translate-y-0.5"
            >
              <FaPenFancy className="text-xs text-neutral-400" />
              <span>Read Articles</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;