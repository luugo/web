"use client";

import { MediaPostRequest } from "@api";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface modalGallery {
  images: Array<MediaPostRequest>;
  onClose: () => void;
}

const modalGallery = ({ images, onClose }: modalGallery) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="relative flex items-center justify-center w-full h-full p-4">
        <button
          className="absolute top-4 right-4 text-white text-2xl"
          onClick={onClose}
        >
          ✕
        </button>
        <button
          className="absolute left-6 text-white text-3xl p-2 bg-black bg-opacity-50 rounded-full z-20"
          onClick={handlePrev}
        >
          ◀
        </button>
        <div className="relative w-[80vw] h-[80vh] flex items-center justify-center overflow-hidden">
          <AnimatePresence>
            {images.map((image, index) => {
              const position =
                index === currentIndex
                  ? "center"
                  : index === (currentIndex - 1 + images.length) % images.length
                  ? "left"
                  : index === (currentIndex + 1) % images.length
                  ? "right"
                  : "hidden";

              return (
                <motion.div
                  key={index}
                  initial={{
                    opacity: position === "center" ? 1 : 0.5,
                    scale: position === "center" ? 1 : 0.8,
                    x:
                      position === "left"
                        ? -220
                        : position === "right"
                        ? 220
                        : 0,
                  }}
                  animate={{
                    opacity: position === "center" ? 1 : 0.5,
                    scale: position === "center" ? 1 : 0.8,
                    x:
                      position === "left"
                        ? -220
                        : position === "right"
                        ? 220
                        : 0,
                  }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute ${
                    position === "center"
                      ? "z-20 w-[60%] h-[60%]"
                      : "z-10 w-[30%] h-[30%]"
                  } flex items-center justify-center`}
                >
                  <Image
                    src={image.url || ""}
                    alt="Modal Image"
                    layout="intrinsic"
                    width={position === "center" ? 600 : 300}
                    height={position === "center" ? 400 : 200}
                    objectFit="contain"
                    className="rounded-lg shadow-lg"
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        <button
          className="absolute right-6 text-white text-3xl p-2 bg-black bg-opacity-50 rounded-full z-20"
          onClick={handleNext}
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default modalGallery;
