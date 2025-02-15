import { Poppins } from "next/font/google";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import Footer from "@/shared/Footer/Footer";
import CommonClient from "./CommonClient";
import { Providers } from "@/providers";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleTagManager from "@/app/GoogleTagManager";
import { Metadata } from "next";
import React, { Suspense } from "react";
import UTMTracker from "@/components/UTMTracker";
import MainNavigation from "@/components/Header/MainNavigation";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.luugo.com.br/"),
  title: "Luugo | Precisou? Alugou!",
  description: "Alugue qualquer coisa de forma fácil e rápida!",
  keywords: [
    "marketplace de aluguel",
    "aluguel de itens",
    "plataforma de locação",
    "aluguel de equipamentos",
    "aluguel de móveis",
    "aluguel de ferramentas",
    "locação de produtos",
    "aluguel de acessórios",
    "serviços de aluguel online",
    "aluguel de objetos",
    "marketplace de locação",
    "alugar itens",
    "aluguel de bens",
    "aluguel colaborativo",
    "aluguel compartilhado",
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Luugo | Precisou? Alugou!",
    description: "Alugue qualquer coisa de forma fácil e rápida!",
    images: "metadata/thumbnail_default.png",
  },
};

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="" className={poppins.className}>
      <GoogleTagManager />
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W75H4VVQ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <GoogleOAuthProvider clientId="637549763916-sa80ph8s7nsbpdhtnv3bf6a1q29s3fae.apps.googleusercontent.com">
          <Providers>
            <MainNavigation />
            <Suspense fallback={null}>
              <UTMTracker />
            </Suspense>
            {children}
            <CommonClient />
            <Footer />
          </Providers>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
