// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  pages: true,
  ssr: false,
  devtools: { enabled: false },

  app: {
    head: {
      title: "7lPos",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "My amazing Nuxt 3 app" },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.moyasar.com/mpf/1.14.0/moyasar.css",
        },
      ],
    },
  },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "vue3-carousel-nuxt",
    // "@primevue/nuxt-module",
    "vuetify-nuxt-module",
    "@vueuse/nuxt",
    "maz-ui/nuxt",
    "vue3-carousel-nuxt",
  ],
  // plugins: ["~/plugins/vuetify.js"],

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

  primevue: {
    options: {},
  },

  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* vuetify options */
    },
  },
  css: [
    "@/assets/styles/styles.scss",
    "vuetify/styles",
    "@mdi/font/css/materialdesignicons.min.css",
    "primeicons/primeicons.css",
    "vuetify/lib/styles/main.sass",
  ],

  components: true,
  build: {
    transpile: ["vuetify"],
  },
});
