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
download: https://raw.githubusercontent.com/PhyberApex/lightning-talks/main/12-computed-getter-setter/12-computed-getter-setter.pdf
info: |
  ## Computed Properties: Beyond Read-Only
  Understanding writable computed properties with getters and setters in Vue
title: Computed Properties - Beyond Read-Only
fonts:
  mono: Operator Mono
  local: Operator Mono
  sans: DM Sans
  strong: Rubik Iso
  fast: Ubuntu
  hand: Caveat
---

# Computed Properties
Beyond Read-Only

<!--
Welcome back to our Vue lightning talk series!
Today we're exploring a powerful but often overlooked feature: writable computed properties.
Most developers only use computed for derived read-only values, but there's more to it!
-->

---

# What are Computed Properties?

<v-clicks>

- Derived values that automatically update when dependencies change
- Cached - only re-computed when dependencies change
- Usually read-only... but they don't have to be!
- Can define both a getter AND a setter

</v-clicks>

<!--
Quick refresher: computed properties are derived values.

They're cached and only re-evaluate when their dependencies change.

Most of the time we use them as read-only values.

But Vue actually lets us define a setter too - making them writable!
-->

---

# Basic Computed (Read-Only)

<<< ./snippets/01-basic-computed.vue vue {monaco}

<!--
Here's a typical computed property - read-only.

We have firstName and lastName as refs, and fullName is computed from them.

This works great for displaying derived data, but what if we want to edit fullName directly?

That's where writable computed comes in...
-->

---

# Writable Computed

````md magic-move
<<< ./snippets/01-basic-computed.vue vue

<<< ./components/writable-computed.vue vue
````

<!--
Watch the transformation from read-only to writable computed.

Instead of just a function, we pass an object with get and set.

The getter works the same as before.

The setter receives the new value and updates the underlying refs.

Now we can bind v-model directly to fullName!
-->

---
layout: two-cols
---

# Example

<v-clicks>

- Form field with formatted display
- Currency input that stores cents
- User edits formatted value
- Setter parses and stores raw value

</v-clicks>

::right::

<v-click>

<<< ./components/writable-computed.vue vue

<writable-computed />

</v-click>

<!--
Here's a practical example: a currency input.

We store the value in cents for precision, but display it formatted with a dollar sign.

The getter formats cents to dollars for display.

The setter parses the user input and converts back to cents.

This pattern is super useful for any formatted input fields!
-->

---
layout: center
class: text-center
---

# Questions?

When have you needed writable computed properties?

<!--
That's writable computed in a nutshell!

It's perfect for two-way binding with transformed values.

Have you used this pattern before? Any questions?
-->

---
layout: center
class: text-center
---

# Thank You!

Remember: Computed properties can be more than just getters!

<!--
Thanks for joining this quick dive into writable computed properties!

Next time you need to transform data for a form input, remember this pattern.

See you in the next lightning talk!
-->


