// Address form component
// For creating and editing addresses

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const addressSchema = z.object({
  firstName: z.string().min(1, "El nombre es requerido"),
  lastName: z.string().min(1, "El apellido es requerido"),
  address1: z.string().min(1, "La dirección es requerida"),
  address2: z.string().optional(),
  city: z.string().min(1, "La ciudad es requerida"),
  state: z.string().min(1, "La provincia es requerida"),
  postalCode: z.string().min(1, "El código postal es requerido"),
  phone: z.string().optional(),
  isDefault: z.boolean().default(false),
});

type AddressFormData = z.infer<typeof addressSchema>;

interface AddressFormProps {
  address?: AddressFormData | null;
  userId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function AddressForm({
  address,
  userId,
  onSuccess,
  onCancel,
}: AddressFormProps) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: address ?? {
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      postalCode: "",
      phone: "",
      isDefault: false,
    },
  });

  const onSubmit = async (data: AddressFormData) => {
    setLoading(true);
    try {
      // TODO: Save address via API
      // const url = address
      //   ? `/api/addresses/${address.id}`
      //   : "/api/addresses";
      // await fetch(url, {
      //   method: address ? "PATCH" : "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ ...data, userId }),
      // });
      console.log("Address save:", data);
      onSuccess();
    } catch (error) {
      console.error("Error saving address:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {address ? "Editar dirección" : "Nueva dirección"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Nombre</Label>
              <Input
                id="firstName"
                {...register("firstName")}
                error={errors.firstName?.message}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Apellido</Label>
              <Input
                id="lastName"
                {...register("lastName")}
                error={errors.lastName?.message}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address1">Dirección</Label>
            <Input
              id="address1"
              {...register("address1")}
              error={errors.address1?.message}
            />
          </div>

          <div>
            <Label htmlFor="address2">Dirección 2 (opcional)</Label>
            <Input
              id="address2"
              {...register("address2")}
              error={errors.address2?.message}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">Ciudad</Label>
              <Input
                id="city"
                {...register("city")}
                error={errors.city?.message}
              />
            </div>
            <div>
              <Label htmlFor="state">Provincia</Label>
              <Input
                id="state"
                {...register("state")}
                error={errors.state?.message}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="postalCode">Código postal</Label>
              <Input
                id="postalCode"
                {...register("postalCode")}
                error={errors.postalCode?.message}
              />
            </div>
            <div>
              <Label htmlFor="phone">Teléfono (opcional)</Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                error={errors.phone?.message}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isDefault"
              {...register("isDefault")}
              className="h-4 w-4"
            />
            <Label htmlFor="isDefault" className="cursor-pointer">
              Establecer como dirección predeterminada
            </Label>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}


