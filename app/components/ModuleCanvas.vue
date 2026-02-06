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
        <v-line v-for="line in gridLines" :key="line.id" :config="line" />
      </v-layer>

      <!-- Modules layer -->
      <v-layer ref="layerRef">
        <v-rect
          v-for="mod in modules"
          :key="mod.id"
          :config="getRectConfig(mod)"
          @mouseenter="(e: any) => handleModuleHover(mod.id, e, true)"
          @mouseleave="(e: any) => handleModuleHover(mod.id, e, false)"
          @dragstart="isDragging = true"
          @dragend="(e: any) => handleDragEnd(mod.id, e)"
          @transformstart="isResizing = true"
          @transformend="(e: any) => handleTransformEnd(mod.id, e)"
        />
        <v-transformer ref="transformerRef" :config="transformerConfig" />
        <!-- Custom rotate handle -->
        <v-circle
          v-if="rotateHandleCircle"
          :config="rotateHandleCircle"
          @click="rotateSelected"
          @tap="rotateSelected"
        />
        <v-arc v-if="rotateHandleArc" :config="rotateHandleArc" />
        <v-line v-if="rotateHandleArrow" :config="rotateHandleArrow" />
      </v-layer>
    </v-stage>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from "vue";
import Konva from "konva";

// ─── Constants ───────────────────────────────────────────────
const CELL_PX = 40;
const MODULE_W_CELLS = 2; // fixed 3m width
const MIN_L_CELLS = 2; // 3m min length
const MAX_L_CELLS = 8; // 12m max length
const GRID_COLS = 14;
const GRID_ROWS = 10;
const NATIVE_W = GRID_COLS * CELL_PX;
const NATIVE_H = GRID_ROWS * CELL_PX;

// ─── Colors ──────────────────────────────────────────────────
const C = {
  primary: "#10b981",
  gridMajor: "rgba(156,163,175,0.35)",
  gridMinor: "rgba(156,163,175,0.15)",
  stroke: "#10b981",
  strokeSelected: "#059669",
  shadow: "rgba(0,0,0,0.06)",
};

// ─── Types ───────────────────────────────────────────────────
interface ModuleData {
  id: string;
  name: string;
  gridX: number; // visual top-left column
  gridY: number; // visual top-left row
  gridW: number; // always MODULE_W_CELLS (2)
  gridL: number; // length in cells (2–8)
  rotation: number; // 0, 90, 180, 270
  fill: string;
}

// ─── Reactive State ──────────────────────────────────────────
// gridX/gridY = visual top-left of the module's axis-aligned bounding box
const modules = ref<ModuleData[]>([
  { id: "mod-a", name: "A", gridX: 8, gridY: 0, gridW: 2, gridL: 6, rotation: 0, fill: "rgba(16,185,129,0.14)" },
  { id: "mod-b", name: "B", gridX: 0, gridY: 6, gridW: 2, gridL: 3, rotation: 0, fill: "rgba(16,185,129,0.10)" },
  { id: "mod-c", name: "C", gridX: 12, gridY: 5, gridW: 2, gridL: 5, rotation: 90, fill: "rgba(16,185,129,0.18)" },
  { id: "mod-d", name: "D", gridX: 0, gridY: 0, gridW: 2, gridL: 5, rotation: 0, fill: "rgba(16,185,129,0.12)" },
]);

const selectedId = ref<string | null>(null);
const isDragging = ref(false);
const isResizing = ref(false);
const hoveredId = ref<string | null>(null);
const containerRef = ref<HTMLElement | null>(null);
const stageRef = ref<any>(null);
const transformerRef = ref<any>(null);
const canvasScale = ref(1);
const isAnimating = ref(true);

// ─── Stage & Grid ────────────────────────────────────────────
const stageConfig = computed(() => ({
  width: NATIVE_W * canvasScale.value,
  height: NATIVE_H * canvasScale.value,
  scaleX: canvasScale.value,
  scaleY: canvasScale.value,
}));

const gridLines = computed(() => {
  const lines: any[] = [];
  for (let i = 0; i <= GRID_COLS; i++) {
    const isMajor = i % 2 === 0;
    lines.push({
      id: `gv-${i}`,
      points: [i * CELL_PX, 0, i * CELL_PX, NATIVE_H],
      stroke: isMajor ? C.gridMajor : C.gridMinor,
      strokeWidth: 0.5,
      dash: isMajor ? undefined : [2, 4],
    });
  }
  for (let j = 0; j <= GRID_ROWS; j++) {
    const isMajor = j % 2 === 0;
    lines.push({
      id: `gh-${j}`,
      points: [0, j * CELL_PX, NATIVE_W, j * CELL_PX],
      stroke: isMajor ? C.gridMajor : C.gridMinor,
      strokeWidth: 0.5,
      dash: isMajor ? undefined : [2, 4],
    });
  }
  return lines;
});

