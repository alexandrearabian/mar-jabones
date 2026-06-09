export const INSTAGRAM_HANDLE = "mard.jabones";

export function hasProductPrice(price: number | null | undefined): boolean {
  return typeof price === "number" && price > 0;
}

export function formatProductPrice(price: number): string {
  return `$${price.toLocaleString("es-AR")}`;
}