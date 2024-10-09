type Circle = { kind: "circle"; radius: number };
type Rectangle = { kind: "rectangle"; width: number; height: number };
type Square = { kind: "square"; sideLength: number };

type Shape = Circle | Rectangle | Square;

type ShapeInfo<T extends Shape> = T extends Circle
    ? { area: number; circumference: number }
    : T extends Rectangle
        ? { area: number; perimeter: number }
        : T extends Square
            ? { area: number; diagonal: number }
            : never;

function getShapeInfo<T extends Shape>(shape: T): ShapeInfo<T> {
  switch (shape.kind) {
    case "circle":
      const area = Math.PI * shape.radius ** 2;
      const circumference = 2 * Math.PI * shape.radius;
      return { area, circumference } as ShapeInfo<T>;
    case "rectangle":
      const rectArea = shape.width * shape.height;
      const perimeter = 2 * (shape.width + shape.height);
      return { area: rectArea, perimeter } as ShapeInfo<T>;
    case "square":
      const squareArea = shape.sideLength ** 2;
      const diagonal = Math.sqrt(2) * shape.sideLength;
      return { area: squareArea, diagonal } as ShapeInfo<T>;
  }
}

const circle: Circle = { kind: "circle", radius: 5 };
const rectangle: Rectangle = { kind: "rectangle", width: 4, height: 6 };
const square: Square = { kind: "square", sideLength: 4 };

const circleInfo = getShapeInfo(circle);
const rectangleInfo = getShapeInfo(rectangle);
const squareInfo = getShapeInfo(square);