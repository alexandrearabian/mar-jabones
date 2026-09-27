import { defineArrayMember, defineField, defineType } from "sanity";

/** Singleton: the Studio structure pins a single document with _id "aboutPage". */
export const aboutPage = defineType({
  name: "aboutPage",
  title: "Página Sobre mí",
  type: "document",
  fields: [
    defineField({
      name: "techniques",
      title: "Cómo los hago",
      description: "Cada técnica con un nombre corto y dos o tres frases.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "technique",
          fields: [
            defineField({ name: "name", title: "Técnica", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "text", title: "Texto", type: "text", rows: 3, validation: (rule) => rule.required() }),
          ],
        }),
      ],
      validation: (rule) => rule.max(6),
    }),
  ],
  preview: { prepare: () => ({ title: "Página Sobre mí" }) },
});
