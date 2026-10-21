// Vite's dependency scanner only follows imports from the Slidev client entry,
// so it misses the `seedrandom` import in `global-bottom.vue` (loaded through a
// virtual module) and would otherwise discover it on first request, forcing a
// re-optimization and page reload while slides are already rendering.
// Vite resolves `include` entries from the deck folder, where only the theme is
// installed, hence the `theme > dependency` chain.
export default {
  optimizeDeps: {
    include: ['slidev-theme-lightning-talks > seedrandom'],
  },
}
