<script setup lang="ts">
import type { ContentNavigationItem, PageCollections } from '@nuxt/content'
import * as nuxtUiLocales from '@nuxt/ui/locale'

const { seo } = useAppConfig()
const site = useSiteConfig()
const { locale, locales, isEnabled, switchLocalePath } = useDocusI18n()
const { isEnabled: isAssistantEnabled, panelWidth: assistantPanelWidth, shouldPushContent } = useAssistant()

const nuxtUiLocale = computed(() => nuxtUiLocales[locale.value as keyof typeof nuxtUiLocales] || nuxtUiLocales.en)
const lang = computed(() => nuxtUiLocale.value.code)
const dir = computed(() => nuxtUiLocale.value.dir)
const collectionName = computed(() => isEnabled.value ? `docs_${locale.value}` : 'docs')

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
  ],
  htmlAttrs: {
    lang,
    dir,
  },
})

useSeoMeta({
  titleTemplate: seo.titleTemplate,
  title: seo.title,
  description: seo.description,
  ogSiteName: site.name,
  twitterCard: 'summary_large_image',
})

if (isEnabled.value) {
  const route = useRoute()
  const defaultLocale = useRuntimeConfig().public.i18n.defaultLocale!
  onMounted(() => {
    const currentLocale = route.path.split('/')[1]
    if (!locales.some(locale => locale.code === currentLocale)) {
      return navigateTo(switchLocalePath(defaultLocale) as string)
    }
  })
}

const { data: navigation } = await useAsyncData(() => `navigation_${collectionName.value}`, () => queryCollectionNavigation(collectionName.value as keyof PageCollections), {
  transform: (data: ContentNavigationItem[]) => {
    const rootResult = data.find(item => item.path === '/docs')?.children || data || []

    return rootResult.find((item: ContentNavigationItem) => item.path === `/${locale.value}`)?.children || rootResult
  },
  watch: [locale],
})
const { data: files } = useLazyAsyncData(`search_${collectionName.value}`, () => queryCollectionSearchSections(collectionName.value as keyof PageCollections), {
  server: false,
  watch: [locale],
})

provide('navigation', navigation)
</script>

<template>
  <UApp :locale="nuxtUiLocale">
    <!-- Under Construction Overlay -->
    <div class="wip-overlay">
      <div class="wip-card">
        <img src="/3cycle-logo-S.svg" alt="3Cycle" class="wip-logo">
        <h1 class="wip-title">3Cycle Documentation</h1>
        <p class="wip-subtitle">Open-source modular timber construction system</p>
        <p class="wip-about">Standardized components for flexible, sustainable building configurations. Designed in Estonia.</p>
        <div class="wip-badge">
          <Icon name="heroicons:wrench-screwdriver-20-solid" class="wip-badge-icon" />
          <span>Under Construction</span>
          <Icon name="heroicons:wrench-screwdriver-20-solid" class="wip-badge-icon" />
        </div>
        <p class="wip-status">We're actively building this documentation site with comprehensive guides, technical specifications, and resources.</p>
        <p class="wip-status-highlight">Check back soon!</p>
      </div>
    </div>

    <NuxtLoadingIndicator color="var(--ui-primary)" />

    <div
      class="transition-[margin-right] duration-200 ease-linear will-change-[margin-right]"
      :style="{ marginRight: shouldPushContent ? `${assistantPanelWidth}px` : '0' }"
    >
      <AppHeader v-if="$route.meta.header !== false" />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <AppFooter v-if="$route.meta.footer !== false" />
    </div>

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
      />
      <template v-if="isAssistantEnabled">
        <LazyAssistantFloatingInput />
        <LazyAssistantPanel />
      </template>
    </ClientOnly>
  </UApp>
</template>

<style scoped>
.wip-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
}

.wip-card {
  text-align: center;
  padding: 2.5rem 2.5rem 2rem;
  border-radius: 1rem;
  background: var(--ui-bg);
  border: 1px solid var(--ui-border);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
  max-width: 480px;
  width: 90%;
}

.wip-logo {
  width: 64px;
  height: 64px;
  margin: 0 auto 1.25rem;
}

.wip-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--ui-text-highlighted);
  margin: 0 0 0.35rem;
}

.wip-subtitle {
  font-size: 1rem;
  font-weight: 500;
  color: var(--ui-primary);
  margin: 0 0 0.75rem;
}

.wip-about {
  font-size: 0.95rem;
  color: var(--ui-text-muted);
  line-height: 1.6;
  margin: 0 0 1.25rem;
}

.wip-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.3);
  color: #f59e0b;
  font-size: 0.85rem;
  font-weight: 600;
  margin: 0 auto 1.25rem;
}

.wip-badge-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.wip-status {
  font-size: 0.9rem;
  color: var(--ui-text-dimmed);
  line-height: 1.6;
  margin: 0 0 0.75rem;
}

.wip-status-highlight {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--ui-text-muted);
  margin: 0;
}

</style>
