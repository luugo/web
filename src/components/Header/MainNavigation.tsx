"use client";

import React, { FC } from "react";
import Logo from "@/shared/Logo/Logo";
import Account from "./Account";

export type MainNav2LoggedProps = object;

const MainNavigation: FC<MainNav2LoggedProps> = () => {
  return (
    <div className="relative mx-auto z-10 bg-white border-b border-slate-100 px-10 2xl:px-20 xl:px-20 lg:px-10 md:px-10 sm:px-10 py-3">
      <div className="flex gap-6 justify-between">
        <div className="flex items-center ">
          {/* <MenuBar /> */}
          <Logo className="flex-shrink-0 hidden md:flex px-5" />
        </div>

        <Account />
      </div>
    </div>
  );
};

export default MainNavigation;
