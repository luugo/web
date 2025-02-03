"use client";

import {useEffect} from "react";
import {usePathname} from "next/navigation";

const GA_TRACKING_ID = "G-23XR5GPX7N";

const GoogleAnalytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!document.getElementById("google-analytics-script")) {
      const scriptTag = document.createElement("script");
      scriptTag.async = true;
      scriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
      scriptTag.id = "google-analytics-script";
      document.head.appendChild(scriptTag);

      const scriptInit = document.createElement("script");
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
    }
  }, [pathname]);

  return null;
};

export default GoogleAnalytics;
