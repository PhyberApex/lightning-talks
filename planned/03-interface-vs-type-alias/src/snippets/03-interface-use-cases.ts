// Declaration merging
interface Window {
  customProperty: string;
}

// Class implementation
interface Printable {
  print(): void;
}

class Document implements Printable {
  print() {
    console.log("Printing document...");
  }
}

// Extending built-in interfaces
interface MyArray<T> extends Array<T> {
  customMethod(): void;
}
