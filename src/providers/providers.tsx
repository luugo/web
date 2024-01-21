'use client'
import { UserProvider } from "@/context"

export const Providers = ({children}: { children: React.ReactNode}) => {
  return (
    <>
      <UserProvider>{ children }</UserProvider>
    </>
  );
}