import type { CollectionConfig } from "payload";

export const Messages: CollectionConfig = {
  slug: "messages",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "status", "createdAt"],
  },
  access: {
    // Anyone can create (public contact form)
    create: () => true,
    // Only authenticated admins can read/update/delete
    read: ({ req }) => !!req.user,
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
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "service",
      type: "select",
      options: [
        { label: "Bespoke Tailoring", value: "bespoke" },
        { label: "Styling Session", value: "styling" },
        { label: "Editorial Shoot", value: "editorial" },
        { label: "Make Your Own Design", value: "design" },
        { label: "Lainnya", value: "other" },
      ],
    },
    {
      name: "message",
      type: "textarea",
      required: true,
    },
    {
      name: "status",
      type: "select",
      defaultValue: "unread",
      options: [
        { label: "Unread", value: "unread" },
        { label: "Read", value: "read" },
        { label: "Replied", value: "replied" },
      ],
      admin: {
        position: "sidebar",
      },
    },
  ],
};
