<template>
  <div ref="containerRef" class="canvas-container">
    <v-stage
      ref="stageRef"
      :config="stageConfig"
      @mousedown="handleStageClick"
      @touchstart="handleStageClick"
    >
      <!-- Grid layer (non-interactive) -->
      <v-layer :config="{ listening: false }">
        <v-line
          v-for="line in gridLines"
          :key="line.id"
          :config="line"
        />
      </v-layer>

      <!-- Modules layer -->
      <v-layer ref="layerRef">
        <v-rect
          v-for="mod in modules"
          :key="mod.id"
          :config="getRectConfig(mod)"
          @dragend="(e: any) => handleDragEnd(mod.id, e)"
          @transformend="(e: any) => handleTransformEnd(mod.id, e)"
        />
        <!-- Single transformer for selected module -->
        <v-transformer
          ref="transformerRef"
          :config="transformerConfig"
        />
      </v-layer>
    </v-stage>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'

// ─── Constants ───────────────────────────────────────────────
const CELL_PX = 40
const MODULE_W_CELLS = 2 // fixed 3m width
const MIN_L_CELLS = 2    // 3m min length
const MAX_L_CELLS = 8    // 12m max length
const GRID_COLS = 14
const GRID_ROWS = 10
const NATIVE_W = GRID_COLS * CELL_PX
const NATIVE_H = GRID_ROWS * CELL_PX

// ─── Colors ──────────────────────────────────────────────────
const C = {
  primary: '#10b981',
  gridMajor: 'rgba(156,163,175,0.35)',
  gridMinor: 'rgba(156,163,175,0.15)',
  stroke: '#10b981',
  strokeSelected: '#059669',
  shadow: 'rgba(0,0,0,0.06)',
}

// ─── Types ───────────────────────────────────────────────────
interface ModuleData {
  id: string
  name: string
  gridX: number
  gridY: number
  gridW: number
  gridL: number
  rotation: number
  fill: string
}

// ─── Reactive State ──────────────────────────────────────────
const modules = ref<ModuleData[]>([
  { id: 'mod-a', name: 'A', gridX: 1, gridY: 1, gridW: 2, gridL: 6, rotation: 0, fill: 'rgba(16,185,129,0.14)' },
  { id: 'mod-b', name: 'B', gridX: 1, gridY: 3, gridW: 2, gridL: 4, rotation: 0, fill: 'rgba(16,185,129,0.10)' },
  { id: 'mod-c', name: 'C', gridX: 8, gridY: 1, gridW: 2, gridL: 4, rotation: 90, fill: 'rgba(16,185,129,0.18)' },
  { id: 'mod-d', name: 'D', gridX: 5, gridY: 6, gridW: 2, gridL: 5, rotation: 0, fill: 'rgba(16,185,129,0.12)' },
])

const selectedId = ref<string | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const stageRef = ref<any>(null)
const transformerRef = ref<any>(null)
const canvasScale = ref(1)

// ─── Computed ────────────────────────────────────────────────
const stageConfig = computed(() => ({
  width: NATIVE_W * canvasScale.value,
  height: NATIVE_H * canvasScale.value,
  scaleX: canvasScale.value,
  scaleY: canvasScale.value,
}))

const gridLines = computed(() => {
  const lines: any[] = []

  for (let i = 0; i <= GRID_COLS; i++) {
    const isMajor = i % 2 === 0
    lines.push({
      id: `gv-${i}`,
      points: [i * CELL_PX, 0, i * CELL_PX, NATIVE_H],
      stroke: isMajor ? C.gridMajor : C.gridMinor,
      strokeWidth: isMajor ? 0.5 : 0.5,
      dash: isMajor ? undefined : [2, 4],
    })
  }

  for (let j = 0; j <= GRID_ROWS; j++) {
    const isMajor = j % 2 === 0
    lines.push({
      id: `gh-${j}`,
      points: [0, j * CELL_PX, NATIVE_W, j * CELL_PX],
      stroke: isMajor ? C.gridMajor : C.gridMinor,
      strokeWidth: isMajor ? 0.5 : 0.5,
      dash: isMajor ? undefined : [2, 4],
    })
  }

  return lines
})

