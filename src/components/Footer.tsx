import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-900 text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-display text-3xl font-semibold">
                <span className="text-white">Mas que</span>
                <span className="text-primary-400"> Flores</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Somos una florería apasionada en Puerto Vallarta, dedicada a crear
              arreglos que transmiten emociones y celebran los momentos más
              especiales de tu vida.
            </p>
            <p className="text-gold-400 font-semibold italic text-sm">
              "Regálale a esa persona especial un detalle hermoso"
            </p>
            {/* Social */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://www.facebook.com/profile.php?id=61579882343479"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 hover:bg-primary-500 rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 hover:bg-primary-500 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    ry="5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="17.5" cy="6.5" r="1" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-gold-400 font-semibold uppercase tracking-wider text-xs">
              Tienda
            </h3>
            <ul className="space-y-2">
              {[
                {
                  href: "/tienda?cat=siempre_disponible",
                  label: "Siempre Disponibles 🌹",
                },
                { href: "/tienda?cat=temporada", label: "Por Temporada 🌸" },
                { href: "/tienda?cat=sobre_pedido", label: "Sobre Pedido ✨" },
                { href: "/tienda", label: "Ver todo el catálogo" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-gold-400 font-semibold uppercase tracking-wider text-xs">
              Contacto
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">📍</span>
                <span>Puerto Vallarta, Jalisco</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">📱</span>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}`}
                  className="hover:text-primary-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">🕐</span>
                <span>Lunes a Domingo 8:00 – 22:00</span>
              </li>
            </ul>
            <Link
              href="/contacto"
              className="inline-block mt-2 text-sm text-primary-400 hover:text-primary-300 transition-colors font-medium"
            >
              Ver más información →
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-charcoal-800">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>
            © {year} Ramos Florales Mas que Flores. Todos los derechos
            reservados.
          </p>
          <Link
            href="/dashboard/login"
            className="hover:text-primary-400 transition-colors"
          >
            Panel de administración
          </Link>
        </div>
      </div>
    </footer>
  );
}
