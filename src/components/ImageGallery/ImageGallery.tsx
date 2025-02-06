"use client";

import {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight, faImages,} from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import {MediaPostRequest} from "@api";
import LgImage from "./component/LgImage";
import useViewportSize from "@/utils/useViewportSize";

const ModalGallery = dynamic(() => import("./modalGallery"), {
  ssr: false,
  loading: () => <p>Carregando galeria...</p>,
});

interface ImageGalleryProps {
  images: MediaPostRequest[];
}

const ImageGallery = ({images}: ImageGalleryProps) => {
  const {width} = useViewportSize();
  const [OpenLibrary, setOpenLibrary] = useState(false);
  const [ImageSelected, setImageSelected] = useState<string | undefined>(
    undefined
  );

  const maxThumbnails = 5;
  const displayedImages = images.slice(0, maxThumbnails);
  const totalImages = images.length;

  const galleryFirst = () => {
    return (
      <>
        <div className="relative grid grid-cols-12 gap-2">
          {displayedImages.map((img, index) => (
            <div
              key={index}
              onClick={() => {
                setOpenLibrary(true);
                setImageSelected(img.url || "");
              }}
              className={`${
                index === 0
                  ? "col-span-6 row-span-2 h-auto aspect-auto"
                  : "col-span-3 relative aspect-1"
              } flex justify-center overflow-hidden cursor-pointer`}
            >
              <LgImage
                src={img.url || ""}
                alt={`Thumbnail ${index + 1}`}
                fill
                containerClassName={"w-full h-full relative"}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300 ease-in-out"
                loading="lazy"
              />
            </div>
          ))}
          <div
            onClick={() => {
              setOpenLibrary(true);
              setImageSelected(undefined);
            }}
            className="absolute flex gap-2 items-center bottom-4 right-4 z-10 bg-white px-4 py-2 rounded-lg shadow-lg cursor-pointer border border-cyan-950 text-cyan-950 hover:scale-95 transition-transform duration-300 ease-in-out"
          >
            <FontAwesomeIcon icon={faImages}/>
            <span className="text-sm font-medium">Mostrar todas as fotos</span>
          </div>
        </div>
        {OpenLibrary && (
          <ModalGallery
            images={images}
            onClose={() => setOpenLibrary(false)}
            selectedImageUrl={ImageSelected}
          />
        )}
      </>
    );
  };

  const GallerySecond = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
    const [maxHeight, setMaxHeight] = useState("60vh");

    useEffect(() => {
      const updateMaxHeight = () => {
        const heights = imageRefs.current.map((img) => img?.naturalHeight || 0);
        const maxImageHeight = Math.max(...heights);
        if (maxImageHeight > 0) {
          setMaxHeight(`${maxImageHeight}px`);
        }
      };

      updateMaxHeight();
      window.addEventListener("resize", updateMaxHeight);
      return () => window.removeEventListener("resize", updateMaxHeight);
    }, [images]);

    const handlePrev = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    };

    const handleNext = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex < totalImages - 1 ? prevIndex + 1 : prevIndex
      );
    };

    useEffect(() => {
      if (scrollRef.current) {
        scrollRef.current.style.transform = `translateX(-${
          currentIndex * 100
        }%)`;
      }
    }, [currentIndex]);

    return (
      <div
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{height: maxHeight}}
      >
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg text-sm z-10">
          {currentIndex + 1}/{totalImages}
        </div>

        <div
          ref={scrollRef}
          className="flex w-full h-full transition-transform duration-500 ease-in-out"
        >
          {images.map((img, index) => (
            <div key={index} className="w-full flex-shrink-0 h-full">
              <LgImage
                src={img.url || ""}
                alt={`Slide ${index + 1}`}
                fill
                containerClassName="w-full h-full relative"
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {currentIndex > 0 && (
          <div
            onClick={handlePrev}
            className="absolute w-10 h-10 flex items-center justify-center top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-200 transition-colors"
          >
            <FontAwesomeIcon icon={faChevronLeft}/>
          </div>
        )}

        {currentIndex < totalImages - 1 && (
          <div
            onClick={handleNext}
            className="absolute w-10 h-10 flex items-center justify-center top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-200 transition-colors"
          >
            <FontAwesomeIcon icon={faChevronRight}/>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {images.length > 5 ? (
        width > 744 ? (
          <>{galleryFirst()}</>
        ) : (
          <>{GallerySecond()}</>
        )
      ) : (
        <>{GallerySecond()}</>
      )}
    </>
  );
};

export default ImageGallery;
