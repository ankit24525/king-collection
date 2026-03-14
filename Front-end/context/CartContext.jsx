"use client";

import { createContext, useContext, useEffect, useState } from "react";
import API from "@/app/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const { user } = useAuth();
  const router = useRouter();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // LOAD CART
  useEffect(() => {

    const fetchCart = async () => {

      try {

        if (!user) {
          setCart([]);
          setLoading(false);
          return;
        }

        const { data } = await API.get("/api/cart", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setCart(data?.items || []);

      } catch (error) {

        console.log("Cart fetch error:", error);
        setCart([]);

      } finally {
        setLoading(false);
      }
    };

    fetchCart();

  }, [user]);



  // ADD TO CART
  const addToCart = async (product) => {

    if (!user) {
      router.push("/login");
      return;
    }

    try {

      const { data } = await API.post(
        "/api/cart",
        {
          productId: product._id,
          qty: product.qty || 1,
          selectedSize: product.selectedSize || null,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setCart(data?.items || []);

    } catch (error) {
      console.log("Add to cart error:", error);
    }

  };



  // REMOVE FROM CART
  const removeFromCart = async (productId) => {

    if (!user) return;

    try {

      const { data } = await API.delete(
        `/api/cart/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setCart(data?.items || []);

    } catch (error) {
      console.log("Remove cart error:", error);
    }

  };



  // UPDATE QUANTITY
  const updateQty = async (productId, type) => {

    if (!user) return;

    try {

      const { data } = await API.put(
        `/api/cart/${productId}`,
        { type },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setCart(data?.items || []);

    } catch (error) {
      console.log("Update quantity error:", error);
    }

  };



  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        updateQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};


// CUSTOM HOOK
export const useCart = () => {
  return useContext(CartContext);
};