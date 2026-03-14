"use client";

import { useEffect, useState } from "react";
import API from "../lib/api";
import ProductCard from "../components/Productcard";
import { Filter } from "lucide-react";

export default function MenPage() {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [price, setPrice] = useState(10000);
  const [sort, setSort] = useState("popularity");

  // FETCH PRODUCTS

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const { data } = await API.get("/api/products?category=women");

        setProducts(data);
        setFilteredProducts(data);

      } catch (err) {

        console.log(err);

      }

    };

    fetchProducts();

  }, []);

  // PRICE FILTER

  useEffect(() => {

    const filtered = products.filter(p => p.price <= price);

    setFilteredProducts(filtered);

  }, [price, products]);

  // SORTING

  const handleSort = (value) => {

    setSort(value);

    let sorted = [...filteredProducts];

    if (value === "low") {

      sorted.sort((a, b) => a.price - b.price);

    }

    if (value === "high") {

      sorted.sort((a, b) => b.price - a.price);

    }

    if (value === "new") {

      sorted.sort(
        (a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
      );

    }

    setFilteredProducts(sorted);

  };

  return (

    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">

      <div className="container mx-auto px-4">

        {/* PAGE TITLE */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold mb-2">
            Men's Fashion
          </h1>

          <p className="text-gray-600 dark:text-gray-400">
            {filteredProducts.length} Products
          </p>

        </div>

        {/* MOBILE FILTER BUTTON */}

        <div className="lg:hidden mb-4">

          <button className="w-full border rounded-md h-9 flex items-center justify-center gap-2">

            <Filter size={16} />

            Show Filters

          </button>

        </div>

        <div className="grid lg:grid-cols-4 gap-6">

          {/* FILTER SIDEBAR */}

          <div className="hidden lg:block">

            <div className="bg-white dark:bg-gray-800 rounded-xl border p-6 sticky top-24">

              <h2 className="text-xl font-bold mb-6">
                Filters
              </h2>

              {/* PRICE FILTER */}

              <div className="mb-6">

                <h3 className="font-semibold mb-3">
                  Price Range
                </h3>

                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full accent-[#F8D6A4]"
                />

                <div className="flex justify-between text-sm mt-2 text-gray-500">

                  <span>₹0</span>

                  <span>₹{price}</span>

                </div>

              </div>

              {/* SIZE FILTER (UI only for now) */}

              <div className="mb-6">

                <h3 className="font-semibold mb-3">
                  Sizes
                </h3>

                <div className="flex flex-wrap gap-2">

                  {["S","M","L","XL","XXL","30","32","34","36","38","40"].map(size => (

                    <button
                      key={size}
                      className="px-3 py-1 border rounded hover:border-[#F8D6A4]"
                    >
                      {size}
                    </button>

                  ))}

                </div>

              </div>

            </div>

          </div>

          {/* PRODUCTS */}

          <div className="lg:col-span-3">

            {/* SORT */}

            <div className="mb-6 flex justify-between">

              <select
                onChange={(e) => handleSort(e.target.value)}
                className="border px-3 py-2 rounded-md text-sm"
              >

                <option value="popularity">
                  Popularity
                </option>

                <option value="low">
                  Price Low to High
                </option>

                <option value="high">
                  Price High to Low
                </option>

                <option value="new">
                  Newest
                </option>

              </select>

            </div>

            {/* PRODUCT GRID */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {filteredProducts.map(product => (

                <ProductCard
                  key={product._id}
                  product={product}
                />

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}