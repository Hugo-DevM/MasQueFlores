import type { Metadata } from "next";
import TiendaClient from "./TiendaClient";

export const metadata: Metadata = {
  title: "Tienda",
  description:
    "Explora nuestro catálogo completo de arreglos florales en Puerto Vallarta. Ramos siempre disponibles, flores de temporada y pedidos especiales.",
  alternates: { canonical: "https://floreriatulipan.mx/tienda" },
  openGraph: {
    title: "Tienda | Florería Tulipán",
    description:
      "Explora nuestro catálogo de arreglos florales en Puerto Vallarta.",
    url: "https://floreriatulipan.mx/tienda",
  },
};

export default function TiendaPage() {
  return <TiendaClient />;
}