const transformerConfig = computed(() => ({
  enabledAnchors: selectedId.value ? ['middle-left', 'middle-right'] : [],
  rotationSnaps: [0, 90, 180, 270],
  rotationSnapTolerance: 45,
  rotateEnabled: true,
  keepRatio: false,
  borderStroke: C.primary,
  borderStrokeWidth: 1,
  anchorStroke: C.primary,
  anchorFill: '#ffffff',
  anchorSize: 8,
  anchorCornerRadius: 2,
  rotateAnchorOffset: 20,
  rotateAnchorCursor: 'grab',
  padding: 0,
  boundBoxFunc: (oldBox: any, newBox: any) => {
    const minPx = MIN_L_CELLS * CELL_PX
    const maxPx = MAX_L_CELLS * CELL_PX
    const fixedH = MODULE_W_CELLS * CELL_PX

    // Edges along the length axis (node-local x)
    const oldLeft = oldBox.x
    const oldRight = oldBox.x + oldBox.width
    const newLeft = newBox.x
    const newRight = newBox.x + newBox.width

    // Detect which edge is the anchor (moved less) vs the dragged one
    const leftDelta = Math.abs(newLeft - oldLeft)
    const rightDelta = Math.abs(newRight - oldRight)

    let resultX: number, resultW: number

    if (leftDelta < rightDelta) {
      // Dragging from right — anchor the left edge
      const anchorLeft = snap(oldLeft)
      const snappedRight = snap(newRight)
      resultW = snappedRight - anchorLeft
      resultW = Math.max(minPx, Math.min(maxPx, resultW))
      resultX = anchorLeft
    } else {
      // Dragging from left — anchor the right edge
      const anchorRight = snap(oldRight)
      const snappedLeft = snap(newLeft)
      resultW = anchorRight - snappedLeft
      resultW = Math.max(minPx, Math.min(maxPx, resultW))
      resultX = anchorRight - resultW
    }

    return {
      x: resultX,
      y: snap(newBox.y),
      width: resultW,
      height: fixedH * Math.sign(newBox.height || 1),
      rotation: newBox.rotation,
    }
  },
}))

// ─── Helpers ─────────────────────────────────────────────────
function snap(val: number): number {
  return Math.round(val / CELL_PX) * CELL_PX
}

function effectiveSize(mod: ModuleData): { cols: number; rows: number } {
  const isVertical = mod.rotation === 90 || mod.rotation === 270
  return {
    cols: isVertical ? mod.gridW : mod.gridL,
    rows: isVertical ? mod.gridL : mod.gridW,
  }
}

function getRectConfig(mod: ModuleData) {
  const isSelected = selectedId.value === mod.id
  return {
    id: mod.id,
    name: mod.id,
    x: mod.gridX * CELL_PX,
    y: mod.gridY * CELL_PX,
    width: mod.gridL * CELL_PX,
    height: mod.gridW * CELL_PX,
    rotation: mod.rotation,
    fill: isSelected ? 'rgba(16,185,129,0.22)' : mod.fill,
    stroke: isSelected ? C.strokeSelected : C.stroke,
    strokeWidth: isSelected ? 2 : 1.5,
    cornerRadius: 3,
    shadowColor: C.shadow,
    shadowBlur: isSelected ? 12 : 6,
    shadowOffsetY: 2,
    shadowEnabled: true,
    draggable: true,
    dragBoundFunc: (pos: { x: number; y: number }) => ({
      x: snap(pos.x),
      y: snap(pos.y),
    }),
  }
}

// ─── Interaction Handlers ────────────────────────────────────
function handleStageClick(e: any) {
  const clicked = e.target
  const stage = clicked.getStage?.() ?? clicked

  // Clicked empty area — deselect
  if (clicked === stage) {
    selectedId.value = null
    return
  }

  // Clicked a module — select it
  const name = clicked.name?.()
  if (name && modules.value.some(m => m.id === name)) {
    selectedId.value = name
  }
}

