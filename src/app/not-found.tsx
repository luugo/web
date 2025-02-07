import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React from "react";
import I404Png from "@/images/luguinho_pensativo.png";
import NcImage from "@/shared/NcImage/NcImage";

const Page404 = () => (
  <div className="nc-Page404">
    <div className="container relative pt-5 pb-16 lg:pb-20 lg:pt-5">
      <header className="text-center max-w-2xl mx-auto space-y-2 flex flex-col items-center justify-center">
        <NcImage
          src={I404Png}
          alt="not-found"
          style={{ width: "300px", height: "auto" }}
        />
        <span className="block text-sm text-neutral-800 sm:text-base dark:text-neutral-200 tracking-wider font-medium">
          {`A página que você estava procurando não existe.`}{" "}
        </span>
        <div className="pt-8">
          <ButtonPrimary href="/">Retornar à página inicial</ButtonPrimary>
        </div>
      </header>
    </div>
  </div>
);

export default Page404;
