"use client";
import { UserProvider } from "@/context";
import React from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <UserProvider>{children}</UserProvider>
    </>
  );
};
