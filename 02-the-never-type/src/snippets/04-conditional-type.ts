type ArrayElement<T> = T extends (infer E)[] ? E : never

export type StringArrayElement = ArrayElement<string[]>
export type NumberArrayElement = ArrayElement<number[]>
export type NeverElement = ArrayElement<string>