"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Product } from "@/types";
import ProductList from "@/components/dashboard/ProductList";
import ProductForm from "@/components/dashboard/ProductForm";

export default function DashboardPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("floreria_auth");
      if (!auth) router.replace("/dashboard/login");
    }
  }, [router]);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products ?? []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  function handleLogout() {
    sessionStorage.removeItem("floreria_auth");
    router.replace("/dashboard/login");
  }

  function handleEdit(product: Product) {
    setEditProduct(product);
    setShowForm(true);
  }

  function handleNewProduct() {
    setEditProduct(null);
    setShowForm(true);
  }

  function handleFormClose() {
    setShowForm(false);
    setEditProduct(null);
    loadProducts();
  }

  const visible = products.filter((p) => p.visible).length;
  const hidden = products.filter((p) => !p.visible).length;
  const featured = products.filter((p) => p.featured).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <span
                className="text-lg font-bold"
                
              >
                <span className="text-gray-900">Mas que</span>
                <span className="text-primary-500"> Flores</span>
              </span>
            </Link>
            <span className="hidden sm:block text-gray-300">|</span>
            <span className="hidden sm:block text-sm text-gray-500">
              Panel de Administración
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-sm text-gray-500 hover:text-primary-500 transition-colors"
            >
              Ver tienda ↗
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:text-red-700 transition-colors"
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total arreglos", value: products.length, icon: "🌸" },
            { label: "Visibles", value: visible, icon: "👁️" },
            { label: "Ocultos", value: hidden, icon: "🚫" },
            { label: "Destacados", value: featured, icon: "⭐" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center"
            >
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-2xl font-bold text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Gestiona tu catálogo de florería
          </h2>
          <button
            onClick={handleNewProduct}
            className="bg-primary-500 hover:bg-primary-600 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors flex items-center gap-2"
          >
            <span>+</span>
            <span>Nuevo arreglo</span>
          </button>
        </div>

        {/* Product list */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl h-48 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <ProductList
            products={products}
            onEdit={handleEdit}
            onRefresh={loadProducts}
          />
        )}
      </div>

      {/* Form modal */}
      {showForm && (
        <ProductForm
          product={editProduct}
          onClose={handleFormClose}
          onSaved={handleFormClose}
        />
      )}
    </div>
  );
}
