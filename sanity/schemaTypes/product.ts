import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Produit",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nom", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "price", title: "Prix (FCFA)", type: "number", validation: (r) => r.required().min(0) }),
    defineField({
      name: "category", title: "Catégorie", type: "string",
      options: { list: ["robes", "jupes", "chaussures", "sacs", "accessoires", "perruques"] },
    }),
    defineField({ name: "images", title: "Photos", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
    defineField({ name: "sizes", title: "Tailles", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({
      name: "colors", title: "Couleurs", type: "array",
      of: [{ type: "object", fields: [{ name: "name", type: "string" }, { name: "hex", type: "string" }] }],
    }),
    defineField({ name: "isNew", title: "Nouveauté", type: "boolean", initialValue: true }),
  ],
});
