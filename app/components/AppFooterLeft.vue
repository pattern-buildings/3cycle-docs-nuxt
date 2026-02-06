<template>
  <div class="footer-left">
    <img src="/3cycle-logo-S.svg" alt="3Cycle" class="footer-logo" />
    <span class="footer-text">Copyright &copy; {{ new Date().getFullYear() }} 3Cycle</span>
  </div>
</template>

<style scoped>
.footer-left {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-size: 0.875rem;
  color: var(--ui-text-muted);
}

.footer-logo {
  height: 1.25rem;
  width: auto;
  flex-shrink: 0;
}
</style>
