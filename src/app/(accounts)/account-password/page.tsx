"use client"
import Label from "@/components/Label/Label";
import React, {useState} from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import {AuthenticationApi} from "../../../../luugoapi";

const AccountPass = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const authApi = new AuthenticationApi();

  let storageData: any = null;
  if (typeof window !== 'undefined') {
    storageData = localStorage.getItem('luugo');
  };

  const handleUpdatePassword = async () => {
    if (storageData !== null) {
      let storage = JSON.parse(storageData)
      const requestParameters: any = {
        emailVerificationKey: storage?.user?.authenticationId,
        currentPassword: currentPassword,
        newPassword: newPassword,
        confirmNewPassword: confirmNewPassword,
      }
      try {
        return await authApi?.authenticationEmailPost({
          authenticationEmailPostRequest: requestParameters,
        });
      } catch (error: any) {
        const errorData = await error.response?.json();
        if(errorData) {
          const message = errorData[0]?.message
          if (message == null) {
            setErrorMessage("Erro inesperado. Por favor, tente novamente.");
          } else {
            setErrorMessage(message);
          }
        }
      }
    }
  }

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* HEADING */}
      <h2 className="text-2xl sm:text-3xl font-semibold">
        Atualize sua Senha
      </h2>
      <div className=" max-w-xl space-y-6">
        <div>
          <Label>Senha Atual</Label>
          <Input
            type="password"
            className="mt-1.5"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e?.target?.value)}
          />
        </div>
        <div>
          <Label>Nova Senha</Label>
          <Input
            type="password"
            className="mt-1.5"
            value={newPassword}
            onChange={(e) => setNewPassword(e?.target?.value)}
          />
        </div>
        <div>
          <Label>Confirmar Senha</Label>
          <Input
            type="password"
            className="mt-1.5"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e?.target?.value)}
          />
          {errorMessage && (
              <p className="block text-red-500 text-sm font-bold mb-2">{errorMessage}</p>
          )}
        </div>
        <div className="pt-2">
          <ButtonPrimary onClick={handleUpdatePassword}>Atualizar Senha</ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default AccountPass;
