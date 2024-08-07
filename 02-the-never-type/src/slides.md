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
download: https://raw.githubusercontent.com/PhyberApex/typescript-lightning-talks/main/02-the-never-type/02-the-never-type.pdf
info: |
  ## The 'never' Type in TypeScript
  A deep dive into TypeScript's most mystical type
title: The 'never' Type in TypeScript
fonts:
  mono: Operator Mono
  local: Operator Mono
  sans: DM Sans
  strong: Rubik Iso
  fast: Ubuntu
  hand: Caveat
---

# The 'never' Type in TypeScript
Embracing the Void: TypeScript's Secret Weapon

<!--
Welcome, TypeScript adventurers! Today, we're diving into one of the most enigmatic features of TypeScript: the 'never' type.
It might sound like nothing, but trust me, it's something you'll never want to be without!
Get ready to explore the power of impossibility in your code!
-->

---
layout: two-cols
---

# What is the 'never' Type?

<v-clicks>

- TypeScript's bottom type
- Represents the type of values that never occur
- No value is assignable to 'never' (except 'never' itself)
- The type of expressions that always throw or never return

</v-clicks>

::right::

<div v-click>

<<< ./snippets/01-example.ts {monaco}

</div>

<!--
Let's start by unraveling the mystery of the 'never' type.

[click] First off, it's what we call TypeScript's "bottom type". Don't worry if that sounds like jargon - we'll make sense of it!
[click] 'never' represents values that, well, never occur. It's like the unicorn of types - mythical and impossible.
[click] Here's a mind-bender: nothing can be assigned to 'never', except 'never' itself. It's the type system's way of saying "this can't happen!"
[click] You'll see 'never' pop up in functions that always throw errors or never return, like infinite loops.
[click] On the right, we have some examples. Can you spot why these functions return 'never'?

The first one always throws an error, and the second... well, it's stuck in an infinite loop!
-->

---

# When is 'never' Inferred?

<div class="grid grid-cols-2 gap-4">
<div>

## Common Scenarios

<v-clicks>

- Functions that never return
- Unreachable code branches
- Exhaustive checks in switch statements
- Empty arrays or intersections of incompatible types

</v-clicks>

</div>
<div>

<v-click>

## The Power of 'never'

</v-click>

<v-clicks>

- Catches logical errors
- Ensures all cases are handled
- Makes impossible states truly impossible
- Enhances type safety in complex scenarios

</v-clicks>

</div>
</div>

<!--
Now, let's explore when TypeScript decides to bring out the 'never' type.

[click] We've seen functions that never return, like our error-throwing friend from earlier.
[click] It also appears in code branches that should be unreachable. If TypeScript sees 'never', it's saying "this code should never run!"
[click] In switch statements, 'never' helps us ensure we've covered all our bases.
[click] And in some type operations, like empty arrays or intersections of types that can't coexist, 'never' pops up.
[click] But why should we care? Let's look at the power of 'never':
[click] It's great at catching logical errors. If you see 'never' where you don't expect it, something's probably wrong!
[click] It ensures you've handled all possible cases in your code. No more forgotten edge cases!
[click] It allows you to make certain states in your program truly impossible at the type level.
[click] In complex scenarios, 'never' enhances type safety by eliminating impossible cases.
-->

---

# 'never' in Action: Unreachable Code Detection

<div class="grid grid-cols-2 gap-4">
<div>

<<< ./snippets/02-unreachable-code.ts {monaco}

</div>
<div>

## What's happening here?

<v-clicks>

- We've covered all possible values of `response`
- The `else` block should be unreachable
- TypeScript infers `response` as `never` in this block
- Assigning to `unreachable` variable catches the error

</v-clicks>

</div>
</div>

<!--
Let's see 'never' in action with a practical example.

Here we have a function that processes a response that can only be "yes" or "no".

Let's break down what's happening:

[click] We've covered all possible values of `response` in our if-else statements.
[click] This means the final else block should be unreachable. It's impossible to get here!
[click] In this unreachable block, TypeScript infers that `response` must be of type `never`.
[click] By trying to assign this to our `unreachable` variable of type `never`, we catch any logical errors.

This pattern is incredibly useful for catching bugs early. If we ever add a new possible value to our response type and forget to handle it, TypeScript will let us know!
-->

---

# Exhaustive Checks with 'never'

<div class="grid grid-cols-2 gap-4">
<div>

