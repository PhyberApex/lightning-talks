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
download: https://raw.githubusercontent.com/PhyberApex/typescript-lightning-talks/main/08-dont-use-shorthand-syntax/08-dont-use-shorthand-syntax.pdf
info: |
  ## The Pitfall of Method Shorthand Syntax in TypeScript
  Why you should avoid method shorthand and prefer object property syntax
title: The Pitfall of Method Shorthand Syntax in TypeScript
fonts:
  mono: Operator Mono
  local: Operator Mono
  sans: DM Sans
  strong: Rubik Iso
  fast: Ubuntu
  hand: Caveat
---

# The Pitfall of Method Shorthand Syntax in TypeScript
Avoiding Runtime Errors with Object Property Syntax

<!--
Welcome, TypeScript enthusiasts! Today, we're diving into a subtle but crucial aspect of TypeScript: the difference between method shorthand syntax and object property syntax.
You might think they're interchangeable, but as we'll see, one of them can lead to unexpected runtime errors.
Let's explore why object property syntax should be your go-to choice for safer TypeScript code!
-->

---
layout: two-cols
---

# Two Ways to Define Methods

<v-clicks>

- Method shorthand syntax
- Object property syntax
- Look similar, but behave differently
- One can lead to runtime errors!

</v-clicks>

::right::

<div v-click>

<<< ./snippets/01-syntax-comparison.ts {monaco}

</div>

<!--
Let's start by looking at the two ways you can define methods on an object in TypeScript.

[click] First, we have the method shorthand syntax, which looks like a regular method definition.
[click] Then, we have the object property syntax, which uses an arrow function.
[click] At first glance, they might seem interchangeable.
[click] But as we'll see, the method shorthand syntax can actually lead to runtime errors that TypeScript won't catch!
[click] On the right, we have examples of both syntaxes. They look innocent enough, but one of them is hiding a potential bug.
-->

---

# The Problem with Method Shorthand

<div class="grid grid-cols-2 gap-4">
<div>

<<< ./snippets/02-method-shorthand-problem.ts {monaco}

</div>
<div>

<v-clicks>

- Allows narrower parameter types
- Can lead to runtime errors
- TypeScript doesn't catch the error
- Unexpected behavior in inheritance scenarios

</v-clicks>

</div>
</div>

<!--
Now, let's dive into why the method shorthand syntax can be problematic.

In this example, we have a Dog interface with a barkAt method, and a SmallDog that extends it.

[click] The issue is that the method shorthand syntax allows us to use a narrower type for the parameter. Here, brian's barkAt method expects a SmallDog, not just any Dog.
[click] This can lead to runtime errors. If we pass a regular Dog to brian.barkAt, it will try to call the whimper method, which doesn't exist on regular Dogs.
[click] The scary part is that TypeScript doesn't catch this error at compile time. It silently allows this potentially dangerous code.
[click] This behavior is particularly unexpected and can cause hard-to-debug issues, especially in complex inheritance scenarios.
-->

---

# The Solution: Object Property Syntax

<div class="grid grid-cols-2 gap-4">
<div>

<<< ./snippets/03-object-property-solution.ts {monaco}

</div>
<div>

<v-clicks>

- Stricter type checking
- Prevents narrowing of parameter types
- Catches errors at compile-time
- Safer and more predictable

</v-clicks>

</div>
</div>

<!--
Fortunately, there's a simple solution to this problem: use object property syntax instead.

Let's look at how this changes our example.

[click] Object property syntax enforces stricter type checking.
[click] It prevents the narrowing of parameter types that we saw with the method shorthand.
[click] As you can see, TypeScript now catches the error at compile-time, telling us that we can't assign a function expecting SmallDog to a property expecting Dog.
[click] This makes our code safer and more predictable, catching potential errors before they become runtime issues.
-->

---

# Common Misconceptions

<v-clicks>

- Not related to arrow functions vs. function declarations
- Applies to both interfaces and types
- The issue is with the syntax, not the function type

</v-clicks>

<div v-click>

<<< ./snippets/04-misconceptions.ts {monaco}

</div>

<!--
Before we wrap up, let's clear up some common misconceptions about this issue.

[click] First, this has nothing to do with arrow functions versus function declarations. Both syntaxes can be used with either type of function.
[click] Second, this issue applies equally to interfaces and types. The problem isn't with how we're defining our types, but with the method syntax itself.
[click] Finally, remember that the issue is with the syntax we use to define the method, not with the type of function we're using.
[click] In this example, you can see that we can mix and match arrow functions and function declarations with both syntaxes. The key is to use object property syntax, regardless of the function type.
-->

---
layout: two-cols
---

# Best Practices

<v-clicks>

- Use object property syntax for method signatures
- Avoid method shorthand syntax
- Use ESLint rule: @typescript-eslint/method-signature-style
- Be consistent across your codebase

</v-clicks>

::right::

<div class="ml-4">

<v-click>

# Remember

</v-click>

<v-clicks>

- Method shorthand is bivariant
- Object property syntax is safer
- Catches errors at compile-time
- Leads to more robust code

</v-clicks>

</div>

<!--
Let's recap some best practices for dealing with method signatures in TypeScript.

[click] Always use object property syntax for your method signatures. It's safer and catches more errors.
[click] Avoid method shorthand syntax, even though it might look more concise.
[click] You can enforce this using the ESLint rule @typescript-eslint/method-signature-style.
[click] Whatever approach you choose, be consistent across your entire codebase.

[click] Now, let's summarize what we've learned:
[click] Remember, method shorthand syntax is bivariant, which can lead to unexpected behavior.
[click] Object property syntax is safer and more predictable.
[click] It helps catch errors at compile-time rather than runtime.
[click] By using object property syntax, you'll write more robust and reliable TypeScript code.
-->

---
layout: center
class: text-center
---

# Questions?

Have you encountered sneaky runtime errors due to method syntax?

<!--
We've explored the pitfalls of method shorthand syntax and the benefits of object property syntax, but our TypeScript journey isn't over yet!
Have you encountered any sneaky runtime errors due to method syntax in your projects?
How will this knowledge change your approach to writing TypeScript interfaces and types?
Let's dive into your questions and experiences!
-->

---
layout: center
class: text-center
---

# Thank You!

Remember: In TypeScript, syntax matters more than you think!

<!--
And there you have it, folks! We've unraveled the mystery of method syntax in TypeScript.

From subtle differences to potential runtime errors, we've seen how a small syntactic choice can have big implications for our code's safety and reliability.

Remember, in the world of TypeScript, the devil is in the details. Choose your syntax wisely, and let the compiler be your ally in catching errors early!

Thank you for joining me on this TypeScript adventure. Now go forth and write safer, more robust TypeScript code!

Don't forget to share your thoughts and experiences with method syntax. Your insights could help fellow developers avoid sneaky runtime errors!
-->

