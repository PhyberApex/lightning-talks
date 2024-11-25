// Basic array type extraction
const numbers = [1, 2, 3, 4, 5]; // add a string
type NumberArray = typeof numbers;
type NumberType = NumberArray[number];

// With 'as const' for literal types
const roles = ["admin", "editor", "contributor"] //as const;
type RolesArray = typeof roles;
type Role = RolesArray[number];