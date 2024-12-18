import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export default function MobileRedirect() {
  const requestHeaders = headers();
  const userAgent = requestHeaders.get("user-agent") || "";

  if (/android/i.test(userAgent)) {
    redirect("intent://details?id=br.com.luugo.app#Intent;scheme=market;package=br.com.luugo.app;end");
  } else if (/iPad|iPhone|iPod/.test(userAgent)) {
    redirect("https://apps.apple.com/");
  } else {
    redirect("/");
  }
}

