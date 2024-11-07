"use client";

import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";

const SignUpVerifyInputPage: FC = () => {
    const [code, setCode] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (code.length === 6) {
            router.push(`/sign-up-verify?code=${code}`);
        } else {
            alert("Por favor, insira um código de 6 dígitos.");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
        if (value.length <= 6) {
            setCode(value);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen p-4 bg-gray-50">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Verificação de Cadastro</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
                <label htmlFor="code" className="block text-lg font-medium text-gray-700">
                    Insira o código de 6 dígitos
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
            </form>
        </div>
    );
};

export default SignUpVerifyInputPage;
