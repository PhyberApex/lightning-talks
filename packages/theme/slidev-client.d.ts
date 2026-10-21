// Slidev ships `@slidev/client` as raw `.ts` sources that only typecheck inside
// its own Vite build (vite/client types, `__SLIDEV_*` globals, vue-router
// augmentations). Mapping the import here keeps typecheck on our code only.
import type { SlideRoute } from '@slidev/types'
import type { ComputedRef } from 'vue'

export function useNav(): {
  currentSlideRoute: ComputedRef<SlideRoute>
}
