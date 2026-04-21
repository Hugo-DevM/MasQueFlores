"use client";

import Image from "next/image";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

function getBadgeColor(badge: string): string {
  const b = badge.toLowerCase();
  if (b.includes("nuevo") || b.includes("new")) return "bg-blue-100 text-blue-700";
  if (b.includes("oferta") || b.includes("desc")) return "bg-orange-100 text-orange-700";
  if (b.includes("pedido") || b.includes("exclus")) return "bg-purple-100 text-purple-700";
  if (b.includes("temp") || b.includes("season")) return "bg-green-100 text-green-700";
  return "bg-primary-100 text-primary-700";
}

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart();

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col">
      {/* Image area */}
      <div className="relative bg-primary-50 aspect-square overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl select-none">🌸</span>
          </div>
        )}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${getBadgeColor(product.badge)}`}
          >
            {product.badge}
          </span>
        )}
        {product.featured && !product.badge && (
          <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-primary-100 text-primary-700">
            Destacado
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-1">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-2 flex-1">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-4 gap-2">
          <span className="text-primary-600 font-bold text-lg">
            ${product.price.toLocaleString("es-MX")}
          </span>
          <button
            onClick={() => addItem(product)}
            className="bg-primary-500 hover:bg-primary-600 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors shadow-sm hover:shadow-primary-200 hover:shadow-md"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
