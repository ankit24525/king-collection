"use client";

import { createContext, useContext, useEffect, useState } from "react";
import API from "@/app/lib/api";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  const [wishlist, setWishlist] = useState([]);

  // ✅ LOAD USER WISHLIST
  useEffect(() => {
    if (!user || !user.token) {
      setWishlist([]);
      return;
    }

    const fetchWishlist = async () => {
      try {
        const { data } = await API.get("/api/wishlist", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setWishlist(data);
      } catch (err) {
        console.log("Wishlist fetch error:", err.response?.data || err.message);
      }
    };

    fetchWishlist();
  }, [user]);

  // ✅ TOGGLE WISHLIST
  const toggleWishlist = async (product) => {
    // 🚨 IMPORTANT CHECK
    if (!user || !user.token) {
      router.push("/login"); // redirect if not logged in
      return;
    }

    try {
      await API.post(
        "/api/wishlist",
        { productId: product._id },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // ✅ Instant UI update (optimistic update)
      setWishlist((prev) => {
        const exist = prev.find(
          (item) => item.product._id === product._id
        );

        if (exist) {
          return prev.filter(
            (item) => item.product._id !== product._id
          );
        }

        return [...prev, { product }];
      });

    } catch (err) {
      console.log(
        "Wishlist toggle error:",
        err.response?.data || err.message
      );
    }
  };

  // ✅ CHECK IF WISHLISTED
  const isWishlisted = (id) => {
    return wishlist.some(
      (item) => item.product._id === id
    );
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isWishlisted }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);