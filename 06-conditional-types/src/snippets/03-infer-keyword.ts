type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

// Usage
function greet(name: string): string {
    return `Hello, ${name}!`;
}

type GreetReturn = ReturnType<typeof greet>; // Type is string

const numberArray = [1, 2, 3, 4, 5];
type ArrayElement<T> = T extends (infer U)[] ? U : never;
type NumberArrayElement = ArrayElement<typeof numberArray>; // Type is number
