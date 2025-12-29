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
});
