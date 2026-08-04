// injection-keys.ts
import type { InjectionKey, Ref } from 'vue'

export const ThemeKey: InjectionKey<Ref<string>> = Symbol('theme')

// App.vue:        provide(ThemeKey, ref('dark'))
// Navigation.vue: const theme = inject(ThemeKey)
//                       ^? Ref<string> | undefined
