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
download: https://raw.githubusercontent.com/PhyberApex/typescript-lightning-talks/main/06-conditional-types/06-conditional-types.pdf
info: |
  ## Conditional Types in TypeScript
  Understanding and leveraging conditional types for more flexible type definitions
title: Conditional Types in TypeScript
fonts:
  mono: Operator Mono
  local: Operator Mono
  sans: DM Sans
  strong: Rubik Iso
  fast: Ubuntu
  hand: Caveat
---

# Conditional Types in TypeScript
Enhancing Type Flexibility and Expressiveness

<!--
Welcome, everyone! Today, we're going to explore an advanced feature of TypeScript: Conditional Types. This powerful feature allows us to create more flexible and expressive type definitions, enabling us to write more robust and reusable code.
-->

---

# What are Conditional Types?

<v-clicks>

- A way to create type definitions based on conditions
- Similar to ternary operators in JavaScript
- Allow for type-level programming
- Introduced in TypeScript 2.8
- Enable creation of more flexible and reusable type definitions

</v-clicks>

<!--
Let's start by understanding what Conditional Types are in TypeScript.

Conditional Types allow us to create type definitions that depend on certain conditions. They work similarly to ternary operators in JavaScript, but at the type level.

This feature was introduced in TypeScript 2.8 and has since become a powerful tool for type-level programming.

With Conditional Types, we can create more flexible and reusable type definitions, adapting our types based on the properties of other types.

This capability opens up new possibilities for creating sophisticated type systems that can handle a wide variety of scenarios.
-->

---

# Basic Syntax of Conditional Types

<v-clicks>

- Uses the form: `T extends U ? X : Y`
- `T extends U` is the condition
- If `T` is assignable to `U`, the type resolves to `X`
- Otherwise, it resolves to `Y`
- Can be nested for more complex conditions
- Often used with generics for maximum flexibility

</v-clicks>

<v-click>

<<< ./snippets/01-basic-syntax.ts {monaco}

</v-click>

<!--
Let's look at the basic syntax of Conditional Types in TypeScript.

Conditional Types use a syntax similar to ternary operators in JavaScript. The basic form is `T extends U ? X : Y`.

Here, `T extends U` is the condition we're checking. If `T` is assignable to `U`, then the type resolves to `X`. Otherwise, it resolves to `Y`.

This syntax can be nested to create more complex conditions, much like you might nest ternary operators in JavaScript.

Conditional Types are often used in combination with generics to create highly flexible type definitions.

[After revealing code]
Here's a simple example of a Conditional Type. In this case, we're creating a type that will be either 'number' or 'string' depending on whether the type parameter `T` extends `number` or not.
-->

---

# Real-World Example: NonNullable

<v-clicks>

- `NonNullable<T>` is a built-in conditional type
- Removes `null` and `undefined` from a type `T`
- Useful for ensuring non-nullable types
- Demonstrates the practical application of conditional types
- Can be used to create more robust function parameters and return types

</v-clicks>

<v-click>

<<< ./snippets/02-non-nullable.ts {monaco}

</v-click>

<!--
Let's look at a real-world example of Conditional Types: the `NonNullable<T>` type.

`NonNullable<T>` is a built-in conditional type in TypeScript that removes `null` and `undefined` from a type `T`.

This type is incredibly useful when you want to ensure that a value is not null or undefined, which can help prevent runtime errors.

It demonstrates a practical application of conditional types in creating more robust type definitions.

You can use `NonNullable<T>` to create more strict function parameters or return types, enhancing the safety of your code.

[After revealing code]
Here's an example of how `NonNullable<T>` works and how you might use it in practice. Notice how it removes `null` and `undefined` from the input type.
-->

---

# Advanced Usage: Inferring Within Conditional Types

<v-clicks>

- Use `infer` keyword to infer types within a conditional type
- Allows for extracting types from complex structures
- Useful for creating utility types
- Can infer return types, parameter types, and more
- Enables powerful type transformations

</v-clicks>

<v-click>

<<< ./snippets/03-infer-keyword.ts {monaco}

</v-click>

<!--
Now, let's explore a more advanced usage of Conditional Types: inferring within conditional types using the `infer` keyword.

The `infer` keyword allows us to extract and infer types from complex structures within a conditional type.

This is particularly useful for creating utility types that can work with a wide variety of input types.

With `infer`, we can extract things like return types of functions, types of specific parameters, or even nested property types.

This capability enables powerful type transformations and can significantly enhance the flexibility of our type definitions.

[After revealing code]
Here's an example of using `infer` to create a type that extracts the return type of a function. This `ReturnType<T>` utility is actually part of TypeScript's standard library, and it's implemented using conditional types with `infer`.
-->

---

# Practical Application: Discriminated Unions

<v-clicks>

- Conditional types work well with discriminated unions
- Can create type-safe switches based on a discriminant
- Useful for handling different shapes of data
- Enhances type safety in complex data structures
- Enables precise type inference in conditionals

</v-clicks>

<v-click>

<<< ./snippets/04-discriminated-unions.ts {monaco}

</v-click>

<!--
Let's look at a practical application of Conditional Types: working with discriminated unions.

Conditional types are particularly powerful when used with discriminated unions, allowing us to create type-safe switches based on a discriminant property.