// ─── Transformer: resize only, no rotation ───────────────────
const transformerConfig = computed(() => ({
  enabledAnchors: selectedId.value ? ["middle-left", "middle-right"] : [],
  rotateEnabled: false,
  keepRatio: false,
  borderStroke: C.primary,
  borderStrokeWidth: 1,
  anchorStroke: C.primary,
  anchorFill: "#ffffff",
  anchorSize: 8,
  anchorCornerRadius: 2,
  padding: 0,
  boundBoxFunc: (oldBox: any, newBox: any) => {
    // Absolute (screen) coords — scale the snap grid
    const cellAbs = CELL_PX * canvasScale.value;
    const snapAbs = (v: number) => Math.round(v / cellAbs) * cellAbs;
    const minPx = MIN_L_CELLS * cellAbs;
    const maxPx = MAX_L_CELLS * cellAbs;
    const fixedH = MODULE_W_CELLS * cellAbs;

    const oldLeft = oldBox.x;
    const oldRight = oldBox.x + oldBox.width;
    const newRight = newBox.x + newBox.width;

    // Detect which edge is being dragged
    const leftDelta = Math.abs(newBox.x - oldLeft);
    const rightDelta = Math.abs(newRight - oldRight);

    let resultX: number, resultW: number;

    if (leftDelta < rightDelta) {
      // Dragging right edge — anchor left
      const anchorLeft = snapAbs(oldLeft);
      const snappedRight = snapAbs(newRight);
      resultW = Math.max(minPx, Math.min(maxPx, snappedRight - anchorLeft));
      resultX = anchorLeft;
    } else {
      // Dragging left edge — anchor right
      const anchorRight = snapAbs(oldRight);
      const snappedLeft = snapAbs(newBox.x);
      resultW = Math.max(minPx, Math.min(maxPx, anchorRight - snappedLeft));
      resultX = anchorRight - resultW;
    }

    return {
      x: resultX,
      y: snapAbs(newBox.y),
      width: resultW,
      height: fixedH * Math.sign(newBox.height || 1),
      rotation: newBox.rotation,
    };
  },
}));

// ─── Helpers ─────────────────────────────────────────────────

function effectiveSize(mod: ModuleData): { cols: number; rows: number } {
  const isVertical = mod.rotation === 90 || mod.rotation === 270;
  return {
    cols: isVertical ? mod.gridW : mod.gridL,
    rows: isVertical ? mod.gridL : mod.gridW,
  };
}

// Konva rotates around the node origin (top-left of unrotated rect).
// At different rotations the origin lands at different visual corners:
//   0°  → origin = visual top-left
//   90° → origin = visual top-right
//  180° → origin = visual bottom-right
//  270° → origin = visual bottom-left
function gridToOrigin(mod: ModuleData): { x: number; y: number } {
  const vx = mod.gridX * CELL_PX;
  const vy = mod.gridY * CELL_PX;
  // At 90° the node origin sits at the visual top-right corner
  if (mod.rotation === 90) return { x: vx + mod.gridW * CELL_PX, y: vy };
  return { x: vx, y: vy };
}

function originToGrid(
  ox: number,
  oy: number,
  rotation: number,
  _gridL: number,
  gridW: number,
) {
  if (rotation === 90)
    return {
      gx: Math.round((ox - gridW * CELL_PX) / CELL_PX),
      gy: Math.round(oy / CELL_PX),
    };
  return { gx: Math.round(ox / CELL_PX), gy: Math.round(oy / CELL_PX) };
}

function getRectConfig(mod: ModuleData) {
  const isSelected = selectedId.value === mod.id;
  const isHovered = hoveredId.value === mod.id;
  const origin = gridToOrigin(mod);

  let fill = mod.fill;
  let stroke = C.stroke;
  let strokeWidth = 1.5;
  let shadowBlur = 6;

  if (isSelected) {
    fill = "rgba(16,185,129,0.22)";
    stroke = C.strokeSelected;
    strokeWidth = 2;
    shadowBlur = 12;
  } else if (isHovered) {
    fill = "rgba(16,185,129,0.18)";
    stroke = C.strokeSelected;
    strokeWidth = 1.5;
    shadowBlur = 10;
  }

  return {
    id: mod.id,
    name: mod.id,
    x: origin.x,
    y: origin.y,
    width: mod.gridL * CELL_PX,
    height: mod.gridW * CELL_PX,
    rotation: mod.rotation,
    scaleX: 1,
    scaleY: 1,
    fill,
    stroke,
    strokeWidth,
    cornerRadius: 3,
    shadowColor: C.shadow,
    shadowBlur,
    shadowOffsetY: 2,
    shadowEnabled: true,
    cursor: isAnimating.value ? "default" : "grab",
    draggable: !isAnimating.value,
    dragBoundFunc: (pos: { x: number; y: number }) => {
      // Absolute coords — snap to scaled grid
      const cellAbs = CELL_PX * canvasScale.value;
      return {
        x: Math.round(pos.x / cellAbs) * cellAbs,
        y: Math.round(pos.y / cellAbs) * cellAbs,
      };
    },
  };
}

