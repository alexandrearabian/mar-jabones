import { defineField, defineType } from "sanity";

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Imagen",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Texto alternativo",
      description: "Qué se ve en la foto. Lo leen los lectores de pantalla y Google.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});
