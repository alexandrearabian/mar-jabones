import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <SiteShell>
      <PageShell narrow className="py-24 text-center sm:py-32">
        <h1 className="heading-2">No encontramos esta página</h1>
        <p className="mx-auto mt-4 max-w-[45ch] text-muted-foreground">
          Puede que el producto ya no esté disponible o que la dirección tenga un error.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild>
            <Link href="/productos">Ver productos</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/">Ir al inicio</Link>
          </Button>
        </div>
      </PageShell>
    </SiteShell>
  );
}
