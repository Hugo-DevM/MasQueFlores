"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import { Product, Category, CATEGORY_LABELS } from "@/types";

function TiendaContent() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat") as Category | null;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState<Category | "all">(
    catParam ?? "all",
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((d) => setProducts(d.products ?? []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const visible = products.filter((p) => p.visible);

  const filtered = visible.filter((p) => {
    const matchCat = selectedCat === "all" || p.category === selectedCat;
    const matchSearch =
      search.trim() === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-12 text-center">
          <span className="text-primary-500 font-semibold text-sm uppercase tracking-widest">
            Catálogo
          </span>
          <h1
            className="text-4xl font-bold text-gray-900 mt-2"
            
          >
            Nuestros Arreglos
          </h1>
          <p className="text-gray-500 mt-2">
            Encuentra el arreglo perfecto para cada momento especial
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
          <CategoryFilter selected={selectedCat} onChange={setSelectedCat} />

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Buscar arreglos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-primary-400 bg-white"
            />
          </div>
        </div>

        {/* Active category label */}
        {selectedCat !== "all" && (
          <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
            <span>Mostrando:</span>
            <span className="font-semibold text-primary-600">
              {CATEGORY_LABELS[selectedCat]}
            </span>
            <button
              onClick={() => setSelectedCat("all")}
              className="text-gray-400 hover:text-gray-600 ml-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl aspect-square animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 font-medium">
              No encontramos arreglos con esos criterios
            </p>
            <button
              onClick={() => {
                setSelectedCat("all");
                setSearch("");
              }}
              className="mt-4 text-primary-500 hover:underline text-sm font-medium"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-400 mb-4">
              {filtered.length} arreglo{filtered.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function TiendaPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-primary-500 text-4xl animate-bounce">🌸</div>
        </div>
      }
    >
      <TiendaContent />
    </Suspense>
  );
}
