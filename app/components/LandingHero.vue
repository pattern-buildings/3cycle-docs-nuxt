<template>
  <section class="hero">
    <div class="hero-inner">
      <p class="hero-tag">Open-source timber construction system</p>

      <h1 class="hero-title">
        Industrial precision,<br>
        <em>architectural</em> freedom
      </h1>

      <p class="hero-sub">
        3Cycle is an open building system for modular timber structures up to
        7 stories. Room modules, a structural skeleton, and a customizable
        skin — manufactured offsite, assembled on location. Open-source
        under CC BY 4.0.
      </p>

      <div class="hero-actions">
        <a href="/en/getting-started/introduction" class="btn-primary">
          Read the docs
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3.33 8h9.34M8.67 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
        <a href="/en/essentials/design-guidelines" class="btn-secondary">
          Design guidelines
        </a>
      </div>
    </div>

    <div class="hero-visual">
      <div class="visual-placeholder">
        <div class="placeholder-inner">
          <div class="ph-block ph-a" />
          <div class="ph-block ph-b" />
          <div class="ph-block ph-c" />
        </div>
        <span class="visual-caption">System visualization placeholder</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 8rem 2rem 6rem;
  min-height: calc(85vh - var(--ui-header-height, 64px));
}

.hero-tag {
  font-family: 'DM Mono', monospace;
  font-size: 0.8125rem;
  letter-spacing: 0.04em;
  color: var(--ui-primary);
  margin: 0 0 1.75rem;
}

.hero-title {
  font-family: 'Instrument Serif', 'Georgia', serif;
  font-size: clamp(2.75rem, 5.5vw, 4.75rem);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.025em;
  color: var(--ui-text-highlighted);
  margin: 0 0 2rem;
}

.hero-title em {
  font-style: italic;
}

.hero-sub {
  font-size: 1.0625rem;
  line-height: 1.75;
  color: var(--ui-text-muted);
  max-width: 480px;
  margin: 0 0 2.5rem;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 1.25rem;
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

.btn-secondary {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--ui-text-highlighted);
  border: 1px solid var(--ui-border);
  border-radius: 6px;
  text-decoration: none;
  transition: border-color 0.2s, background-color 0.2s;
}

.btn-secondary:hover {
  border-color: var(--ui-border-hover);
  background: var(--ui-bg-elevated);
}

/* --- Visual placeholder --- */
.hero-visual {
  display: flex;
  justify-content: center;
}

.visual-placeholder {
  position: relative;
  width: 100%;
  max-width: 520px;
  aspect-ratio: 4 / 3;
  border: 1px solid var(--ui-border);
  border-radius: 12px;
  background: var(--ui-bg-elevated);
  overflow: hidden;
}

.placeholder-inner {
  position: absolute;
  inset: 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0.75rem;
}

.ph-block {
  border-radius: 8px;
  border: 1px dashed var(--ui-border);
  background: var(--ui-bg);
  transition: border-color 0.3s;
}

.ph-block:hover {
  border-color: var(--ui-primary);
}

.ph-a {
  grid-row: 1 / 3;
}

.visual-caption {
  position: absolute;
  bottom: 0.75rem;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'DM Mono', monospace;
  font-size: 0.6875rem;
  color: var(--ui-text-dimmed);
  white-space: nowrap;
}

@media (max-width: 1024px) {
  .hero {
    grid-template-columns: 1fr;
    padding: 5rem 1.5rem 4rem;
    min-height: auto;
    gap: 3rem;
  }

  .hero-visual {
    order: -1;
  }

  .visual-placeholder {
    max-width: 440px;
  }
}

@media (max-width: 640px) {
  .hero {
    padding: 3.5rem 1rem 3rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
