---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Dynamic Return Types in TypeScript
  How to type a fetch function to return an entity derived from the path parameter
drawings:
  persist: false
transition: slide-left
title: Dynamic Return Types in TypeScript
---

# Dynamic Return Types in TypeScript
Supercharge Your API Calls with Smart Types

<!--
Welcome, TypeScript enthusiasts! Today, we're diving into the exciting world of dynamic return types. 
We'll explore how to create a fetch function so smart, it knows what type to return based on the URL you give it.
Buckle up for a journey into the heart of TypeScript's type system!
-->

---
layout: two-cols
---

# The Challenge

<v-clicks>

- One fetch function to rule them all
- Return type changes based on the endpoint
- Maintain ironclad type safety
- Support query parameters without breaking

</v-clicks>

::right::

<div v-click class="ml-4">

```ts
// Our dream API call
const users = await api('/users')
// users is User[]

const task = await api('/task/1')
// task is Task

const limitedUsers = await api('/users?limit=10')
// limitedUsers is still User[]!
```

</div>

<!--
Let's set the stage for our TypeScript adventure.

[click] We want to create a single, powerful fetch function that works for all our API endpoints.

[click] But here's the twist - we want the return type to change depending on which endpoint we're calling.

[click] And of course, we can't compromise on type safety. TypeScript should catch any mistakes at compile time.

[click] Oh, and let's not forget query parameters. They shouldn't mess up our type inference.

[click] On the right, you can see what we're aiming for. Wouldn't it be amazing if our API calls looked like this, with perfect type inference?
-->

---

# The Building Blocks

<div grid="~ cols-2 gap-4">
<div v-click>

## Key TypeScript Features

<v-clicks>

- Generic Types
- String Literal Types
- Template Literal Types
- Mapped Types

</v-clicks>

</div>
<div v-click>

## Our Data Structures

```ts
interface User {
  id: number
  name: string
  email: string
}

interface Task {
  id: number
  title: string
  completed: boolean
}
```

</div>
</div>

<!--
Before we dive into the solution, let's review our toolkit.

[click] On the left, we have the key TypeScript features we'll be using:

[click] Generic Types - they're like variables, but for types!
[click] String Literal Types - because sometimes a string is more than just a string
[click] Template Literal Types - for when you need to get creative with your type strings
[click] Mapped Types - to transform and manipulate our types

[click] On the right, we have our data structures. These interfaces define what our API responses look like.
Understanding these is crucial for building our type-safe fetch function.
-->

---

# The Magic Ingredient

<div v-click>

```ts
type ResponseJsonByEndpoint = {
  '/users': User[]
  '/user': User
  '/tasks': Task[]
  '/task': Task
}
```

</div>

<v-click>

<div class="mt-4 text-center">
  <carbon-arrow-down class="text-4xl animate-bounce" />
</div>

</v-click>

<div v-click>

```ts
type Endpoint = keyof ResponseJsonByEndpoint
```

</div>

<!--
Now, let's reveal the secret sauce of our solution.

[click] Behold, the ResponseJsonByEndpoint type! This is where we map our API endpoints to their corresponding response types.

[click] It's like a menu for our API. When we order from '/users', we expect to get a User array. When we ask for '/task', we should receive a single Task.

[click] And from this mapping, we can derive our Endpoint type. It's simply the keys of our ResponseJsonByEndpoint.

This mapping is the foundation that allows our fetch function to be so smart about its return types.
-->

---

# Putting It All Together

<div class="grid grid-cols-2 gap-4">
<div v-click>

```ts
async function api<E extends Endpoint>(
  endpoint: E | `${E}?${string}`
): Promise<ResponseJsonByEndpoint[E]> {
  const response = await fetch(`/api${endpoint}`)
  return await response.json()
}
```

</div>
<div v-click>

## What's happening here?

<v-clicks>

- `E extends Endpoint`: We're using a generic type `E` that must be one of our defined endpoints
- `endpoint: E | ${E}?${string}`: This allows for query parameters
- `Promise<ResponseJsonByEndpoint[E]>`: The return type is looked up in our mapping

</v-clicks>

</div>
</div>

<!--
Now, let's bring it all together with our api function.

[click] Here's the code that makes the magic happen. It might look intimidating at first, but let's break it down.

[click] On the right, we'll explain what's going on:

[click] First, we use a generic type E that extends our Endpoint type. This ensures we only accept valid endpoints.

[click] The endpoint parameter can be either E (a bare endpoint) or a template literal type that allows for query parameters.

[click] The return type is where the real magic happens. We use our ResponseJsonByEndpoint mapping to look up the correct return type based on the endpoint.

With this setup, TypeScript can infer the correct return type for any endpoint we use, even with query parameters!
-->

---
layout: two-cols
---

# Let's See It in Action!

<v-clicks>

```ts
const users = await api('/users')
// users is User[]

const task = await api('/task')
// task is Task

const user = await api('/user')
// user is User

const limitedUsers = await api('/users?limit=10')
// limitedUsers is still User[]!
```

</v-clicks>

::right::

<div v-after class="ml-4">

# Benefits

<v-clicks>

- ✅ Type-safe API calls
- 🚀 Autocompletion for endpoints
- 🛡️ Compile-time error checking
- 🔄 Easy to extend for new endpoints

</v-clicks>

</div>

<!--
Let's put our creation to the test and see it in action!

[click] When we call api with '/users', TypeScript knows it should return an array of Users.

[click] Calling '/task' correctly infers a single Task return type.

[click] '/user' gives us a single User, as expected.

[click] And look at this - even with query parameters, we still get the correct User array type!

[click] On the right, let's recap the benefits of this approach:

[click] We get fully type-safe API calls. No more guessing what the response will look like!

[click] Your IDE can now autocomplete valid endpoints for you.

[click] If you try to use an endpoint that doesn't exist, you'll get a compile-time error.

[click] And when you add new endpoints to your API, just update the ResponseJsonByEndpoint type, and everything else adapts automatically!
-->

---
layout: center
class: text-center
---

# Thank You!

Let's make TypeScript work harder, so we don't have to!

<!--
And there you have it! We've created a type-safe, flexible API fetching function that adapts its return type based on the endpoint.

Remember, TypeScript is here to make our lives easier. By leveraging its powerful type system, we can create APIs that are not just functional, but delightful to use.

Thank you for joining me on this TypeScript journey. Now go forth and create amazing, type-safe applications!
-->

