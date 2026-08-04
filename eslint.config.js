import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  formatters: {
    css: true,
    // markdown: true,
    // slidev: {
    //   files: [
    //     '*/src/slides.md',
    //   ],
    // },
  },
}, {
  files: ['**/*.ts'],
  rules: {
    'no-console': 'off',
    'unused-imports/no-unused-vars': 'off',
  },
}, {
  // Every slide in a Slidev deck is its own `#` heading.
  files: ['*/src/slides.md'],
  rules: {
    'markdown/no-multiple-h1': 'off',
  },
}, {
  // Snippets are teaching material shown on slides, written to illustrate a
  // point rather than to pass lint.
  files: ['*/src/snippets/**'],
  rules: {
    'antfu/no-top-level-await': 'off',
    'no-case-declarations': 'off',
    'no-console': 'off',
    'ts/method-signature-style': 'off',
  },
})
