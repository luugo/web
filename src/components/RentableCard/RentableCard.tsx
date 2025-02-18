"use client";

import React, { FC } from "react";
import Prices from "./Prices";
import placeholderSmall from "@/images/placeholder-small.png";
import NcImage from "@/shared/NcImage/NcImage";
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
  return (
    <>
      <div
        className={`bg-white rounded-xl shadow-md ring-2 ring-slate-100 transition-transform duration-300 hover:shadow-lg hover:ring-slate-200 hover:-translate-y-1 w-full h-full ${className}`}
      >
        <UTMLink
          href={`/rentable/${rentable.id}`}
          className="flex flex-col h-full justify-between w-full h-full"
        >
          <div className="flex-shrink-0 bg-slate-50 p-1 rounded-lg overflow-hidden z-1 group">
            <NcImage
              containerClassName="flex aspect-w-1 aspect-h-1 rounded-lg overflow-hidden w-full mx-auto"
              src={rentable.thumbnail || placeholderSmall}
              className="object-cover w-full h-full object-top"
              fill
              sizes="(max-width: 720px) 100vw, 40vw"
              alt="product"
            />
          </div>

          <div className="px-4 py-4 h-full flex flex-col justify-between gap-4">
            <div>
              <h2 className="font-semibold transition-colors text-[clamp(0.4rem,0.2em*1rem,0.8rem)] truncate w-full">
                {rentable.title}
              </h2>
              <p className="text-sm text-slate-500">
                {stripMarkdown(shortStringText(rentable.description, 55))}
              </p>
            </div>
            <div className="flex flex-col">
              <Prices
                frequencyClass="text-xs text-slate-400"
                price={rentable.price}
                billingFrequency={rentable.billingFrequency}
              />
              <span className="text-sm text-slate-500">
                {rentable.place.replace(" Metropolitana", "") || ""}
              </span>
            </div>
          </div>
        </UTMLink>
      </div>
    </>
  );
};

export default RentableCard;
