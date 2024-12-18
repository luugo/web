// src/app/mobile/page.tsx
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function MobileRedirect() {
  return null;
}

export async function generateMetadata({ headers }: { headers: Headers }) {
  const userAgent = headers.get("user-agent") || "";

  if (/android/i.test(userAgent)) {
    redirect("https://play.google.com/store/apps/details?id=com.seuapp");
  } else if (/iPad|iPhone|iPod/.test(userAgent)) {
    redirect("https://apps.apple.com/app/id123456789");
  } else {
    redirect("/");
  }

  return {};
}
