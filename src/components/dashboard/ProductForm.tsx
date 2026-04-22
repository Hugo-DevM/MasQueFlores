"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Product, Category, CATEGORY_LABELS } from "@/types";

interface Props {
  product: Product | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function ProductForm({ product, onClose, onSaved }: Props) {
  const isEditing = !!product;

  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(product?.price?.toString() ?? "");
  const [category, setCategory] = useState<Category>(
    product?.category ?? "siempre_disponible",
  );
  const [badge, setBadge] = useState(product?.badge ?? "");
  const [featured, setFeatured] = useState(product?.featured ?? false);
  const [visible, setVisible] = useState(product?.visible ?? true);
  const [imageUrl, setImageUrl]         = useState(product?.image ?? "");
  const [imagePublicId, setImagePublicId] = useState(product?.imagePublicId ?? "");
  // ID del producto — fijo desde el inicio para usarlo en el nombre de la imagen
  const [productId] = useState(product?.id ?? `prod_${Date.now()}`);

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("productId", productId);
      fd.append("category", category);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Error al subir imagen");
      const data = await res.json();
      setImageUrl(data.url ?? "");
      setImagePublicId(data.publicId ?? "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !price) {
      setError("El nombre y el precio son requeridos.");
      return;
    }
    if (parseFloat(price) <= 0) {
      setError("El precio debe ser mayor a $0.");
      return;
    }
    setSaving(true);
    setError("");

    const payload = {
      id: productId,
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      image: imageUrl,
      imagePublicId,
      category,
      badge: badge.trim(),
      featured,
      visible,
      createdAt: product?.createdAt ?? new Date().toISOString(),
    };

    try {
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch("/api/products", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Error al guardar");
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">
            {isEditing ? "Editar arreglo" : "Nuevo arreglo"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagen
            </label>
            <div
              className="relative border-2 border-dashed border-gray-200 rounded-xl h-72 flex items-center justify-center cursor-pointer hover:border-primary-300 transition-colors bg-primary-50/30 overflow-hidden"
              onClick={() => fileRef.current?.click()}
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="Preview"
                  fill
                  className="object-contain rounded-xl"
                />
              ) : (
                <div className="text-center text-gray-400">
                  <div className="text-4xl mb-1">🌸</div>
                  <p className="text-sm">Click para subir imagen</p>
                </div>
              )}
              {uploading && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-xl">
                  <span className="text-sm text-primary-500 font-medium animate-pulse">
                    Subiendo…
                  </span>
                </div>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Nombre *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Ramo de Rosas Rojas"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300 text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Descripción
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe el arreglo..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300 text-sm resize-none"
            />
          </div>

          {/* Price + Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Precio (MXN) *
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                onWheel={(e) => e.currentTarget.blur()}
                placeholder="0"
                min="1"
                step="0.01"
                required
                className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary-300 text-sm ${
                  price && parseFloat(price) <= 0
                    ? "border-red-400 bg-red-50"
                    : "border-gray-200"
                }`}
              />
              {price && parseFloat(price) <= 0 && (
                <p className="text-red-500 text-xs mt-1">El precio debe ser mayor a $0</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Categoría
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300 text-sm bg-white"
              >
                <option value="siempre_disponible">
                  {CATEGORY_LABELS.siempre_disponible}
                </option>
                <option value="temporada">{CATEGORY_LABELS.temporada}</option>
                <option value="sobre_pedido">
                  {CATEGORY_LABELS.sobre_pedido}
                </option>
              </select>
            </div>
          </div>

          {/* Badge */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Etiqueta <span className="text-gray-400 font-normal">(se muestra sobre la imagen)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { value: "",          label: "Sin etiqueta", cls: "bg-gray-200 text-gray-600 border-gray-300" },
                { value: "Nuevo",     label: "Nuevo",        cls: "bg-blue-600 text-white border-blue-700" },
                { value: "Oferta",    label: "Oferta",       cls: "bg-orange-500 text-white border-orange-600" },
                { value: "Exclusivo", label: "Exclusivo",    cls: "bg-purple-700 text-white border-purple-800" },
                { value: "Popular",   label: "Popular",      cls: "bg-primary-500 text-white border-primary-600" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setBadge(opt.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all ${opt.cls} ${
                    badge === opt.value ? "ring-2 ring-offset-2 ring-gray-500 scale-105" : "hover:scale-105"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <div
                onClick={() => setFeatured((p) => !p)}
                className={`w-10 h-5 rounded-full transition-colors relative ${
                  featured ? "bg-primary-500" : "bg-gray-200"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${
                    featured ? "left-5" : "left-0.5"
                  }`}
                />
              </div>
              <span className="text-sm text-gray-700">Destacado</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <div
                onClick={() => setVisible((p) => !p)}
                className={`w-10 h-5 rounded-full transition-colors relative ${
                  visible ? "bg-primary-500" : "bg-gray-200"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${
                    visible ? "left-5" : "left-0.5"
                  }`}
                />
              </div>
              <span className="text-sm text-gray-700">Visible en tienda</span>
            </label>
          </div>

          {error && (
            <p className="text-red-500 text-xs bg-red-50 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 py-3 rounded-xl text-sm font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="flex-1 bg-primary-500 hover:bg-primary-600 disabled:opacity-60 text-white py-3 rounded-xl text-sm font-semibold transition-colors"
            >
              {saving ? "Guardando…" : isEditing ? "Guardar cambios" : "Crear arreglo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
