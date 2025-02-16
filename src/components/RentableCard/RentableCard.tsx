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
      <div className={`flex flex-col bg-transparent ${className}`}>
        <div className="flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-2xl overflow-hidden z-1 group">
          <UTMLink href={`/rentable/${rentable.id}`} className="block">
            <NcImage
              containerClassName="flex aspect-w-11 aspect-h-9 w-full h-0"
              src={rentable.thumbnail || placeholderSmall}
              className="object-cover w-full h-full object-top"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
              alt="product"
            />
          </UTMLink>
        </div>

        <div className="px-2 py-2 h-full flex flex-col justify-between gap-4">
          <div>
            <h2 className="font-semibold transition-colors text-[clamp(0.4rem,0.2em*1rem,0.8rem)] truncate w-full">
              {rentable.title}
            </h2>
            <p className="text-sm text-slate-500">
              {stripMarkdown(shortStringText(rentable.description, 60))}
            </p>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-slate-500">
              {rentable.place.replace(" Metropolitana", "") || ""}
            </span>
            <Prices
              price={rentable.price}
              billingFrequency={rentable.billingFrequency}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RentableCard;
