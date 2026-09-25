import { defineArrayMember, defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Producto",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL",
      description: "Se usa en la dirección: /productos/<url>.",
      type: "slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      title: "Fotos",
      description: "La primera es la portada.",
      type: "array",
      of: [defineArrayMember({ type: "imageWithAlt" })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "sizes",
      title: "Tamaños",
      description: "Por ejemplo: Chico, Mediano, Grande.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "ingredients",
      title: "Ingredientes",
      description: "Solo si se conocen. Si está vacío, no se muestra.",
      type: "string",
    }),
    defineField({
      name: "award",
      title: "Premio",
      description: "Ej.: Premiado por Soapmaking Magazine 2023.",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "category.name", media: "images.0" },
  },
});
