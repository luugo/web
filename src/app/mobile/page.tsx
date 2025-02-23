"use client";
import React, { useEffect } from "react";

export default function MobileRedirect() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const userAgent = navigator.userAgent || "";
    let redirectUrl = "/";
    let platform = "unknown";

    if (/android/i.test(userAgent)) {
      redirectUrl =
        "https://play.google.com/store/apps/details?id=br.com.luugo.app";
      platform = "android";
    } else if (/iPod|iPhone|iPad|Mac OS|Macintosh/.test(userAgent)) {
      redirectUrl = "https://apps.apple.com/br/app/luugo/id1625096181";
      platform = "ios";
    }

    const urlParams = new URLSearchParams(window.location.search);
    const utmParams = ["utm_source", "utm_medium", "utm_campaign"]
      .map((param) =>
        urlParams.get(param)
          ? `${param}=${encodeURIComponent(urlParams.get(param) || "")}`
          : "",
      )
      .filter((param) => param)
      .join("&");

    if (utmParams) {
      redirectUrl += (redirectUrl.includes("?") ? "&" : "?") + utmParams;
    }

    if (typeof window.dataLayer === "function") {
      window.dataLayer("event", "page_view", {
        utm_source: urlParams.get("utm_source"),
        utm_medium: urlParams.get("utm_medium"),
        utm_campaign: urlParams.get("utm_campaign"),
        event_category: "redirect",
        event_label: platform,
        value: 1,
      });
    }

    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 800);
  }, []);

  return (
    <div>
      <div className="container px-4 -bottom-4 -top-4">
        <h5>Redirecionando ...</h5>
      </div>
    </div>
  );
}
