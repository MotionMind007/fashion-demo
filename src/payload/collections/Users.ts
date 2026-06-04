import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true, // Enables Payload's built-in auth (login, JWT, sessions)
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "role"],
  },
  access: {
    // Only super-admins can manage users
    read: ({ req }) => !!req.user,
    create: ({ req }) => req.user?.role === "super-admin",
    update: ({ req }) => req.user?.role === "super-admin" || !!req.user,
    delete: ({ req }) => req.user?.role === "super-admin",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "Super Admin", value: "super-admin" },
        { label: "Editor", value: "editor" },
        { label: "Viewer", value: "viewer" },
      ],
      admin: {
        position: "sidebar",
      },
    },
  ],
};
