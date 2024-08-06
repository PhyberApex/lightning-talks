type ArrayElement<T> = T extends (infer E)[] ? E : never

type StringArrayElement = ArrayElement<string[]> // string
type NumberArrayElement = ArrayElement<number[]> // number
type NeverElement = ArrayElement<string> // never
