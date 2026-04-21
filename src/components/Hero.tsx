"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-white pt-16 overflow-hidden">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:h-[600px]">

          {/* ── Left column ── */}
          <div className="lg:w-[45%] flex flex-col justify-between">

            {/* Top block */}
            <div className="space-y-6 max-w-md">
              <h1 className="font-display text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                Regala <span className="text-primary-500">flores</span><br />
                frescas a quien<br />
                <span className="text-primary-500">más</span> quieres.
              </h1>
              <p className="text-gray-500 text-base leading-relaxed">
                Arreglos florales únicos para cada ocasión especial, diseñados
                con amor en <span className="text-charcoal-900 font-semibold">Puerto Vallarta</span> y entregados directo a tu puerta.
              </p>
              <Link
                href="/tienda"
                className="inline-block bg-charcoal-900 hover:bg-charcoal-800 text-white px-7 py-3 rounded-full font-semibold text-sm transition-all duration-200 border border-gold-500/30"
              >
                Ver Arreglos Florales
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-12 py-4">
              <div>
                <div className="text-3xl font-bold text-primary-500">+500</div>
                <div className="text-sm text-gray-500 mt-0.5">Arreglos entregados</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-500">1,200+</div>
                <div className="text-sm text-gray-500 mt-0.5">Clientes satisfechos</div>
              </div>
            </div>

            {/* Trusted by */}
            <div>
              <p className="text-xs uppercase tracking-widest text-gold-500 mb-3 font-medium">
                Con la confianza de
              </p>
              <div className="flex gap-6 items-center">
                {["Puerto Vallarta", "Nayarit", "Guadalajara"].map((item) => (
                  <span key={item} className="text-sm text-gray-500 font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right column: asymmetric card grid ── */}
          <div className="lg:w-[55%] grid grid-cols-2 grid-rows-2 gap-4 lg:h-full">

            {/* Top-right card (col 2, row 1 only) */}
            <div className="col-start-2 row-start-1 relative rounded-2xl overflow-hidden h-full">
              <Image
                src="/images/hero1.webp"
                alt="Ramos de rosas"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs font-semibold text-gold-400 mb-1">Más vendido</p>
                <h3 className="text-base font-bold leading-snug">Ramos de rosas frescas</h3>
              </div>
            </div>

            {/* Bottom-left card (col 1, rows 1-2 — tall) */}
            <div className="col-start-1 row-start-1 row-span-2 relative rounded-2xl overflow-hidden h-[280px] lg:h-full">
              <Image
                src="/images/hero2.webp"
                alt="Arreglos florales"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="text-xs font-semibold text-gold-400 mb-1">Especial</p>
                <h3 className="text-xl font-bold leading-snug">Arreglos para cada ocasión</h3>
              </div>
            </div>

            {/* Bottom-right card (col 2, row 2) */}
            <div className="col-start-2 row-start-2 relative rounded-2xl overflow-hidden h-full">
              <Image
                src="/images/hero3.webp"
                alt="Cajas florales"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs font-semibold text-gold-400 mb-1">Nuevo</p>
                <h3 className="text-base font-bold leading-snug">Cajas florales de lujo</h3>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
