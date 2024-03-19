"use client";

import React, { FC, useState } from "react";
import LikeButton from "./LikeButton";
import Prices from "./Prices";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import {Product, PRODUCTS, Rentable, RENTABLES} from "@/data/data";
import { StarIcon } from "@heroicons/react/24/solid";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import BagIcon from "./BagIcon";
import toast from "react-hot-toast";
import { Transition } from "@/app/headlessui";
import ModalQuickView from "./ModalQuickView";
import ProductStatus from "./ProductStatus";
import placeholderSmall from "@/images/placeholder-small.png";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import NcImage from "@/shared/NcImage/NcImage";
import {ArrowDownIcon, MapPinIcon} from "@heroicons/react/20/solid";

export interface ProductCardProps {
  className?: string;
  data?: Rentable;
  isLiked?: boolean;
}

const RentableCard: FC<ProductCardProps> = ({
                                             className = "",
                                             data = RENTABLES[0],
                                             isLiked,
                                           }) => {
  const {
    title,
    price,
    description,
    status,
    billingFrequency,
    thumbnail,
    link,
    place,
    id,
  } = data;

  const [showModalQuickView, setShowModalQuickView] = useState(false);

  const notifyAddTocart = ({ size }: { size?: string }) => {
    toast.custom(
        (t) => (
            <Transition
                appear
                show={t.visible}
                className="p-4 max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200"
                enter="transition-all duration-150"
                enterFrom="opacity-0 translate-x-20"
                enterTo="opacity-100 translate-x-0"
                leave="transition-all duration-150"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-20"
            >
              <p className="block text-base font-semibold leading-none">
                Added to cart!
              </p>
              <div className="border-t border-slate-200 dark:border-slate-700 my-4" />
            </Transition>
        ),
        {
          position: "top-right",
          id: String(id) || "product-detail",
          duration: 3000,
        }
    );
  };

  const renderGroupButtons = () => {
    return (
        <div className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
          <ButtonPrimary
              className="shadow-lg"
              fontSize="text-xs"
              sizeClass="py-2 px-4"
              onClick={() => notifyAddTocart({ size: "XL" })}
          >
            <BagIcon className="w-3.5 h-3.5 mb-0.5" />
            <span className="ms-1">Add to bag</span>
          </ButtonPrimary>
          <ButtonSecondary
              className="ms-1.5 bg-white hover:!bg-gray-100 hover:text-slate-900 transition-colors shadow-lg"
              fontSize="text-xs"
              sizeClass="py-2 px-4"
              onClick={() => setShowModalQuickView(true)}
          >
            <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
            <span className="ms-1">Quick view</span>
          </ButtonSecondary>
        </div>
    );
  };

  return (
      <>
        <div
            className={`nc-ProductCard relative flex flex-col bg-transparent ${className}`}
        >
          <a href={link} className="absolute inset-0"></a>

          <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
            <a href={link} className="block">
              <NcImage
                  containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
                  src={thumbnail || placeholderSmall}
                  className="object-cover w-full h-full drop-shadow-xl"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  alt="product"
              />
            </a>
            <ProductStatus status={status} />
            <LikeButton liked={isLiked} className="absolute top-3 end-3 z-10" />
            {renderGroupButtons()}
          </div>

          <div className="space-y-4 px-2.5 pt-5 pb-2.5">
            <div>
              <h2 className="nc-ProductCard__title text-base font-semibold transition-colors">
                {title}
              </h2>
              <p className={`text-sm text-slate-500 dark:text-slate-400 mt-1 `}>
                {description}
              </p>
            </div>

            <div className="flex justify-between items-end ">
              <Prices price={price} billingFrequency={billingFrequency}/>
              <div className="flex items-center mb-0.5">
                <MapPinIcon className="w-5 h-5 pb-[1px] text-red-500" />
                <span className="text-sm ms-1 text-slate-500 dark:text-slate-400">
                {place || ""}
              </span>
              </div>
            </div>
          </div>
        </div>

        {/* QUICKVIEW */}
        <ModalQuickView
            show={showModalQuickView}
            onCloseModalQuickView={() => setShowModalQuickView(false)}
        />
      </>
  );
};

export default RentableCard;
