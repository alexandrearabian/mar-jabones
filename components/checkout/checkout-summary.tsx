// Checkout summary component
// Shows order items and totals

"use client";

import { useCart } from "@/hooks/use-cart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export function CheckoutSummary() {
  const { items, total } = useCart();

  const shipping: number = 0; // TODO: Calculate based on address
  const tax = total * 0.21;
  const finalTotal = total + shipping + tax;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumen del pedido</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              {item.product.image && (
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <p className="text-sm font-medium">{item.product.name}</p>
                <p className="text-xs text-slate-600">
                  Cantidad: {item.quantity}
                </p>
              </div>
              <p className="text-sm font-semibold">
                ${(item.product.price * item.quantity).toLocaleString("es-AR")}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${total.toLocaleString("es-AR")}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Envío</span>
            <span className="text-slate-600">
              {shipping === 0 ? "Gratis" : `$${shipping.toLocaleString("es-AR")}`}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>IVA (21%)</span>
            <span>${tax.toLocaleString("es-AR")}</span>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${finalTotal.toLocaleString("es-AR")}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


