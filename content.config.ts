import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    landing_en: defineCollection({
      type: 'page',
      source: {
        cwd: 'content',
        include: 'en/index.md',
      },
    }),
    docs_en: defineCollection({
      type: 'page',
      source: {
        cwd: 'content',
        include: 'en/**/*',
        prefix: '/en',
        exclude: ['en/index.md'],
      },
      schema: z.object({
        links: z.array(z.object({
          label: z.string(),
          icon: z.string(),
          to: z.string(),
          target: z.string().optional(),
        })).optional(),
      }),
    }),
  },
})
