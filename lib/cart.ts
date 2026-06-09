// Cart management utilities
// Note: Prisma has been removed. Integrate with Strapi (or your API) for real persistence.

import { auth } from "@/lib/auth";

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    images: Array<{ url: string; alt: string | null }>;
  };
}

/**
 * Get cart items for current user or guest session.
 * For now this returns an empty cart so the app can boot without Prisma.
 */
export async function getCartItems(_sessionId?: string): Promise<CartItem[]> {
  // Keep authOptions usage so the session is available for future Strapi integration.
  await auth();
  return [];
}

/**
 * Add item to cart (no-op).
 */
export async function addToCart(
  _productId: string,
  _quantity: number = 1,
  _sessionId?: string,
): Promise<void> {
  await auth();
}

/**
 * Update cart item quantity (no-op).
 */
export async function updateCartItem(
  _cartItemId: string,
  _quantity: number,
): Promise<void> {
  await auth();
}

/**
 * Remove item from cart (no-op).
 */
export async function removeFromCart(_cartItemId: string): Promise<void> {
  await auth();
}

/**
 * Clear entire cart (no-op).
 */
export async function clearCart(_sessionId?: string): Promise<void> {
  await auth();
}

/**
 * Get cart total.
 */
export async function getCartTotal(sessionId?: string): Promise<number> {
  const items = await getCartItems(sessionId);
  return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
}