// ─── Custom Rotate Handle ────────────────────────────────────

const rotateHandleCircle = computed(() => {
  if (!selectedId.value || isDragging.value || isResizing.value || isAnimating.value) return null;
  const mod = modules.value.find((m) => m.id === selectedId.value);
  if (!mod) return null;

  const size = effectiveSize(mod);
  return {
    x: mod.gridX * CELL_PX + (size.cols * CELL_PX) / 2,
    y: mod.gridY * CELL_PX + (size.rows * CELL_PX) / 2,
    radius: 15,
    fill: "rgba(255,255,255,0.85)",
    stroke: C.primary,
    strokeWidth: 1.5,
    hitStrokeWidth: 10,
    cursor: "pointer",
  };
});

// Konva Arc: angle=0 is 3-o'clock, increases clockwise in y-down coords
const rotateHandleArc = computed(() => {
  if (!rotateHandleCircle.value) return null;
  const hc = rotateHandleCircle.value;
  return {
    x: hc.x,
    y: hc.y,
    innerRadius: 6,
    outerRadius: 6,
    angle: 270,
    rotation: 0,
    stroke: C.primary,
    strokeWidth: 1.5,
    fill: "",
    listening: false,
  };
});

// Arrowhead at the end of the arc (270° = top, pointing left)
const rotateHandleArrow = computed(() => {
  if (!rotateHandleCircle.value) return null;
  const hc = rotateHandleCircle.value;
  // Arc ends at 270° = (0, -6) relative to center. Motion direction is left.
  const tipX = hc.x;
  const tipY = hc.y - 6;
  return {
    points: [tipX - 4, tipY - 2, tipX, tipY, tipX - 2, tipY + 4],
    stroke: C.primary,
    strokeWidth: 1.5,
    lineCap: "round",
    lineJoin: "round",
    listening: false,
  };
});

function rotateSelected() {
  const mod = modules.value.find((m) => m.id === selectedId.value);
  if (!mod) return;

  // Keep visual center in place
  const size = effectiveSize(mod);
  const cx = mod.gridX + size.cols / 2;
  const cy = mod.gridY + size.rows / 2;

  mod.rotation = mod.rotation === 0 ? 90 : 0;

  const newSize = effectiveSize(mod);
  mod.gridX = Math.max(
    0,
    Math.min(Math.round(cx - newSize.cols / 2), GRID_COLS - newSize.cols),
  );
  mod.gridY = Math.max(
    0,
    Math.min(Math.round(cy - newSize.rows / 2), GRID_ROWS - newSize.rows),
  );

  nextTick(() => updateTransformer());
}

// ─── Event Handlers ──────────────────────────────────────────

function handleModuleHover(id: string, _e: any, entering: boolean) {
  if (isAnimating.value) return;
  hoveredId.value = entering ? id : null;
}

function handleStageClick(e: any) {
  if (isAnimating.value) return;
  const clicked = e.target;
  const stage = clicked.getStage?.() ?? clicked;

  if (clicked === stage) {
    selectedId.value = null;
    return;
  }

  const name = clicked.name?.();
  if (name && modules.value.some((m) => m.id === name)) {
    selectedId.value = name;
  }
}

function handleDragEnd(id: string, e: any) {
  isDragging.value = false;
  const node = e.target;
  const mod = modules.value.find((m) => m.id === id);
  if (!mod) return;

  const { gx, gy } = originToGrid(
    node.x(),
    node.y(),
    mod.rotation,
    mod.gridL,
    mod.gridW,
  );
  const size = effectiveSize(mod);

  mod.gridX = Math.max(0, Math.min(gx, GRID_COLS - size.cols));
  mod.gridY = Math.max(0, Math.min(gy, GRID_ROWS - size.rows));

  const origin = gridToOrigin(mod);
  node.position(origin);
  node.getLayer()?.batchDraw();
}

