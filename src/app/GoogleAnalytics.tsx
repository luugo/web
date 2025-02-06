"use client";

import {useEffect} from "react";
import {usePathname} from "next/navigation";

const GA_TRACKING_ID = "G-23XR5GPX7N";

const GoogleAnalytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!document.getElementById("google-analytics-script")) {
      const scriptTag: HTMLScriptElement = document.createElement("script");
      scriptTag.async = true;
      scriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
      scriptTag.id = "google-analytics-script";
      document.head.appendChild(scriptTag);

      const scriptInit: HTMLScriptElement = document.createElement("script");
      scriptInit.id = "google-analytics-init";
      scriptInit.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_TRACKING_ID}', {
          page_path: window.location.pathname,
        });
      `;
      document.head.appendChild(scriptInit);

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

export default GoogleAnalytics;
