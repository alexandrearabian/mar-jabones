# Mar D Jabones

Catálogo web de jabones y resinas artesanales. Las consultas y ventas se hacen por Instagram
([@mard.jabones](https://instagram.com/mard.jabones)); el sitio no tiene carrito ni precios.

## Stack

- **Next.js 16** (App Router, Server Components) + **TypeScript**
- **Sanity** como CMS, con el Studio embebido en `/studio`
- **Tailwind CSS v4** y **Motion** para animaciones

## Estructura

```
app/
  (shop)/            sitio público: inicio, productos, sobre nosotros, contacto
    productos/[slug] página de categoría o de producto (las categorías tienen prioridad)
  studio/            Sanity Studio
  sitemap.ts, robots.ts, not-found.tsx
components/
  layout/            navbar, footer, encabezados, transiciones
  home/ shop/ about/ secciones por página
  motion/            animaciones reutilizables (Reveal)
  ui/                primitivas (Button, Badge, Skeleton)
sanity/
  schemaTypes/       modelos: producto, categoría, página de inicio
  queries.ts         consultas GROQ tipadas (única vía de acceso a datos)
  structure.ts       menú del Studio
lib/site.ts          datos del negocio (nombre, URL, Instagram)
scripts/             importación inicial del catálogo
```

## Desarrollo

```bash
cp .env.example .env         # completar NEXT_PUBLIC_SANITY_PROJECT_ID
pnpm install
pnpm dev                     # http://localhost:3000 y http://localhost:3000/studio
```

Otros comandos: `pnpm build`, `pnpm lint`, `pnpm typecheck`.

## Contenido

Todo el contenido se edita en `/studio`. Los cambios aparecen en el sitio en hasta 60 segundos.

La primera carga del catálogo se hace desde `elementos-multimedia/` (no versionado):

```bash
pnpm import:catalog          # requiere SANITY_API_WRITE_TOKEN en .env
```

El script solo crea lo que falta, así que se puede volver a correr sin pisar cambios hechos en el Studio.

## Deploy

Variables de entorno en el hosting: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SANITY_PROJECT_ID`,
`NEXT_PUBLIC_SANITY_DATASET`. Agregar el dominio de producción en sanity.io/manage → API → CORS origins
(con "Allow credentials") para que funcione el Studio.
