import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    mimeTypes: ["image/png", "image/jpeg", "image/webp", "image/svg+xml"],
    staticDir: "public/uploads",
    imageSizes: [
      { name: "thumbnail", width: 300, height: 300, position: "centre" },
      { name: "card", width: 600, height: 800, position: "centre" },
      { name: "hero", width: 1920, height: 1080, position: "centre" },
    ],
  },
  admin: {
    useAsTitle: "filename",
  },
  access: {
    read: () => true, // Public can view images
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};
