// Declaration merging
interface Window {
  customProperty: string;
}

// Class implementation
interface Printable {
  print(): void;
}

class Document implements Printable {
  // print() {
  //   console.log("Printing document...");
  // }
}
