"use client";

import React from "react";
import UTMLink from "@/components/UTMLink";

export interface LogoProps {
  img?: string;
  imgLight?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "flex-shrink-0" }) => {
  return (
    <UTMLink
      href="/"
      className={`ttnc-logo inline-block text-slate-600 ${className}`}
    >
      <img
        className={`max-h-8 h-full w-full block`}
        src="https://s3.sa-east-1.amazonaws.com/cdn.luugo.com.br/logo.svg"
        alt="Logo"
      />
    </UTMLink>
  );
};

export default Logo;
