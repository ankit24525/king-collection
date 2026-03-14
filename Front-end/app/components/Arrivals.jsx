"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import API from "../lib/api";
import ProductCard from "./Productcard";

const Arrivals = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchArrivals = async () => {
      try {
        // you can later create a special API for arrivals
        const { data } = await API.get("/api/products");
        setProducts(data.slice(0, 6)); // show only 6 newest
      } catch (error) {
        console.log(error);
      }
    };

    fetchArrivals();
  }, []);

  return (
    <section className="container mx-auto px-4 py-12 bg-white dark:bg-gray-900 rounded-lg my-8">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">
          New Arrivals
        </h2>

        <Link
          href="/products"
          className="text-[#F8D6A4] hover:underline font-medium"
        >
          Explore More →
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

    </section>
  );
};

export default Arrivals;
