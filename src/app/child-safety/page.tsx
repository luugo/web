"use client";
import React from "react";

const ChildSafety = () => {
  return (
    <div className="nc-PageTerms">
      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-14">
        <div className="space-y-10 lg:space-y-34">
          <div className="max-w-screen-sm">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              Segurança Infantil
            </h2>
          </div>
        </div>
        <hr className="border-slate-200 dark:border-slate-700" />
        {/* start terms description */}
        <div id="termos_de_uso" className="policy-item">
          <div className="my-5">
            <h3 className="block text-2xl sm:text-2xl lg:text-2xl font-semibold">
              Nosso Compromisso com a Segurança Infantil
            </h3>
          </div>
          <div>
            <p>
              Estamos comprometidos em garantir a segurança e o bem-estar de todas as
              crianças que interagem com nossa plataforma. Temos uma política de
              tolerância zero para abuso e exploração sexual infantil.
            </p>
            <p>
              Nosso aplicativo cumpre todas as leis de proteção infantil aplicáveis,
              incluindo a Lei de Proteção à Privacidade Online das Crianças (COPPA) e
              o Regulamento Geral de Proteção de Dados (GDPR-K) para crianças menores
              de 16 anos na UE.
            </p>
            <p>
              Monitoramos ativamente nossa plataforma para detectar e remover qualquer
              conteúdo que viole nossas políticas. Se você encontrar alguma atividade
              suspeita ou inadequada, por favor, denuncie imediatamente pelo e-mail:
               <a href="mailto:suporte@luugo.com.br" className="text-blue-500">
                suporte@luugo.com.br
              </a> ou utilize a ferramenta de denúncia dentro do aplicativo.
            </p>
            <p>Juntos, podemos criar um ambiente digital mais seguro para as crianças.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildSafety;
