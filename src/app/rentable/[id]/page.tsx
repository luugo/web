"use client";

import { remark } from 'remark';
import html from 'remark-html';
import React, { FC, useEffect, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import LikeButton from "@/components/LikeButton";
import { StarIcon } from "@heroicons/react/24/solid";
import BagIcon from "@/components/BagIcon";
import NcInputNumber from "@/components/NcInputNumber";
import { PRODUCTS } from "@/data/data";
import {
    NoSymbolIcon,
    ClockIcon,
    SparklesIcon,
} from "@heroicons/react/24/outline";
import IconDiscount from "@/components/IconDiscount";
import Prices from "@/components/Prices";
import toast from "react-hot-toast";
import SectionSliderProductCard from "@/components/SectionSliderProductCard";
import detail1JPG from "@/images/products/detail1.jpg";
import detail2JPG from "@/images/products/detail2.jpg";
import detail3JPG from "@/images/products/detail3.jpg";
import placeholderSmall from "@/images/placeholder-small.png";
import notFoundJPG from "@/images/404.png";
import ReviewItem from "@/components/ReviewItem";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import SectionPromo2 from "@/components/SectionPromo2";
import ModalViewAllReviews from "./ModalViewAllReviews";
import NotifyAddTocart from "@/components/NotifyAddTocart";
import Image from "next/image";
import RentableInfo from "@/components/RentableInfo";
import { useParams } from "next/navigation";
import {
    Media,
    MediaApi,
    MediaGetRequest,
    Rentable,
    RentableApi,
    RentableGetRequest,
    UserContact, UserContactApi, UserContactGetRequest
} from "../../../../luugoapi";
import SectionSliderRentableCard from "@/components/SectionSliderRentableCard";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const LIST_IMAGES_DEMO = [detail1JPG, detail2JPG, detail3JPG];

const containerStyle = {
    width: '100%',
    height: '600px',
};

const ProductDetailPage = () => {
    const rentableparams = useParams();
    const rentableId: string = String(rentableparams.id);

    const [rentable, setRentable] = useState<Rentable[]>([]);
    const [userContact, setUserContacts] = useState<UserContact[]>([]); // Mova a declaração aqui

    const position = {
        lat: rentable[0]?.geolocation?.y,
        lng: rentable[0]?.geolocation?.x
    };

    const center = {
        lat: rentable[0]?.geolocation?.y,
        lng: rentable[0]?.geolocation?.x
    };

    useEffect(() => {
        const rentableApi = new RentableApi();
        const requestApiParameters: RentableGetRequest = {
            id: rentableId,
        };
        rentableApi.rentableGet(requestApiParameters).then(async (rentables) => {
            setRentable(rentables);
            const processedContent = await remark()
                .use(html)
                .process(rentables[0].description);
            rentables[0].description = processedContent.toString();

            const userId = rentables[0]?.userId;
            if (userId) {
                const userContactApi = new UserContactApi();
                const requestUserContactParameters: UserContactGetRequest = {
                    userId: userId,
                };
                userContactApi.userContactGet(requestUserContactParameters).then(setUserContacts);
            }
        });
    }, []);

    const [media, setMedias] = useState<Media[]>([]);
    useEffect(() => {
        const mediaApi = new MediaApi();
        const requestMediaParameters: MediaGetRequest = {
            rentableId: rentableId,
        };
        mediaApi.mediaGet(requestMediaParameters).then(setMedias);
    }, []);

    const { sizes, variants, status, allOfSizes, image } = PRODUCTS[0];

    const [isOpenModalViewAllReviews, setIsOpenModalViewAllReviews] =
        useState(false);

    const isValidCoordinate = (coord: { lat: any; lng: any }) => {
        return typeof coord.lat === 'number' && typeof coord.lng === 'number' && isFinite(coord.lat) && isFinite(coord.lng);
    };

    const renderSectionContent = () => {
        let contato;
        return (
            <div className="space-y-7 2xl:space-y-8">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-semibold">
                        {rentable?.[0]?.title ?? ''}
                    </h2>

                    <div className="flex items-center mt-5 space-x-4 sm:space-x-5">
                        <Prices
                            contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
                            price={rentable?.[0]?.price} billingFrequency={rentable?.[0]?.billingFrequency}
                        />
                    </div>
                </div>

                <hr className=" 2xl:!my-10 border-slate-200 dark:border-slate-700"></hr>
                <RentableInfo data={userContact} />
            </div>
        );
    };

    const renderDetailSection = () => {
        return (
            <div className="">
                <h2 className="text-2xl font-semibold">Descrição</h2>
                <div className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl mt-7">
                    <p dangerouslySetInnerHTML={{ __html: rentable?.[0]?.description }}>
                    </p>
                </div>
            </div>
        );
    };

    const renderReviews = () => {
        return (
            <div className="">
                {/* HEADING */}
                <h2 className="text-2xl font-semibold flex items-center">
                    <StarIcon className="w-7 h-7 mb-0.5" />
                    <span className="ml-1.5"> 4,87 · 142 Reviews</span>
                </h2>

                {/* comment */}
                <div className="mt-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-11 gap-x-28">
                        <ReviewItem />
                        <ReviewItem
                            data={{
                                comment: `I love the charcoal heavyweight hoodie. Still looks new after plenty of washes. 
                  If you’re unsure which hoodie to pick.`,
                                date: "December 22, 2021",
                                name: "Stiven Hokinhs",
                                starPoint: 5,
                            }}
                        />
                        <ReviewItem
                            data={{
                                comment: `The quality and sizing mentioned were accurate and really happy with the purchase. Such a cozy and comfortable hoodie. 
                Now that it’s colder, my husband wears his all the time. I wear hoodies all the time. `,
                                date: "August 15, 2022",
                                name: "Gropishta keo",
                                starPoint: 5,
                            }}
                        />
                        <ReviewItem
                            data={{
                                comment: `Before buying this, I didn't really know how I would tell a "high quality" sweatshirt, but after opening, I was very impressed. 
                The material is super soft and comfortable and the sweatshirt also has a good weight to it.`,
                                date: "December 12, 2022",
                                name: "Dahon Stiven",
                                starPoint: 5,
                            }}
                        />
                    </div>

                    <ButtonSecondary
                        onClick={() => setIsOpenModalViewAllReviews(true)}
                        className="mt-10 border border-slate-300 dark:border-slate-700 "
                    >
                        Show me all 142 reviews
                    </ButtonSecondary>
                </div>
            </div>
        );
    };

    const handleRenderMap = () => {
        if (!isValidCoordinate(center)) {
            return <p>Mapa não disponível no momento.</p>;
        }

        return (
            <>
                <h2 className="text-2xl font-semibold">Localização</h2>
                <LoadScript googleMapsApiKey="AIzaSyAMYZyR35_t_qG75PyL9JKDGHx_D05wAgc">
                    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
                        <Marker position={position} />
                    </GoogleMap>
                </LoadScript>
            </>
        );
    };

    return (
        <div className="pb-20 xl:pb-28 lg:pt-14">
            <div className={`nc-ProductDetailPage `}>
                {/* MAIn */}
                <main className="container mt-5 lg:mt-11">
                    <div className="lg:flex">
                        {/* CONTENT */}
                        <div className="w-full lg:w-[55%] ">
                            {/* HEADING */}
                            <div className="relative">
                                <div className="aspect-w-16 aspect-h-16 relative">
                                    <Image
                                        fill
                                        sizes="(max-width: 640px) 100vw, 33vw"
                                        src={rentable[0]?.thumbnail || placeholderSmall}
                                        className="w-full rounded-2xl object-cover"
                                        alt="product detail 1"
                                    />
                                </div>
                                {/* <LikeButton className="absolute right-3 top-3 " /> */}
                            </div>
                            {/* <div className="grid grid-cols-2 gap-3 mt-3 sm:gap-6 sm:mt-6 xl:gap-8 xl:mt-8">
                                {[media?.[0]?.url, media?.[1]?.url ?? notFoundJPG].map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="aspect-w-11 xl:aspect-w-10 2xl:aspect-w-11 aspect-h-16 relative"
                                        >
                                            <Image
                                                sizes="(max-width: 640px) 100vw, 33vw"
                                                fill
                                                src={item}
                                                className="w-full rounded-2xl object-cover"
                                                alt="product detail 1"
                                            />
                                        </div>
                                    );
                                })}
                            </div> */}
                        </div>

                        {/* SIDEBAR */}
                        <div className="w-full lg:w-[45%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
                            {renderSectionContent()}
                        </div>
                    </div>

                    {/* DETAIL AND REVIEW */}
                    <div className="mt-12 sm:mt-16 space-y-10 sm:space-y-16">
                        {renderDetailSection()}
                        <hr className="border-slate-200 dark:border-slate-700" />

                        {handleRenderMap()}
                    </div>
                </main>

                {/* MODAL VIEW ALL REVIEW */}
                <ModalViewAllReviews
                    show={isOpenModalViewAllReviews}
                    onCloseModalViewAllReviews={() => setIsOpenModalViewAllReviews(false)}
                />
            </div>
        </div>
    );
};

export default ProductDetailPage;
