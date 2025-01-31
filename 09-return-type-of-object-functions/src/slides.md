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
download: https://raw.githubusercontent.com/PhyberApex/typescript-lightning-talks/main/09-return-type-of-object-functions/09-return-type-of-object-functions.pdf
info: |
  ## Return Types of Object Functions in TypeScript
  Understanding why Object.keys and Object.entries return string[] and [string, any][]
title: Return Types of Object Functions in TypeScript
fonts:
  mono: Operator Mono
  local: Operator Mono
  sans: DM Sans
  strong: Rubik Iso
  fast: Ubuntu
  hand: Caveat
---

# Return type of object functions
Understanding TypeScript's Design Decisions

<!--
Welcome everyone! Today we're going to explore a common source of confusion in TypeScript: why Object.keys returns string[] instead of a more specific type. This design decision reveals some fascinating aspects of TypeScript's type system and JavaScript's runtime behavior.
-->

---
layout: two-cols
---

# The Expectation vs Reality

<v-clicks>

- We expect keys to match object properties
- TypeScript returns `string[]` instead
- Not a limitation, but a necessity
- Reflects JavaScript's dynamic nature

</v-clicks>

::right::

<<< ./snippets/01-naive-expectation.ts {monaco}

<!--
Let's start with what most developers expect when using Object.keys. The natural assumption is that TypeScript would know exactly which keys exist on an object.

Looking at our example, you might think TypeScript could easily determine that Object.keys should return an array of "name" | "age". However, there are several reasons why this isn't possible, which we'll explore throughout this talk.
-->

---
layout: two-cols
---

# Type Widening and Runtime Behavior

<v-clicks>

- Objects can be modified at runtime
- TypeScript types are compile-time only
- JavaScript allows dynamic property addition
- TypeScript must account for runtime changes

</v-clicks>

::right::

<<< ./snippets/02-type-widening.ts {monaco}

<!--
One of the fundamental reasons for Object.keys returning string[] is JavaScript's dynamic nature.

In this example, we see how objects can be modified at runtime in JavaScript. Even though TypeScript gives us compile-time safety, it can't prevent runtime modifications in JavaScript.

This means that by the time Object.keys runs, the object might have completely different properties than what TypeScript knows about at compile time.
-->

---
layout: two-cols
---

# Type-Safe Alternatives

<v-clicks>

- Create wrapper functions for known objects
- Use type assertions with caution
- Consider Object.entries for value types
- Document assumptions explicitly

</v-clicks>

::right::

<<< ./snippets/03-safe-alternative.ts {monaco}

<!--
While Object.keys must return string[] for safety, we can create type-safe alternatives for specific use cases.

This example shows how to create a wrapper function that asserts the keys are of the expected type. However, use this pattern with caution - you're telling TypeScript to trust your runtime assumptions.

This approach is useful when you have complete control over the object and can guarantee its shape won't change at runtime.
-->

---

# Why This Matters

<v-clicks>

- Type safety vs runtime flexibility
- JavaScript's dynamic nature
- TypeScript's design philosophy
- Practical implications for developers

</v-clicks>

<!--
Understanding why Object.keys returns string[] helps us appreciate TypeScript's design decisions.

This behavior reflects the balance TypeScript strikes between type safety and JavaScript's dynamic nature.

It reminds us that TypeScript's type system is about compile-time checks, not runtime guarantees.

Most importantly, it helps us write better, more type-safe code by understanding the limitations and working within them.
-->

---
layout: center
class: text-center
---

# Questions?

How do you handle type-safe key enumeration in your TypeScript projects?

<!--
We've covered the technical reasons behind TypeScript's Object.keys behavior. I'm curious about your experiences!

How do you handle scenarios where you need type-safe key enumeration? Have you developed any patterns or utilities to make this easier?

Let's discuss your approaches and challenges when working with object keys in TypeScript.
-->

---
layout: center
class: text-center
---

# Thank You!

Remember: TypeScript's type system is about compile-time safety in a dynamic world!

<!--
Thank you for joining me in this exploration of TypeScript's type system!

We've seen how TypeScript's design decisions around Object.keys reflect the reality of JavaScript's dynamic nature.

Understanding these fundamentals helps us write better TypeScript code and make more informed decisions about type safety.

Keep exploring TypeScript's type system - there's always more to discover!
-->