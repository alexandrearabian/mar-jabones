// Empty cart state component
// Uses EmptyState component for consistency

import { EmptyState } from "@/components/ui/empty-state";
import { ShoppingBag } from "lucide-react";

export function CartEmpty() {
  return (
    <EmptyState
      icon={ShoppingBag}
      title="Tu carrito está vacío"
      description="Agrega productos para comenzar a comprar"
      action={{
        label: "Ver productos",
        href: "/productos",
      }}
    />
  );
}

