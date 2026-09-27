import { defineField } from "sanity";

/** Fields shared by products and categories. */
export const nameField = defineField({
  name: "name",
  title: "Nombre",
  type: "string",
  validation: (rule) => rule.required(),
});

export const slugField = defineField({
  name: "slug",
  title: "URL",
  description: "Se usa en la dirección: /productos/<url>.",
  type: "slug",
  options: { source: "name" },
  validation: (rule) => rule.required(),
});
