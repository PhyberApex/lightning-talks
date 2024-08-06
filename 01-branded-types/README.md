# Branded Types

Branded types in TypeScript are a technique used to create nominally typed values from structurally typed primitives,
allowing for more precise type checking. They're implemented by intersecting a base type with an empty interface that
serves as a "brand", enabling TypeScript to distinguish between otherwise identical primitive types and prevent
accidental misuse.
