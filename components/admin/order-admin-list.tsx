// Admin order list component
// Displays all orders with status management

"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { OrderAdminListSkeleton } from "./order-admin-list-skeleton";

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  email: string;
  createdAt: string;
  user?: {
    name: string;
  };
}

export function OrderAdminList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);
        // TODO: Replace with actual API endpoint
        // const response = await fetch("/api/admin/orders");
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
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      // TODO: Update order status via API
      // await fetch(`/api/admin/orders/${orderId}`, {
      //   method: "PATCH",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ status: newStatus }),
      // });
      console.log("Update order status:", orderId, newStatus);
      // Refresh orders
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  if (loading) {
    return <OrderAdminListSkeleton />;
  }

  if (orders.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-slate-600">No hay pedidos</p>
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
                  {order.user?.name || order.email}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {new Date(order.createdAt).toLocaleDateString("es-AR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-lg font-semibold">
                    ${order.total.toLocaleString("es-AR")}
                  </p>
                </div>
                <Select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="w-40"
                >
                  <option value="PENDING">Pendiente</option>
                  <option value="CONFIRMED">Confirmado</option>
                  <option value="PROCESSING">Procesando</option>
                  <option value="SHIPPED">Enviado</option>
                  <option value="DELIVERED">Entregado</option>
                  <option value="CANCELLED">Cancelado</option>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}


