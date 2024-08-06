// The function that never returns
export function throwError(message: string): never {
    throw new Error(message);
}

// The infinite loop
export function infiniteLoop(): never {
    while (true) {
        console.log("I'm running forever!");
    }
}