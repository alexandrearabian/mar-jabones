import { cache } from "react";
import { z } from "zod";
import type { ContactFormCopy, HeroSlideView, HomePageViewModel } from "@/types/homepage";
import { getStrapiMediaUrl } from "./config";
import { strapiGet, StrapiRequestError } from "./client";
import { HOME_PAGE_DEFAULTS } from "./defaults-home";
import { pickStrapiMediaUrl } from "./media";

const heroSlideComponentSchema = z
  .object({
    id: z.union([z.number(), z.string()]).optional(),
    documentId: z.string().optional(),
    title: z.string(),
    subtitle: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    image: z.unknown().optional().nullable(),
  })
  .passthrough();

const homePageEntitySchema = z
  .object({
    metaTitle: z.string().nullable().optional(),
    metaDescription: z.string().nullable().optional(),
    heroSlides: z.array(heroSlideComponentSchema).nullable().optional(),
    heroEmptyMessage: z.string().nullable().optional(),
    heroPrimaryCtaLabel: z.string().nullable().optional(),
    heroSecondaryCtaLabel: z.string().nullable().optional(),
    heroPrimaryCtaPath: z.string().nullable().optional(),
    heroSecondaryCtaPath: z.string().nullable().optional(),
    featuredSectionTitle: z.string().nullable().optional(),
    featuredSectionSubtitle: z.string().nullable().optional(),
    contactSectionTitle: z.string().nullable().optional(),
    contactSectionSubtitle: z.string().nullable().optional(),
    contactNameLabel: z.string().nullable().optional(),
    contactNamePlaceholder: z.string().nullable().optional(),
    contactEmailLabel: z.string().nullable().optional(),
    contactEmailPlaceholder: z.string().nullable().optional(),
    contactMessageLabel: z.string().nullable().optional(),
    contactMessagePlaceholder: z.string().nullable().optional(),
    contactSubmitLabel: z.string().nullable().optional(),
    contactSubmittingLabel: z.string().nullable().optional(),
    contactValidationNameMin: z.string().nullable().optional(),
    contactValidationEmailInvalid: z.string().nullable().optional(),
    contactValidationMessageMin: z.string().nullable().optional(),
    contactToastSuccessTitle: z.string().nullable().optional(),
    contactToastSuccessDescription: z.string().nullable().optional(),
    contactToastErrorTitle: z.string().nullable().optional(),
    contactToastErrorDescription: z.string().nullable().optional(),
    emptyProductsMessage: z.string().nullable().optional(),
    productsLoadErrorMessage: z.string().nullable().optional(),
  })
  .passthrough();

function unwrapStrapiDocument(payload: unknown): Record<string, unknown> | null {
  if (!payload || typeof payload !== "object") return null;
  const data = (payload as { data?: unknown }).data;
  if (!data || typeof data !== "object") return null;
  const obj = data as Record<string, unknown>;
  if (obj.attributes && typeof obj.attributes === "object") {
    return obj.attributes as Record<string, unknown>;
  }
  return obj;
}

function mergeContact(
  base: ContactFormCopy,
  raw: z.infer<typeof homePageEntitySchema>,
): ContactFormCopy {
  return {
    nameLabel: raw.contactNameLabel ?? base.nameLabel,
    namePlaceholder: raw.contactNamePlaceholder ?? base.namePlaceholder,
    emailLabel: raw.contactEmailLabel ?? base.emailLabel,
    emailPlaceholder: raw.contactEmailPlaceholder ?? base.emailPlaceholder,
    messageLabel: raw.contactMessageLabel ?? base.messageLabel,
    messagePlaceholder: raw.contactMessagePlaceholder ?? base.messagePlaceholder,
    submitLabel: raw.contactSubmitLabel ?? base.submitLabel,
    submittingLabel: raw.contactSubmittingLabel ?? base.submittingLabel,
    validation: {
      nameMin: raw.contactValidationNameMin ?? base.validation.nameMin,
      emailInvalid: raw.contactValidationEmailInvalid ?? base.validation.emailInvalid,
      messageMin: raw.contactValidationMessageMin ?? base.validation.messageMin,
    },
    toastSuccess: {
      title: raw.contactToastSuccessTitle ?? base.toastSuccess.title,
      description: raw.contactToastSuccessDescription ?? base.toastSuccess.description,
    },
    toastError: {
      title: raw.contactToastErrorTitle ?? base.toastError.title,
      description: raw.contactToastErrorDescription ?? base.toastError.description,
    },
  };
}

