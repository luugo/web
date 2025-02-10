import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ImagesStepProps {
  setValue: any;
  trigger: any;
  errors: any;
  previewImages: string[];
  setPreviewImages: (category: string[]) => void;
}

const ImagesStep = ({ setValue, trigger, errors, setPreviewImages, previewImages }: ImagesStepProps) => {

  const _setPreviewImages = (previews: string[]) => {
    setPreviewImages(previews);
  };

  const [slidesPerView, setSlidesPerView] = useState<number>(Math.min(previewImages.length, 3));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];

    if (files.length > 0) {
      setValue("images", files, { shouldValidate: true });
    } else {
      setValue("images", [], { shouldValidate: true });
    }

    trigger("images");

    const previews = files.map((file) => URL.createObjectURL(file));
    _setPreviewImages(previews);
    setSlidesPerView(Math.min(files.length, 3));
  };

  return (
    <div className="flex flex-col gap-4">
      <label>Fotos (máx. 10):</label>
      <input type="file" multiple accept="image/*" onChange={handleFileChange} />
      {errors.images && <p className="text-red-500">{errors.images.message}</p>}

      {previewImages.length > 0 && (
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          slidesPerView={slidesPerView}
          navigation
          pagination={{ clickable: true }}
          className="w-full h-64 border rounded-lg overflow-hidden"
        >
          {previewImages.map((src, index) => (
            <SwiperSlide key={index}>
              <img src={src} alt={`Preview ${index}`} className="w-full h-full object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};


export default ImagesStep;