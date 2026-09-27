// Literal process.env reads so Next can inline them in client bundles (Studio).
export const projectId = required(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
);
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2025-09-01";

function required(value: string | undefined, name: string): string {
  if (!value) throw new Error(`Falta la variable de entorno ${name} (ver .env.example).`);
  return value;
}
