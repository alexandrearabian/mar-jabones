export interface HeroSlideView {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface HeroCtaView {
  label: string;
  href: string;
}

export interface ContactFormCopy {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitLabel: string;
  submittingLabel: string;
  validation: {
    nameMin: string;
    emailInvalid: string;
    messageMin: string;
  };
  toastSuccess: { title: string; description: string };
  toastError: { title: string; description: string };
}

export interface HomePageViewModel {
  metaTitle: string;
  metaDescription: string;
  heroEmptyMessage: string;
  heroSlides: HeroSlideView[];
  heroPrimaryCta: HeroCtaView;
  heroSecondaryCta: HeroCtaView;
  featuredSectionTitle: string;
  featuredSectionSubtitle: string;
  contactSectionTitle: string;
  contactSectionSubtitle: string;
  contactForm: ContactFormCopy;
  emptyProductsMessage: string;
  productsLoadErrorMessage: string;
}
