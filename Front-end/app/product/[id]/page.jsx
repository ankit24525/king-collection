"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import API from "@/app/lib/api";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

export default function ProductDetail() {

const { id } = useParams();

const [product, setProduct] = useState(null);
const [selectedVariant, setSelectedVariant] = useState(null);
const [selectedColor, setSelectedColor] = useState(null);
const [qty, setQty] = useState(1);

useEffect(() => {

const fetchProduct = async () => {

  const { data } = await API.get(`/api/products/${id}`);

  setProduct(data);

  if (data?.sizes?.length > 0) {
    setSelectedVariant(data.sizes[0]);
    setSelectedColor(data.sizes[0].color);
  }

};

fetchProduct();

}, [id]);

if (!product) {
return <p className="p-10">Loading...</p>;
}

/* UNIQUE COLORS */

const colors = [...new Set(product.sizes.map(s => s.color))];

/* SIZES FOR SELECTED COLOR */

const sizes = product.sizes.filter(
s => s.color === selectedColor
);

return (

<div className="container mx-auto px-4 py-10">

  <div className="grid lg:grid-cols-2 gap-10">

    {/* IMAGE */}

    <div className="relative aspect-[3/4]">

      <Image
        src={
          selectedVariant?.images?.length
            ? selectedVariant.images[0]
            : "/placeholder.png"
        }
        alt={product.title}
        fill
        className="object-cover rounded"
      />

    </div>



    {/* DETAILS */}

    <div>

      <p className="text-gray-500 uppercase">
        {product.brand}
      </p>

      <h1 className="text-3xl font-bold mb-2">
        {product.title}
      </h1>

      <p className="text-gray-500 mb-6">
        {product.category}
      </p>



      {/* PRICE */}

      <div className="text-3xl font-bold mb-6">
        ₹{selectedVariant?.price || 0}
      </div>



      {/* COLOR SELECTOR */}

      <div className="mb-6">

        <p className="font-semibold mb-2">
          Select Color
        </p>

        <div className="flex gap-2 flex-wrap">

          {colors.map((c, i) => (

            <button
              key={i}

              onClick={() => {

                setSelectedColor(c);

                const firstVariant =
                  product.sizes.find(
                    s => s.color === c
                  );

                setSelectedVariant(firstVariant);

              }}

              className={`px-4 py-2 border rounded 
              ${
                selectedColor === c
                  ? "bg-[#F8D6A4]"
                  : ""
              }`}
            >

              {c}

            </button>

          ))}

        </div>

      </div>



      {/* SIZE SELECTOR */}

      <div className="mb-6">

        <p className="font-semibold mb-2">
          Select Size
        </p>

        <div className="flex gap-2 flex-wrap">

          {sizes.map((s, i) => (

            <button
              key={i}

              onClick={() => setSelectedVariant(s)}

              className={`px-4 py-2 border rounded
              ${
                selectedVariant?.size === s.size
                  ? "bg-[#F8D6A4]"
                  : ""
              }`}
            >

              {s.size}

            </button>

          ))}

        </div>

      </div>



      {/* QUANTITY */}

      <div className="flex items-center gap-3 mb-6">

        <button
          onClick={() =>
            setQty(q => Math.max(1, q - 1))
          }
          className="border px-4 py-2"
        >
          -
        </button>

        <span>{qty}</span>

        <button
          onClick={() => setQty(q => q + 1)}
          className="border px-4 py-2"
        >
          +
        </button>

      </div>



      {/* ADD TO CART */}

      <button className="bg-[#F8D6A4] py-4 px-6 rounded flex gap-2 items-center">

        <ShoppingCart size={18} />

        Add To Cart

      </button>

    </div>

  </div>

</div>

);

}