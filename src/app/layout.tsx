import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "Mas que Flores | Ramos Florales Puerto Vallarta",
  description:
    "Arreglos florales únicos diseñados con amor en Puerto Vallarta. Regálale a esa persona especial un detalle hermoso. Envío a domicilio.",
  keywords:
    "florería, flores, ramos florales, arreglos florales, bouquet, rosas, Puerto Vallarta, Jalisco, flores a domicilio, Mas que Flores",
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
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
