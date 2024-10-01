type NumberOrString<T> = T extends number ? number : string;

// Usage
let num: NumberOrString<number> = 42; // Type is number
let str: NumberOrString<boolean> = "Hello"; // Type is string

// This would cause a type error:
// let error: NumberOrString<number> = "This will fail";
