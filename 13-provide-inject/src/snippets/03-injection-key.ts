import type { InjectionKey, Ref } from 'vue'

// Define a typed injection key
export const ThemeKey: InjectionKey<Ref<string>> = Symbol('theme')

// In parent: provide(ThemeKey, ref('dark'))
// In child:  const theme = inject(ThemeKey)
//            ^? Ref<string> | undefined


