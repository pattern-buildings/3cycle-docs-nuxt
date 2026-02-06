declare module "@nuxt/schema" {
  interface AppConfigInput {
    github?:
      | false
      | {
          url?: string;
          branch?: string;
          rootDir?: string;
        };
  }
}

export default defineAppConfig({
  github: false,
  ui: {
    colors: {
      primary: "emerald",
      neutral: "neutral",
    },
  },
  header: {
    title: "3Cycle Docs",
    logo: {
      light: "/3cycle-logo-S.svg",
      dark: "/3cycle-logo-S.svg",
      alt: "3Cycle",
    },
  },
});
