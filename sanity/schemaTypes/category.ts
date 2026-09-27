import { defineField, defineType } from "sanity";
import { nameField, slugField } from "./fields";

export const category = defineType({
  name: "category",
  title: "Categoría",
  type: "document",
  fields: [
    nameField,
    slugField,
    defineField({ name: "description", title: "Descripción", type: "text", rows: 2 }),
    defineField({ name: "image", title: "Imagen", type: "imageWithAlt" }),
  ],
  preview: { select: { title: "name", media: "image" } },
});
