---
theme: seriph
background: /cover.jpg
highlighter: shiki
lineNumbers: false
info: |
  ## Branded Types in TypeScript
  A 5-10 minute introduction to branded types and their benefits.
drawings:
  persist: false
transition: slide-left
title: Branded Types in TypeScript
author: Janis Walliser
fonts:
  mono: Operator Mono
  local: Operator Mono
---

# Branded Types in TypeScript
Enhancing Type Safety and Domain Modeling

<!--
- Welcome everyone to this talk on Branded Types in TypeScript
- This is inspired by the Security Lunch and Learn from Tuesday DDD
- We'll explore how this technique can significantly improve our type safety and domain modeling
- By the end, you'll understand what branded types are, why they're useful, and how to implement them
-->

---

# What are Branded Types?

- A technique to create nominally typed values
- Adds an extra layer of type safety
- Helps prevent mixing up semantically different values of the same primitive type

<!--
- Branded types are a way to create unique types from existing types
- They allow us to distinguish between values that might have the same base type but different semantic meanings
- For example, distinguishing between a user ID and an order ID, even though both might be strings
-->

---

# Why Use Branded Types?

- Catch more errors at compile-time
- Improve code readability and self-documentation
- Model your domain more accurately

<!--
- Branded types help us catch errors earlier in the development process
- They make our code more self-documenting by clearly indicating the purpose of each value
- This technique allows us to model our domain more accurately, reflecting real-world distinctions in our type system
-->

---

# Basic Example: User ID

<<< ./snippets/user-id.ts ts {1|3-5|8-10|12-13|14-16|all} twoslash

<!--
- Here's a basic example of a branded type for a User ID
- We create a UserID type that's a intersection of string with and an object with an additional 'brand' property
- This can never exist. No object satisfies this
- The createUserID function acts as a type guard, ensuring we're creating valid UserIDs
- The deleteUser function now only accepts UserIDs, not any string
- If we try to call our deleteUser function we get an error (show wront type)
- We cann call our "type guard" function and then we get the correct type (show!)
-->

---

# Benefits of Branded Types

1. Type safety: Can't pass a regular string as a UserID
2. Intention revealing: Clear distinction between different ID types
3. Compile-time checks: Errors caught early in the development process

<!--
- Let's discuss the benefits we get from using branded types
- We get improved type safety - TypeScript won't let us pass a regular string where a UserID is expected
- Our code becomes more intention-revealing - it's clear when we're dealing with specific types of IDs
- Many errors are caught at compile-time, saving us from runtime bugs
- This of course is not very intuative
- We can make this more generic and reusable - DRY!
-->

---

# Going Generic

````md magic-move
<<< ./snippets/user-id.ts ts {all}

<<< ./snippets/user-id-generic.ts ts {all|1-2|4|6-19|all}
````

<!--
- This is what we had...and now we get...this
- We define a generic Brand type with two generic parameters and some TypeScript magic
- The rest of the code stays as before and still works as expected
- But what if we want to make some checks instead of just creating something? Type Guard functions to the rescue!
-->

---

# Type Guards with Branded Types

<<< ./snippets/type-guards.ts ts {1|3-5|7-9|11-16|all} twoslash

<!--
- First we create our branded type (old way) for less verbosity
- Next up is a type guard function
- Type guards are functions that perform runtime checks to ensure type safety
- Here, isEmailAddress checks if a value is a valid email address
- The if statement demonstrates how we can use the type guard in practice (show!)
-->

---
transition: view-transition
---

# Type Assertions with Branded Types

````md magic-move
<<< ./snippets/type-guards.ts ts {all}

<<< ./snippets/type-assertions.ts ts {all|3-6|8-10|11-14|all}
````

<!--
- This is what we had with "simple" type guards
- This is what we would have with type assertions
- Pretty much the same thing but we have an addtional "asserts" and the implementation is now throwing an exception
-->

---

# Type Assertions with Branded Types

<<< ./snippets/type-assertions.ts ts {*} twoslash

<!--
- SHOW how the types are working
-->

---

# Best Practices

1. Use branded types for important domain concepts
2. Create factory functions for type safety
3. Use type guards and assertions to enhance runtime safety
4. With great power comes great responsibility!

<!--
- Let's recap some best practices when working with branded types
- Use them for important domain concepts where mixing types could lead to errors
- Always create factory functions to ensure type safety when creating branded types
- Use type guards and assertions to add runtime checks to your branded types
- But remember, use them judiciously - they add complexity, so use them where they provide clear benefits
-->

---

# Questions?

Thank you for your attention!

<!--
- Thank you all for your attention!
- I hope this talk has given you a good understanding of branded types and how they can be used in TypeScript
- Are there any questions? I'd be happy to discuss further or clarify any points.
-->
