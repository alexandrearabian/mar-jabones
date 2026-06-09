import type { Schema, Struct } from "@strapi/strapi";

export interface SharedCarousel extends Struct.ComponentSchema {
  collectionName: "components_shared_carousels";
  info: {
    displayName: "carousel";
    icon: "apps";
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<"images" | "files", true> &
      Schema.Attribute.Required;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 5;
      }>;
  };
}

declare module "@strapi/strapi" {
  export module Public {
    export interface ComponentSchemas {
      "shared.carousel": SharedCarousel;
    }
  }
}
