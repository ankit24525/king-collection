"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import API from "@/app/lib/api";
import ProductCard from "@/app/components/Productcard";

export default function SearchPage() {
  const params = useSearchParams();
  const query = params.get("q");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await API.get(`/api/products/search?q=${query}`);
      setProducts(data);
    };

    if (query) fetch();
  }, [query]);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">
        Results for "{query}"
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}