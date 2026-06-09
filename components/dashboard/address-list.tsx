// Address list component
// Displays and manages user addresses

"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AddressForm } from "./address-form";

interface Address {
  id: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

interface AddressListProps {
  userId: string;
}

function toAddressFormData(address: Address) {
  return {
    firstName: address.firstName,
    lastName: address.lastName,
    address1: address.address1,
    address2: address.address2,
    city: address.city,
    state: address.state ?? "",
    postalCode: address.postalCode,
    phone: address.phone,
    isDefault: address.isDefault,
  };
}

export function AddressList({ userId }: AddressListProps) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  useEffect(() => {
    fetchAddresses();
  }, [userId]);

  async function fetchAddresses() {
    try {
      setLoading(true);
      // TODO: Replace with actual API endpoint
      // const response = await fetch(`/api/addresses?userId=${userId}`);
      // const data = await response.json();
      // setAddresses(data.addresses);
      setAddresses([]);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (addressId: string) => {
    if (!confirm("¿Estás seguro de eliminar esta dirección?")) return;

    try {
      // TODO: Delete address via API
      // await fetch(`/api/addresses/${addressId}`, { method: "DELETE" });
      await fetchAddresses();
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  if (loading) {
    return <div className="text-slate-600">Cargando direcciones...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          Direcciones guardadas ({addresses.length})
        </h2>
        <Button
          onClick={() => {
            setEditingAddress(null);
            setShowForm(true);
          }}
        >
          Agregar dirección
        </Button>
      </div>

      {showForm && (
        <AddressForm
          address={editingAddress ? toAddressFormData(editingAddress) : null}
          userId={userId}
          onSuccess={() => {
            setShowForm(false);
            setEditingAddress(null);
            fetchAddresses();
          }}
          onCancel={() => {
            setShowForm(false);
            setEditingAddress(null);
          }}
        />
      )}

      {addresses.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-slate-600">No tienes direcciones guardadas</p>
            <Button
              onClick={() => setShowForm(true)}
              className="mt-4"
            >
              Agregar primera dirección
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {addresses.map((address) => (
            <Card key={address.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    {address.firstName} {address.lastName}
                  </CardTitle>
                  {address.isDefault && (
                    <Badge variant="success">Predeterminada</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm text-slate-600">
                  <p>{address.address1}</p>
                  {address.address2 && <p>{address.address2}</p>}
                  <p>
                    {address.city}, {address.state} {address.postalCode}
                  </p>
                  <p>{address.country}</p>
                  {address.phone && <p>Tel: {address.phone}</p>}
                </div>
                <div className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingAddress(address);
                      setShowForm(true);
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(address.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}


