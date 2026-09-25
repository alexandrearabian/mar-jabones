// Imports the initial catalog (categories, products, home page) into Sanity from
// elementos-multimedia/. Safe to re-run: documents are only created if missing,
// so edits made later in the Studio are never overwritten.
//
// Usage: pnpm import:catalog   (needs SANITY_API_WRITE_TOKEN in .env or .env.local)

import { createReadStream } from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

const {
  NEXT_PUBLIC_SANITY_PROJECT_ID: projectId,
  NEXT_PUBLIC_SANITY_DATASET: dataset = "production",
  SANITY_API_WRITE_TOKEN: token,
} = process.env;

if (!projectId || !token) {
  console.error("Faltan NEXT_PUBLIC_SANITY_PROJECT_ID o SANITY_API_WRITE_TOKEN en .env");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2025-09-01", useCdn: false });

const MEDIA = path.resolve(import.meta.dirname, "../elementos-multimedia");
const wa = (time) =>
  path.join(MEDIA, "WhatsApp Unknown 2026-06-09 at 13.42.01", `WhatsApp Image 2026-06-09 at ${time}.jpeg`);
const loose = (stamp) => path.join(MEDIA, `WhatsApp Image ${stamp}.jpeg`);

const CATEGORIES = [
  {
    slug: "jabones",
    name: "Jabones",
    description: "Texturas suaves, aromas frescos y diseños únicos para el cuidado diario.",
    image: [wa("13.39.47"), "Bandeja con jabones artesanales en forma de rosa en naranja y blanco"],
  },
  {
    slug: "resinas",
    name: "Resinas",
    description: "Diseños en resina inspirados en el mar y creados a mano.",
    image: [loose("2025-12-11 at 18.17.53-1"), "Atrapasol de resina con forma de flor colgado en una ventana"],
  },
];

const PRODUCTS = [
  {
    slug: "atardecer-isleno",
    name: "Atardecer isleño",
    category: "jabones",
    award: "Premiado por Soapmaking Magazine 2023",
    images: [[loose("2026-03-31 at 01.45.03"), "Jabón en capas naranja y azul con un sol sonriente"]],
  },
  {
    slug: "luna",
    name: "Luna",
    category: "jabones",
    images: [[loose("2026-03-31 at 19.32.59"), "Jabón con una media luna crema sobre fondo azul y borde rosa"]],
  },
  {
    slug: "bandera-argentina",
    name: "Bandera Argentina",
    category: "jabones",
    images: [
      [wa("13.38.47"), "Plato con ocho jabones Bandera Argentina"],
      [wa("13.38.40"), "Jabón Bandera Argentina con sol amarillo, visto de cerca"],
      [wa("13.38.44"), "Tres jabones Bandera Argentina en fila"],
    ],
  },
  {
    slug: "rosas-lisas-y-matizadas",
    name: "Rosas lisas y matizadas",
    category: "jabones",
    images: [
      [wa("13.39.22"), "Doce jabones con forma de rosa en tonos rosados"],
      [wa("13.39.24"), "Rosas matizadas en rojo y blanco junto a jabones celestes"],
      [wa("13.39.27"), "Rosas de jabón rojas y celestes"],
      [wa("13.39.30"), "Rosas rojas y ovalados con rulos rosados"],
      [wa("13.39.33"), "Rosas fucsia translúcidas"],
      [wa("13.39.36"), "Rosa rosada sobre pétalos secos"],
      [wa("13.39.41"), "Rosas rojas translúcidas de cerca"],
      [wa("13.39.47"), "Bandeja con rosas y ovalados en naranja y blanco"],
    ],
  },
  {
    slug: "ovalados-y-corazones-con-rulos",
    name: "Ovalados y corazones con rulos de leche de cabra",
    category: "jabones",
    images: [
      [wa("13.39.54"), "Ovalados con rulos de leche de cabra junto a un jabón con la leyenda 100% hand made"],
      [wa("13.39.57"), "Rulos de jabón de leche de cabra de cerca"],
      [wa("13.40.02"), "Corazón celeste translúcido con rulos de leche de cabra"],
    ],
  },
  {
    slug: "bebes-y-ninos",
    name: "Bebés y niños",
    category: "jabones",
    images: [
      [wa("13.40.19"), "Jabones infantiles rosa y azul con forma de tren, osito, caballito y mariposa"],
      [wa("13.40.08"), "Jabones con forma de casita en azul, naranja y rojo"],
      [wa("13.40.13"), "Casitas de jabón de colores"],
      [wa("13.40.17"), "Ositos de jabón transparente"],
      [wa("13.40.22"), "Trencito de jabón azul"],
      [wa("13.40.26"), "Jabón naranja con forma de gatita con moño"],
    ],
  },
  {
    slug: "navidad",
    name: "Navidad",
    category: "jabones",
    images: [
      [wa("13.40.46"), "Bandeja de árboles navideños de jabón verdes y blancos"],
      [wa("13.40.34"), "Árbol de Navidad de jabón azul con brillos, en la mano"],
      [wa("13.40.39 (1)"), "Árbol azul y casita roja de jabón sobre papel navideño"],
      [wa("13.40.39"), "Bandeja de árboles navideños azules y blancos"],
      [wa("13.40.43"), "Tres árboles de Navidad rojos con centro blanco"],
      [wa("13.40.48"), "Árboles navideños verdes envueltos con etiqueta Mar D"],
    ],
  },
  {
    slug: "corazones-y-flores",
    name: "Corazones y flores",
    category: "jabones",
    images: [[wa("13.40.51"), "Corazones y flores de jabón en lila, amarillo y rojo"]],
  },
  {
    slug: "halloween",
    name: "Halloween",
    category: "jabones",
    images: [[wa("13.40.54"), "Calabazas, fantasmas, calaveras y murciélagos de jabón en naranja y violeta"]],
  },
  {
    slug: "jabon-de-alepo",
    name: "Jabón de Alepo",
    category: "jabones",
    ingredients: "Aceite de oliva y aceite esencial de laurel",
    images: [
      [wa("13.41.05"), "Jabones de Alepo en tonos crema y verde con relieves"],
      [wa("13.40.59"), "Jabones de Alepo verdes apilados con relieve de hojas"],
      [wa("13.41.02"), "Dos jabones de Alepo con relieve de arabescos"],
    ],
  },
  {
    slug: "motivos-marinos",
    name: "Motivos marinos",
    category: "jabones",
    images: [
      [loose("2025-12-11 at 18.08.35-1"), "Jabones celestes con forma de faro, ballena, tortuga y estrella de mar"],
    ],
  },
  {
    slug: "atrapasol-flor-de-murrinas",
    name: "Atrapasol Flor de murrinas",
    category: "resinas",
    images: [
      [loose("2025-12-11 at 18.17.53-1"), "Atrapasol de resina con forma de flor, flores celestes y murrinas de colores"],
    ],
  },
  {
    slug: "luna-de-murrinas",
    name: "Luna de murrinas",
    category: "resinas",
    images: [[loose("2025-12-11 at 18.17.58-1"), "Media luna de resina transparente con murrinas de colores"]],
  },
];

const HOME = {
  title: "Jabones y resinas hechos a mano",
  eyebrow: "Mar D Jabones",
  description: "Piezas únicas inspiradas en el mar, creadas en pequeños lotes en Buenos Aires.",
  images: [
    [wa("13.38.47"), "Plato con jabones Bandera Argentina"],
    [wa("13.39.47"), "Bandeja con rosas de jabón en naranja y blanco"],
    [wa("13.41.05"), "Jabones de Alepo con relieves"],
    [wa("13.40.46"), "Árboles navideños de jabón verdes y blancos"],
    [loose("2026-03-31 at 01.45.03"), "Jabón Atardecer isleño, premiado en 2023"],
  ],
};

// Sanity dedupes assets by content hash, so re-runs don't create duplicates.
const assetIds = new Map();

async function image([file, alt], key) {
  if (!assetIds.has(file)) {
    const asset = await client.assets.upload("image", createReadStream(file), {
      filename: path.basename(file),
    });
    assetIds.set(file, asset._id);
    console.log(`  subida: ${path.basename(file)}`);
  }
  return {
    _type: "imageWithAlt",
    ...(key ? { _key: key } : {}),
    alt,
    asset: { _type: "reference", _ref: assetIds.get(file) },
  };
}

const images = (list) => Promise.all(list.map((entry, i) => image(entry, `foto-${i}`)));
const slug = (current) => ({ _type: "slug", current });

console.log("Subiendo fotos...");
const docs = [];

for (const c of CATEGORIES) {
  docs.push({
    _id: `category-${c.slug}`,
    _type: "category",
    name: c.name,
    slug: slug(c.slug),
    description: c.description,
    image: await image(c.image),
  });
}

for (const p of PRODUCTS) {
  docs.push({
    _id: `product-${p.slug}`,
    _type: "product",
    name: p.name,
    slug: slug(p.slug),
    category: { _type: "reference", _ref: `category-${p.category}` },
    images: await images(p.images),
    ...(p.ingredients ? { ingredients: p.ingredients } : {}),
    ...(p.award ? { award: p.award } : {}),
  });
}

docs.push({
  _id: "homePage",
  _type: "homePage",
  title: HOME.title,
  eyebrow: HOME.eyebrow,
  description: HOME.description,
  images: await images(HOME.images),
});

const tx = client.transaction();
for (const doc of docs) tx.createIfNotExists(doc);
await tx.commit();

console.log(`Listo: ${docs.length} documentos (los que ya existían no se tocaron).`);