<<< ./snippets/03-exhaustive-check.ts {monaco}

</div>
<div>

## The Power of Exhaustiveness

<v-clicks>

- Ensures all cases are handled
- Compiler error if a case is missed
- Refactor with confidence
- Makes your code more maintainable

</v-clicks>

</div>
</div>

<!--
Now, let's explore one of the most powerful uses of 'never': exhaustive checks.

Here's an example using shapes. We have a union type `Shape` and a function to calculate its area.

Let's break down why this is so powerful:

[click] By using 'never' in our `assertNever` function, we ensure that all possible shapes are handled in our switch statement.
[click] If we ever add a new shape to our union type and forget to handle it in the `area` function, TypeScript will give us a compiler error.
[click] This means we can refactor our code with confidence. TypeScript has our back!
[click] It also makes our code more maintainable. Anyone reading this code knows that all cases are handled.

This pattern is incredibly useful in large codebases where it's easy to forget to update all the necessary places when adding new variants to a type.
-->

---

# 'never' in Conditional Types

<div>

<<< ./snippets/04-conditional-type.ts {monaco}

</div>

<div class="mt-4 text-center">
  <carbon-arrow-down class="text-4xl animate-bounce" />
</div>

<div>

## What's happening here?

<v-clicks>

- 'never' acts as a fallback in conditional types
- Helps create more precise mapped types
- Allows for powerful type transformations

</v-clicks>

</div>

<!--
Let's take our 'never' adventure a step further into the realm of conditional types.

Here's a nifty type that extracts the element type from an array.

Let's break it down:

[click] In this conditional type, 'never' acts as our fallback. If T isn't an array, we get 'never'.
[click] This allows us to create more precise mapped types. We're not just transforming types, we're filtering them too!
[click] It opens up a world of powerful type transformations. Think of 'never' as your safety net in these complex type operations.

This pattern is incredibly useful when you're working with generic types and want to ensure you're only operating on specific shapes of data.
-->

---
layout: two-cols
---

# Best Practices with 'never'

<v-clicks>

- Use it to mark impossible cases in your domain logic
- Leverage it for exhaustive checking in switch statements
- Employ it in advanced type manipulations and conditional types
- Be cautious of 'any' - it can be assigned to 'never', breaking its guarantees

</v-clicks>

::right::

<div class="ml-4">

<v-click>

# Remember

</v-click>

<v-clicks>

- 'never' represents the logically impossible
- If you're handling a 'never', something's probably wrong!
- It's a powerful tool for creating safer, more robust code
- Use it wisely, and it will never let you down!

</v-clicks>

</div>

<!--
As we wrap up our 'never' journey, let's review some best practices.

[click] Use 'never' to mark cases in your code that should be impossible. It's like putting up a "Do Not Enter" sign in your type system.
[click] Leverage it for exhaustive checks, especially in switch statements or when working with discriminated unions.
[click] In advanced type manipulations, 'never' can be your secret weapon for creating precise, powerful types.
[click] But be wary of 'any' - it's the kryptonite to 'never's superpowers. 'any' can be assigned to 'never', potentially breaking your carefully crafted type safety.
[click] Now, let's recap what we've learned:
[click] Remember, 'never' represents the logically impossible in your code.
[click] If you find yourself handling a 'never' type, it's usually a sign that something's gone wrong in your logic.
[click] Used correctly, 'never' is a powerful tool for creating safer, more robust code.
[click] So use it wisely, and it will never let you down in your TypeScript adventures!
-->

---
layout: center
class: text-center
---

# Questions?

Where 'never' is always an option, but rarely the answer!

<!--
We've explored the paradoxical world of 'never', but our TypeScript adventure isn't over yet!
What 'never'-ending questions do you have? What impossible scenarios are you trying to model?
Let's dive into your questions and continue our journey through the fascinating realm of TypeScript's most elusive type!
-->

---
layout: center
class: text-center
---

# Thank You!

Remember: In TypeScript, 'never' say never!

<!--
And there you have it, folks! We've journeyed through the fascinating world of TypeScript's 'never' type.

From impossible functions to exhaustive checks, we've seen how this seemingly paradoxical type can make our code safer and more robust.

Remember, in the world of TypeScript, 'never' doesn't mean "don't use it." It means "use it to make the impossible truly impossible!"

Thank you for joining me on this type adventure. Now go forth and let 'never' be your guiding star in the TypeScript galaxy!

Ask for feedback
 -->
