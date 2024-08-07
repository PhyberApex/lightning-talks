// Object type
type User = {
  name: string;
  age: number;
};

// Union type
type ID = string | number;

// Intersection type
type Draggable = { drag: () => void };
type Resizable = { resize: () => void };
type UIElement = Draggable & Resizable;

// Mapped type
type Nullable<T> = { [P in keyof T]: T[P] | null };

// Conditional type
type NonNullable<T> = T extends null | undefined ? never : T;
