"use client";
import React, {useEffect} from "react";

export default function MobileRedirect() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const userAgent = navigator.userAgent || "";
    let redirectUrl = "/";
    let platform = "unknown";

    if (/android/i.test(userAgent)) {
      redirectUrl = "https://play.google.com/store/apps/details?id=br.com.luugo.app";
      platform = "android";
    } else if (/iPod|iPhone|iPad|Mac OS/.test(userAgent)) {
      redirectUrl = "https://apps.apple.com/br/app/luugo/id1625096181";
      platform = "ios";
    }

    if (typeof window.gtag === "function") {
      window.gtag("event", "qr_code", {
        event_category: "redirect",
        event_label: platform,
        value: 1,
      });
    }

    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 500);
  }, []);

  return (
    <div>
      <div className="container px-4 -bottom-4 -top-4">
        <h5>
          Redirecionando ...
        </h5>
      </div>
    </div>
  );
}