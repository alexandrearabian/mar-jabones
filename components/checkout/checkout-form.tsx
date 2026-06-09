// Checkout form component
// Handles shipping address and payment method selection
// No actual payment processing - just UI

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const checkoutSchema = z.object({
  shippingFirstName: z.string().min(1, "El nombre es requerido"),
  shippingLastName: z.string().min(1, "El apellido es requerido"),
  shippingAddress: z.string().min(1, "La dirección es requerida"),
  shippingCity: z.string().min(1, "La ciudad es requerida"),
  shippingState: z.string().min(1, "La provincia es requerida"),
  shippingPostalCode: z.string().min(1, "El código postal es requerido"),
  shippingPhone: z.string().optional(),
  paymentMethod: z.enum(["stripe", "mercadopago"]),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
  userId: string;
}

export function CheckoutForm({ userId }: CheckoutFormProps) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "stripe",
    },
  });

  const onSubmit = async (data: CheckoutFormData) => {
    setLoading(true);
    try {
      // TODO: Submit order to API
      // await fetch("/api/orders", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });
      console.log("Checkout data:", data);
      // Redirect to success page
    } catch (error) {
      console.error("Error submitting order:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Shipping Address */}
      <Card>
        <CardHeader>
          <CardTitle>Dirección de envío</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="shippingFirstName">Nombre</Label>
              <Input
                id="shippingFirstName"
                {...register("shippingFirstName")}
                error={errors.shippingFirstName?.message}
              />
            </div>
            <div>
              <Label htmlFor="shippingLastName">Apellido</Label>
              <Input
                id="shippingLastName"
                {...register("shippingLastName")}
                error={errors.shippingLastName?.message}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="shippingAddress">Dirección</Label>
            <Input
              id="shippingAddress"
              {...register("shippingAddress")}
              error={errors.shippingAddress?.message}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="shippingCity">Ciudad</Label>
              <Input
                id="shippingCity"
                {...register("shippingCity")}
                error={errors.shippingCity?.message}
              />
            </div>
            <div>
              <Label htmlFor="shippingState">Provincia</Label>
              <Input
                id="shippingState"
                {...register("shippingState")}
                error={errors.shippingState?.message}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="shippingPostalCode">Código postal</Label>
              <Input
                id="shippingPostalCode"
                {...register("shippingPostalCode")}
                error={errors.shippingPostalCode?.message}
              />
            </div>
            <div>
              <Label htmlFor="shippingPhone">Teléfono (opcional)</Label>
              <Input
                id="shippingPhone"
                type="tel"
                {...register("shippingPhone")}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Método de pago</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="flex items-center gap-3 rounded border p-4 cursor-pointer hover:bg-slate-50">
              <input
                type="radio"
                value="stripe"
                {...register("paymentMethod")}
                className="h-4 w-4"
              />
              <div>
                <p className="font-medium">Tarjeta de crédito/débito</p>
                <p className="text-sm text-slate-600">Stripe</p>
              </div>
            </label>
            <label className="flex items-center gap-3 rounded border p-4 cursor-pointer hover:bg-slate-50">
              <input
                type="radio"
                value="mercadopago"
                {...register("paymentMethod")}
                className="h-4 w-4"
              />
              <div>
                <p className="font-medium">MercadoPago</p>
                <p className="text-sm text-slate-600">
                  Tarjeta, efectivo, transferencia
                </p>
              </div>
            </label>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Procesando..." : "Completar pedido"}
      </Button>
    </form>
  );
}


