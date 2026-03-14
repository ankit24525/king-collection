"use client";

import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "../components/Productcard";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6">
        Your Wishlist
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <ProductCard
            key={item.product._id}
            product={item.product}
          />
        ))}
      </div>
    </div>
  );
}