"use client";

import { MediaPostRequest } from "@api";
import {
  faAngleLeft,
  faAngleRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

interface ModalGalleryProps {
  images: MediaPostRequest[];
  onClose: () => void;
  selectedImageUrl?: string;
}

const ModalGallery = ({
  images,
  onClose,
  selectedImageUrl,
}: ModalGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (selectedImageUrl) {
      const initialIndex = images.findIndex(
        (img) => img.url === selectedImageUrl,
      );
      if (initialIndex !== -1) {
        setCurrentIndex(initialIndex);
      } else {
        setCurrentIndex(0);
      }
    }
  }, [selectedImageUrl, images]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="relative flex justify-center items-center w-full h-full p-4 rounded-lg">
        <button
          className="absolute flex gap-2 top-4 right-4 text-white text-2xl"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faXmark} />
          <span className="text-base font-medium">Fechar</span>
        </button>
        <div className="flex absolute justify-center items-center">
          <img
            src={images[currentIndex].url || ""}
            alt="Selected"
            width={800}
            height={600}
            className="rounded-lg shadow-lg max-w-full max-h-[85vh] object-contain"
          />
        </div>
        <div className="flex w-full justify-between items-center mb-4">
          <button
            className="flex items-center justify-center text-white text-3xl border-solid border-4 rounded-full p-4 w-12 h-12 aspect-square border-white hover:bg-white hover:bg-opacity-30"
            onClick={handlePrev}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button
            className="flex items-center justify-center text-white text-3xl border-solid border-4 rounded-full p-4 w-12 h-12 aspect-square border-white hover:bg-white hover:bg-opacity-30"
            onClick={handleNext}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalGallery;
