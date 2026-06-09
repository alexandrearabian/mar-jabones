// New product creation page

import { ProductForm } from "@/components/admin/product-form";

export const metadata = {
  title: "Nuevo producto - Administración",
  description: "Crear un nuevo producto",
};

export default function NewProductPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Nuevo producto</h2>
      <div className="mt-8">
        <ProductForm />
      </div>
    </div>
  );
}


