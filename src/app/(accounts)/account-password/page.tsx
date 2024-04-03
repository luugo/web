"use client"
import Label from "@/components/Label/Label";
import React, { useCallback, useEffect, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import { AuthenticationApi } from "../../../../luugoapi";
import { error } from "console";

const AccountPass = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');

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
        const response = await authApi?.authenticationEmailPut(requestParameters, {
          headers: {
            "Authorization": `Bearer ${storage?.token}`,
            "Content-Type": "application/json",
          },
        })
        return response
      } catch (error) {
        console.log('error', error)
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
        </div>
        <div className="pt-2">
          <ButtonPrimary onClick={handleUpdatePassword}>Atualizar Senha</ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default AccountPass;
