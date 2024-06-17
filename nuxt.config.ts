// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
    "@pinia/nuxt",
  ],
  supabase: {
    // Options
    redirect: false,
  },
  nitro: {
    plugins: ["~/server/db/index.ts"],
  },
  runtimeConfig: {
    mongodbUri: process.env.MONGO_URI,
  },
});
