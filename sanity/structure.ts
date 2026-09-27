import type { StructureResolver } from "sanity/structure";

export const HOME_PAGE_ID = "homePage";
export const ABOUT_PAGE_ID = "aboutPage";
export const singletonTypes = new Set(["homePage", "aboutPage"]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenido")
    .items([
      S.listItem()
        .title("Página de inicio")
        .id(HOME_PAGE_ID)
        .child(S.document().schemaType("homePage").documentId(HOME_PAGE_ID)),
      S.listItem()
        .title("Página Sobre mí")
        .id(ABOUT_PAGE_ID)
        .child(S.document().schemaType("aboutPage").documentId(ABOUT_PAGE_ID)),
      S.divider(),
      S.documentTypeListItem("product").title("Productos"),
      S.documentTypeListItem("category").title("Categorías"),
    ]);
