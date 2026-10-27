<script setup lang="ts">
import { useNav } from '@slidev/client'
import seedrandom from 'seedrandom'
/**
 * Glow effect powered by blurred polygons, credits to @pi0 @Atinux.
 *
 * Read from the slide frontmatter (put them under `defaults:` in the headmatter to apply deck-wide):
 * - glow: Distribution - where the polygon points cluster (default: 'full')
 * - glowOpacity: number (default: 0.4)
 * - glowHue: number - hue rotation in degrees (default: 0)
 * - glowSeed: string | false - seed for the stable random layout, false re-rolls every load (default: 'default')
 * - glowColors: [string, string, string] - base colors of the right / left / top gradients
 */
import { computed, ref, watch } from 'vue'

const { currentSlideRoute } = useNav()

export type Range = [number, number]

export type GlowColors = [string, string, string]

const defaultGlowColors: GlowColors = ['#2f96ad', '#4B32C3', '#8080f2']

export type Distribution
  = | 'full'
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'center'

const frontmatter = computed(() => (currentSlideRoute.value.meta?.slide as any)?.frontmatter || {})
const distribution = computed(() => (frontmatter.value.glow || 'full') as Distribution)
const opacity = computed<number>(() => +(frontmatter.value.glowOpacity || 0.4))
const hue = computed<number>(() => +(frontmatter.value.glowHue || 0))
const seed = computed<string>(() => (frontmatter.value.glowSeed === 'false' || frontmatter.value.glowSeed === false)
  ? Date.now().toString()
  : frontmatter.value.glowSeed || 'default',
)
const glowColors = computed<GlowColors>(() => {
  const colors = frontmatter.value.glowColors
  return Array.isArray(colors) && colors.length === 3
    ? colors as GlowColors
    : defaultGlowColors
})
const overflow = 0.3
const disturb = 0.3
const disturbChance = 0.3

function distributionToLimits(distribution: Distribution) {
  const min = -0.2
  const max = 1.2
  let x: Range = [min, max]
  let y: Range = [min, max]

  function intersection(a: Range, b: Range): Range {
    return [
      Math.max(a[0], b[0]),
      Math.min(a[1], b[1]),
    ]
  }

  const limits = distribution.split('-')

  for (const limit of limits) {
    switch (limit) {
      case 'top':
        y = intersection(y, [min, 0.6])
        break
      case 'bottom':
        y = intersection(y, [0.4, max])
        break
      case 'left':
        x = intersection(x, [min, 0.6])
        break
      case 'right':
        x = intersection(x, [0.4, max])
        break
      case 'xcenter':
        x = intersection(x, [0.25, 0.75])
        break
      case 'ycenter':
        y = intersection(y, [0.25, 0.75])
        break
      case 'center':
        x = intersection(x, [0.25, 0.75])
        y = intersection(y, [0.25, 0.75])
        break
      case 'full':
        x = intersection(x, [0, 1])
        y = intersection(y, [0, 1])
        break
      default:
        break
    }
  }

  return { x, y }
}

function distance2([x1, y1]: Range, [x2, y2]: Range) {
  return (x2 - x1) ** 2 + (y2 - y1) ** 2
}

function usePoly(number = 16) {
  function getPoints(): Range[] {
    const limits = distributionToLimits(distribution.value)
    const rng = seedrandom(`${seed.value}-${currentSlideRoute.value.no}`)
    function randomBetween([a, b]: Range) {
      return rng() * (b - a) + a
    }
    function applyOverflow(random: number, overflow: number) {
      random = random * (1 + overflow * 2) - overflow
      return rng() < disturbChance
        ? random + (rng() - 0.5) * disturb
        : random
    }
    return Array.from({ length: number })
      .fill(0)
      .map(() => [
        applyOverflow(randomBetween(limits.x), overflow),
        applyOverflow(randomBetween(limits.y), overflow),
      ])
  }

  const points = ref(getPoints())
  const poly = computed(() => points.value.map(([x, y]) => `${x * 100}% ${y * 100}%`).join(', '))

  function jumpPoints() {
    const newPoints = new Set(getPoints())
    points.value = points.value.map((o) => {
      let minDistance = Number.POSITIVE_INFINITY
      let closest: Range = o
      for (const n of newPoints) {
        const d = distance2(o, n)
        if (d < minDistance) {
          minDistance = d
          closest = n
        }
      }
      newPoints.delete(closest)
      return closest
    })
  }

  watch(currentSlideRoute, () => {
    jumpPoints()
  })

  return poly
}

function gradient(direction: string, color: string) {
  return `linear-gradient(to ${direction} in oklch, ${color} 0%, #ffffff1a 100%)`
}

const poly1 = usePoly(10)
const poly2 = usePoly(6)
const poly3 = usePoly(3)
</script>

<template>
  <div
    class="bg transform-gpu overflow-hidden pointer-events-none"
    :style="{ filter: `blur(70px) hue-rotate(${hue}deg)` }"
    aria-hidden="true"
  >
    <div
      class="clip"
      :style="{ 'clip-path': `polygon(${poly1})`, 'opacity': opacity, 'background-image': gradient('right', glowColors[0]) }"
    />
    <div
      class="clip"
      :style="{ 'clip-path': `polygon(${poly2})`, 'opacity': opacity, 'background-image': gradient('left', glowColors[1]) }"
    />
    <div
      class="clip"
      :style="{ 'clip-path': `polygon(${poly3})`, 'opacity': 0.2, 'background-image': gradient('top', glowColors[2]) }"
    />
  </div>
</template>

<style scoped>
.bg,
.clip {
  transition: all 2.5s ease;
}

.bg {
  position: absolute;
  inset: 0;
  z-index: -10;
}

.clip {
  clip-path: circle(75%);
  aspect-ratio: 16 / 9;
  position: absolute;
  inset: 0;
}

.light .clip {
  opacity: 1 !important;
}
</style>
