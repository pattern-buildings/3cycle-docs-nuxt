<template>
  <section class="people">
    <div class="people-inner">
      <div class="people-lead">
        <h2 class="people-title">
          Built by people who<br>
          <em>build buildings</em>
        </h2>
        <p class="people-sub">
          3Cycle is developed by architects, structural engineers, and
          construction researchers across Estonia and Europe. An open
          collaboration between academia and industry.
        </p>
      </div>

      <div class="people-grid">
        <div
          v-for="person in people"
          :key="person.name"
          class="person"
        >
          <div class="person-avatar">
            <span class="avatar-initials">{{ person.initials }}</span>
          </div>
          <div class="person-info">
            <span class="person-name">{{ person.name }}</span>
            <span class="person-role">{{ person.role }}</span>
          </div>
        </div>
      </div>

      <div class="orgs">
        <p class="orgs-label">Supported by</p>
        <div class="orgs-grid">
          <div v-for="org in orgs" :key="org" class="org-placeholder">
            {{ org }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const people = [
  { name: 'Renee Puusepp', initials: 'RP', role: 'System architect' },
  { name: 'Contributor', initials: '?', role: 'Role placeholder' },
  { name: 'Contributor', initials: '?', role: 'Role placeholder' },
  { name: 'Contributor', initials: '?', role: 'Role placeholder' },
  { name: 'Contributor', initials: '?', role: 'Role placeholder' },
  { name: 'Contributor', initials: '?', role: 'Role placeholder' },
]

const orgs = [
  'Estonian Academy of Arts',
  'Creatomus',
  'Harmet',
  'Metsa Wood',
]
</script>

<style scoped>
.people {
  border-top: 1px solid var(--ui-border);
  background: var(--ui-bg-elevated);
}

.people-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem;
}

.people-lead {
  max-width: 540px;
  margin-bottom: 3.5rem;
}

.people-title {
  font-family: 'Instrument Serif', 'Georgia', serif;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--ui-text-highlighted);
  margin: 0 0 1rem;
}

.people-title em {
  font-style: italic;
}

.people-sub {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--ui-text-muted);
  margin: 0;
}

.people-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.person {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.person-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 1px solid var(--ui-border);
  background: var(--ui-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.avatar-initials {
  font-family: 'DM Mono', monospace;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--ui-text-dimmed);
}

.person-info {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  min-width: 0;
}

.person-name {
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--ui-text-highlighted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.person-role {
  font-size: 0.8125rem;
  color: var(--ui-text-muted);
}

/* --- Orgs --- */
.orgs-label {
  font-family: 'DM Mono', monospace;
  font-size: 0.75rem;
  color: var(--ui-text-dimmed);
  margin: 0 0 1rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.orgs-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.org-placeholder {
  padding: 0.5rem 1.25rem;
  font-size: 0.8125rem;
  color: var(--ui-text-muted);
  border: 1px solid var(--ui-border);
  border-radius: 6px;
  background: var(--ui-bg);
}

@media (max-width: 1024px) {
  .people-inner {
    padding: 4rem 1.5rem;
  }

  .people-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .people-grid {
    grid-template-columns: 1fr;
  }
}
</style>
