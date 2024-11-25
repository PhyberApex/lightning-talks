---
background: /cover.jpg
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
mdc: true
presenter: dev
info: |
  ## Indexed Types in TypeScript
  Understanding and leveraging indexed access types for type manipulation
drawings:
  persist: false
title: Indexed Types in TypeScript
fonts:
  mono: Operator Mono
  local: Operator Mono
  sans: DM Sans
  strong: Rubik Iso
  fast: Ubuntu
  hand: Caveat
---

# Indexed Types in TypeScript
Accessing and Extracting Types Like Object Properties

<!--
Welcome, everyone! Today, we're going to dive into what might seem like TypeScript magic at first: Indexed Types.

We'll explore how we can use these types to extract and manipulate other types, making our TypeScript code more flexible and powerful.

By the end of this presentation, what might look like arcane syntax will make perfect sense, and you'll have a new tool in your TypeScript toolbox.
-->

---

# Understanding Indexed Types

<v-clicks>

- Access properties of other types using square brackets
- Similar to accessing object properties in JavaScript
- Can access both static properties and array types
- Powerful way to extract and manipulate types
- Foundation for many advanced TypeScript patterns

</v-clicks>

<!--
Let's start by understanding what Indexed Types are in TypeScript.

Think of them as a way to "reach into" another type and grab specific pieces - just like how you'd use square brackets to access properties of an object in JavaScript.

This feature is foundational to many advanced TypeScript patterns, allowing us to build more sophisticated type systems.

We'll see how this simple concept can lead to some surprisingly powerful type manipulations.
-->

---

# Basic Syntax: Object Properties

<v-clicks>

- Use square bracket notation to access type properties
- Can access any property that exists on the type
- Type-safe: TypeScript ensures property exists
- Useful for extracting specific property types
- Can be used with unions and intersections

</v-clicks>

<v-click>

<<< ./snippets/01-object-properties.ts {monaco}

</v-click>

<!--
Let's start with the basic syntax of indexed types when working with object properties.

Just like in JavaScript where we can access object properties using square brackets, we can do the same with types in TypeScript.

This is particularly useful when we want to extract the type of a specific property from a larger type definition.

TypeScript ensures type safety by checking that the property we're trying to access actually exists on the type.

[After revealing code]
In this example, we can see how we can extract the type of specific properties from a larger type definition. This is type-safe - TypeScript will give us an error if we try to access a property that doesn't exist.
-->

---

# Array Types with T[number]

<v-clicks>

- Special syntax for accessing array element types
- `T[number]` extracts type of array elements
- Works with both regular arrays and tuples
- Commonly used with `typeof` and `as const`
- Powerful way to derive types from array values

</v-clicks>

<v-click>

<<< ./snippets/02-array-types.ts {monaco}

</v-click>

<!--
Now, let's look at a particularly interesting use of indexed types: accessing array element types with T[number].

This might look like magic at first, but it's actually a logical extension of how indexed types work.

When we use [number] as the index, we're essentially asking TypeScript to give us the type of any numeric index in the array.

This is particularly powerful when combined with 'typeof' and 'as const' assertions, allowing us to derive precise types from array values.

[After revealing code]
Here we can see how T[number] can extract the type of array elements. The 'as const' assertion is crucial when we want to preserve literal types rather than widening them to their base types like string or number.
-->

---

# Advanced Usage: Numeric Index Signatures

<v-clicks>

- Access types defined by numeric index signatures
- Different from string index signatures
- Useful for array-like structures
- Can coexist with regular properties
- Provides type safety for numeric access

</v-clicks>

<v-click>

<<< ./snippets/03-numeric-index.ts {monaco}

</v-click>

<!--
Let's explore a more advanced aspect of indexed types: working with numeric index signatures.

TypeScript allows us to define different types for numeric and string indices, which can be particularly useful for array-like structures.

This feature lets us create types that behave differently when accessed with numbers versus strings.

Understanding this distinction is crucial for working with more complex type structures.

[After revealing code]
Here we can see how numeric index signatures work differently from string-based properties, and how we can use indexed types to access them specifically.
-->

---

# Real-World Applications

<v-clicks>

- Creating type-safe enums from arrays
- Deriving types from test fixtures
- Extracting types from configuration objects
- Building flexible library interfaces
- Maintaining type synchronization with data

</v-clicks>

<!--
Let's discuss some real-world applications where indexed types truly shine.

One common use case is creating type-safe enums from arrays of values, which can be more flexible than traditional TypeScript enums.

They're also excellent for deriving types from test fixtures, ensuring our test data and types stay in sync.

Libraries often use indexed types to build flexible, type-safe interfaces that can adapt to different use cases.
-->

---

<<< ./snippets/04-real-world.ts {monaco}

<!--
In this example, our improved Mutable helper type does two things:
1. Removes readonly modifiers
2. Widens literal types to their base types (string literals to string, number literals to number, etc.)

Notice how we can now update properties with any valid string, number, or boolean value while still maintaining the overall structure of our configuration.

This strikes a balance between type safety and flexibility, which is crucial for real-world applications.
-->

---

# Benefits and Best Practices

<v-clicks>

- DRY principle in type definitions
- Type safety without manual maintenance
- Improved refactoring capabilities
- Better type inference in complex scenarios
- Reduced chance of type mismatches

</v-clicks>

<!--
Let's talk about the benefits of using indexed types and some best practices to follow.

Indexed types help us maintain the DRY principle by allowing us to derive types from existing structures rather than duplicating definitions.

They provide excellent type safety without requiring manual maintenance of parallel type definitions.

When used properly, they can greatly improve our ability to refactor code, as changes to source types automatically propagate to derived types.

They enable better type inference in complex scenarios, reducing the need for explicit type annotations.

Most importantly, they help reduce the chance of type mismatches by keeping our types closely tied to our actual data structures.
-->

---
layout: center
class: text-center
---

# Questions?

Have you used indexed types in your TypeScript projects?

<!--
We've covered a lot about indexed types in TypeScript. Now I'd love to hear from you!

Have you used indexed types in your projects? Perhaps T[number] to extract array element types?

What challenges have you faced when working with complex type structures?

Do you have any interesting patterns or use cases to share?

Let's discuss your experiences and insights!
-->

---
layout: center
class: text-center
---

# Thank You!

Remember: Indexed types are a powerful way to keep your types DRY and in sync with your data!

<!--
Thank you all for your attention today!

I hope this presentation has demystified indexed types and shown you how they can make your TypeScript code more maintainable and type-safe.

Remember, what might look like magic syntax at first is often based on simple, logical principles. Don't be afraid to explore and experiment with these advanced TypeScript features.

Keep practicing with these concepts, and they'll become valuable tools in your TypeScript toolbox.

Thank you again, and happy TypeScripting!
-->