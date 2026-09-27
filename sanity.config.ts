"use client";

// Studio mounted at /studio (see app/studio/[[...tool]]/page.tsx).
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { singletonTypes, structure } from "./sanity/structure";

const singletonActions = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  basePath: "/studio",
  title: "Mar D Jabones",
  projectId,
  dataset,
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
    // Singletons can't be created from "+ New" ...
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    // ... nor duplicated or deleted
    actions: (actions, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? actions.filter(({ action }) => action && singletonActions.has(action))
        : actions,
  },
});
