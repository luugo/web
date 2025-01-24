"use client";

import {Disclosure} from "@/app/headlessui";
import {MinusIcon, PlusIcon} from "@heroicons/react/24/outline";
import React, {FC} from "react";
import {StarIcon} from "@heroicons/react/24/solid";
import {SocialIcon} from "react-social-icons";

interface Props {
    panelClassName?: string;
    data?: any;
    name?: string;
}

const RentableInfo: FC<Props> = ({
                                     panelClassName = "p-4 pt-3 last:pb-0 text-slate-600 text-sm dark:text-slate-300 leading-6",
                                     data,
                                     name = 'Entre em contato',
                                 }) => {
    return (
        <div className="w-full rounded-2xl space-y-2.5">
            <h3 className="text-2xl sm:text-3xl font-semibold">{name}</h3>
            <ul>
                {data.map((item: any, index: number) => {
                    switch (item.type) {
                        case "INSTAGRAM":
                            return (
                                <li className={panelClassName}>
                                    <a target={"_blank"}
                                       href={`https://instagram.com/${item.value}`}
                                       style={{fontSize: 20}}>
                                        <SocialIcon network="instagram" style={{marginRight: 10}}/>
                                        @{item.value}
                                    </a>
                                </li>
                            )
                        case "FACEBOOK":
                            return (
                                <div className={panelClassName}>
                                    <a target={"_blank"}
                                       href={`https://fb.me/${item.value}`}
                                       style={{fontSize: 20}}>
                                        <SocialIcon network="facebook" style={{marginRight: 10}}/>
                                        {item.value}
                                    </a>
                                </div>
                            )
                        case "EMAIL":
                            return (
                                <div className={panelClassName}>
                                    <a target={"_blank"}
                                       href={`mailto:${item.value}`}
                                       style={{fontSize: 20}}>
                                        <SocialIcon network="email" style={{marginRight: 10}}/>
                                        {item.value}
                                    </a>
                                </div>
                            )
                        case "PHONE":
                            return (
                                <div className={panelClassName}>
                                    <a target={"_blank"}
                                       href={`tel:${item.value}`}
                                       style={{fontSize: 20}}>
                                        <SocialIcon network="whatsapp" bgColor="#888" style={{marginRight: 10}}/>
                                        {item.value}
                                    </a>
                                </div>
                            )
                        case "WHATSAPP":
                            return (
                                <div className={panelClassName}>
                                    <a target={"_blank"}
                                       href={`https://wa.me/${item.value.replace(/\D/g, "")}`}
                                       style={{fontSize: 20}}>
                                        <SocialIcon network="whatsapp" style={{marginRight: 10}}/>
                                        {item.value}
                                    </a>
                                </div>
                            )
                        default:
                            return (
                                <div className={panelClassName}>
                                    <p>{item.value}</p>
                                </div>
                            )
                    }
                })}
            </ul>
        </div>
    );
};


export default RentableInfo;
