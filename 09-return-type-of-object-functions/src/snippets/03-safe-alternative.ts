// A type-safe way to get keys when you're certain about the object shape
function getKnownKeys<T extends object>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>
}

// Usage with literal types
const point = { x: 1, y: 2 } as const
const keys = getKnownKeys(point) // ("x" | "y")[]
