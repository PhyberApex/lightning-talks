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
download: https://raw.githubusercontent.com/PhyberApex/typescript-lightning-talks/main/10-the-hidden-this/10-the-hidden-this.pdf
info: |
  ## Type Guards & User-Defined Type Predicates in TypeScript
  How to safely handle API responses and unlock the full power of TypeScript's type narrowing.
title: Type Guards & User-Defined Type Predicates
fonts:
  mono: Operator Mono
  local: Operator Mono
  sans: DM Sans
  strong: Rubik Iso
  fast: Ubuntu
  hand: Caveat
---

# Type Guards & User-Defined Type Predicates
Safe API Handling with TypeScript

<!--
Welcome! Today, we're diving into type guards and user-defined type predicates—essential tools for safely handling API responses in TypeScript. We'll use a pizza API as our running example.
-->

---

# Why Do We Need Type Guards?

<v-clicks>

- APIs often return unions: success or error
- TypeScript can't know the shape at runtime
- We need a way to safely access properties
- Type guards let us narrow types at runtime
- User-defined predicates unlock full type safety

</v-clicks>

<!--
APIs rarely return just one type. You might get a pizza, or you might get an error. TypeScript needs help to know which one you have at runtime. That's where type guards come in!
-->

---
layout: two-cols
---

# The Problem: Unsafe Access

<v-clicks>

- What happens if we access properties without checking the type?
- TypeScript will warn us, but runtime errors can still happen

</v-clicks>

::right::

<v-click>

<<< ./snippets/01-pizza-api-unsafe.ts ts {monaco}

</v-click>

<!--
Here's a classic mistake: we get a response from the pizza API and try to access `.name` directly. TypeScript warns us, but if we ignore it, we'll get a runtime error if the response is actually an error.
-->

---

# The Solution: User-Defined Type Guards

<v-clicks>

- Write a function that checks the type at runtime
- Use a type predicate: `response is Pizza`
- TypeScript will narrow the type for us!

</v-clicks>

---

<<< ./snippets/02-pizza-api-typeguard.ts ts {monaco}

<!--
Here's the fix: we write a user-defined type guard, `isPizza`, that checks if the response is a pizza. Now TypeScript knows exactly what we're working with, and we can safely access properties.
-->

---

# Why Does This Matter?

<v-clicks>

- Type guards make your code safer and more expressive
- User-defined predicates unlock advanced type narrowing
- Essential for robust API handling

</v-clicks>

<!--
Type guards are a must-have for anyone working with APIs or union types in TypeScript. They make your code safer, more robust, and easier to reason about.
-->

---

# Bonus: Discriminated Unions

<v-clicks>

- Add a `type` property to your API responses
- TypeScript can narrow types automatically
- Combine with type guards for exhaustive checks

</v-clicks>

---

<<< ./snippets/03-pizza-api-discriminated.ts ts {monaco}

<!--
Here's how a discriminated union works: by adding a `result` property to your API responses, TypeScript can automatically narrow the type in a switch statement. This makes your code safer and ensures you handle every possible case.
-->

---

# Bonus-Bonus: Exhaustive Checks

<v-clicks>

- But what if we add another possibility for `result`?
- Exhhaustive checks have entered the room...

</v-clicks>

---

<<< ./snippets/04-pizza-api-discriminated-exhaustive.ts ts {monaco}

<!--
Here's where exhaustive checks shine. If you add another possible value for `result`—like 'progress' for an in-progress pizza order—TypeScript will warn you if you forget to handle it in your switch statement. The trick is to use a `default` case that assigns the value to a variable of type `never`. If you miss a case, TypeScript will give you an error, making your code future-proof and robust. This is a best practice for working with discriminated unions in TypeScript.
-->

---
layout: center
class: text-center
---

# Questions?

Ever used type guards or user-defined predicates? Any API horror stories?

<!--
Let's chat! Have you used type guards before? Any tricky API responses or union types? Share your experiences and questions!
-->

---
layout: center
class: text-center
---

# Thank You!

TypeScript's type system is full of little surprises—keep exploring!

<!--
Thanks for joining this quick tour of type guards and user-defined type predicates. Try them out in your next API project!
-->
