"use client";

import React, { FC } from "react";
import Prices from "../Prices";
import placeholderSmall from "@/images/placeholder-small.png";
import NcImage from "@/shared/NcImage/NcImage";
import { MapPinIcon } from "@heroicons/react/20/solid";
import { shortStringText } from "@/utils/shortStringText";
import { Rentable } from "@api";
import { stripMarkdown } from "@/utils/stripMarkdown";
import UTMLink from "@/components/UTMLink";

export interface ProductCardProps {
  className?: string;
  rentable: Rentable;
  isLiked?: boolean;
}

const RentableCard: FC<ProductCardProps> = ({ className = "", rentable }) => {
  const renderGroupButtons = () => {
    return (
      <div className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all"></div>
    );
  };

  return (
    <>
      <div
        className={`nc-ProductCard relative flex flex-col bg-transparent ${className}`}
      >
        <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-2xl overflow-hidden z-1 group">
          <UTMLink href={`/rentable/${rentable.id}`} className="block">
            <NcImage
              containerClassName="flex aspect-w-11 aspect-h-11 w-full h-0"
              src={rentable.thumbnail || placeholderSmall}
              className="object-cover w-full h-full drop-shadow-xl"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
              alt="product"
            />
          </UTMLink>
          {renderGroupButtons()}
        </div>

        <div className="space-y-6 px-2.5 pt-6 pb-2.5">
          <div>
            <h2 className="nc-ProductCard__title font-semibold transition-colors text-[clamp(0.4rem,0.2em*1rem,0.8rem)]">
              {rentable.title}
            </h2>
            <p className={`text-xs text-slate-500 mt-1 `}>
              {stripMarkdown(shortStringText(rentable.description, 40))}
            </p>
          </div>

          <div className="flex justify-between items-end ">
            <Prices
              price={rentable.price}
              billingFrequency={rentable.billingFrequency}
            />
            <div className="flex items-center mb-0.5">
              <MapPinIcon className="w-5 h-5 pb-[1px] text-gray-500" />
              <span className="text-xs ms-1 text-slate-500">
                {rentable.place.replace(" Metropolitana", "") || ""}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RentableCard;
