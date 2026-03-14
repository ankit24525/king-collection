"use client";

import { useEffect, useState } from "react";
import API from "../lib/api";
import ProductCard from "./Productcard";

export default function Trending() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const { data } = await API.get("/api/products?section=trending");

        setProducts(data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchProducts();

  }, []);

  return (

    <section className="container mx-auto px-4 py-12">

      <h2 className="text-3xl font-bold mb-8">
        Trending Products
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">

        {products.map((product) => (

          <ProductCard
            key={product._id}
            product={product}
          />

        ))}

      </div>

    </section>

  );

}