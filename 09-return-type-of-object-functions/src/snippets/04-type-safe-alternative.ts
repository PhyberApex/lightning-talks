interface User {
  id: string;
  name: string;
}

// Type-safe alternative using explicit property access
function getTypedKeys<T extends object>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>
}

const user = {
  id: '123',
  name: 'John',
  extraProp: 'extra'
} as User

const keys = getTypedKeys(user)
console.log(keys)