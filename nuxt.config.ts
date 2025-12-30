export default defineNuxtConfig({
  modules: [
    "@nuxtjs/i18n",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/hints",
    "@nuxt/icon",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "nuxt-studio",
  ],

  i18n: {
    defaultLocale: "en",
    strategy: "prefix_except_default",
    locales: [
      {
        code: "en",
        name: "English",
      },
    ],
  },

  content: {
    locales: ["en"],
    defaultLocale: "en",
  },

  // llms: {
  //   domain: "http://localhost:3000",
  // },
});