This is incredibly useful when dealing with different shapes of data that share some common structure.

By using conditional types with discriminated unions, we can enhance type safety in complex data structures and enable more precise type inference in conditional statements.

This pattern is common in state management, API responses, and other scenarios where you might deal with multiple related but distinct types of data.

[After revealing code]
Here's an example of using conditional types with a discriminated union. We define a union type for different shapes, and then use a conditional type to extract properties based on the shape type. This allows for type-safe handling of different data shapes.
-->

---

# Benefits of Conditional Types

<v-clicks>

- Enhanced type flexibility and expressiveness
- Ability to create more precise and reusable utility types
- Improved type inference in complex scenarios
- Enables type-level programming and metaprogramming
- Reduces the need for type assertions and `any` types
- Facilitates creation of self-documenting code

</v-clicks>

<!--
Let's recap the benefits of using Conditional Types in TypeScript:

Firstly, they greatly enhance the flexibility and expressiveness of our type system. We can create types that adapt based on input types or conditions.

Conditional Types allow us to create more precise and reusable utility types, which can be used across our codebase to enhance type safety.

They improve type inference in complex scenarios, allowing TypeScript to more accurately determine types in various situations.

Conditional Types enable type-level programming and metaprogramming, opening up new possibilities for creating sophisticated type structures.

By using Conditional Types, we can often reduce the need for type assertions and the use of `any` types, leading to more type-safe code.

Lastly, when used effectively, Conditional Types can make our code more self-documenting, as the types themselves can express complex relationships and constraints.
-->

---

# Best Practices and Considerations

<v-clicks>

- Use Conditional Types judiciously to avoid overly complex type definitions
- Leverage existing utility types before creating new ones
- Consider readability and maintainability when creating complex type structures
- Use meaningful names for type parameters and conditional types
- Document complex Conditional Types for easier understanding
- Be aware of potential performance impacts with very complex type computations

</v-clicks>

<!--
While Conditional Types are powerful, it's important to use them judiciously. Here are some best practices and considerations:

First, use Conditional Types when they genuinely add value. Overly complex type definitions can make code harder to understand and maintain.

Before creating new utility types, check if TypeScript or popular libraries already provide what you need. There's no need to reinvent the wheel.

Always consider readability and maintainability when creating complex type structures. If a type definition becomes too complex, it might be worth breaking it down into smaller, more manageable pieces.

Use meaningful names for your type parameters and conditional types. This can greatly enhance the readability and self-documenting nature of your code.

For complex Conditional Types, consider adding documentation comments. This can help other developers (including your future self) understand the purpose and behavior of the type.

Lastly, be aware that very complex type computations can impact TypeScript's performance. In most cases this isn't an issue, but it's something to keep in mind for large-scale projects.
-->

---

# Conclusion

<v-clicks>

- Conditional Types are a powerful feature for creating flexible, expressive types
- They enable type-level programming and sophisticated type transformations
- Useful in various scenarios: utility types, discriminated unions, type inference
- Enhance type safety and reduce the need for type assertions
- Require judicious use to maintain code readability and maintainability
- Continuous learning and practice are key to mastering Conditional Types

</v-clicks>

<!--
To wrap up, we've explored Conditional Types in TypeScript, a powerful feature that allows us to create more flexible and expressive type definitions.

We've seen how Conditional Types enable sophisticated type-level programming and type transformations, opening up new possibilities in our TypeScript projects.

From creating utility types to working with discriminated unions and improving type inference, Conditional Types have a wide range of applications.

By leveraging Conditional Types, we can enhance the type safety of our code and often reduce the need for type assertions or `any` types.

However, it's important to use this feature judiciously. Always consider the readability and maintainability of your code when working with complex type structures.

Mastering Conditional Types takes time and practice. I encourage you to experiment with them in your projects and continue learning about advanced TypeScript features.

Remember, the goal is not just to use advanced features, but to write clear, maintainable, and type-safe code that enhances your development experience and the quality of your software.
-->

---
layout: center
class: text-center
---

# Questions?

Have you used Conditional Types in your TypeScript projects?

<!--
We've covered a lot about Conditional Types in TypeScript. Now, I'd love to hear from you!

Have any of you used Conditional Types in your projects? What were your experiences?

Are there any specific scenarios where you found Conditional Types particularly useful or challenging?

Do you have any tips or tricks for working with Conditional Types that you'd like to share?

I'm open to any questions about the concepts we've covered today or any other aspects of advanced TypeScript type systems you're curious about.
-->

---
layout: center
class: text-center
---

# Thank You!

Remember: Conditional Types are a powerful tool, use them wisely to create more expressive and type-safe code!

<!--
Thank you all for your attention and participation today!

I hope this presentation has given you a solid understanding of Conditional Types in TypeScript and inspired you to explore this powerful feature further.

Remember, Conditional Types are a sophisticated tool in your TypeScript toolbox. Used wisely, they can help you create more expressive, flexible, and type-safe code.

As with any advanced feature, the key is to find the right balance – use Conditional Types where they add value, but always keep in mind the readability and maintainability of your code.

I encourage you to experiment with Conditional Types in your projects. The more you use them, the more comfortable and proficient you'll become.

Thank you once again, and happy TypeScripting!
-->