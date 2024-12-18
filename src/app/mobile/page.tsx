"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MobileRedirect() {
  const router = useRouter();

  useEffect(() => {
    const userAgent = navigator.userAgent;

    if (/android/i.test(userAgent)) {
      window.location.href = "intent://details?id=br.com.luugo.app#Intent;scheme=market;package=br.com.luugo.app;end";
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      window.location.href = "https://apps.apple.com/";
    } else {
      router.push("/"); // Redireciona para a página inicial
    }
  }, [router]);

  return null; // Este componente não renderiza nada
}


