export default defineNuxtConfig({
  modules: [
    "@nuxtjs/i18n",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/hints",
    "@nuxt/icon",
    "@nuxt/scripts",
    "@nuxt/test-utils",
  ],

  i18n: {
    defaultLocale: "en",
    strategy: "prefix_except_default",
    locales: [
      {
        code: "en",
        name: "English",
      },
      {
        code: "fr",
        name: "Français",
      },
    ],
  },

  content: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },

  llms: {
    domain: "http://localhost:3000",
  },
});
