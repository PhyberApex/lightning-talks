type Shape = Circle | Square | Triangle

function assertNever(x: never): never {
  throw new Error(`Unexpected object: ${x}`)
}

function area(s: Shape) {
  switch (s.kind) {
    case 'circle': return Math.PI * s.radius ** 2
    case 'square': return s.size ** 2
    case 'triangle': return (s.base * s.height) / 2
    default:
      // If we've handled all cases, s is never here
      return assertNever(s)
  }
}
