import React from 'react';
import Heading from '../Heading/Heading';

const HowItWorks = () => {
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
            <div className="grid grid-cols-4 gap-8">
                <div className="text-center">
                    <div className="flex flex-col items-center">
                        <div className="bg-gray-200 w-20 h-20 rounded-full flex items-center justify-center border-2 border-gray-400 text-lg font-semibold mb-5">1</div>
                        <p className="text-1xl block mt-6 text-slate-500 dark:text-slate-400">Basta pesquisar o ítem que você nescessita.</p>
                    </div>
                </div>

                <div className="text-center">
                    <div className="flex flex-col items-center">
                        <div className="bg-gray-200 w-20 h-20 rounded-full flex items-center justify-center border-2 border-gray-400 text-lg font-semibold mb-5">2</div>
                        <p className="text-1xl block mt-6 text-slate-500 dark:text-slate-400">Te mostraremos as opções disponíveis na plataforma, já com todas as informações.</p>
                    </div>
                </div>

                <div className="text-center">
                    <div className="flex flex-col items-center">
                        <div className="bg-gray-200 w-20 h-20 rounded-full flex items-center justify-center border-2 border-gray-400 text-lg font-semibold mb-5">3</div>
                        <p className="text-1xl block mt-6 text-slate-500 dark:text-slate-400">Criamos uma conexão entre você e o locador.</p>
                    </div>
                </div>

                <div className="text-center">
                    <div className="flex flex-col items-center">
                        <div className="bg-gray-200 w-20 h-20 rounded-full flex items-center justify-center border-2 border-gray-400 text-lg font-semibold mb-5">4</div>
                        <p className="text-1xl block mt-6 text-slate-500 dark:text-slate-400">Prontinho! Agora é só aproveitar de forma rápida e segura os beneficíos do ítem.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;