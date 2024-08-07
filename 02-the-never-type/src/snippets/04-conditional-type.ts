type ArrayElement<T> = T extends Array<(infer E)> ? E : never

export type StringArrayElement = ArrayElement<Array<string>>
export type NumberArrayElement = ArrayElement<Array<number>>
export type NeverElement = ArrayElement<string>