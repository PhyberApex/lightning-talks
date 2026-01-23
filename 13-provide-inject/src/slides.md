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
download: https://raw.githubusercontent.com/PhyberApex/lightning-talks/main/13-provide-inject/13-provide-inject.pdf
info: |
  ## Provide & Inject
  Dependency Injection in Vue - avoiding prop drilling
title: Provide & Inject
fonts:
  mono: Operator Mono
  local: Operator Mono
  sans: DM Sans
  strong: Rubik Iso
  fast: Ubuntu
  hand: Caveat
---

# Provide & Inject
Dependency Injection in Vue

<!--
Welcome to another Vue lightning talk!
Today we're tackling a common pain point: prop drilling.
Vue's provide/inject system offers an elegant solution. Let's dive in!
-->

---

# The Prop Drilling Problem

<v-clicks>

- Passing props through many component layers
- Intermediate components don't use the data
- Tedious and error-prone
- Makes refactoring difficult

</v-clicks>

<!--
You've probably experienced this: you need to pass data from a parent to a deeply nested child.

Every component in between has to accept and forward the prop.

Those intermediate components don't even use the data!

It's tedious, clutters your code, and makes refactoring a nightmare.

Let me show you what this looks like in code...
-->

---
layout: two-cols
---

# Prop Drilling in Action

::left::

<<< ./snippets/00a-prop-drilling-top.vue vue

::right::

<<< ./snippets/00b-prop-drilling-bottom.vue vue

<!--
Look at this example - we have a theme that needs to go from App to Navigation.

App defines the theme, but Navigation is the only one that actually uses it.

Layout and Sidebar are just passing it through - they don't care about the theme at all!

Imagine adding a new prop - you'd have to update every component in the chain.

Vue's provide/inject solves this elegantly.
-->

---
layout: two-cols
---

# provide/inject to the Rescue!

<v-clicks>

- Parent provides a value
- Any descendant can inject it
- No intermediate props needed
- Works at any depth

</v-clicks>

::right::

<v-click>

<<< ./snippets/01-parent-provide.vue vue {monaco}

</v-click>

<!--
Now let's see how provide/inject solves this!

The parent component simply provides a value.

Any descendant - no matter how deep - can inject it directly.

Layout and Sidebar don't need to know about the theme at all!

Here's the parent providing that same theme value...
-->

---

# Injecting the Value

<<< ./snippets/02-child-inject.vue vue {monaco}

<!--
And here's Navigation.vue - our deeply nested child that actually needs the theme.

We call inject with the same key used in provide.

The second argument is a default value in case nothing is provided.

Layout and Sidebar don't exist in this code at all - no prop drilling!
-->

---

# Type-Safe provide/inject

<<< ./snippets/03-injection-key.ts ts {monaco}

<!--
For TypeScript, we can make this fully type-safe using InjectionKey.

We define a symbol with a generic type parameter.

Now TypeScript knows exactly what type the injected value will be!

This is the recommended approach for any serious Vue TypeScript project.
-->

---

# Reactive provide

<<< ./snippets/04-reactive-provide.vue vue {monaco}

<!--
Important: provided values can be reactive!

Here App.vue provides a reactive theme ref with a toggle button.

When the theme changes, Navigation.vue will automatically update - no props needed!

This is incredibly powerful for sharing state without a full state management solution.
-->

---
layout: center
class: text-center
---

# Questions?

Have you used provide/inject to avoid prop drilling?

<!--
That's provide/inject in a nutshell!

It's perfect for themes, user data, or any deeply shared state.

Have you used this pattern? Any questions?
-->

---
layout: center
class: text-center
---

# Thank You!

Remember: provide/inject beats prop drilling!

<!--
Thanks for joining this lightning talk on provide/inject!

Next time you're tempted to drill props through five components, remember this pattern.

See you in the next talk!
-->


