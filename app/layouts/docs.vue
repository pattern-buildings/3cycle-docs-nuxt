<template>
  <UMain>
    <UContainer>
      <UPage :ui="{ root: 'flex flex-col lg:grid lg:grid-cols-12 lg:gap-10', left: 'lg:col-span-3', center: 'lg:col-span-9' }">
        <template #left>
          <UPageAside>
            <DocsAsideLeftTop />
            <DocsAsideLeftBody />
          </UPageAside>
        </template>
        <slot />
      </UPage>
    </UContainer>
  </UMain>
</template>
