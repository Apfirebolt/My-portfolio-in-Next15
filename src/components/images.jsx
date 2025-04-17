"use client";

import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { motion } from "framer-motion";

const Images = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  if (!images || images.length === 0) {
    return <p>No images to display.</p>;
  }

  const openModal = (index) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const showNextImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const showPreviousImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={`https://softgenie.org${image.image}`}
              alt={`Image ${index + 1}`}
              className="w-full h-auto rounded-lg shadow-md cursor-pointer"
              onClick={() => openModal(index)}
            />
          </motion.div>
        ))}
      </div>

      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <button
            className="absolute left-4 text-white text-3xl"
            onClick={showPreviousImage}
          >
            <AiOutlineLeft />
          </button>
          <motion.img
            src={`https://softgenie.org${images[selectedImageIndex].image}`}
            alt="Selected"
            className="max-w-[90%] max-h-[90%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <button
            className="absolute right-4 text-white text-3xl"
            onClick={showNextImage}
          >
            <AiOutlineRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Images;
