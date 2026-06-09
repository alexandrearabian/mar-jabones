import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CartGuestPrompt() {
  return (
    <div className="mx-auto mt-8 max-w-md space-y-3 rounded-2xl border border-border bg-muted/30 p-6 text-center">
      <p className="text-sm font-medium text-foreground">
        Creá una cuenta para guardar tu carrito y seguir comprando
      </p>
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link href="/login?callbackUrl=/carrito" className="sm:flex-1">
          <Button variant="outline" className="w-full" size="sm">
            Iniciar sesión
          </Button>
        </Link>
        <Link href="/register?callbackUrl=/carrito" className="sm:flex-1">
          <Button className="w-full" size="sm">
            Registrarse
          </Button>
        </Link>
      </div>
    </div>
  );
}
