"use client";
import React, { useEffect, useState } from "react";
import SectionHero2 from "@/components/SectionHero/SectionHero2";
import About from "@/components/About/About";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import logoImg from "@/images/logo.svg";
import Image from "next/image";

interface MobilePopupProps {
  os?: "android" | "ios";
  onClose: () => void;
}

const MobilePopup: React.FC<MobilePopupProps> = ({ os, onClose }) => {
  const appLinks = {
    android: "intent://details?id=br.com.luugo.app#Intent;scheme=market;package=br.com.luugo.app;end",
    ios: "#",
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#fff",
        boxShadow: "0 -4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "16px 16px 0 0",
        padding: "20px",
        textAlign: "center",
        zIndex: 1000,
      }}
      // aria-live="polite" // Para acessibilidade
    >
      {/* Logo centralizado no topo */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Image src={logoImg} alt="Logo" width={80} height={80} />
      </div>

      {/* Texto do popup */}
      <h2
        style={{
          fontSize: "16px",
          marginBottom: "10px",
          color: "#333",
          lineHeight: "1.4",
        }}
      >
        Abra o app para alugar com mais facilidade e rapidez
      </h2>

      {/* Botão principal */}
      {os && (
        <a
          href={appLinks[os]}
          target="_blank"
          rel="noopener noreferrer"
          className={`ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 shadow-xl`}
          style={{
            display: "block",
            margin: "10px auto 10px",
            padding: "10px 20px",
            borderRadius: "8px",
            textDecoration: "none",
            maxWidth: "300px",
          }}
        >
          Ir para a Loja
        </a>
      )}

      {/* Botão de "Agora não" */}
      <button
        onClick={onClose}
        style={{
          display: "block",
          margin: "10px auto 10px",
          padding: "10px 20px",
          borderRadius: "8px",
          backgroundColor: "#f8f9fa",
          color: "#333",
          border: "1px solid #ddd",
          cursor: "pointer",
          maxWidth: "300px",
          width: "100%",
          textAlign: "center",
        }}
      >
        Agora não
      </button>
    </div>
  );
};

function PageHome() {
  const [isMobile, setIsMobile] = useState(false);
  const [os, setOs] = useState<"android" | "ios" | undefined>(undefined);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const userAgent = navigator.userAgent;

    const mobile = /android|iphone|ipad|ipod/i.test(userAgent);
    setIsMobile(mobile);

    if (/android/i.test(userAgent)) {
      setOs("android");
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      setOs("ios");
    }
  }, []);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="nc-PageHome relative overflow-hidden">
      {isMobile && showPopup && <MobilePopup os={os} onClose={closePopup} />}

      <SectionHero2 />

      <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-72">
        <HowItWorks />
      </div>

      <div className="container flex items-center relative space-y-24 my-24 lg:space-y-32 lg:my-72">
        <About />
      </div>
    </div>
  );
}

export default PageHome;
