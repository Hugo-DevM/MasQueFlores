import type { Metadata } from "next";
import TiendaClient from "./TiendaClient";

export const metadata: Metadata = {
  title: "Tienda",
  description:
    "Explora nuestro catálogo completo de arreglos florales en Puerto Vallarta. Ramos siempre disponibles, flores de temporada y pedidos especiales.",
  alternates: { canonical: "https://masqueflores.mx/tienda" },
  openGraph: {
    title: "Tienda | Mas que Flores",
    description:
      "Explora nuestro catálogo de arreglos florales en Puerto Vallarta.",
    url: "https://masqueflores.mx/tienda",
  },
};

export default function TiendaPage() {
  return <TiendaClient />;
}