function handleDragEnd(id: string, e: any) {
  const node = e.target
  const mod = modules.value.find(m => m.id === id)
  if (!mod) return

  const size = effectiveSize(mod)
  let gx = Math.round(node.x() / CELL_PX)
  let gy = Math.round(node.y() / CELL_PX)

  // Clamp within canvas
  gx = Math.max(0, Math.min(gx, GRID_COLS - size.cols))
  gy = Math.max(0, Math.min(gy, GRID_ROWS - size.rows))

  mod.gridX = gx
  mod.gridY = gy

  node.position({ x: gx * CELL_PX, y: gy * CELL_PX })
  node.getLayer()?.batchDraw()
}

function handleTransformEnd(id: string, e: any) {
  const node = e.target
  const mod = modules.value.find(m => m.id === id)
  if (!mod) return

  // Normalize rotation
  let rot = node.rotation() % 360
  if (rot < 0) rot += 360
  rot = Math.round(rot / 90) * 90
  mod.rotation = rot

  // Convert scale-based resize back to gridL
  const scaleX = node.scaleX()
  const currentLengthPx = node.width() * Math.abs(scaleX)
  let newGridL = Math.round(currentLengthPx / CELL_PX)
  newGridL = Math.max(MIN_L_CELLS, Math.min(MAX_L_CELLS, newGridL))
  mod.gridL = newGridL

  // Update position (snap) and clamp within canvas
  const size = effectiveSize(mod)
  let gx = Math.round(node.x() / CELL_PX)
  let gy = Math.round(node.y() / CELL_PX)
  gx = Math.max(0, Math.min(gx, GRID_COLS - size.cols))
  gy = Math.max(0, Math.min(gy, GRID_ROWS - size.rows))
  mod.gridX = gx
  mod.gridY = gy

  // Reset node to actual dimensions (no residual scale)
  node.scaleX(1)
  node.scaleY(1)
  node.width(mod.gridL * CELL_PX)
  node.height(mod.gridW * CELL_PX)
  node.rotation(mod.rotation)
  node.position({ x: mod.gridX * CELL_PX, y: mod.gridY * CELL_PX })
  node.getLayer()?.batchDraw()

  // Re-attach transformer after reset
  nextTick(() => updateTransformer())
}

// ─── Transformer Management ──────────────────────────────────
function updateTransformer() {
  const tr = transformerRef.value?.getNode?.()
  if (!tr) return

  if (!selectedId.value) {
    tr.nodes([])
    tr.getLayer()?.batchDraw()
    return
  }

  const stage = stageRef.value?.getStage?.()
  if (!stage) return

  const node = stage.findOne(`#${selectedId.value}`)
  if (node) {
    tr.nodes([node])
  } else {
    tr.nodes([])
  }
  tr.getLayer()?.batchDraw()
}

watch(selectedId, () => nextTick(() => updateTransformer()))

// ─── Responsive Sizing ──────────────────────────────────────
let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  nextTick(() => updateTransformer())

  resizeObserver = new ResizeObserver((entries) => {
    const entry = entries[0]
    if (!entry) return
    const w = entry.contentRect.width
    canvasScale.value = Math.min(1, w / NATIVE_W)
  })

  if (containerRef.value) {
    resizeObserver.observe(containerRef.value)
    // Initial scale
    canvasScale.value = Math.min(1, containerRef.value.clientWidth / NATIVE_W)
  }
})

onUnmounted(() => {
  resizeObserver?.disconnect()
})
</script>

<style scoped>
.canvas-container {
  position: relative;
  width: 100%;
  max-width: 560px;
  border: 1px solid var(--ui-border);
  border-radius: 12px;
  background: var(--ui-bg-elevated);
  overflow: hidden;
}

.canvas-container :deep(canvas) {
  display: block;
}
</style>
