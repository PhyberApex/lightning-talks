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

# Return Types of Object Functions
Understanding TypeScript's Object.keys and Object.entries

<!--
Welcome everyone! Today we'll dive into an interesting aspect of TypeScript's type system: why Object.keys and Object.entries have seemingly less specific return types than we might expect. This topic reveals important insights about TypeScript's structural typing system.
-->

---

# The Challenge

<v-clicks>

- Developers expect more specific return types
- `Object.keys` returns `string[]` instead of `Array<keyof T>`
- `Object.entries` returns `[string, any][]` instead of typed tuples
- TypeScript has good reasons for these choices

</v-clicks>

<!--
Let's start by understanding what developers typically expect versus what TypeScript actually provides. Many developers are surprised by the behavior of these methods, but as we'll see, TypeScript's choices are well-reasoned and necessary for type safety.
-->

---
layout: two-cols
---

# Structural Typing in Action

<v-clicks>

- TypeScript uses structural typing
- Extra properties are allowed
- Return types can have unexpected properties
- Type system must account for this behavior

</v-clicks>

::right::

<<< ./snippets/01-excess-properties.ts {monaco}

<!--
Here's a fundamental example that demonstrates why TypeScript makes these choices. Let's look at how structural typing affects object types.

The code on the right shows how TypeScript's structural typing system allows objects to have extra properties beyond their defined type. This behavior has important implications for how we handle object properties at the type level.

Pay attention to how we can add an extra property 'name' even though it's not in the return type. This is perfectly valid in TypeScript's structural typing system.
-->

---
layout: two-cols
---

# Object.keys Behavior

<v-clicks>

- Returns `string[]` by design
- Cannot guarantee all properties are known
- Must account for potential extra properties
- Type safety requires broader return type

</v-clicks>

::right::

<<< ./snippets/02-object-keys-example.ts {monaco}

<!--
Let's examine why Object.keys returns string[]. The example on the right demonstrates a common scenario where an object might have additional properties at runtime.

TypeScript must return string[] because it cannot guarantee that it knows all possible properties that might exist on the object at runtime. This is a direct consequence of the structural typing system we just discussed.

Notice how the object could have extra properties that aren't part of its static type definition. This is why a more specific return type would be unsafe.
-->

---
layout: two-cols
---

# Object.entries Behavior

<v-clicks>

- Returns `[string, any][]`
- Similar reasoning to Object.keys
- Values could be of any type
- Type safety demands flexibility

</v-clicks>

::right::

<<< ./snippets/03-object-entries-example.ts {monaco}

<!--
The same principles apply to Object.entries. Let's look at why it returns [string, any][] instead of a more specific tuple type.

Just like with Object.keys, we can't guarantee what properties might exist at runtime. Additionally, we can't be certain about the types of values for any extra properties.

This example shows why a more specific return type would be unsafe, as extra properties could have values of any type.
-->

---
layout: two-cols
---

# Type-Safe Alternatives

<v-clicks>

- Create wrapper functions
- Use type assertions carefully
- Document assumptions
- Understand the trade-offs

</v-clicks>

::right::

<<< ./snippets/04-type-safe-alternative.ts {monaco-run}

<!--
If you need more specific typing, you can create wrapper functions that make explicit guarantees about their input and output types.

However, be careful with this approach. You're essentially telling TypeScript "trust me, I know what I'm doing" with the type assertion.

This pattern should be used sparingly and only when you can guarantee that the runtime behavior matches your type assertions.
-->

---

# Best Practices

<v-clicks>

- Accept TypeScript's design decisions
- Understand structural typing implications
- Use type assertions carefully
- Create typed wrappers when necessary
- Document assumptions and limitations

</v-clicks>

<!--
Let's recap some best practices when working with Object.keys and Object.entries in TypeScript:

First, accept and understand why TypeScript made these design decisions. They're based on sound principles of type safety.

Remember the implications of structural typing - it's a fundamental part of TypeScript's design.

If you need more specific types, create wrapper functions, but use them carefully and document your assumptions.

Most importantly, understand that TypeScript's current behavior is not a limitation - it's a feature that ensures type safety.
-->

---
layout: center
class: text-center
---

# Questions?

Have you encountered surprises with Object.keys or Object.entries in your TypeScript projects?

<!--
We've covered a lot about TypeScript's handling of object properties and its type system. I'm curious about your experiences!

Have you encountered situations where Object.keys or Object.entries didn't behave as you initially expected? How did you handle those cases?

Maybe you've found creative solutions for working with object properties in TypeScript? I'd love to hear about them!
-->

---
layout: center
class: text-center
---

# Thank You!

Remember: TypeScript's type system choices are designed to ensure type safety!

<!--
Thank you all for your attention today!

We've explored some fundamental aspects of TypeScript's type system and why certain design decisions were made. Understanding these principles helps us write better, more type-safe code.

Remember that TypeScript's choices around Object.keys and Object.entries are deliberate and important for maintaining type safety. While they might sometimes seem inconvenient, they protect us from subtle runtime errors.

Keep exploring TypeScript's type system - there's always more to learn!
-->