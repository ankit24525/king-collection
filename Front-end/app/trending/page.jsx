"use client";

import { useEffect, useState } from "react";
import API from "../lib/api";
import ProductCard from "../components/Productcard";

import {
  Flame,
  Eye,
  TrendingUp
} from "lucide-react";

export default function TrendingPage() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {

        const { data } = await API.get("/api/products");

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

        {/* HEADER */}

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">

            <Flame className="h-8 w-8 text-orange-500" />

            <h1 className="text-3xl font-bold">
              Trending Now
            </h1>

          </div>

          <p className="text-gray-600 dark:text-gray-400">
            What's hot and popular right now
          </p>
        </div>

        {/* TRENDING STATS */}

        <div className="rounded-xl p-8 mb-12 bg-gradient-to-r from-orange-500 to-red-500 text-white">

          <div className="grid md:grid-cols-3 gap-6 text-center">

            <div>
              <Eye className="h-12 w-12 mx-auto mb-3" />

              <p className="text-3xl font-bold mb-1">
                12.5K+
              </p>

              <p className="text-sm opacity-90">
                People Viewing Now
              </p>
            </div>

            <div>
              <TrendingUp className="h-12 w-12 mx-auto mb-3" />

              <p className="text-3xl font-bold mb-1">
                +45%
              </p>

              <p className="text-sm opacity-90">
                Growth This Week
              </p>
            </div>

            <div>
              <Flame className="h-12 w-12 mx-auto mb-3" />

              <p className="text-3xl font-bold mb-1">
                {products.length}
              </p>

              <p className="text-sm opacity-90">
                Trending Products
              </p>
            </div>

          </div>
        </div>

        {/* CATEGORIES */}

        <div className="mb-8">

          <h2 className="text-xl font-semibold mb-4">
            Trending Categories
          </h2>

          <div className="flex flex-wrap gap-2">

            <span className="bg-[#F8D6A4] px-4 py-2 rounded-md text-sm">
              #WinterWear
            </span>

            <span className="bg-[#F8D6A4] px-4 py-2 rounded-md text-sm">
              #Streetwear
            </span>

            <span className="bg-[#F8D6A4] px-4 py-2 rounded-md text-sm">
              #Athleisure
            </span>

            <span className="bg-[#F8D6A4] px-4 py-2 rounded-md text-sm">
              #EthnicFashion
            </span>

          </div>
        </div>

        {/* PRODUCTS GRID */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}

        </div>

      </div>

    </div>
  );
}