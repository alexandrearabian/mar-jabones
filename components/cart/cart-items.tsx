// Enhanced cart items with animated quantity changes
// Smooth transitions for add/remove actions

"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { Trash2, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

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

interface CartItemsProps {
  items: CartItem[];
}

export function CartItems({ items }: CartItemsProps) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                {item.product.image && (
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{item.product.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    ${item.product.price.toLocaleString("es-AR")} c/u
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    aria-label="Disminuir cantidad"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <motion.span
                    key={item.quantity}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="w-12 text-center font-medium"
                  >
                    {item.quantity}
                  </motion.span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    aria-label="Aumentar cantidad"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-right min-w-[80px]">
                  <motion.p
                    key={`${item.id}-${item.quantity}`}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="font-semibold"
                  >
                    ${(item.product.price * item.quantity).toLocaleString("es-AR")}
                  </motion.p>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Eliminar del carrito"
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
