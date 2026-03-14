"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {

  if (!product) return null;

  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { user } = useAuth();
  const router = useRouter();

  const image =
    product?.sizes?.[0]?.images?.[0] || "/placeholder.png";

  const price =
    product?.sizes?.[0]?.price || 0;

  const addCartHandler = () => {

    if (!user) {
      router.push("/login");
      return;
    }

    addToCart(product);

    toast.success("Product added to cart 🛒");

  };

  const wishlistHandler = () => {

    if (!user) {
      router.push("/login");
      return;
    }

    toggleWishlist(product);

    toast.success("Added to wishlist ❤️");

  };

  return (

    <div className="group relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-lg border">

      <Link href={`/product/${product._id}`}>

        <div className="relative aspect-[3/4]">

          <Image
            src={image}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-110 transition"
          />

        </div>

      </Link>

      <button
        onClick={wishlistHandler}
        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow"
      >

        <Heart
          className={`h-5 w-5 ${
            isWishlisted?.(product._id)
              ? "text-red-500 fill-red-500"
              : "text-gray-400"
          }`}
        />

      </button>

      <div className="p-3">

        <p className="text-xs text-gray-500 uppercase">
          {product.brand}
        </p>

        <h3 className="text-sm font-semibold line-clamp-1">
          {product.title}
        </h3>

        <p className="text-xs text-gray-500 mb-2">
          {product.category}
        </p>

        <div className="flex items-center gap-1 text-xs bg-green-500 text-white px-2 py-1 rounded w-fit mb-2">

          <span>4.5</span>
          <Star className="h-3 w-3 fill-current" />

        </div>

        <div className="font-bold mb-3">

          ₹{price}

        </div>

        <button
          onClick={addCartHandler}
          className="w-full bg-[#F8D6A4] py-2 rounded flex items-center justify-center gap-2"
        >

          <ShoppingCart size={16} />

          Add to Cart

        </button>

      </div>

    </div>

  );

};

export default ProductCard;