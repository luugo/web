import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export default function MobileRedirect() {
  const requestHeaders = headers();
  const userAgent = requestHeaders.get("user-agent") || "";

  if (/android/i.test(userAgent)) {
    redirect("https://play.google.com/store/apps/details?id=com.seuapp");
  } else if (/iPad|iPhone|iPod/.test(userAgent)) {
    redirect("https://apps.apple.com/app/id123456789");
  } else {
    redirect("/");
  }

  return null;
}

