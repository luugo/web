"use client";
import React, { useEffect, useState } from "react";
import SectionHero2 from "@/components/SectionHero/SectionHero2";
import About from "@/components/About/About";
import HowItWorks from "@/components/HowItWorks/HowItWorks";

// Componente do Popup
interface MobilePopupProps {
  os?: "android" | "ios"; // Especificando que 'os' pode ser 'android', 'ios', ou undefined
  onClose: () => void;
}

// Componente do Popup
const MobilePopup: React.FC<MobilePopupProps> = ({ os, onClose }) => {
  const appLinks = {
    android: "https://play.google.com/store/apps/details?id=br.com.luugo.app",
    ios: "#",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          textAlign: "center",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2>Baixe nosso App!</h2>
        <p>Para uma experiência melhor, baixe nosso aplicativo na loja.</p>
        {os && (
          <a
            href={appLinks[os]}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              margin: "10px 0",
              padding: "10px 20px",
              background: "#007BFF",
              color: "#fff",
              borderRadius: "5px",
              textDecoration: "none",
            }}
          >
            Ir para a Loja
          </a>
        )}
        <button
          onClick={onClose}
          style={{
            display: "block",
            marginTop: "10px",
            background: "transparent",
            border: "none",
            color: "#007BFF",
            cursor: "pointer",
          }}
        >
          Agora não
        </button>
      </div>
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
