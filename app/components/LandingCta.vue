<template>
  <section class="cta">
    <div class="cta-inner">
      <img src="/3cycle-logo-L.svg" alt="" aria-hidden="true" class="cta-logo" />
      <p class="cta-tag">For architects, builders, and developers</p>
      <h2 class="cta-title">Explore the system</h2>
      <p class="cta-sub">
        Complete specifications for designing, manufacturing, and assembling
        3Cycle buildings. From dimensional coordination to maintenance planning.
      </p>
      <div class="cta-actions">
        <a href="/en/getting-started/introduction" class="btn-primary">
          Start reading
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3.33 8h9.34M8.67 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
      <nav class="cta-links">
        <a href="/en/system/components">Components</a>
        <a href="/en/system/technical-overview">Technical Overview</a>
        <a href="/en/assembly-and-delivery/assembly-and-construction">Assembly</a>
        <a href="/en/assembly-and-delivery/operation-of-the-building">Operation</a>
      </nav>
    </div>
  </section>
</template>

<style scoped>
.cta {
  border-top: 1px solid var(--ui-border);
}

.cta-inner {
  max-width: 640px;
  margin: 0 auto;
  padding: 6rem 2rem;
  text-align: center;
}

.cta-logo {
  width: 4.5rem;
  height: auto;
  margin: 0 auto 1.5rem;
  opacity: 1;
}

.cta-tag {
  font-family: 'DM Mono', monospace;
  font-size: 0.8125rem;
  color: var(--ui-primary);
  margin: 0 0 1.25rem;
}

.cta-title {
  font-family: 'Instrument Serif', 'Georgia', serif;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--ui-text-highlighted);
  margin: 0 0 1rem;
}

.cta-sub {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--ui-text-muted);
  margin: 0 0 2rem;
}

.cta-actions {
  margin-bottom: 2.5rem;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--ui-bg);
  background: var(--ui-primary);
  border-radius: 6px;
  text-decoration: none;
  transition: opacity 0.2s;
}

.btn-primary:hover {
  opacity: 0.85;
}

.cta-links {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.cta-links a {
  font-size: 0.875rem;
  color: var(--ui-text-muted);
  text-decoration: none;
  transition: color 0.2s;
}

.cta-links a:hover {
  color: var(--ui-primary);
}

@media (max-width: 640px) {
  .cta-inner {
    padding: 4rem 1rem;
  }

  .cta-links {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>
