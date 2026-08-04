// Object type
interface User {
  name: string
  age: number
}

// Union type
type ID = string | number | null

// Function type
type Callback = (url: string) => void

// Intersection type
interface Draggable { drag: () => void }
interface Resizable { resize: () => void }
type UIElement = Draggable & Resizable

// Mapped type
type Nullable<T> = { [P in keyof T]: T[P] | null }
type UpdateUser = Nullable<User>

// Conditional type
type NonNullable<T> = T extends null | undefined ? never : T
type NonNullableID = NonNullable<ID>
