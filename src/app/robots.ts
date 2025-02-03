import type {MetadataRoute} from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Amazonbot",
        disallow: "/",
      },
      {
        userAgent: "ClaudeBot",
        disallow: "/",
      },
      {
        userAgent: "FacebookExternalHit",
      },
      {
        userAgent: "FacebookBot",
      },
      {
        userAgent: "Twitterbot",
      },
      {
        userAgent: "LinkedInBot",
      },
    ],
  };
}
