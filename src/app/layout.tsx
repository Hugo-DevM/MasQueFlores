import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://masqueflores.mx"),
  title: {
    default: "Mas que Flores | Florería en Puerto Vallarta",
    template: "%s | Mas que Flores",
  },
  description:
    "Arreglos florales únicos diseñados con amor en Puerto Vallarta. Ramos, bouquets y pedidos especiales. Atención de lunes a domingo.",
  keywords:
    "florería, flores, ramos florales, arreglos florales, bouquet, rosas, Puerto Vallarta, Jalisco, flores a domicilio, Mas que Flores, florería Puerto Vallarta",
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://masqueflores.mx",
    siteName: "Mas que Flores",
    title: "Mas que Flores | Florería en Puerto Vallarta",
    description:
      "Arreglos florales únicos diseñados con amor en Puerto Vallarta. Envío a domicilio, atención de lunes a domingo.",
    images: [
      {
        url: "/images/hero1.webp",
        width: 1200,
        height: 630,
        alt: "Mas que Flores – Arreglos Florales Puerto Vallarta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mas que Flores | Florería en Puerto Vallarta",
    description:
      "Arreglos florales únicos diseñados con amor en Puerto Vallarta.",
    images: ["/images/hero1.webp"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://masqueflores.mx" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Jost', sans-serif" }}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-991ZEEP9T0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-991ZEEP9T0');
          `}
        </Script>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
