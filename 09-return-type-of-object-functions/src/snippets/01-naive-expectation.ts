interface User {
  name: string;
  age: number;
}

const user = {
  name: "Alice",
  age: 30
}

// What we might expect:
// const keys: Array<"name" | "age"> = Object.keys(user)

// What we actually get:
const keys = Object.keys(user)
