"use client";

import { motion } from "framer-motion";
import React from "react";

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
        Whether you're a long-time fan or just starting your anime journey,
        Animix is here to provide you with all the information and resources you
        need.
      </p>
      <p className="text-lg">
        Thank you for visiting Animix. We hope you enjoy exploring the
        fascinating world of anime with us!
      </p>
    </motion.div>
  );
};

export default Hero;
