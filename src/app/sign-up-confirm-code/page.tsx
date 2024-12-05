"use client";

import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import {
    AuthenticationApi,
    AuthenticationEmailPutRequest,
} from "../../../luugoapi";

const SignUpVerifyInputPage: FC = () => {
    const [code, setCode] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // Estado para armazenar a mensagem de erro
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (code.length !== 6) {
            setErrorMessage("Por favor, insira um código de 6 dígitos.");
            return;
        }

        const authenticationApi = new AuthenticationApi();
        const requestApiParameters: AuthenticationEmailPutRequest = {
            emailVerificationKey: code,
        };

        try {
            const result = await authenticationApi.authenticationEmailPut({
                authenticationEmailPutRequest: requestApiParameters,
            });

            if (result) {
                localStorage.setItem(
                    "luugo",
                    JSON.stringify({ user: { authenticationId: result } })
                );
                router.push("/complete-signup");
            }
        } catch (error: any) {
            const errorData = await error.response.json();
            const message = errorData[0]?.message
            if (message == null) {
                setErrorMessage("Erro inesperado. Por favor, tente novamente.");
            } else {
                setErrorMessage(message);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
        if (value.length <= 6) {
            setCode(value);
            setErrorMessage(null);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen p-4 bg-gray-50">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Verificação de Cadastro</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
                <label htmlFor="code" className="block text-lg font-medium text-gray-700">
                    Insira o código de 6 dígitos que Enviamos para o seu Email.
                </label>
                <input
                    type="text"
                    id="code"
                    value={code}
                    onChange={handleChange}
                    maxLength={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-center text-xl tracking-widest"
                    placeholder="000000"
                />
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Confirmar
                </button>
                {errorMessage && (
                    <p className="block text-red-500 text-sm font-bold mb-2">{errorMessage}</p>
                )}
            </form>
        </div>
    );
};

export default SignUpVerifyInputPage;
