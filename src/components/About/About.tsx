"use client";

import React from "react";
import Heading from "../Heading/Heading";

const About = () => {
  return (
    <div className="container mx-auto">
      <Heading
        className="mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50"
        fontClass="text-3xl md:text-4xl 2xl:text-5xl font-semibold"
        isCenter
        desc=""
      >
        Quem Somos?
      </Heading>
      <div>
        <p className="text-justify text-2xl block mt-6 text-slate-500 dark:text-slate-400">
          Somos uma plataforma que viabiliza o acesso aos mais diversos bens e serviços por meio da locação.

          Acreditamos no consumo colaborativo e no fortalecimento do senso de comunidade, contribuindo para economia de
          recursos bem como para um estilo de vida mais sustentável.
        </p>
      </div>
    </div>
  );
};

export default About;
