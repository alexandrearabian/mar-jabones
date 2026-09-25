import "server-only";

import { defineQuery } from "next-sanity";
import { sanityFetch } from "./client";

export interface SanityImage {
  url: string;
  alt: string;
  lqip: string | null;
  hotspot: { x: number; y: number } | null;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string | null;
  image: SanityImage | null;
}

export interface ProductSummary {
  _id: string;
  name: string;
  slug: string;
  award: string | null;
  category: { name: string; slug: string };
  image: SanityImage | null;
}

export interface Product extends ProductSummary {
  images: SanityImage[];
  sizes: string[] | null;
  ingredients: string | null;
}

export interface HomePage {
  title: string;
  eyebrow: string | null;
  description: string | null;
  images: SanityImage[];
}

const IMAGE = `{ "url": asset->url, "lqip": asset->metadata.lqip, hotspot, alt }`;

const PRODUCT_SUMMARY = `
  _id,
  name,
  "slug": slug.current,
  award,
  "category": category->{ name, "slug": slug.current },
  "image": images[0]${IMAGE}
`;

const CATEGORY = `_id, name, "slug": slug.current, description, "image": image${IMAGE}`;

const homePageQuery = defineQuery(`*[_id == "homePage"][0]{
  title, eyebrow, description, "images": coalesce(images[]${IMAGE}, [])
}`);

const categoriesQuery = defineQuery(`*[_type == "category" && defined(slug.current)]
  | order(name asc){ ${CATEGORY} }`);

const categoryQuery = defineQuery(`*[_type == "category" && slug.current == $slug][0]{ ${CATEGORY} }`);

const productsQuery = defineQuery(`*[
  _type == "product" && defined(slug.current)
  && ($category == null || category->slug.current == $category)
] | order(name asc){ ${PRODUCT_SUMMARY} }`);

const productQuery = defineQuery(`*[_type == "product" && slug.current == $slug][0]{
  ${PRODUCT_SUMMARY},
  "images": coalesce(images[]${IMAGE}, []),
  sizes,
  ingredients
}`);

const slugsQuery = defineQuery(`*[_type in ["category", "product"] && defined(slug.current)]{
  "slug": slug.current, _updatedAt
}`);

export const getHomePage = () => sanityFetch<HomePage | null>(homePageQuery);

export const getCategories = () => sanityFetch<Category[]>(categoriesQuery);

export const getCategory = (slug: string) => sanityFetch<Category | null>(categoryQuery, { slug });

export const getProducts = (category: string | null = null) =>
  sanityFetch<ProductSummary[]>(productsQuery, { category });

export const getProduct = (slug: string) => sanityFetch<Product | null>(productQuery, { slug });

export const getSlugs = () => sanityFetch<{ slug: string; _updatedAt: string }[]>(slugsQuery);
