import React, { FC } from "react";
import Image, { ImageProps } from "next/image";

export interface LgImageProps extends Omit<ImageProps, "alt"> {
  containerClassName?: string;
  alt?: string;
}

const LgImage: FC<LgImageProps> = ({
  containerClassName = "",
  alt = "nc-image",
  className = "object-cover w-full h-full",
  ...args
}) => {
  return (
    <div className={containerClassName}>
      <Image className={className} alt={alt} {...args} />
    </div>
  );
};

export default LgImage;
