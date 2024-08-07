interface Circle { kind: 'circle', radius: number }
interface Square { kind: 'square', size: number }
interface Triangle { kind: 'triangle', base: number, height: number }

type Shape = Circle | Square

export function assertNever(x: never): never {
  throw new Error(`Unexpected object: ${x}`)
}

export function area(shape: Shape) {
  switch (shape.kind) {
    case 'circle': return Math.PI * shape.radius ** 2
    case 'square': return shape.size ** 2
      // case "triangle": return (shape.base * shape.height) / 2;
    default:
      return assertNever(shape)
  }
}