function mapHeroSlides(raw: z.infer<typeof heroSlideComponentSchema>[]): HeroSlideView[] {
  const out: HeroSlideView[] = [];
  raw.forEach((slide, index) => {
    const path = pickStrapiMediaUrl(slide.image);
    const url = path ? getStrapiMediaUrl(path) : null;
    if (!url) return;
    const id =
      slide.documentId !== undefined
        ? String(slide.documentId)
        : slide.id !== undefined
          ? String(slide.id)
          : `hero-slide-${index}`;
    out.push({
      id,
      title: slide.title,
      subtitle: slide.subtitle ?? "",
      description: slide.description ?? "",
      image: url,
    });
  });
  return out;
}

function normalizePath(path: string | undefined, fallback: string): string {
  const p = (path ?? "").trim();
  if (!p) return fallback;
  return p.startsWith("/") ? p : `/${p}`;
}

function mergeHomePage(
  raw: z.infer<typeof homePageEntitySchema>,
  defaults: HomePageViewModel,
): HomePageViewModel {
  const slides = raw.heroSlides ? mapHeroSlides(raw.heroSlides) : defaults.heroSlides;
  return {
    metaTitle: raw.metaTitle ?? defaults.metaTitle,
    metaDescription: raw.metaDescription ?? defaults.metaDescription,
    heroEmptyMessage: raw.heroEmptyMessage ?? defaults.heroEmptyMessage,
    heroSlides: slides,
    heroPrimaryCta: {
      label: raw.heroPrimaryCtaLabel ?? defaults.heroPrimaryCta.label,
      href: normalizePath(
        raw.heroPrimaryCtaPath ?? undefined,
        defaults.heroPrimaryCta.href,
      ),
    },
    heroSecondaryCta: {
      label: raw.heroSecondaryCtaLabel ?? defaults.heroSecondaryCta.label,
      href: normalizePath(
        raw.heroSecondaryCtaPath ?? undefined,
        defaults.heroSecondaryCta.href,
      ),
    },
    featuredSectionTitle: raw.featuredSectionTitle ?? defaults.featuredSectionTitle,
    featuredSectionSubtitle:
      raw.featuredSectionSubtitle ?? defaults.featuredSectionSubtitle,
    contactSectionTitle: raw.contactSectionTitle ?? defaults.contactSectionTitle,
    contactSectionSubtitle:
      raw.contactSectionSubtitle ?? defaults.contactSectionSubtitle,
    contactForm: mergeContact(defaults.contactForm, raw),
    emptyProductsMessage: raw.emptyProductsMessage ?? defaults.emptyProductsMessage,
    productsLoadErrorMessage:
      raw.productsLoadErrorMessage ?? defaults.productsLoadErrorMessage,
  };
}

async function fetchHomePageFromStrapi(): Promise<HomePageViewModel> {
  const query = "?populate[heroSlides][populate][0]=image";
  const json = await strapiGet<unknown>(`/api/home-page${query}`);
  const doc = unwrapStrapiDocument(json);
  if (!doc) {
    throw new StrapiRequestError("Respuesta de home-page inválida", 500);
  }
  const parsed = homePageEntitySchema.safeParse(doc);
  if (!parsed.success) {
    throw new StrapiRequestError("No se pudo validar home-page", 500);
  }
  return mergeHomePage(parsed.data, HOME_PAGE_DEFAULTS);
}

export const getHomePageContent = cache(async (): Promise<HomePageViewModel> => {
  try {
    return await fetchHomePageFromStrapi();
  } catch (e) {
    if (e instanceof StrapiRequestError && e.status === 0) {
      return HOME_PAGE_DEFAULTS;
    }
    console.warn("[strapi] getHomePageContent:", e);
    return HOME_PAGE_DEFAULTS;
  }
});
