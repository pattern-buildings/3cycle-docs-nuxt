<template>
  <section class="pillars">
    <div class="pillars-inner">
      <div class="pillars-lead">
        <h2 class="pillars-title">Three elements, infinite configurations</h2>
        <p class="pillars-sub">
          Every 3Cycle building is made from three component types. Frames
          provide structure, modules create rooms, facades close the envelope.
          All manufactured offsite, all assembled with the same connection logic.
        </p>
      </div>

      <div class="pillars-grid">
        <a
          v-for="(p, i) in pillars"
          :key="p.id"
          :href="p.href"
          class="pillar"
        >
          <span class="pillar-num">{{ String(i + 1).padStart(2, '0') }}</span>

          <div class="pillar-iso">
            <!-- Frames: two portal frames in perspective showing the 3m rhythm -->
            <svg v-if="p.id === 'frames'" class="iso-svg" viewBox="0 0 200 140" fill="none" aria-hidden="true">
              <!-- Back frame -->
              <rect x="52" y="20" width="6" height="90" rx="1" class="frame-member" opacity="0.35" />
              <rect x="132" y="20" width="6" height="90" rx="1" class="frame-member" opacity="0.35" />
              <rect x="52" y="18" width="86" height="6" rx="1" class="frame-member" opacity="0.35" />
              <!-- Front frame -->
              <rect x="32" y="36" width="6" height="90" rx="1" class="frame-member" />
              <rect x="152" y="36" width="6" height="90" rx="1" class="frame-member" />
              <rect x="32" y="34" width="126" height="6" rx="1" class="frame-member" />
              <!-- Connecting beams (depth) -->
              <line x1="55" y1="21" x2="35" y2="37" class="frame-link" />
              <line x1="135" y1="21" x2="155" y2="37" class="frame-link" />
              <!-- 3m dimension line -->
              <line x1="35" y1="132" x2="155" y2="132" class="dim-line" />
              <line x1="35" y1="128" x2="35" y2="136" class="dim-line" />
              <line x1="155" y1="128" x2="155" y2="136" class="dim-line" />
              <text x="95" y="137" class="dim-text">3 m</text>
            </svg>

            <!-- Modules: isometric volumetric box -->
            <svg v-if="p.id === 'modules'" class="iso-svg" viewBox="0 0 200 140" fill="none" aria-hidden="true">
              <!-- Isometric box — top face -->
              <polygon points="100,16 168,44 100,72 32,44" class="mod-face mod-top" />
              <!-- Left face -->
              <polygon points="32,44 100,72 100,120 32,92" class="mod-face mod-left" />
              <!-- Right face -->
              <polygon points="168,44 100,72 100,120 168,92" class="mod-face mod-right" />
              <!-- Edges -->
              <polyline points="32,44 100,72 168,44" class="mod-edge" />
              <line x1="100" y1="72" x2="100" y2="120" class="mod-edge" />
              <polygon points="100,16 168,44 168,92 100,120 32,92 32,44" class="mod-outline" />
              <!-- Interior hint: a door opening on left face -->
              <rect x="48" y="62" width="18" height="28" rx="1" class="mod-opening" transform="skewY(27) translate(-12, -16)" />
            </svg>

            <!-- Facades: layered panels attaching to a module surface -->
            <svg v-if="p.id === 'facades'" class="iso-svg" viewBox="0 0 200 140" fill="none" aria-hidden="true">
              <!-- Base module wall (ghosted) -->
              <rect x="24" y="20" width="80" height="100" rx="2" class="fac-wall" />
              <!-- Facade panels at varying offsets, suggesting attachment -->
              <rect x="108" y="18" width="56" height="46" rx="3" class="fac-panel" />
              <rect x="114" y="74" width="56" height="46" rx="3" class="fac-panel fac-panel-2" />
              <!-- Attachment arrows -->
              <line x1="104" y1="40" x2="110" y2="40" class="fac-arrow" marker-end="url(#arrowhead)" />
              <line x1="104" y1="96" x2="116" y2="96" class="fac-arrow" marker-end="url(#arrowhead)" />
              <defs>
                <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6" fill="none" stroke="var(--ui-primary)" stroke-width="1.5" />
                </marker>
              </defs>
            </svg>
          </div>

          <h3 class="pillar-name">{{ p.name }}</h3>
          <p class="pillar-dim">{{ p.dim }}</p>
          <p class="pillar-desc">{{ p.desc }}</p>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
const pillars = [
  {
    id: 'frames',
    name: 'Frames',
    dim: 'Always 3 m wide',
    desc: 'Structural LVL timber frames that carry vertical and lateral loads. A fixed 3-meter width standardizes production and transport while allowing variable height and depth.',
    href: '/en/essentials/system-components',
  },
  {
    id: 'modules',
    name: 'Modules',
    dim: '3 – 12 m length',
    desc: 'Volumetric room units built between frames. Factory-finished with interiors, utilities, and equipment installed. Lengths from 3 to 12 meters to suit any program.',
    href: '/en/essentials/system-components',
  },
  {
    id: 'facades',
    name: 'Facades',
    dim: 'Attached to modules',
    desc: 'Wall and cladding panels fixed to the module exterior. The primary tool for architectural expression — same structure, different identity for every project.',
    href: '/en/essentials/system-components',
  },
]
</script>

