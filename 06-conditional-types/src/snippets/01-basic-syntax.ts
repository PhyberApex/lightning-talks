type NumberOrString<T> = T extends number ? number : string;

let num: NumberOrString<number> = 42;
let str: NumberOrString<boolean> = "Hello";

let error: NumberOrString<number> = "This will fail";
