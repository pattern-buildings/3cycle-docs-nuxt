<template>
  <section class="oss">
    <div class="oss-inner">
      <div class="oss-statement">
        <h2 class="oss-title">
          It's open source.<br>
          <em>Yes, really.</em>
        </h2>
        <p class="oss-lead">
          The entire building system — every specification, every connection
          detail, every design file — is published under
          <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0</a>.
          Use it, modify it, build a business on it. No licensing fees,
          no gatekeepers, no permission needed.
        </p>
      </div>

      <div class="oss-grid">
        <div v-for="item in items" :key="item.title" class="oss-card">
          <h3 class="oss-card-title">{{ item.title }}</h3>
          <p class="oss-card-desc">{{ item.desc }}</p>
        </div>
      </div>

      <div class="oss-aside">
        <p class="oss-aside-text">
          Construction knowledge shouldn't be locked behind paywalls.
          3Cycle is built on the conviction that sharing structural
          systems openly produces better buildings for everyone.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
const items = [
  {
    title: 'Build with it',
    desc: 'Manufacture components, assemble buildings, start a construction business. The system is yours to use commercially.',
  },
  {
    title: 'Modify it',
    desc: 'Adapt the specifications to local materials, climate conditions, or regulations. Fork the documentation and make it your own.',
  },
  {
    title: 'Teach with it',
    desc: 'Use 3Cycle in universities, workshops, and training programs. The complete technical documentation is available for education.',
  },
  {
    title: 'Improve it',
    desc: 'Contribute better details, new component variants, or performance data. The system improves as the community grows.',
  },
]
</script>

<style scoped>
.oss {
  border-top: 1px solid var(--ui-border);
  background: var(--ui-bg-elevated);
}

.oss-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem;
}

.oss-statement {
  max-width: 680px;
  margin-bottom: 4rem;
}

.oss-title {
  font-family: 'Instrument Serif', 'Georgia', serif;
  font-size: clamp(2.25rem, 4.5vw, 3.75rem);
  font-weight: 400;
  line-height: 1.12;
  letter-spacing: -0.025em;
  color: var(--ui-text-highlighted);
  margin: 0 0 1.5rem;
}

.oss-title em {
  font-style: italic;
  color: var(--ui-primary);
}

.oss-lead {
  font-size: 1.125rem;
  line-height: 1.75;
  color: var(--ui-text-muted);
  margin: 0;
}

.oss-lead a {
  color: var(--ui-primary);
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, var(--ui-primary) 40%, transparent);
  text-underline-offset: 2px;
  transition: text-decoration-color 0.2s;
}

.oss-lead a:hover {
  text-decoration-color: var(--ui-primary);
}

.oss-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--ui-border);
  border: 1px solid var(--ui-border);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 3rem;
}

.oss-card {
  padding: 2rem;
  background: var(--ui-bg);
  transition: background-color 0.25s;
}

.oss-card:hover {
  background: var(--ui-bg-elevated);
}

.oss-card-title {
  font-family: 'Instrument Serif', 'Georgia', serif;
  font-size: 1.25rem;
  font-weight: 400;
  color: var(--ui-text-highlighted);
  margin: 0 0 0.5rem;
}

.oss-card-desc {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--ui-text-muted);
  margin: 0;
}

.oss-aside {
  max-width: 560px;
}

.oss-aside-text {
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--ui-text-dimmed);
  margin: 0;
  font-style: italic;
}

@media (max-width: 1024px) {
  .oss-inner {
    padding: 4rem 1.5rem;
  }

  .oss-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .oss-grid {
    grid-template-columns: 1fr;
  }
}
</style>