function handleTransformEnd(id: string, e: any) {
  isResizing.value = false;
  const node = e.target;
  const mod = modules.value.find((m) => m.id === id);
  if (!mod) return;

  // Pure resize — recompute gridL from Transformer's scale
  const scaleX = node.scaleX();
  const currentLengthPx = node.width() * Math.abs(scaleX);
  let newGridL = Math.round(currentLengthPx / CELL_PX);
  newGridL = Math.max(MIN_L_CELLS, Math.min(MAX_L_CELLS, newGridL));
  mod.gridL = newGridL;

  // Convert origin → visual grid, clamp
  const { gx, gy } = originToGrid(
    node.x(),
    node.y(),
    mod.rotation,
    mod.gridL,
    mod.gridW,
  );
  const size = effectiveSize(mod);
  mod.gridX = Math.max(0, Math.min(gx, GRID_COLS - size.cols));
  mod.gridY = Math.max(0, Math.min(gy, GRID_ROWS - size.rows));

  // Reset node to clean state
  node.scaleX(1);
  node.scaleY(1);
  node.width(mod.gridL * CELL_PX);
  node.height(mod.gridW * CELL_PX);
  node.rotation(mod.rotation);
  const origin = gridToOrigin(mod);
  node.position(origin);
  node.getLayer()?.batchDraw();

  nextTick(() => updateTransformer());
}

// ─── Transformer Management ──────────────────────────────────

function updateTransformer() {
  const tr = transformerRef.value?.getNode?.();
  if (!tr) return;

  if (!selectedId.value) {
    tr.nodes([]);
    tr.getLayer()?.batchDraw();
    return;
  }

  const stage = stageRef.value?.getStage?.();
  if (!stage) return;

  const node = stage.findOne(`#${selectedId.value}`);
  tr.nodes(node ? [node] : []);
  tr.getLayer()?.batchDraw();
}

watch(selectedId, () => nextTick(() => updateTransformer()));

// ─── Intro Animation ─────────────────────────────────────────
// Modules start scattered, then assemble into a compact irregular shape:
//   B (backbone) → D (top) → A (middle) → C (bottom)
//
//      4  5  6  7  8  9  10
//   3  B  B  D  D  D  D  D
//   4  B  B  D  D  D  D  D
//   5  B  B  A  A  A  A
//   6  B  B  A  A  A  A
//   7  B  B  C  C  C
//   8  B  B  C  C  C

const BUILDING_STEPS = [
  { id: "mod-b", gridX: 4, gridY: 3, gridL: 6, rotation: 90 },  // left wall 9m
  { id: "mod-d", gridX: 6, gridY: 3, gridL: 5, rotation: 0 },   // top 7.5m
  { id: "mod-a", gridX: 6, gridY: 5, gridL: 4, rotation: 0 },   // middle 6m
  { id: "mod-c", gridX: 6, gridY: 7, gridL: 3, rotation: 0 },   // bottom 4.5m
];

function animateIntro() {
  const stage = stageRef.value?.getStage?.();
  if (!stage) return;

  let delay = 150;
  const dur = 0.3;
  const gap = 60;

  for (const step of BUILDING_STEPS) {
    setTimeout(() => {
      const node = stage.findOne(`#${step.id}`);
      const mod = modules.value.find((m) => m.id === step.id);
      if (!node || !mod) return;

      const targetOrigin = gridToOrigin({
        ...mod,
        gridX: step.gridX,
        gridY: step.gridY,
        gridL: step.gridL,
        rotation: step.rotation,
      } as ModuleData);

      node.to({
        x: targetOrigin.x,
        y: targetOrigin.y,
        width: step.gridL * CELL_PX,
        rotation: step.rotation,
        duration: dur,
        easing: Konva.Easings.EaseInOut,
        onFinish: () => {
          mod.gridX = step.gridX;
          mod.gridY = step.gridY;
          mod.gridL = step.gridL;
          mod.rotation = step.rotation;
          node.scaleX(1);
          node.scaleY(1);
        },
      });
    }, delay);
    delay += dur * 1000 + gap;
  }

  setTimeout(() => {
    isAnimating.value = false;
  }, delay + 100);
}

// ─── Responsive Sizing ──────────────────────────────────────
let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  nextTick(() => updateTransformer());

  resizeObserver = new ResizeObserver((entries) => {
    const entry = entries[0];
    if (!entry) return;
    canvasScale.value = Math.min(1, entry.contentRect.width / NATIVE_W);
  });

  if (containerRef.value) {
    resizeObserver.observe(containerRef.value);
    canvasScale.value = Math.min(1, containerRef.value.clientWidth / NATIVE_W);
  }

  // Start intro animation after a short delay for render
  setTimeout(() => animateIntro(), 200);
});

onUnmounted(() => {
  resizeObserver?.disconnect();
});
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
  transition: border-color 0.2s, box-shadow 0.2s;
}

.canvas-container:hover {
  border-color: var(--ui-primary);
  box-shadow: 0 0 0 2px var(--ui-primary);
}

.canvas-container :deep(canvas) {
  display: block;
}
</style>
