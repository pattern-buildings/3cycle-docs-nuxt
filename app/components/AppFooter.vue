<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <img src="/3cycle-logo-S.svg" alt="3Cycle" class="footer-logo" />
      <span class="footer-text">&copy; 3Cycle {{ new Date().getFullYear() }}</span>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  border-top: 1px solid var(--ui-border);
  padding: 1.5rem 1rem;
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  font-size: 0.875rem;
  color: var(--ui-text-muted);
}

.footer-logo {
  height: 1.5rem;
  width: auto;
  flex-shrink: 0;
}
</style>
