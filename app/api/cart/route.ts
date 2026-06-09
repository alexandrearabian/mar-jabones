// Cart API routes for client-side cart operations

import { NextRequest, NextResponse } from "next/server";
import {
  getCartItems,
  addToCart,
  updateCartItem,
  removeFromCart,
} from "@/lib/cart";
import { z } from "zod";

const addToCartSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive(),
  sessionId: z.string().optional(),
});

const updateCartSchema = z.object({
  cartItemId: z.string(),
  quantity: z.number().int().min(0),
});

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.headers.get("x-session-id") || undefined;
    const items = await getCartItems(sessionId);
    return NextResponse.json({ items });
  } catch (error) {
    console.error("Cart GET error:", error);
    return NextResponse.json(
      { error: "Error al obtener el carrito" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = addToCartSchema.parse(body);

    await addToCart(data.productId, data.quantity, data.sessionId);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Datos inválidos", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Cart POST error:", error);
    return NextResponse.json(
      { error: "Error al agregar al carrito" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const data = updateCartSchema.parse(body);

    await updateCartItem(data.cartItemId, data.quantity);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Datos inválidos", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Cart PATCH error:", error);
    return NextResponse.json(
      { error: "Error al actualizar el carrito" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cartItemId = searchParams.get("cartItemId");

    if (!cartItemId) {
      return NextResponse.json(
        { error: "cartItemId es requerido" },
        { status: 400 }
      );
    }

    await removeFromCart(cartItemId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cart DELETE error:", error);
    return NextResponse.json(
      { error: "Error al eliminar del carrito" },
      { status: 500 }
    );
  }
}

