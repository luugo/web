"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ModalGallery from "./modalGallery";
import { MediaPostRequest } from "@api";

interface ImageGalleryProps {
  images: MediaPostRequest[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [OpenLibrary, setOpenLibrary] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  const handleZoom = () => {
    setZoomLevel((prevZoom) => (prevZoom < 200 ? prevZoom + 200 : 100));
  };

  const maxThumbnails = 5;
  const extraImages =
    images.length > maxThumbnails ? images.length - maxThumbnails + 1 : 0;
  const displayedImages =
    extraImages > 0 ? images.slice(0, maxThumbnails - 1) : images;

  const lastImage = images[maxThumbnails - 1];

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex items-start w-full gap-2">
        <div className="flex flex-col space-y-2">
          {displayedImages.map((img, index) => (
            <button
              key={index}
              onMouseEnter={() => setSelectedImage(img)}
              className={`rounded-lg border-2 ${
                selectedImage === img ? "border-blue-500" : "border-gray-300"
              }`}
            >
              <Image
                src={img.url || ""}
                alt={`Thumbnail ${index + 1}`}
                width={80}
                height={80}
                className="w-12 h-12 object-cover border rounded-lg cursor-pointe"
              />
            </button>
          ))}
          {extraImages > 0 && (
            <button
              onClick={() => setOpenLibrary(true)}
              onMouseEnter={() => setSelectedImage(lastImage)}
              className={`relative w-12 h-12 border-2 rounded-lg ${
                selectedImage === lastImage
                  ? "border-blue-500"
                  : "border-gray-300"
              }`}
            >
              <Image
                src={lastImage.url || ""}
                alt="+ Images"
                width={80}
                height={80}
                className="w-full h-full object-cover border rounded-lg cursor-pointe"
              />
              <div className="absolute inset-0 flex items-center justify-center w-full h-full color-blue-500 bg-white bg-opacity-75 rounded-lg">
                <span className="font-semibold text-blue-500 text-xl">
                  +{extraImages}
                </span>
              </div>
            </button>
          )}
        </div>

        <div
          className={`relative w-full max-h-[590px] overflow-hidden border rounded-lg ${
            zoomLevel > 200 ? "cursor-zoom-out" : "cursor-zoom-in"
          }`}
          onMouseMove={handleMouseMove}
          onClick={handleZoom}
        >
          <motion.div
            className="absolute w-full h-full"
            style={{
              backgroundImage: `url(${selectedImage.url})`,
              backgroundSize: `${zoomLevel}%`,
              backgroundPosition: `${position.x}% ${position.y}%`,
              transition: "background-size 0.3s ease",
            }}
          />
          <center>
            <Image
              src={selectedImage.url || ""}
              alt="Selected"
              width={0}
              height={0}
              sizes="100vw"
              style={{ maxHeight: "590px", width: "auto", height: "100%" }}
            />
          </center>
        </div>
      </div>
      {OpenLibrary && (
        <ModalGallery images={images} onClose={() => setOpenLibrary(false)} />
      )}
    </div>
  );
};

export default ImageGallery;
