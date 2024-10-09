type NonNullable<T> = T extends null | undefined ? never : T;

type MaybeString = string | null | undefined;
type DefinitelyString = NonNullable<MaybeString>; // Type is string

function processValue<T>(value: NonNullable<T>) {
    // We can safely use 'value' here, knowing it's not null or undefined
    console.log(value);
}

processValue("Hello");
processValue(42);
processValue(null);
processValue(undefined);