import type { StructureResolver } from "sanity/structure";

export const HOME_PAGE_ID = "homePage";
export const singletonTypes = new Set(["homePage"]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenido")
    .items([
      S.listItem()
        .title("Página de inicio")
        .id(HOME_PAGE_ID)
        .child(S.document().schemaType("homePage").documentId(HOME_PAGE_ID)),
      S.divider(),
      S.documentTypeListItem("product").title("Productos"),
      S.documentTypeListItem("category").title("Categorías"),
    ]);
