"use client";

import { useEffect, useState } from "react";
import API from "../lib/api";
import ProductCard from "../components/Productcard";

export default function KidsPage() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const { data } = await API.get("/api/products?category=kids");

        setProducts(data);

      } catch (err) {
        console.log(err);
      }

    };

    fetchProducts();

  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">

      <div className="container mx-auto px-4">

        {/* PAGE HEADER */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold mb-2">
            Kids Fashion
          </h1>

          <p className="text-gray-600 dark:text-gray-400">
            {products.length} Products
          </p>

        </div>

        {/* FILTER BAR */}

        <div className="flex flex-wrap gap-4 mb-6">

          {/* AGE FILTER */}

          <select className="border rounded-md px-3 py-2 text-sm w-48">

            <option>All Ages</option>
            <option>0-2 Years</option>
            <option>3-5 Years</option>
            <option>6-10 Years</option>
            <option>11-15 Years</option>

          </select>

          {/* SORT */}

          <select className="border rounded-md px-3 py-2 text-sm w-48">

            <option>Popularity</option>
            <option>Price Low to High</option>
            <option>Price High to Low</option>
            <option>Newest</option>

          </select>

        </div>

        {/* PRODUCTS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {products.map((product) => (

            <ProductCard
              key={product._id}
              product={product}
            />

          ))}

        </div>

      </div>

    </div>
  );
}