<style scoped>
.pillars {
  border-top: 1px solid var(--ui-border);
}

.pillars-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem;
}

.pillars-lead {
  max-width: 580px;
  margin-bottom: 4rem;
}

.pillars-title {
  font-family: 'Instrument Serif', 'Georgia', serif;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--ui-text-highlighted);
  margin: 0 0 1rem;
}

.pillars-sub {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--ui-text-muted);
  margin: 0;
}

.pillars-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--ui-border);
  border: 1px solid var(--ui-border);
  border-radius: 12px;
  overflow: hidden;
}

.pillar {
  padding: 2.25rem;
  background: var(--ui-bg);
  text-decoration: none;
  color: inherit;
  transition: background-color 0.25s;
  display: flex;
  flex-direction: column;
}

.pillar:hover {
  background: var(--ui-bg-elevated);
}

.pillar-num {
  font-family: 'DM Mono', monospace;
  font-size: 0.75rem;
  color: var(--ui-text-dimmed);
  margin-bottom: 1.25rem;
}

/* --- Illustrations --- */
.pillar-iso {
  height: 10rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: var(--ui-bg-elevated);
  overflow: hidden;
}

.iso-svg {
  width: 160px;
  height: 112px;
}

/* -- Frames -- */
.frame-member {
  fill: var(--ui-primary);
  opacity: 0.65;
  transition: opacity 0.3s;
}

.pillar:hover .frame-member {
  opacity: 0.9;
}

.frame-link {
  stroke: var(--ui-primary);
  stroke-width: 1;
  stroke-dasharray: 3 3;
  opacity: 0.35;
}

.dim-line {
  stroke: var(--ui-text-dimmed);
  stroke-width: 1;
}

.dim-text {
  font-family: 'DM Mono', monospace;
  font-size: 8px;
  fill: var(--ui-text-dimmed);
  text-anchor: middle;
}

/* -- Modules -- */
.mod-face {
  transition: fill 0.3s;
}

.mod-top {
  fill: color-mix(in srgb, var(--ui-primary) 18%, transparent);
}

.mod-left {
  fill: color-mix(in srgb, var(--ui-primary) 12%, transparent);
}

.mod-right {
  fill: color-mix(in srgb, var(--ui-primary) 7%, transparent);
}

.pillar:hover .mod-top {
  fill: color-mix(in srgb, var(--ui-primary) 28%, transparent);
}

.pillar:hover .mod-left {
  fill: color-mix(in srgb, var(--ui-primary) 20%, transparent);
}

.pillar:hover .mod-right {
  fill: color-mix(in srgb, var(--ui-primary) 12%, transparent);
}

.mod-edge {
  stroke: var(--ui-primary);
  stroke-width: 1;
  opacity: 0.3;
  fill: none;
}

.mod-outline {
  stroke: var(--ui-primary);
  stroke-width: 1.5;
  fill: none;
  opacity: 0.6;
  transition: opacity 0.3s;
}

.pillar:hover .mod-outline {
  opacity: 0.9;
}

.mod-opening {
  fill: none;
  stroke: var(--ui-primary);
  stroke-width: 1;
  opacity: 0.3;
}

/* -- Facades -- */
.fac-wall {
  fill: color-mix(in srgb, var(--ui-text-muted) 8%, transparent);
  stroke: var(--ui-border-hover);
  stroke-width: 1;
  stroke-dasharray: 4 3;
}

.fac-panel {
  fill: color-mix(in srgb, var(--ui-primary) 14%, transparent);
  stroke: var(--ui-primary);
  stroke-width: 1.5;
  opacity: 0.7;
  transition: opacity 0.3s, transform 0.3s;
}

.fac-panel-2 {
  opacity: 0.5;
}

.pillar:hover .fac-panel {
  opacity: 0.95;
}

.pillar:hover .fac-panel-2 {
  opacity: 0.75;
}

.fac-arrow {
  stroke: var(--ui-primary);
  stroke-width: 1.5;
  opacity: 0.4;
}

.pillar-name {
  font-family: 'Instrument Serif', 'Georgia', serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--ui-text-highlighted);
  margin: 0 0 0.25rem;
}

.pillar-dim {
  font-family: 'DM Mono', monospace;
  font-size: 0.75rem;
  color: var(--ui-primary);
  margin: 0 0 0.625rem;
}

.pillar-desc {
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--ui-text-muted);
  margin: 0;
  flex: 1;
}

@media (max-width: 1024px) {
  .pillars-inner {
    padding: 4rem 1.5rem;
  }

  .pillars-grid {
    grid-template-columns: 1fr;
  }

  .pillar-iso {
    height: 8rem;
  }
}
</style>
