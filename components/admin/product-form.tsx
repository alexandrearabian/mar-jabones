// Product form component
// For creating and editing products

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const productSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  slug: z.string().min(1, "El slug es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  price: z.number().positive("El precio debe ser mayor a 0"),
  compareAtPrice: z.number().positive().optional(),
  stock: z.number().int().min(0, "El stock no puede ser negativo"),
  category: z.string().optional(),
  published: z.boolean().default(false),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  product?: ProductFormData & { id: string };
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product || {
      published: false,
      stock: 0,
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true);
    try {
      // TODO: Save product via API
      // const url = product
      //   ? `/api/admin/products/${product.id}`
      //   : "/api/admin/products";
      // await fetch(url, {
      //   method: product ? "PATCH" : "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });
      console.log("Product save:", data);
      router.push("/admin/products");
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product ? "Editar producto" : "Nuevo producto"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              {...register("name")}
              error={errors.name?.message}
            />
          </div>

          <div>
            <Label htmlFor="slug">Slug (URL)</Label>
            <Input
              id="slug"
              {...register("slug")}
              error={errors.slug?.message}
              placeholder="producto-ejemplo"
            />
          </div>

          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              {...register("description")}
              error={errors.description?.message}
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Precio</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...register("price", { valueAsNumber: true })}
                error={errors.price?.message}
              />
            </div>
            <div>
              <Label htmlFor="compareAtPrice">Precio comparación (opcional)</Label>
              <Input
                id="compareAtPrice"
                type="number"
                step="0.01"
                {...register("compareAtPrice", { valueAsNumber: true })}
                error={errors.compareAtPrice?.message}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                {...register("stock", { valueAsNumber: true })}
                error={errors.stock?.message}
              />
            </div>
            <div>
              <Label htmlFor="category">Categoría</Label>
              <Select id="category" {...register("category")}>
                <option value="">Seleccionar categoría</option>
                <option value="jabones">Jabones</option>
                <option value="resinas">Resinas</option>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              {...register("published")}
              className="h-4 w-4"
            />
            <Label htmlFor="published" className="cursor-pointer">
              Publicar producto
            </Label>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}


