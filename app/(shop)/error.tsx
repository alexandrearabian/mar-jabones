"use client";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <PageShell narrow className="py-24 text-center sm:py-32">
      <h1 className="heading-2">No pudimos cargar esta página</h1>
      <p className="mx-auto mt-4 max-w-[45ch] text-muted-foreground">
        Hubo un problema al conectar con el catálogo. Probá de nuevo en unos segundos.
      </p>
      <Button className="mt-8" onClick={reset}>
        Reintentar
      </Button>
    </PageShell>
  );
}
