// Cart hook for managing cart state
// Supports both guest and authenticated users
// TODO: Integrate with actual cart API

"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    image?: string;
  };
}

export function useCart() {
  const { data: session } = useSession();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCart() {
      try {
        setLoading(true);
        // TODO: Replace with actual API call
        // const response = await fetch("/api/cart");
        // const data = await response.json();
        // setItems(data.items);
        setItems([]);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, [session]);

  const addToCart = async (productId: string, quantity: number = 1) => {
    try {
      // TODO: Replace with actual API call
      // await fetch("/api/cart", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ productId, quantity }),
      // });
      // await fetchCart(); // Refresh cart
      console.log("Add to cart:", productId, quantity);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/cart?cartItemId=${cartItemId}`, {
      //   method: "DELETE",
      // });
      // await fetchCart(); // Refresh cart
      console.log("Remove from cart:", cartItemId);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    try {
      // TODO: Replace with actual API call
      // await fetch("/api/cart", {
      //   method: "PATCH",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ cartItemId, quantity }),
      // });
      // await fetchCart(); // Refresh cart
      console.log("Update quantity:", cartItemId, quantity);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return {
    items,
    loading,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
  };
}


