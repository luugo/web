"use client";

import {useEffect} from "react";
import {usePathname} from "next/navigation";

const GoogleTagManager = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!document.getElementById("google-tag-manager")) {
      const scriptTagManager: HTMLScriptElement = document.createElement("script");
      scriptTagManager.id = "google-tag-manager";
      scriptTagManager.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-W75H4VVQ');
      `;
      document.head.appendChild(scriptTagManager);
    }
  }, [pathname]);

  return null;
};

export default GoogleTagManager;
