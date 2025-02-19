import React, { useCallback, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useDropzone } from "react-dropzone";
import Input from "@/shared/Input/Input";
import { FieldErrors, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { zodFormData } from "@/app/rentable/create/page";

interface ImagesStepProps {
  setValue: UseFormSetValue<zodFormData>;
  trigger: UseFormTrigger<zodFormData>;
  errors: FieldErrors<zodFormData>;
  previewImages: string[];
  setPreviewImages: (category: string[]) => void;
}

const ImagesStep = ({
  setValue,
  trigger,
  errors,
  setPreviewImages,
  previewImages,
}: ImagesStepProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const _setPreviewImages = (previews: string[]) => {
    setPreviewImages(previews);
  };

  const [slidesPerView, setSlidesPerView] = useState<number>(
    Math.min(previewImages.length, 3),
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    handleFiles(files);
  };

  const handleFiles = useCallback(
    (files: File[]) => {
      if (files.length > 0) {
        setValue("images", files, { shouldValidate: true });
      } else {
        setValue("images", [], { shouldValidate: true });
      }

      trigger("images");

      const previews = files.map((file) => URL.createObjectURL(file));
      _setPreviewImages(previews);
      setSlidesPerView(Math.min(files.length, 3));
    },
    [_setPreviewImages, setValue, trigger],
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      handleFiles(acceptedFiles);
    },
    [handleFiles],
  );

  const { getRootProps, isDragActive } = useDropzone({ onDrop });

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="p-4 m-auto">
      <h2 className="text-xl font-bold mb-4">
        Adicionar várias fotos aumenta a qualidade da sua publicação.
      </h2>
      <h2 className="text-base mb-10">
        Boas fotos aumentam as chances de aluguel.
      </h2>

      <div
        {...getRootProps()}
        className="border rounded-lg p-4 cursor-pointer flex flex-col items-center justify-center py-10"
      >
        <Input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        {isDragActive ? (
          <p>Arraste e solte as imagens aqui...</p>
        ) : (
          <p>
            Arraste e solte as imagens aqui, ou clique para selecionar arquivos.
          </p>
        )}
        <button
          type="button"
          onClick={handleButtonClick}
          className="mt-2 bg-slate-900 hover:bg-slate-800 rounded-md text-white py-2 px-4"
        >
          Selecionar Arquivos
        </button>
      </div>

      {errors.images && <p className="text-red-500">{errors.images.message}</p>}

      {previewImages.length > 0 && (
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          slidesPerView={slidesPerView}
          navigation
          pagination={{ clickable: false }}
          className="w-full h-64 border rounded-lg overflow-hidden mt-4"
        >
          {previewImages.map((src, index) => {
            if (src) {
              return (
                <SwiperSlide className="pb-8 pt-2" key={index}>
                  <img
                    src={src}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-contain"
                  />
                </SwiperSlide>
              );
            }
          })}
        </Swiper>
      )}
    </div>
  );
};

export default ImagesStep;
