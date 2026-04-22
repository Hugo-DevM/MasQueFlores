"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Product } from "@/types";

const POLL_INTERVAL = 30_000; // 30 segundos

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchProducts = useCallback(async (showLoading = false) => {
    if (showLoading) setLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products ?? []);
    } catch {
      // mantiene el estado anterior si falla
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  // Carga inicial
  useEffect(() => {
    fetchProducts(true);
  }, [fetchProducts]);

  // Polling cada 30 s
  useEffect(() => {
    timerRef.current = setInterval(() => fetchProducts(false), POLL_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [fetchProducts]);

  // Refetch cuando el usuario vuelve a la pestaña
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") fetchProducts(false);
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [fetchProducts]);

  return { products, loading };
}
