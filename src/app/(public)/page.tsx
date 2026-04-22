"use client";

import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import {
  Product,
  Category,
  CATEGORY_LABELS,
  CATEGORY_DESCRIPTIONS,
  CATEGORY_ICONS,
} from "@/types";

export default function HomePage() {
  const { products, loading } = useProducts();

  const visible = products.filter((p) => p.visible);
  const featured = visible.filter((p) => p.featured).slice(0, 4);

  const categories = Object.keys(CATEGORY_LABELS) as Category[];

  return (
    <>
      {/* ── Hero ── */}
      <Hero />

      {/* ── Categorías ── */}
      <section id="categorias" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">
              Explora
            </span>
            <h2 className="font-display text-4xl font-bold text-gray-900 mt-2">
              Nuestras Categorías
            </h2>
            <p className="text-gray-500 mt-3 max-w-md mx-auto">
              Encuentra el arreglo perfecto para cada ocasión
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/tienda?cat=${cat}`}
                className="group relative rounded-2xl overflow-hidden bg-charcoal-900 hover:shadow-lg hover:shadow-charcoal-900/30 transition-all duration-300 p-8 border border-charcoal-800 hover:border-primary-500"
              >
                <div className="text-5xl mb-4">{CATEGORY_ICONS[cat]}</div>
                <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">
                  {CATEGORY_LABELS[cat]}
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  {CATEGORY_DESCRIPTIONS[cat]}
                </p>
                <div className="mt-4 text-gold-400 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Ver colección
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Productos destacados ── */}
      {(loading || featured.length > 0) && (
        <section className="py-20 bg-primary-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">
                Especiales
              </span>
              <h2 className="font-display text-4xl font-bold text-gray-900 mt-2">
                Arreglos Destacados
              </h2>
              <p className="text-gray-500 mt-3">
                Los favoritos de nuestros clientes
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl aspect-square animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-5">
                {featured.map((p) => (
                  <div
                    key={p.id}
                    className="w-[calc(50%-10px)] md:w-[calc(25%-15px)] min-w-[200px] max-w-[280px]"
                  >
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            )}

            <div className="text-center mt-10">
              <Link
                href="/tienda"
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3.5 rounded-full font-semibold transition-colors shadow-lg"
              >
                Ver catálogo completo
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Nosotros ── */}
      <section id="nosotros" className="bg-white">
        {/* Imagen panorámica con overlay y texto centrado */}
        <div className="relative h-[520px] overflow-hidden">
          <Image
            src="/images/about.webp"
            alt="Arreglos florales Mas que Flores"
            fill
            className="object-cover"
          />
          {/* Gradiente oscuro */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />

          {/* Contenido centrado */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <span className="text-gold-400 font-semibold text-sm uppercase tracking-widest mb-3">
              Nuestra historia
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight max-w-2xl">
              Creamos <span className="text-gold-400 italic">Momentos</span>{" "}
              Inolvidables
            </h2>
            <p className="text-white/75 mt-5 max-w-xl text-base leading-relaxed">
              Somos una florería apasionada con sede en Puerto Vallarta,
              dedicada a crear arreglos florales que hablan por ti cuando las
              palabras no son suficientes. Cada flor seleccionada con cuidado,
              cada arreglo diseñado con amor.
            </p>
            <Link
              href="/contacto"
              className="mt-8 inline-block bg-primary-500 hover:bg-primary-600 text-white px-8 py-3.5 rounded-full font-semibold transition-colors shadow-lg"
            >
              Contáctanos
            </Link>
          </div>
        </div>

        {/* Fila de stats / valores */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {[
              {
                icon: "🌹",
                label: "Flores Frescas",
                sub: "Seleccionadas diariamente para garantizar calidad",
              },
              {
                icon: "🚚",
                label: "Entrega Rápida",
                sub: "Cubrimos Puerto Vallarta y zona metropolitana",
              },
              {
                icon: "💝",
                label: "Hecho con Amor",
                sub: "Diseños únicos pensados para cada ocasión",
              },
            ].map((f) => (
              <div key={f.label} className="flex items-start gap-4 px-8 py-10">
                <span className="text-3xl shrink-0">{f.icon}</span>
                <div>
                  <div className="font-bold text-gray-900 text-base">
                    {f.label}
                  </div>
                  <div className="text-sm text-gray-500 mt-1 leading-relaxed">
                    {f.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Todos los productos ── */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">
              Catálogo
            </span>
            <h2 className="font-display text-4xl font-bold text-gray-900 mt-2">
              Todos los Arreglos
            </h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl aspect-square animate-pulse"
                />
              ))}
            </div>
          ) : visible.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <div className="text-5xl mb-4">🌸</div>
              <p>Próximamente tendremos arreglos disponibles</p>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-5">
              {visible.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  className="w-[calc(50%-10px)] md:w-[calc(25%-15px)] min-w-[200px] max-w-[280px]"
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}

          {!loading && visible.length > 0 && (
            <div className="text-center mt-10">
              <Link
                href="/tienda"
                className="border-2 border-primary-500 text-primary-500 hover:bg-primary-50 px-8 py-3.5 rounded-full font-semibold transition-colors"
              >
                Ver todos los arreglos
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 bg-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary-800 rounded-full opacity-30" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary-700 rounded-full opacity-20" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="text-gold-400 font-semibold text-sm uppercase tracking-widest mb-4 block">
            Mas que Flores
          </span>
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            ¿Lista para sorprender?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
            Regálale a esa persona especial un detalle hermoso. Contáctanos hoy.
          </p>
          <Link
            href="/contacto"
            className="bg-primary-500 hover:bg-primary-600 text-white px-10 py-4 rounded-full font-bold transition-colors shadow-lg border border-gold-500/20"
          >
            Hacer un pedido
          </Link>
        </div>
      </section>
    </>
  );
}
