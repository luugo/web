import { Poppins } from "next/font/google";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import Footer from "@/shared/Footer/Footer";
import SiteHeader from "@/app/SiteHeader";
import CommonClient from "./CommonClient";
import { Providers } from "@/providers";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Script from "next/script";

export const metadata = {
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
  type: "website",
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
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html lang="en" dir="" className={poppins.className}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-23XR5GPX7N"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-23XR5GPX7N');
        `}
        </Script>
      </head>
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <GoogleOAuthProvider clientId="637549763916-sa80ph8s7nsbpdhtnv3bf6a1q29s3fae.apps.googleusercontent.com">
          <Providers>
            <SiteHeader />
            {children}
            <CommonClient />
            <Footer />
          </Providers>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
