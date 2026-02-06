<template>
  <div class="header-logo">
    <img src="/3cycle-logo-S.svg" alt="3Cycle" class="header-logo-img" />
    <span class="header-logo-title">3Cycle</span>
    <span class="header-logo-slash pt-1">/</span>
    <NuxtLink to="/en/getting-started/introduction" class="header-logo-docs pt-1">DOCS</NuxtLink>
  </div>
</template>

<style scoped>
.header-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.header-logo-img {
  height: 2.25rem;
  width: auto;
  flex-shrink: 0;
}

.header-logo-title {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1;
  color: var(--ui-text);
}

.header-logo-slash {
  font-size: 1.25rem;
  font-weight: 200;
  line-height: 1;
  color: var(--ui-text-muted);
}

.header-logo-docs {
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.05em;
  color: var(--ui-text-muted);
  text-decoration: none;
  text-transform: uppercase;
}

.header-logo-docs:hover {
  color: var(--ui-text);
}
</style>
