import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "price", "status", "featured"],
  },
  access: {
    read: () => true, // Public can read published products
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.name) {
              return data.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
            }
            return value;
          },
        ],
      },
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Men", value: "men" },
        { label: "Women", value: "women" },
        { label: "Limited", value: "limited" },
      ],
    },
    {
      name: "price",
      type: "number",
      required: true,
      min: 0,
    },
    {
      name: "description",
      type: "richText",
    },
    {
      name: "images",
      type: "upload",
      relationTo: "media",
      hasMany: true,
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "status",
      type: "select",
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      admin: {
        position: "sidebar",
      },
    },
  ],
};
