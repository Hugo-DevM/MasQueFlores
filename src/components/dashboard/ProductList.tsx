"use client";

import { useState } from "react";
import Image from "next/image";
import { Product, Category, CATEGORY_LABELS } from "@/types";
import ConfirmDialog from "./ConfirmDialog";

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onRefresh: () => void;
  onAdd: () => void;
}

const FILTERS: { key: Category | "all"; label: string }[] = [
  { key: "all",               label: "Todos" },
  { key: "siempre_disponible", label: "Siempre Disponibles" },
  { key: "temporada",          label: "Por Temporada" },
  { key: "sobre_pedido",       label: "Sobre Pedido" },
];

export default function ProductList({ products, onEdit, onRefresh, onAdd }: Props) {
  const [loadingId, setLoadingId]           = useState<string | null>(null);
  const [filter, setFilter]                 = useState<Category | "all">("all");
  const [search, setSearch]                 = useState("");
  const [confirmId, setConfirmId]           = useState<string | null>(null);

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
      setConfirmId(null);
    }
  }

  const filtered = products
    .filter((p) => filter === "all" || p.category === filter)
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

      {/* ── Top bar: filtros + agregar ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-gray-100">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === f.key
                  ? "bg-primary-500 text-white"
                  : "border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-500"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <button
          onClick={onAdd}
          className="bg-primary-500 hover:bg-primary-600 text-white px-5 py-2 rounded-full font-semibold text-sm transition-colors flex items-center gap-1.5"
        >
          <span className="text-lg leading-none">+</span>
          Agregar Producto
        </button>
      </div>

      {/* ── Buscador ── */}
      <div className="px-5 py-3 border-b border-gray-100">
        <div className="relative max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre…"
            className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
          />
        </div>
      </div>

      {/* ── Tabla ── */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-2">🌸</div>
          <p className="text-sm">No se encontraron arreglos</p>
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-gray-400 border-b border-gray-100">
              <th className="text-left px-5 py-3 font-semibold">Producto</th>
              <th className="text-left px-5 py-3 font-semibold">Categoría</th>
              <th className="text-left px-5 py-3 font-semibold">Precio</th>
              <th className="text-left px-5 py-3 font-semibold">Estado</th>
              <th className="text-right px-5 py-3 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((product) => (
              <tr
                key={product.id}
                className={`hover:bg-gray-50 transition-colors ${
                  loadingId === product.id ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                {/* Producto */}
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-primary-50 shrink-0">
                      {product.image ? (
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl">🌸</div>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 flex items-center gap-1.5">
                        {product.name}
                        {product.featured && <span className="text-gold-500 text-xs">★</span>}
                      </div>
                      {product.badge && (
                        <span className="text-xs text-primary-500 font-medium">{product.badge}</span>
                      )}
                    </div>
                  </div>
                </td>

                {/* Categoría */}
                <td className="px-5 py-3 text-gray-500">
                  {CATEGORY_LABELS[product.category]}
                </td>

                {/* Precio */}
                <td className="px-5 py-3">
                  <span className="font-bold text-gray-900">
                    ${product.price.toLocaleString("es-MX")}
                  </span>
                </td>

                {/* Estado */}
                <td className="px-5 py-3">
                  <button
                    onClick={() => toggleVisibility(product)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                      product.visible
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${product.visible ? "bg-green-500" : "bg-gray-400"}`} />
                    {product.visible ? "Visible" : "Oculto"}
                  </button>
                </td>

                {/* Acciones */}
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => onEdit(product)}
                      className="text-blue-400 hover:text-blue-600 transition-colors"
                      title="Editar"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setConfirmId(product.id)}
                      className="text-red-300 hover:text-red-500 transition-colors"
                      title="Eliminar"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>

    {/* Custom confirm dialog */}
    {confirmId && (
      <ConfirmDialog
        title="¿Eliminar arreglo?"
        message="Esta acción no se puede deshacer. El arreglo y su imagen serán eliminados permanentemente."
        confirmLabel="Sí, eliminar"
        onConfirm={() => deleteProduct(confirmId)}
        onCancel={() => setConfirmId(null)}
      />
    )}
    </>
  );
}
