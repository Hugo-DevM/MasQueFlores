"use client";

import { useState } from "react";
import Image from "next/image";
import { Product, CATEGORY_LABELS } from "@/types";

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onRefresh: () => void;
}

export default function ProductList({ products, onEdit, onRefresh }: Props) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function toggleVisibility(product: Product) {
    setLoadingId(product.id);
    try {
      await fetch("/api/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: product.id, visible: !product.visible }),
      });
      onRefresh();
    } finally {
      setLoadingId(null);
    }
  }

  async function deleteProduct(id: string) {
    if (!confirm("¿Eliminar este arreglo? Esta acción no se puede deshacer."))
      return;
    setLoadingId(id);
    try {
      await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      onRefresh();
    } finally {
      setLoadingId(null);
    }
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
        <div className="text-5xl mb-3">🌸</div>
        <p className="text-gray-500 font-medium">
          No hay arreglos en el catálogo
        </p>
        <p className="text-gray-400 text-sm mt-1">
          Crea tu primer arreglo con el botón de arriba
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className={`bg-white rounded-2xl border overflow-hidden shadow-sm transition-opacity ${
            !product.visible ? "opacity-60" : "border-gray-100"
          } ${loadingId === product.id ? "pointer-events-none" : ""}`}
        >
          {/* Image */}
          <div className="relative aspect-video bg-primary-50">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl">
                🌸
              </div>
            )}
            {/* Badges */}
            <div className="absolute top-2 left-2 flex gap-1.5 flex-wrap">
              {!product.visible && (
                <span className="bg-gray-800/70 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">
                  Oculto
                </span>
              )}
              {product.featured && (
                <span className="bg-yellow-400/90 text-yellow-900 text-xs px-2 py-0.5 rounded-full">
                  ⭐ Destacado
                </span>
              )}
              {product.badge && (
                <span className="bg-primary-500/90 text-white text-xs px-2 py-0.5 rounded-full">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-semibold text-gray-900 text-sm line-clamp-1 flex-1">
                {product.name}
              </h3>
              <span className="text-primary-600 font-bold text-sm shrink-0">
                ${product.price.toLocaleString("es-MX")}
              </span>
            </div>

            <span className="inline-block text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full mb-3">
              {CATEGORY_LABELS[product.category]}
            </span>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(product)}
                className="flex-1 text-xs border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-600 py-2 rounded-lg transition-colors font-medium"
              >
                Editar
              </button>
              <button
                onClick={() => toggleVisibility(product)}
                className={`flex-1 text-xs py-2 rounded-lg transition-colors font-medium ${
                  product.visible
                    ? "border border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-600"
                    : "bg-primary-50 text-primary-600 border border-primary-200 hover:bg-primary-100"
                }`}
              >
                {product.visible ? "Ocultar" : "Mostrar"}
              </button>
              <button
                onClick={() => deleteProduct(product.id)}
                className="text-xs border border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-500 py-2 px-3 rounded-lg transition-colors"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
