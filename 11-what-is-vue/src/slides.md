---
background: /cover.jpg
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
drawings:
  enabled: false
mdc: true
presenter: dev
download: https://raw.githubusercontent.com/PhyberApex/typescript-lightning-talks/main/11-what-is-vue/11-what-is-vue.pdf
info: |
  ## What is Vue?
  A quick introduction to Vue.js - The Progressive JavaScript Framework
title: What is Vue?
fonts:
  mono: Operator Mono
  local: Operator Mono
  sans: DM Sans
  strong: Rubik Iso
  fast: Ubuntu
  hand: Caveat
---

# What is Vue?
The Progressive JavaScript Framework

<!--
Welcome everyone! Today we're taking a quick tour of Vue.js.
Whether you're new to frontend frameworks or coming from React or Angular, Vue has something interesting to offer.
This is the first in a series of Vue lightning talks - let's dive in!
-->

---

# What is Vue?

<v-clicks>

- A progressive framework for building user interfaces
- Incrementally adoptable - use as little or as much as you need
- Reactive data binding out of the box
- Component-based architecture
- Excellent TypeScript support

</v-clicks>

<!--
So what exactly is Vue?

Vue is a progressive framework - meaning you can start small and scale up as needed.

It's incrementally adoptable - you can use it for a small widget or a full SPA.

Reactivity is built into the core - when your data changes, the UI updates automatically.

Like React and Angular, it uses a component-based architecture.

And importantly for us TypeScript fans - Vue 3 has excellent TypeScript support baked in!
-->

---
layout: two-cols
---

# Single File Components

<v-clicks>

- `.vue` files combine template, logic, and styles
- Clear separation of concerns in one file
- Scoped styles by default
- Full TypeScript support with `lang="ts"`
- `<script setup>` for cleaner syntax

</v-clicks>

::right::

<v-click>

<<< ./snippets/01-sfc-example.vue vue {1-5|7-11|13-21|all}

</v-click>

<!--
Vue uses Single File Components - or SFCs.

Each .vue file contains three sections: template, script, and style.

This keeps everything about a component in one place while maintaining clear separation.

Styles are scoped by default - they won't leak to other components.

We use lang="ts" for TypeScript and script setup for the cleanest syntax.

Let's walk through the structure: template for HTML, script for logic, style for CSS.
-->

---

# Reactivity with ref()

<<< ./components/demo-reactivity.vue vue {monaco-write}

<demo-reactivity />

<!--
Here's Vue's reactivity in action.

We import ref from Vue and create a reactive counter.

The ref function wraps our value and makes it reactive.

In the script, we access the value with .value - but in the template, Vue unwraps it automatically.

When we click the button, the count updates and the UI re-renders instantly.

This is the foundation of Vue's reactivity system - simple and powerful.
-->

---

# Template Directives

<<< ./snippets/03-directives.vue vue {2-3|4|5|6|7|all}

<!--
Vue uses directives to add dynamic behavior to templates.

v-if conditionally renders elements - it completely removes them from the DOM when false.

v-for loops over arrays - notice we need a unique key for each item.

v-bind dynamically binds attributes - the shorthand is just a colon.

v-on listens for events - the shorthand is the @ symbol.

v-model creates two-way binding on form inputs - super useful for forms.

These directives make templates expressive and powerful.
-->

---

# Options API vs Composition API

<v-clicks>

- **Options API**: The classic Vue 2 style - data, methods, computed in separate blocks
- **Composition API**: The Vue 3 way - organize by feature, not option type
- `<script setup>` is the recommended syntax for Composition API
- Both are fully supported - choose based on preference and project needs

</v-clicks>

<!--
Vue offers two ways to write component logic.

The Options API is the classic approach from Vue 2 - you organize code by option type.

The Composition API is the modern Vue 3 approach - you organize by feature.

Script setup is syntactic sugar that makes Composition API even cleaner.

Both are fully supported, but Composition API with script setup is now recommended.

Let me show you the difference...
-->

---

# Options API → Composition API

````md magic-move
<<< ./snippets/04-options-api.vue vue

<<< ./snippets/05-composition-api.vue vue
````

<!--
Here's the same counter component in both styles.

First, the Options API - notice how data, computed, and methods are separate sections.

Now watch the transformation to Composition API with script setup...

See how much cleaner this is? Everything related to the counter is together.

No more "this" keyword, no more jumping between sections.

The Composition API is more concise and easier to reason about, especially for TypeScript.
-->

---
layout: center
class: text-center
---

# Questions?

Curious about Vue? What framework do you currently use?

<!--
That's our quick intro to Vue!

We've covered what Vue is, Single File Components, reactivity, directives, and the two API styles.

Are there any questions? I'd love to hear what frameworks you're currently using!

Stay tuned for more Vue lightning talks where we'll dive deeper into specific features.
-->

---
layout: center
class: text-center
---

# Thank You!

Stay tuned for more Vue lightning talks!

<!--
Thanks for joining this quick tour of Vue.js!

In upcoming talks, we'll explore computed properties, provide/inject, slots, composables, and much more.

Happy coding!
-->
