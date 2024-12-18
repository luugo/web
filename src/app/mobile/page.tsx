import { redirect } from "next/navigation";

export default function MobileRedirect() {
  const userAgent = typeof window !== "undefined" ? navigator.userAgent : "";

  if (/android/i.test(userAgent)) {
    redirect("https://play.google.com/store/apps/details?id=br.com.luugo.app");
  } else if (/iPad|iPhone|iPod/.test(userAgent)) {
    redirect("/");
  } else {
    redirect("/");
  }
}


