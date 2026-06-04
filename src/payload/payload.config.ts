import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";

import { Products } from "./collections/Products";
import { Services } from "./collections/Services";
import { Pages } from "./collections/Pages";
import { Messages } from "./collections/Messages";
import { Media } from "./collections/Media";
import { Users } from "./collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
  secret: process.env.PAYLOAD_SECRET || "default-secret-change-me",

  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " — NOIR Admin",
    },
  },

  editor: lexicalEditor({}),

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),

  collections: [Products, Services, Pages, Messages, Media, Users],

  typescript: {
    outputFile: path.resolve(dirname, "../payload-types.ts"),
  },

  // CORS configuration
  cors: [
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
  ],
});
