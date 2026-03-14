"use client";

import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import API from "@/app/lib/api";
import ProductCard from "./Productcard";

const Deals = () => {

  const [products, setProducts] = useState([]);
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);

  // CLOCK
  useEffect(() => {

    setMounted(true);

    const timer = setInterval(() => {

      const now = new Date();

      setTime(
        now.toLocaleTimeString()
      );

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  // FETCH DEAL PRODUCTS
  useEffect(() => {

    const fetchDeals = async () => {

      try {

        const { data } = await API.get(
          "/api/products?section=featured"
        );

        setProducts(data);

      } catch (err) {

        console.log(err);

      }

    };

    fetchDeals();

  }, []);

  if (!mounted) return null;

  return (

    <section className="max-w-7xl mx-auto px-6 py-12 bg-white dark:bg-gray-900 rounded-lg my-8">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h2 className="text-3xl font-bold">
            Deals of the Day
          </h2>

          <p className="text-gray-600">
            Limited time offers!
          </p>
        </div>

        <div className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg">
          <Clock size={20} />

          <span className="font-bold">
            Ends in {time}
          </span>

        </div>

      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">

        {products.map((product) => (

          <ProductCard
            key={product._id}
            product={product}
          />

        ))}

      </div>

    </section>

  );

};

export default Deals;