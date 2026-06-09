// Cart summary component with totals

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CartSummaryProps {
  total: number;
}

export function CartSummary({ total }: CartSummaryProps) {
  // TODO: Calculate shipping based on address
  const shipping: number = 0;
  const tax = total * 0.21; // 21% IVA in Argentina
  const finalTotal = total + shipping + tax;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumen</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
        <div className="border-t pt-4">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${finalTotal.toLocaleString("es-AR")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


