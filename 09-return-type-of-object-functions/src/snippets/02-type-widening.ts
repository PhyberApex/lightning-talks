const obj = {
  x: 1,
  y: 2
}

type T1 = typeof obj

obj.z = 3 // Error in TypeScript, but works in JavaScript!
