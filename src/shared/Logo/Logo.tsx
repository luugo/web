"use client";

import React from "react";
import Link from "next/link";

export interface LogoProps {
  img?: string;
  imgLight?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "flex-shrink-0" }) => {
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    window.location.href = "/";
  };
  return (
    <Link
      href="/"
      onClick={handleClick}
      className={`ttnc-logo inline-block text-slate-600 ${className}`}
    >
      <img
        className={`block h-8 sm:h-10 w-auto`}
        src="https://s3.sa-east-1.amazonaws.com/cdn.luugo.com.br/logo.svg"
        alt="Logo"
        sizes="200px"
      />
    </Link>
  );
};

export default Logo;
