"use client";

import React, { FC } from "react";
import Prices from "./Prices";
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
  return (
    <>
      <div
        className={`flex flex-col bg-white rounded-xl shadow-md ring-2 ring-slate-100 transition-transform duration-300 hover:shadow-lg hover:ring-slate-200 hover:-translate-y-1 ${className}`}
      >
        <UTMLink
          href={`/rentable/${rentable.id}`}
          className="flex flex-col h-full justify-between"
        >
          <div className="flex-shrink-0 bg-slate-50 p-1 rounded-lg overflow-hidden z-1 group">
            <NcImage
              containerClassName="flex aspect-w-11 aspect-h-7 rounded-lg overflow-hidden w-full h-0"
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
                priceClass="text-lg text-teal-500"
                frequencyClass="text-sm text-slate-400"
                price={rentable.price}
                billingFrequency={rentable.billingFrequency}
              />
              <span className="text-sm text-slate-500 pt-1">
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
