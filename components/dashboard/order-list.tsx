// Order list component
// Displays user's order history

"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OrderListSkeleton } from "./order-list-skeleton";
import Link from "next/link";

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  createdAt: string;
  items: Array<{
    product: {
      name: string;
    };
    quantity: number;
    price: number;
  }>;
}

interface OrderListProps {
  userId: string;
}

export function OrderList({ userId }: OrderListProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);
        // TODO: Replace with actual API endpoint
        // const response = await fetch(`/api/orders?userId=${userId}`);
        // const data = await response.json();
        // setOrders(data.orders);
        setOrders([]);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [userId]);

  if (loading) {
    return <OrderListSkeleton />;
  }

  if (orders.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-slate-600">No tienes pedidos aún</p>
        <Link href="/productos">
          <Button className="mt-4">Ver productos</Button>
        </Link>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "success" | "warning" }> = {
      PENDING: { label: "Pendiente", variant: "warning" },
      CONFIRMED: { label: "Confirmado", variant: "secondary" },
      PROCESSING: { label: "Procesando", variant: "secondary" },
      SHIPPED: { label: "Enviado", variant: "secondary" },
      DELIVERED: { label: "Entregado", variant: "success" },
      CANCELLED: { label: "Cancelado", variant: "default" },
    };

    const statusInfo = statusMap[status] || { label: status, variant: "default" };
    return (
      <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
    );
  };

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold">Pedido #{order.orderNumber}</h3>
                  {getStatusBadge(order.status)}
                </div>
                <p className="mt-1 text-sm text-slate-600">
                  {new Date(order.createdAt).toLocaleDateString("es-AR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {order.items.length} {order.items.length === 1 ? "producto" : "productos"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">
                  ${order.total.toLocaleString("es-AR")}
                </p>
                <Link href={`/dashboard/orders/${order.id}`}>
                  <Button variant="outline" size="sm" className="mt-2">
                    Ver detalles
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}


