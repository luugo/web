"use client";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import ModalGallery from "./modalGallery";
import { MediaPostRequest } from "@api";
import LgImage from "./component/LgImage";
import useViewportSize from "@/utils/useViewportSize";

interface ImageGalleryProps {
  images: MediaPostRequest[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const { width } = useViewportSize();
  const [OpenLibrary, setOpenLibrary] = useState(false);
  const [ImageSelected, setImageSelected] = useState<string | undefined>(
    undefined
  );

  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(1);

  const maxThumbnails = 5;
  const displayedImages = images.slice(0, maxThumbnails);
  const totalImages = images.length;

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft;
        const width = scrollRef.current.clientWidth;
        const newIndex = Math.round(scrollLeft / width) + 1;
        setCurrentIndex(newIndex);
      }
    };

    scrollRef.current?.addEventListener("scroll", handleScroll);
    return () => {
      scrollRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {width > 744 ? (
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
              <FontAwesomeIcon icon={faImages} />
              <span className="text-sm font-medium">
                Mostrar todas as fotos
              </span>
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
      ) : (
        <div className="relative w-full overflow-hidden">
          <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg text-sm z-10">
            {currentIndex}/{totalImages}
          </div>
          <div
            ref={scrollRef}
            className="w-full flex overflow-x-auto snap-x snap-mandatory scrollbar-hide h-[45vh] scroll-smooth"
          >
            {images.map((img, index) => (
              <div key={index} className="flex-shrink-0 w-full snap-center">
                <LgImage
                  src={img.url || ""}
                  alt={`Slide ${index + 1}`}
                  fill
                  containerClassName="w-full h-full relative"
                  className="object-cover w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
