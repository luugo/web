import React from "react";

import ButtonPrimary from "@/shared/Button/ButtonPrimary";

const PageNoResults = () => (
  <div className="nc-Page404">
    <div className="container relative pt-5 pb-16 lg:pb-20 lg:pt-5">
      <header className="text-center max-w-2xl mx-auto space-y-2 flex flex-col items-center justify-center">
        <img
          src="https://s3.sa-east-1.amazonaws.com/cdn.luugo.com.br/luuguinho_pensativo.png"
          width="300"
          height="auto"
          alt="not-found"
        />
        <span className="block text-sm text-neutral-800 pt-8 sm:text-base dark:text-neutral-200 tracking-wider font-medium">
          {'Nenhum resultado encontrado para a sua pesquisa.'}{" "}
        </span>
        <div className="pt-8">
          <ButtonPrimary href="/">Retornar à página inicial</ButtonPrimary>
        </div>
      </header>
    </div>
  </div>
);

export default PageNoResults;
