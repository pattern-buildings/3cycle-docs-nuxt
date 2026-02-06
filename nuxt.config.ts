export default defineNuxtConfig({
  css: ["~/assets/css/landing.css"],

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

  studio: {
    repository: {
      provider: "github",
      owner: "pattern-buildings",
      repo: "3cycle-docs-nuxt",
      branch: "main",
      private: false,
    },
  },
  fonts: {
    families: [
      { name: "Instrument Serif", provider: "google", weights: [400] },
      { name: "DM Mono", provider: "google", weights: [400, 500] },
    ],
  },

  llms: {
    domain: "https://3cycle-docs-nuxt.netlify.app",
  },
});
