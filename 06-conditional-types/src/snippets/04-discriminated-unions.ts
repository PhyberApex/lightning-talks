type Shape = 
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "square"; sideLength: number };

type ShapeArea<T extends Shape> = T extends { kind: "circle" }
  ? number
  : T extends { kind: "rectangle" }
  ? number
  : T extends { kind: "square" }
  ? number
  : never;

function calculateArea<T extends Shape>(shape: T): ShapeArea<T> {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2 as ShapeArea<T>;
    case "rectangle":
      return shape.width * shape.height as ShapeArea<T>;
    case "square":
      return shape.sideLength ** 2 as ShapeArea<T>;
  }
}

const circle: Shape = { kind: "circle", radius: 5 };
const rectangle: Shape = { kind: "rectangle", width: 4, height: 6 };
const square: Shape = { kind: "square", sideLength: 4 };

console.log(calculateArea(circle)); // Type is number
console.log(calculateArea(rectangle)); // Type is number
console.log(calculateArea(square)); // Type is number
