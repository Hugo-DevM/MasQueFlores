import type { Metadata } from "next";
import ContactoClient from "./ContactoClient";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctanos por WhatsApp para hacer tu pedido de arreglos florales en Puerto Vallarta. Atención de lunes a domingo de 8 am a 10 pm.",
  alternates: { canonical: "https://masqueflores.mx/contacto" },
  openGraph: {
    title: "Contacto | Mas que Flores",
    description:
      "Escríbenos por WhatsApp para tu pedido de flores en Puerto Vallarta.",
    url: "https://masqueflores.mx/contacto",
  },
};

export default function ContactoPage() {
  return <ContactoClient />;
}
