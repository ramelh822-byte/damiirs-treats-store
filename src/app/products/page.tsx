"use client";

import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  weight: string;
  description: string;
  stock: number;
  category: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((d) => setProducts(d.products || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Shop Bulk Candy</h1>
      <p className="mt-1 text-gray-600">{loading ? "Loading…" : `${products.length} products`}</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div key={p.id} className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-32 items-center justify-center rounded-lg bg-blue-50 text-4xl">🍬</div>
            <h2 className="font-semibold">{p.name}</h2>
            <p className="mt-1 line-clamp-2 text-sm text-gray-500">{p.description}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-lg font-bold text-blue-600">${p.price.toFixed(2)}</span>
              <span className="text-xs text-gray-500">{p.weight}</span>
            </div>
            <p className={`mt-2 text-xs font-medium ${p.stock > 0 ? "text-green-600" : "text-red-600"}`}>
              {p.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
