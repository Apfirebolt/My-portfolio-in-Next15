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
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-20 text-[var(--foreground)]">
      {/* Background Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-[var(--accent)]/15 rounded-full blur-[120px] -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-1/4 w-[380px] h-[280px] bg-[var(--primary)]/20 rounded-full blur-[100px] -z-10"
      />

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[var(--foreground)] mb-6 leading-[1.1]"
          >
            Welcome to my{" "}
            <span className="text-[var(--accent)]">
              Portfolio
            </span>
          </motion.h1>

          {/* Description Paragraphs */}
          <motion.div
            variants={itemVariants}
            className="space-y-3 text-base sm:text-xl text-[var(--primary)] max-w-2xl leading-relaxed mb-10"
          >
            <p className="font-medium text-[var(--foreground)] opacity-90">
              This is a showcase of my work, skills, and projects. Feel free to explore!
            </p>
            <p className="text-sm sm:text-base text-[var(--primary)]">
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
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--accent)] text-[var(--background)] font-semibold text-sm hover:opacity-90 transition-all duration-200 shadow-md hover:-translate-y-0.5 group cursor-pointer"
            >
              <FaCode className="text-sm" />
              <span>Explore Projects</span>
              <FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[var(--tertiary)]/20 text-[var(--foreground)] border border-[var(--primary)]/25 text-sm font-semibold hover:bg-[var(--tertiary)]/40 hover:border-[var(--accent)]/50 transition-all duration-200 hover:-translate-y-0.5 backdrop-blur-md cursor-pointer"
            >
              <FaCompass className="text-xs text-[var(--accent)]" />
              <span>Travel & Gallery</span>
            </Link>

            <Link
              href="/posts"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[var(--tertiary)]/20 text-[var(--foreground)] border border-[var(--primary)]/25 text-sm font-semibold hover:bg-[var(--tertiary)]/40 hover:border-[var(--accent)]/50 transition-all duration-200 hover:-translate-y-0.5 backdrop-blur-md cursor-pointer"
            >
              <FaPenFancy className="text-xs text-[var(--accent)]" />
              <span>Read Articles</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;