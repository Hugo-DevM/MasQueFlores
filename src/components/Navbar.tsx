"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { itemCount, toggleCart } = useCart();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<"inicio" | "nosotros">("inicio");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Detectar sección activa con IntersectionObserver (solo en home)
  useEffect(() => {
    if (pathname !== "/") return;

    const nosotros = document.getElementById("nosotros");
    if (!nosotros) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setActiveSection(entry.isIntersecting ? "nosotros" : "inicio");
      },
      { threshold: 0.25 }
    );

    observer.observe(nosotros);
    return () => observer.disconnect();
  }, [pathname]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname !== "/") return;

    if (href === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setMenuOpen(false);
    } else if (href === "/#nosotros") {
      e.preventDefault();
      document.getElementById("nosotros")?.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const isActive = (href: string) => {
    if (pathname !== "/") {
      return pathname === href;
    }
    if (href === "/") return activeSection === "inicio";
    if (href === "/#nosotros") return activeSection === "nosotros";
    return false;
  };

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/#nosotros", label: "Nosotros" },
    { href: "/tienda", label: "Tienda" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-primary-100"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" onClick={(e) => handleClick(e, "/")} className="flex items-center gap-2">
            <span className="font-display text-2xl font-semibold">
              <span className="text-gray-900">Florería</span>
              <span className="text-primary-500"> Tulipán</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={(e) => handleClick(e, l.href)}
                className={`text-sm font-medium transition-colors relative pb-0.5 ${
                  isActive(l.href)
                    ? "text-primary-500 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary-500 after:rounded-full"
                    : "text-gray-600 hover:text-primary-500"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Cart + mobile menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleCart}
              className="relative p-2 text-gray-600 hover:text-primary-500 transition-colors"
              aria-label="Abrir carrito"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-primary-500 transition-colors"
              onClick={() => setMenuOpen((p) => !p)}
              aria-label="Menú"
            >
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-primary-100">
            <nav className="flex flex-col gap-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleClick(e, l.href)}
                  className={`text-sm font-medium transition-colors py-1 ${
                    isActive(l.href)
                      ? "text-primary-500 font-semibold"
                      : "text-gray-600 hover:text-primary-500"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
