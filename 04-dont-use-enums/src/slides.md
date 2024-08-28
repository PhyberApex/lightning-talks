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
download: https://raw.githubusercontent.com/PhyberApex/typescript-lightning-talks/main/03-interface-vs-type-alias/04-dont-use-enums.pdf
info: |
  ## Don't Use Enums in TypeScript
  Why enums break TypeScript's structural typing and how to avoid them
title: Don't Use Enums in TypeScript
fonts:
  mono: Operator Mono
  local: Operator Mono
  sans: DM Sans
  strong: Rubik Iso
  fast: Ubuntu
  hand: Caveat
---

# Don't Use Enums in TypeScript
Embracing Structural Typing with Alternatives

<!--
Welcome, TypeScript enthusiasts! Today, we're diving into a controversial topic: why you should avoid using enums in TypeScript.
We'll explore the pitfalls of enums, how they break TypeScript's structural typing principles, and what alternatives you can use instead.
Get ready to challenge your assumptions and level up your TypeScript game!
-->

---
layout: two-cols
---

# The Problem with Enums

<v-clicks>

- Not part of native JavaScript
- Break TypeScript's structural typing
- Restrict value passing
- Introduce unexpected behavior
- Complicate type inference

</v-clicks>

::right::

<div v-click>

<<< ./snippets/01-enum-problems.ts {monaco}

</div>

<!--
Let's start by understanding why enums are problematic in TypeScript.

[click] First, enums are not part of native JavaScript. This can lead to unexpected runtime behavior.
[click] They break TypeScript's structural typing principles. TypeScript was designed to care about the shape of data, not its name.
[click] Enums restrict how you can pass values, often requiring you to use the enum itself rather than its value.
[click] This can introduce unexpected behavior and errors that might not be immediately obvious.
[click] Lastly, enums can complicate type inference, making your code less flexible.
[click] On the right, we have an example of how enums can lead to counterintuitive behavior. Notice how we can't pass a string value directly, even though it matches the enum value.
-->

---

# The Pitfalls of const enums

<div class="grid grid-cols-2 gap-4">
<div>

## TypeScript
<<< ./snippets/02-const-enum-pitfalls.ts {monaco-write}

</div>
<div>

## Transpiled JavaScript
<<< ./snippets/02-const-enum-pitfalls.js {monaco-run}

</div>
</div>

<!--
So we can see that the transpiled JavaScript is very convoluted and does also give us one issue. Also we have additional 
values in our `Object.values` call.
Change it to string enum.
Change it to a const enum.
Add a remark that TypeScript docs don't recommend const enums at all.
-->

---

# The Solution: POJO with 'as const'

<div class="grid grid-cols-2 gap-4">
<div>

<<< ./snippets/03-pojo-solution.ts {monaco}

</div>
<div>

<v-clicks>

- Uses native JavaScript object
- Preserves structural typing
- Allows flexible value passing
- Consistent with TypeScript philosophy
- Provides better type inference

</v-clicks>

</div>
</div>

<!--
Now, let's look at a better solution: using a Plain Old JavaScript Object (POJO) with 'as const'.

In this example, we define our log levels as a simple object and use 'as const' to make it read-only.

[click] This approach uses a native JavaScript object, which is more idiomatic and predictable.
[click] It preserves TypeScript's structural typing principles.
[click] As you can see, we can now pass either the object property or the string value directly.
[click] This is consistent with TypeScript's philosophy of focusing on the shape of data.
[click] It also provides better type inference, making our code more flexible and maintainable.

This solution gives us the best of both worlds: the type safety we want with the flexibility we need.
-->

---
layout: two-cols
---

# Best Practices

<v-clicks>

- Avoid using enums, including const enums
- Use POJOs with 'as const' for constant values
- Embrace structural typing principles
- Write idiomatic JavaScript with TypeScript types

</v-clicks>

::right::

<div class="ml-4">

<v-click>

# Remember

</v-click>

<v-clicks>

- Enums break structural typing
- POJOs are more flexible and idiomatic
- TypeScript is about shape, not names
- Good TypeScript is good JavaScript

</v-clicks>

</div>

<!--
Let's recap some best practices for handling constant values in TypeScript.

[click] First and foremost, avoid using enums, including const enums. They introduce more problems than they solve.
[click] Instead, use Plain Old JavaScript Objects (POJOs) with 'as const' for your constant values.
[click] Always strive to embrace TypeScript's structural typing principles in your code.
[click] Remember, good TypeScript code is just good JavaScript code with added type annotations.

[click] Now, let's summarize what we've learned:
[click] Enums, while seemingly useful, actually break TypeScript's structural typing principles. 
(Sidenote about how the devs said they wouldn't add it again)
[click] POJOs with 'as const' provide a more flexible and idiomatic solution to the same problem.
[click] TypeScript is fundamentally about the shape of your data, not the names you give it.
[click] At its core, good TypeScript code is just good JavaScript code with powerful type annotations.
-->

---
layout: center
class: text-center
---

# Questions?

Have you encountered issues with enums in your TypeScript projects?

<!--
We've explored the pitfalls of enums and the power of alternatives, but our TypeScript journey isn't over yet!
Have you encountered any issues with enums in your projects? How do you handle constant values in your TypeScript code?
Let's dive into your questions and experiences!
-->

---
layout: center
class: text-center
---

# Thank You!

Remember: In TypeScript, shape matters more than names!

<!--
And there you have it, folks! We've unraveled the mystery of why enums can be problematic in TypeScript.

From breaking structural typing to introducing unexpected behavior, we've seen how enums can complicate our TypeScript code.

Remember, in the world of TypeScript, it's the shape of your data that matters, not the names you give it. Embrace POJOs, leverage 'as const', and let TypeScript's structural typing shine!

Thank you for joining me on this TypeScript adventure. Now go forth and write more idiomatic, flexible, and type-safe TypeScript code!

Don't forget to share your thoughts on enums and your experiences with alternatives. Your insights could help fellow developers write better TypeScript code!
-->