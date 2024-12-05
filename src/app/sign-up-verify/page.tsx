"use client";

import React, { FC, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
    AuthenticationApi, AuthenticationEmailPutRequest
} from "../../../luugoapi";

const SignUpVerifyPage: FC = () => {
    const searchParams = useSearchParams();
    const verificationCode = searchParams.get("code");

    const [verificationSuccess, setVerificationSuccess] = useState<boolean | null>(null);

    useEffect(() => {
        if (!verificationCode) {
            console.error("Código de verificação ausente.");
            setVerificationSuccess(false);
            return;
        }

        const authenticationApi = new AuthenticationApi();
        const requestApiParameters: AuthenticationEmailPutRequest = {
            emailVerificationKey: verificationCode,
        };

        authenticationApi.authenticationEmailPut({ authenticationEmailPutRequest: requestApiParameters })
            .then(() => {
                console.log("Verificação de código bem-sucedida.");
                setVerificationSuccess(true);
            })
            .catch((error) => {
                console.error("Erro ao verificar o código:", error);
                setVerificationSuccess(false);
            });
    }, [verificationCode]);

    const renderSectionContent = () => {
        return (
            <div className="space-y-7 2xl:space-y-8">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-semibold">
                        Confirmação de Cadastro
                    </h2>
                    <div className="flex items-center mt-5 space-x-4 sm:space-x-5">
                        <span>
                            Sua conta foi confirmada com sucesso! Obrigado por confirmar seu e-mail. Agora você pode acessar todas as funcionalidades da nossa plataforma. Estamos felizes em tê-lo(a) conosco!
                        </span>
                    </div>
                </div>
                <div className="mt-5">
                    <span>
                        <strong>Comece agora:</strong> <a href="/login" className="text-blue-500 hover:underline">Faça login na sua conta</a>
                    </span>
                </div>
                <hr className="2xl:!my-10 border-slate-200 dark:border-slate-700"></hr>
            </div>
        );
    };

    const renderErrorMessage = () => {
        return (
            <div className="text-red-600">
                <h2>Erro na verificação de e-mail.</h2>
                <p>Por favor, tente novamente mais tarde.</p>
            </div>
        );
    };

    return (
        <div>
            {verificationSuccess === true ? renderSectionContent() : renderErrorMessage()}
        </div>
    );
};

export default SignUpVerifyPage;
