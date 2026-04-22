import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Florist",
  name: "Mas que Flores",
  url: "https://masqueflores.mx",
  image: "https://masqueflores.mx/logo.webp",
  description:
    "Florería en Puerto Vallarta. Arreglos florales únicos, ramos y bouquets diseñados con amor. Pedidos especiales y envío a domicilio.",
  areaServed: {
    "@type": "City",
    name: "Puerto Vallarta",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "08:00",
    closes: "22:00",
  },
  priceRange: "$$",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <CartDrawer />
      <main>{children}</main>
      <Footer />
    </>
  );
}
