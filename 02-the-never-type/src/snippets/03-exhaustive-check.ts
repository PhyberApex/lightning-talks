type Circle = { kind: 'circle', radius: number }
type Square = { kind: 'square', size: number }
type Triangle = { kind: 'triangle', base: number, height: number }

type Shape = Circle | Square;

function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
}

export function area(s: Shape) {
    switch (s.kind) {
        case "circle": return Math.PI * s.radius ** 2;
        case "square": return s.size ** 2;
        // case "triangle": return (s.base * s.height) / 2;
        default:
            return assertNever(s);
    }
}