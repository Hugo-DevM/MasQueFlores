"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        sessionStorage.setItem("floreria_auth", "true");
        router.replace("/dashboard");
      } else {
        setError("Contraseña incorrecta");
      }
    } catch {
      setError("Error al conectar. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            <span
              className="text-3xl font-bold"
              
            >
              <span className="text-gray-900">Mas que</span>
              <span className="text-primary-500"> Flores</span>
            </span>
          </Link>
          <p className="text-gray-500 text-sm mt-2">Panel de Administración</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h1 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Iniciar sesión
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent text-sm transition"
              />
            </div>

            {error && (
              <p className="text-red-500 text-xs bg-red-50 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-500 hover:bg-primary-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              {loading ? "Verificando…" : "Entrar"}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-primary-500 transition-colors"
          >
            ← Volver a la tienda
          </Link>
        </div>
      </div>
    </div>
  );
}
