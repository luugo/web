"use client";
import React, { useEffect } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";

export default function ErrorPage({
  error,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Erro detectado:", error);
  }, [error]);

  return (
    <div className="nc-Page404">
      <div className="container relative pt-5 pb-16 lg:pb-20 lg:pt-5">
        <header className="text-center max-w-2xl mx-auto space-y-2 flex flex-col items-center justify-center">
          <img
            src="https://s3.sa-east-1.amazonaws.com/cdn.luugo.com.br/luuguinho_dead.png"
            width="300"
            height="auto"
            alt="not-found"
          />

          <span className="block text-sm text-neutral-800 sm:text-base dark:text-neutral-200 tracking-wider font-medium">
            {`Algo deu errado ao carregar esta página.`}
          </span>

          <div className="pt-8">
            <ButtonPrimary href="/">Retornar à página inicial</ButtonPrimary>
          </div>
        </header>
      </div>
    </div>
  );
}
