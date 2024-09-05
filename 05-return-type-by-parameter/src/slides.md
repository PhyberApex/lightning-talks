---
background: /cover.jpg
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
mdc: true
presenter: dev
download: https://raw.githubusercontent.com/PhyberApex/typescript-lightning-talks/main/05-return-type-by-parameter/05-return-type-by-parameter.pdf
info: |
  ## Dynamic Return Types in TypeScript
  How to use TypeScript to return a type based on a parameter
drawings:
  persist: false
title: Dynamic Return Types in TypeScript
fonts:
  mono: Operator Mono
  local: Operator Mono
  sans: DM Sans
  strong: Rubik Iso
  fast: Ubuntu
  hand: Caveat
---

# Dynamic Return Types in TypeScript
Using TypeScript to Return Type Based on Parameter

<!--
Welcome, everyone! Today, we're diving into an exciting TypeScript feature that allows us to create more type-safe and flexible API calls. We'll explore how to use TypeScript to dynamically determine the return type of a function based on its input parameter.
-->

---

# The Challenge

<v-clicks>

- API endpoints return different data structures
- We want type safety when making API calls
- Desire for flexibility in handling query parameters

</v-clicks>

<!--
Before we jump into the solution, let's consider the challenges we face when working with APIs:

First, different API endpoints often return different data structures. For example, a '/users' endpoint might return an array of user objects, while a '/task' endpoint returns a single task object.

Secondly, we want to ensure type safety when making these API calls. We don't want to accidentally try to access properties that don't exist on our returned data.

Lastly, we need flexibility in our API calls, such as the ability to add query parameters without losing type information.

Let's see how TypeScript can help us address these challenges.
-->

---
layout: two-cols
---

# The Building Blocks

<v-clicks>

- Define types for our data structures
- User type with id, name, and password
- Task type with id and name

</v-clicks>

::right::

<<< ./snippets/01-types.ts {monaco}

<!--
Let's start by defining our data structures. Here, we have two interfaces: User and Task.

The User interface represents a user in our system, with properties for id, name, and password.

The Task interface represents a task, with properties for id and name.

These interfaces will form the foundation of our type-safe API calls. By defining these structures upfront, we're setting the stage for TypeScript to provide us with robust type checking throughout our application.
-->

---
layout: two-cols
---

# Mapping Endpoints to Types

<v-clicks>

- Create a lookup table for API endpoints
- Map string literals to corresponding types
- '/user' maps to User type
- '/users' maps to User[] (array of Users)
- Essential for our dynamically typed fetch function

</v-clicks>

::right::

<v-clicks>

<<< ./snippets/02-endpoint-mapping.ts {monaco}

</v-clicks>

<!--
Now that we have our basic data structures, let's create a mapping between our API endpoints and the types they return.

We define an interface called ResponseJsonByEndpoint. This interface acts as a lookup table, associating string literal types (representing our API endpoints) with the corresponding return types.

For example, '/user' is mapped to the User type, while '/users' is mapped to an array of User types.

This mapping is crucial for our next step, where we'll use it to create a dynamically typed fetch function.
-->

---
layout: two-cols
---

# The Magic: Dynamically Typed Fetch Function

<v-clicks>

- Asynchronous 'get' function
- Uses generic type parameter 'Endpoint'
- Accepts endpoint with optional query params
- Returns Promise of type based on endpoint
- Ensures type safety and flexibility

</v-clicks>

::right::

<v-clicks>

<<< ./snippets/03-fetch-function.ts {monaco}

</v-clicks>

<!--
Here's where the magic happens. We define an asynchronous function called 'get' that leverages TypeScript's powerful type system to provide dynamic return types.

Let's break it down:

1. We use a generic type parameter 'Endpoint' that extends the keys of our ResponseJsonByEndpoint interface.
2. The function accepts an endpoint parameter that can be either an Endpoint or a template literal type allowing for query parameters.
3. The return type is a Promise of the type associated with the given endpoint in our ResponseJsonByEndpoint interface.

