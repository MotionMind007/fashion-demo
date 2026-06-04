import type { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "page",
    defaultColumns: ["page", "heroTitle", "updatedAt"],
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => req.user?.role === "super-admin",
  },
  fields: [
    {
      name: "page",
      type: "select",
      required: true,
      unique: true,
      options: [
        { label: "Home", value: "home" },
        { label: "Products", value: "products" },
        { label: "Services", value: "services" },
        { label: "Contact", value: "contact" },
      ],
    },
    {
      name: "heroTitle",
      type: "text",
      required: true,
    },
    {
      name: "heroSubtitle",
      type: "text",
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
    },
  ],
};
