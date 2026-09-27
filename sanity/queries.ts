import "server-only";

import { defineQuery } from "next-sanity";
import { sanityFetch } from "./client";

export interface SanityImage {
  url: string;
  alt: string;
  hotspot: { x: number; y: number } | null;
}

export interface ProductSummary {
  _id: string;
  name: string;
  slug: string;
  award: string | null;
  category: { name: string; slug: string };
  image: SanityImage | null;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string | null;
  image: SanityImage | null;
  productCount: number;
}

export interface Product extends ProductSummary {
  images: SanityImage[];
  sizes: string[] | null;
  ingredients: string | null;
  related: ProductSummary[];
}

export interface HomePage {
  title: string;
  eyebrow: string | null;
  description: string | null;
  images: SanityImage[];
  featured: ProductSummary[];
}

/** /productos/<slug> resolves to a category (with its products) or a product, in one request. */
export interface SlugPage {
  category: (Category & { products: ProductSummary[] }) | null;
  product: Product | null;
  categories: Category[];
}

const IMAGE = `{ "url": asset->url, hotspot, alt }`;

const PRODUCT_SUMMARY = `
  _id,
  name,
  "slug": slug.current,
  award,
  "category": category->{ name, "slug": slug.current },
  "image": images[0]${IMAGE}
`;

const PUBLISHED_PRODUCTS = `*[_type == "product" && defined(slug.current)]`;

const CATEGORY = `
  _id,
  name,
  "slug": slug.current,
  description,
  "image": image${IMAGE},
  "productCount": count(${PUBLISHED_PRODUCTS.slice(0, -1)} && references(^._id)])
`;

const CATEGORIES = `*[_type == "category" && defined(slug.current)] | order(name asc){ ${CATEGORY} }`;

// Editors can pick "Destacados"; otherwise award winners first, then the lines with the most photos.
const homePageQuery = defineQuery(`*[_id == "homePage"][0]{
  title,
  eyebrow,
  description,
  "images": coalesce(images[]${IMAGE}, []),
  "featured": select(
    count(featured) > 0 => featured[0...4]->{ ${PRODUCT_SUMMARY} },
    ${PUBLISHED_PRODUCTS} | order(defined(award) desc, count(images) desc, name asc)[0...4]{ ${PRODUCT_SUMMARY} }
  )
}`);

const categoriesQuery = defineQuery(CATEGORIES);

const productsQuery = defineQuery(`${PUBLISHED_PRODUCTS} | order(name asc){ ${PRODUCT_SUMMARY} }`);

const slugPageQuery = defineQuery(`{
  "category": *[_type == "category" && slug.current == $slug][0]{
    ${CATEGORY},
    "products": ${PUBLISHED_PRODUCTS.slice(0, -1)} && references(^._id)] | order(name asc){ ${PRODUCT_SUMMARY} }
  },
  "product": *[_type == "product" && slug.current == $slug][0]{
    ${PRODUCT_SUMMARY},
    "images": coalesce(images[]${IMAGE}, []),
    sizes,
    ingredients,
    "related": ${PUBLISHED_PRODUCTS.slice(0, -1)} && category._ref == ^.category._ref && _id != ^._id]
      | order(name asc)[0...4]{ ${PRODUCT_SUMMARY} }
  },
  "categories": ${CATEGORIES}
}`);

const slugsQuery = defineQuery(`*[_type in ["category", "product"] && defined(slug.current)]{
  "slug": slug.current, _updatedAt
}`);

export const getHomePage = () => sanityFetch<HomePage | null>(homePageQuery);

export const getCategories = () => sanityFetch<Category[]>(categoriesQuery);

export const getProducts = () => sanityFetch<ProductSummary[]>(productsQuery);

export const getSlugPage = (slug: string) => sanityFetch<SlugPage>(slugPageQuery, { slug });

export const getSlugs = () => sanityFetch<{ slug: string; _updatedAt: string }[]>(slugsQuery);
