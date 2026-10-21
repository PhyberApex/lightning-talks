// `@slidev/client` ships raw `.ts` sources that only typecheck inside Slidev's
// own Vite build, so tsconfig `paths` resolves the import to this declaration.
import type { SlideRoute } from '@slidev/types'
import type { ComputedRef } from 'vue'

export function useNav(): {
  currentSlideRoute: ComputedRef<SlideRoute>
}
