// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  modules: [
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "vuetify-nuxt-module",
    "@vueuse/nuxt",
    "maz-ui/nuxt",
    "vue3-carousel-nuxt",
  ],

  i18n: {
    locales: [
      { code: "en", iso: "en-US", file: "en.json" },
      { code: "ar", iso: "ar-SA", file: "ar.json" },
    ],
    lazy: true,
    langDir: "locales/",
    defaultLocale: "ar",
    strategy: "no_prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "lang",
      alwaysRedirect: false, // Optional: Set to true if you want automatic redirection
      fallbackLocale: "ar",
    },
  },

  // i18n: {
  //   locales: [
  //     { code: "en", iso: "en-US", file: "en.json" },
  //     { code: "ar", iso: "ar-SA", file: "ar.json" },
  //   ],
  //   lazy: true,
  //   langDir: "locales/",
  //   defaultLocale: "ar",
  //   detectBrowserLanguage: {
  //     useCookie: true,
  //     cookieKey: "i18n_redirected",
  //     redirectOn: "root",
  //   },
  // },
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
