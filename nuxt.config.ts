// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "vuetify-nuxt-module",
    "@vueuse/nuxt",
    'maz-ui/nuxt'
  ],

  i18n: {
    locales: [
      { code: "en", iso: "en-US", file: "en.json" },
      { code: "ar", iso: "ar-SA", file: "ar.json" },
    ],
    lazy: true,
    langDir: "locales/",
    defaultLocale: "ar",
  },
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* vuetify options */
    },
  },
  css: ["@/assets/styles/styles.scss"], // Add your global SCSS file here
  build: {
    transpile: [],
  },
});
