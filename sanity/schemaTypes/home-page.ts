import { defineArrayMember, defineField, defineType } from "sanity";

/** Singleton: the Studio structure pins a single document with _id "homePage". */
export const homePage = defineType({
  name: "homePage",
  title: "Página de inicio",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Etiqueta sobre el título",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Descripción",
      description: "Una frase corta (máx. 20 palabras).",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "images",
      title: "Fotos del carrusel",
      type: "array",
      of: [defineArrayMember({ type: "imageWithAlt" })],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: { prepare: () => ({ title: "Página de inicio" }) },
});
