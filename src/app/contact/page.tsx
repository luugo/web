import React, { FC } from "react";
import SocialsList from "@/shared/SocialsList/SocialsList";
import Label from "@/components/Label/Label";
import Input from "@/shared/Input/Input";
import Textarea from "@/shared/Textarea/Textarea";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionPromo1 from "@/components/SectionPromo1";

const info = [
  {
    title: "🗺 ENDEREÇO",
    desc: "Rua das Cattleyas, 136 - Emaús, Parnamirim - RN, 59148-780",
  },
  {
    title: "💌 EMAIL",
    desc: "suporte@luugo.com.br",
  },
  {
    title: "☎ FONE",
    desc: "(84) 99647-9161",
  },
];

const PageContact = ({}) => {
  return (
    <div className={`nc-PageContact overflow-hidden`}>
      <div className="">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Contato
        </h2>
        <div className="container max-w-7xl mx-auto my-10">
          <div className="flex-shrink-0 grid grid-cols-1 md:grid-cols-2 gap-12 ">
            <div className="max-w-sm space-y-8">
              {info.map((item, index) => (
                <div key={index}>
                  <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                    {item.title}
                  </h3>
                  <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                    {item.desc}
                  </span>
                </div>
              ))}
              <div>
                <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                  🌏 SOCIALS
                </h3>
                <SocialsList className="mt-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageContact;