Inside the function, we make the fetch call and return the JSON response. TypeScript will ensure that the returned data matches the type we expect for the given endpoint.

This approach gives us both flexibility and type safety in our API calls.
-->

---
layout: two-cols
---

# Putting It All Together

<v-clicks>

- Use the 'get' function for API calls
- TypeScript infers correct return types
- Works with and without query parameters
- Full type safety and autocompletion
- Robust and maintainable code

</v-clicks>

::right::

<<< ./snippets/04-usage-example.ts {monaco}

<!--
Now, let's see how we can use our dynamically typed 'get' function.

In this example, we make two API calls:

1. We fetch all users with 'get('users')'. TypeScript infers that this will return a Promise of an array of User objects.
2. We fetch a limited number of users with 'get('users?limit=10')'. Even with the query parameter, TypeScript still correctly infers the return type as an array of User objects.

The power of this approach is that we get full type safety and autocompletion when working with the returned data. If we try to access a property that doesn't exist on a User object, TypeScript will give us an error at compile time.

This combination of flexibility and type safety makes our code more robust and easier to maintain.
-->

---

# Benefits of This Approach

<v-clicks>

- Type safety throughout the API request process
- Autocompletion and IntelliSense support
- Flexible handling of endpoints and query parameters
- Self-documenting code

</v-clicks>

<!--
Let's recap the benefits of using this TypeScript approach for API calls:

First and foremost, we get type safety throughout the entire API request process. From the moment we call our 'get' function to when we handle the response, TypeScript ensures we're working with the correct types.

This type safety enables excellent autocompletion and IntelliSense support in our IDEs. As developers, this helps us work more efficiently and with fewer errors.

By leveraging TypeScript's static type system, we can catch many errors at compile-time rather than runtime. This leads to more robust code and fewer surprises in production.

Our approach is also flexible, allowing us to handle various endpoints and even include query parameters without losing type information.

Lastly, this pattern results in self-documenting code. By looking at the ResponseJsonByEndpoint interface, developers can quickly understand what types are expected from each API endpoint.
-->

---

# Conclusion

<v-clicks>

- TypeScript offers powerful tools for type-safe API interactions
- Leverage generics, mapped types, and template literal types
- Improve code quality and developer experience
- Encourage exploration of advanced TypeScript features

</v-clicks>

<!--
To wrap up, we've seen how TypeScript provides us with powerful tools to create type-safe and flexible API interactions.

By leveraging features like generics, mapped types, and template literal types, we can create APIs that are both flexible and strongly typed.

This approach not only improves the quality of our code but also enhances the developer experience with better tooling support and fewer runtime errors.

I encourage you all to explore these advanced TypeScript features in your projects. They can significantly improve the robustness and maintainability of your codebase.
-->

---
layout: center
class: text-center
---

# Questions?

Have you encountered challenges with typing API calls in your TypeScript projects?

<!--
We've explored the power of dynamic return types in TypeScript and how they can improve our API interactions. Now, I'd love to hear from you!

Have any of you faced similar challenges when working with typed API calls in your TypeScript projects? How have you addressed them?

Perhaps you've discovered other advanced TypeScript features that have helped you write more robust code? I'm eager to hear your experiences and insights!

Don't hesitate to ask any questions about the concepts we've covered today or share your own TypeScript tips and tricks.
-->

---
layout: center
class: text-center
---

# Thank You!

Remember: In TypeScript, leverage the type system for safer, more maintainable code!

<!--
Thank you all for your attention and engagement today! 

I hope this presentation has inspired you to explore the depths of TypeScript's type system and how it can be leveraged to create more robust and maintainable code.

Remember, TypeScript is a powerful tool that can significantly improve your development experience and code quality. Don't be afraid to dive into its advanced features - the rewards are well worth the effort!

Keep experimenting, keep learning, and keep pushing the boundaries of what's possible with TypeScript. Your future self (and your team) will thank you for it!

Thank you once again, and happy coding!
-->