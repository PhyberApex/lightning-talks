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
download: https://raw.githubusercontent.com/PhyberApex/typescript-lightning-talks/main/03-interface-vs-type-alias/03-interface-vs-type-alias.pdf
info: |
  ## Type Aliases vs. Interfaces in TypeScript
  Why type aliases should be your go-to choice
title: Type Aliases vs. Interfaces in TypeScript
fonts:
  mono: Operator Mono
  local: Operator Mono
  sans: DM Sans
  strong: Rubik Iso
  fast: Ubuntu
  hand: Caveat
monacoTypesAdditionalPackages:
  - "@types/jquery"
---

# Type Aliases vs. Interfaces in TypeScript
Embracing the Power and Flexibility of Type Aliases

<!--
Welcome, TypeScript enthusiasts! Today, we're diving into the world of type definitions, with a focus on why type aliases should be your primary tool.
We'll explore the strengths of type aliases, when to use them, and the few cases where interfaces might still be necessary.
Get ready to revolutionize your TypeScript code with the power of type aliases!
-->

---
layout: two-cols
---

# Type Aliases: Your Swiss Army Knife

<v-clicks>

- Can define any type, not just objects
- Support unions, intersections, and mapped types
- More flexible and expressive
- Consistent syntax for all types

</v-clicks>

::right::

<div v-click>

<<< ./snippets/01-type-alias-power.ts {monaco}

</div>

<!--
Let's start by exploring why type aliases are so powerful in TypeScript.

[click] Type aliases can define any type, not just objects. This versatility is a huge advantage.
[click] They support unions, intersections, and mapped types, giving you incredible flexibility in type design.
[click] Type aliases are more flexible and expressive, allowing you to create complex types with ease.
[click] They provide a consistent syntax for all types, whether you're working with objects, primitives, or complex type expressions.
[click] On the right, we have some examples showcasing the power of type aliases. Notice how we can create a variety of type structures with a single, consistent syntax.
-->

---

# When to Use Type Aliases vs. Interfaces

<div class="grid grid-cols-2 gap-4">
<div>

## Type Aliases (Preferred)

<v-clicks>

- For most type definitions
- When working with unions or intersections
- For complex type manipulations
- When you need aliases for primitives

</v-clicks>

</div>
<div>

<v-click>

## Interfaces (Specific Use Cases)

</v-click>

<v-clicks>

- When you need declaration merging
- For defining class shapes (implements)
- When extending built-in or third-party interfaces

</v-clicks>

</div>
</div>

<!--
Now, let's discuss when to use type aliases versus interfaces.

[click] Type aliases should be your go-to choice for most type definitions. They're more versatile and expressive.
[click] They're particularly useful when working with unions or intersections, which are common in complex TypeScript projects.
[click] For complex type manipulations, type aliases offer more flexibility and power.
[click] When you need to create aliases for primitive types or complex type expressions, type aliases are the way to go.

[click] However, there are a few specific cases where interfaces might still be necessary:
[click] If you need declaration merging, interfaces are your only option. This is useful for augmenting types across multiple files.
[click] When defining shapes for classes to implement, interfaces provide a familiar syntax for OOP developers.
[click] If you're extending built-in or third-party interfaces, you'll need to use interfaces to maintain compatibility.
-->

---

# The Few Cases for Interfaces (1/2)

<div>

<<< ./snippets/02-interface-use-cases-1.ts {monaco}

</div>

<v-click>

## When to Consider Interfaces

- Declaration merging (augmenting types across files)
- Defining class contracts with `implements`

</v-click>

<!--
While type aliases are generally preferred, let's explore the few cases where interfaces might still be necessary.

In this example, we see some scenarios where interfaces are uniquely useful.

[click] Declaration merging is a feature unique to interfaces. It allows you to add new members to an interface across multiple declarations, which can be useful for augmenting types across different files or modules.

When defining contracts for classes to implement, interfaces provide a familiar and clear syntax, especially for developers coming from object-oriented backgrounds.
-->

---

# The Few Cases for Interfaces (2/2)
<div>
<<< ./snippets/02-interface-use-cases-2.ts {monaco}
</div>
<v-click>

## When to Consider Interfaces Part 2

- Extending library-defined interfaces (e.g., jQuery)

</v-click>
<!--
Continuing our exploration of interface use cases, let's look at one more scenario that's common in real-world applications.

[click] Interfaces are particularly useful when you need to extend interfaces defined in third-party libraries. Here, we're extending the jQuery interface to add an i18n method 't'.

This approach allows you to augment existing library types with new functionality in a type-safe manner. It's especially useful when working with plugins or when you need to add custom methods to library objects.

While this use case exists, remember that for most of your type definitions, type aliases will provide more flexibility and power.
-->

---
layout: two-cols
---

# Best Practices

<v-clicks>

- Use type aliases as your default choice
- Leverage unions and intersections for flexible types
- Use mapped and conditional types for advanced scenarios
- Reserve interfaces for specific use cases (merging, implements)
- Be consistent in your usage across the project

</v-clicks>

::right::

<div class="ml-4">

<v-click>

# Remember

</v-click>

<v-clicks>

- Type aliases are more versatile and powerful
- They provide a consistent syntax for all types
- Interfaces have their place, but have different features
- Choose based on the needs of your project
- When in doubt, start with a type alias!

</v-clicks>

</div>

<!--
Let's recap some best practices for using type aliases and interfaces in TypeScript.

[click] Make type aliases your default choice for type definitions. They're more flexible and powerful.
[click] Take advantage of unions and intersections to create flexible, expressive types.
[click] For advanced scenarios, don't hesitate to use mapped and conditional types.
[click] Reserve interfaces for specific use cases where you need declaration merging or are defining class contracts.
[click] Whatever approach you choose, be consistent across your project to maintain readability.

[click] Now, let's summarize what we've learned:
[click] Type aliases are more versatile and powerful, capable of handling a wide range of type definitions.
[click] They provide a consistent syntax for all types, from simple primitives to complex type expressions.
[click] While interfaces have their place, they're more limited in their capabilities compared to type aliases.
[click] Your choice should be based on the specific needs of your project and team.
[click] When in doubt, start with a type alias - you can always switch to an interface if a specific use case requires it.
-->

---
layout: center
class: text-center
---

# Questions?

Type Aliases: The unsung heroes of TypeScript?

<!--
We've explored the power of type aliases and the specific cases for interfaces, but our TypeScript journey isn't over yet!
What questions do you have about leveraging type aliases in your projects?
Have you encountered scenarios where type aliases significantly improved your code?
Let's dive into your questions and continue our exploration of TypeScript's type system!
-->

---
layout: center
class: text-center
---

# Thank You!

Remember: In TypeScript, type aliases unlock true power!

<!--
And there you have it, folks! We've journeyed through the realm of type aliases and interfaces in TypeScript, with a focus on the versatility and power of type aliases.

From basic definitions to advanced type manipulations, we've seen how type aliases can make our code more expressive, flexible, and maintainable.

Remember, in the world of TypeScript, choosing type aliases as your primary tool can unlock new levels of type safety and expressiveness in your code!

Thank you for joining me on this type adventure. Now go forth and wield the power of type aliases in your TypeScript projects!

Don't forget to provide feedback on this presentation. Your input helps us improve and create better content for future sessions!
-->