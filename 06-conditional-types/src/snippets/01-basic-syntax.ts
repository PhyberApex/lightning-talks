type NumberOrString<T> = T extends number ? number : string;

let num: NumberOrString<number> = 42;
let str: NumberOrString<boolean> = "Hello";

// This would cause a type error:
let error: NumberOrString<number> = "This will fail";
