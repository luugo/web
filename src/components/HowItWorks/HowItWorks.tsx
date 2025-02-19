import React from "react";
import Heading from "../Heading/Heading";
import Badge from "@/shared/Badge/Badge";

const HowItWorks = () => {
  const data = [
    {
      id: 1,
      title: "Pesquise",
      desc: "Basta pesquisar o ítem que você necessita.",
    },
    {
      id: 2,
      title: "Escolha",
      desc: "Te mostraremos as opções disponíveis na plataforma, já com todas as informações.",
    },
    {
      id: 3,
      title: "Conecte-se",
      desc: "Criamos uma conexão entre você e o locador.",
    },
    {
      id: 4,
      title: "Aproveite",
      desc: "Prontinho! Agora é só aproveitar de forma rápida e segura os beneficíos do ítem.",
    },
  ];

  return (
    <div className="container mx-auto">
      <Heading
        className="mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50"
        fontClass="text-3xl md:text-4xl 2xl:text-5xl font-semibold"
        isCenter
        desc=""
      >
        Como Funciona?
      </Heading>
      <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {data?.map((item, index) => (
          <div
            key={item.id}
            className="text-center transition-transform transform hover:scale-110"
          >
            <div className="flex flex-col items-center">
              <div className="text-center mt-auto space-y-5">
                <Badge
                  name={`Passo ${index + 1}`}
                  color={
                    !index
                      ? "red"
                      : index === 1
                        ? "indigo"
                        : index === 2
                          ? "yellow"
                          : "purple"
                  }
                />
              </div>
              <p className="text-1xl block mt-6 text-slate-500 dark:text-slate-400">
                {item?.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
