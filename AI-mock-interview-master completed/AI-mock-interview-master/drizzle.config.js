/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:npg_HK2VjXNYaB3G@ep-bitter-term-aqadvnbw-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require',
    }
  };