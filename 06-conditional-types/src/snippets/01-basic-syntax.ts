type NumberOrString<T> = T extends number ? number : string

const num: NumberOrString<number> = 42
const str: NumberOrString<boolean> = 'Hello'

const error: NumberOrString<number> = 'This will fail'
