<template>
  <section class="dfma">
    <div class="dfma-inner">
      <div class="dfma-lead">
        <p class="dfma-tag">Beyond DfMA</p>
        <h2 class="dfma-title">
          Designed for manufacturing, assembly,<br>
          <em>disassembly, and reassembly</em>
        </h2>
        <p class="dfma-sub">
          The construction industry knows DfMA — Design for Manufacturing and
          Assembly. 3Cycle takes it further. Every connection, every joint,
          every component is designed to come apart as cleanly as it goes
          together. Buildings become material banks. Nothing is permanent
          except the system itself.
        </p>
      </div>

      <div class="dfma-phases">
        <div
          v-for="(phase, i) in phases"
          :key="phase.name"
          class="phase"
        >
          <div class="phase-header">
            <span class="phase-num">{{ String(i + 1).padStart(2, '0') }}</span>
            <div class="phase-line" />
          </div>
          <h3 class="phase-name">{{ phase.name }}</h3>
          <p class="phase-desc">{{ phase.desc }}</p>
        </div>
      </div>

      <div class="dfma-bottom">
        <div class="dfma-visual">
          <div class="cycle-ring">
            <svg viewBox="0 0 200 200" fill="none" aria-hidden="true">
              <circle cx="100" cy="100" r="80" stroke="var(--ui-border)" stroke-width="1"/>
              <path
                d="M100 20 A80 80 0 0 1 180 100"
                stroke="var(--ui-primary)"
                stroke-width="2"
                stroke-linecap="round"
                opacity="0.6"
              />
              <path
                d="M180 100 A80 80 0 0 1 100 180"
                stroke="var(--ui-primary)"
                stroke-width="2"
                stroke-linecap="round"
                opacity="0.4"
              />
              <path
                d="M100 180 A80 80 0 0 1 20 100"
                stroke="var(--ui-primary)"
                stroke-width="2"
                stroke-linecap="round"
                opacity="0.3"
              />
              <path
                d="M20 100 A80 80 0 0 1 100 20"
                stroke="var(--ui-primary)"
                stroke-width="2"
                stroke-linecap="round"
                opacity="0.2"
              />
              <circle cx="100" cy="20" r="4" fill="var(--ui-primary)"/>
              <circle cx="180" cy="100" r="4" fill="var(--ui-primary)" opacity="0.6"/>
              <circle cx="100" cy="180" r="4" fill="var(--ui-primary)" opacity="0.4"/>
              <circle cx="20" cy="100" r="4" fill="var(--ui-primary)" opacity="0.3"/>
            </svg>
          </div>
          <span class="cycle-caption">Lifecycle placeholder</span>
        </div>
        <div class="dfma-note">
          <p>
            Traditional construction creates waste at every stage —
            offcuts during manufacturing, rework during assembly, demolition
            debris at end of life. When a building system is designed for
            the full cycle, the economics and the ecology change fundamentally.
          </p>
          <p>
            A 3Cycle component manufactured today can be disassembled in
            30 years, transported to a new site, and reassembled into
            a different building. The same timber, the same precision,
            a new life.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const phases = [
  {
    name: 'Manufacture',
    desc: 'Factory-produced LVL timber modules with integrated interiors, utilities, and finishes. Precision-controlled, weather-independent, quality-assured.',
  },
  {
    name: 'Assemble',
    desc: 'Modules arrive on standard transport and connect on site through universal steel fittings. Weeks, not months. Crane time measured in days.',
  },
  {
    name: 'Disassemble',
    desc: 'Reversible connections mean the building can be taken apart without destroying components. Every joint is designed to be unbolted, not demolished.',
  },
  {
    name: 'Reassemble',
    desc: 'Recovered modules and components are inspected, refurbished if needed, and reconfigured into new buildings. The same system, a new purpose.',
  },
]
</script>

<style scoped>
.dfma {
  border-top: 1px solid var(--ui-border);
}

.dfma-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem;
}

.dfma-lead {
  max-width: 720px;
  margin-bottom: 4rem;
}

.dfma-tag {
  font-family: 'DM Mono', monospace;
  font-size: 0.8125rem;
  letter-spacing: 0.04em;
  color: var(--ui-primary);
  margin: 0 0 1.25rem;
}

.dfma-title {
  font-family: 'Instrument Serif', 'Georgia', serif;
  font-size: clamp(1.75rem, 3.5vw, 2.75rem);
  font-weight: 400;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--ui-text-highlighted);
  margin: 0 0 1.25rem;
}

.dfma-title em {
  font-style: italic;
  color: var(--ui-primary);
}

.dfma-sub {
  font-size: 1.0625rem;
  line-height: 1.75;
  color: var(--ui-text-muted);
  margin: 0;
}

/* --- Phases --- */
.dfma-phases {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--ui-border);
  border: 1px solid var(--ui-border);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 4rem;
}

.phase {
  padding: 2rem;
  background: var(--ui-bg);
  transition: background-color 0.25s;
}

.phase:hover {
  background: var(--ui-bg-elevated);
}

.phase-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.phase-num {
  font-family: 'DM Mono', monospace;
  font-size: 0.75rem;
  color: var(--ui-primary);
  flex-shrink: 0;
}

.phase-line {
  flex: 1;
  height: 1px;
  background: var(--ui-border);
}

.phase-name {
  font-family: 'Instrument Serif', 'Georgia', serif;
  font-size: 1.375rem;
  font-weight: 400;
  color: var(--ui-text-highlighted);
  margin: 0 0 0.5rem;
}

.phase-desc {
  font-size: 0.875rem;
  line-height: 1.65;
  color: var(--ui-text-muted);
  margin: 0;
}

/* --- Bottom --- */
.dfma-bottom {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 4rem;
  align-items: start;
}

.dfma-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.cycle-ring {
  width: 160px;
  height: 160px;
}

.cycle-ring svg {
  width: 100%;
  height: 100%;
}

.cycle-caption {
  font-family: 'DM Mono', monospace;
  font-size: 0.6875rem;
  color: var(--ui-text-dimmed);
}

.dfma-note {
  max-width: 560px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.dfma-note p {
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--ui-text-muted);
  margin: 0;
}

@media (max-width: 1024px) {
  .dfma-inner {
    padding: 4rem 1.5rem;
  }

  .dfma-phases {
    grid-template-columns: repeat(2, 1fr);
  }

  .dfma-bottom {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .dfma-visual {
    order: -1;
  }
}

@media (max-width: 640px) {
  .dfma-phases {
    grid-template-columns: 1fr;
  }
}
</style>
