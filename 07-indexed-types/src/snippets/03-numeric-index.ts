type ExampleObj = {
  // String keys
  stringKey1: "string-value";
  stringKey2: "string-value";
  [key: number]: "number-value";
};
type StringKeyType = ExampleObj["stringKey1"];

// Practical example with array-like structure
type ArrayLike<T> = {
  length: number;
  [index: number]: T;
  map(fn: (item: T) => any): any[];
};

type ArrayElement = ArrayLike<string>[number];    // string
