type NonNullable<T> = T extends null | undefined ? never : T;

// Usage
type MaybeString = string | null | undefined;
type DefinitelyString = NonNullable<MaybeString>; // Type is string

function processValue<T>(value: NonNullable<T>) {
    // We can safely use 'value' here, knowing it's not null or undefined
    console.log(value);
}

processValue("Hello"); // OK
processValue(42); // OK
// processValue(null); // This would cause a type error
// processValue(undefined); // This would cause a type error
