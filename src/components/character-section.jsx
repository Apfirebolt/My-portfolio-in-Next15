"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CharacterCard from "./character-card";
import Loader from "./loader";
import axiosInstance from "@/plugins/interceptor";

const CharacterSection = ({ characters }) => {
  const [characterList, setCharacterList] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isClient, setIsClient] = useState(false);

  const fetchCharacterData = async (link) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(link);
      setCharacterList(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching character data:", error);
      setLoading(false);
    }
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
    fetchCharacterData(characterList.links.next);
  };

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
    fetchCharacterData(characterList.links.prev);
  };

  useEffect(() => {
    setIsClient(true);
    if (characters) {
      setCharacterList(characters);
      setLoading(false);
    }
  }, []);

  return (
    <div>
      {loading && <Loader />}
      {!loading && characterList?.data?.length > 0 ? (
        <div>
          <div className="flex justify-center my-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={currentPage === 1}
              onClick={goToPreviousPage}
            >
              Prev
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={goToNextPage}
            >
              Next
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {characterList.data.map((characterItem) => (
              <motion.div
                key={characterItem.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <CharacterCard character={characterItem} />
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CharacterSection;
