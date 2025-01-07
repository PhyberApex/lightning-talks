interface User {
  id: string;
  name: string;
}

const userSafe: User = {
  id: '123',
  name: 'John',
  extraProp: 'extra'
}

const userUnsafe = {
  id: '123',
  name: 'John',
  extraProp: 'extra'
} as User

const keys = Object.keys(userUnsafe)
const keysAssigned: Array<keyof User> = Object.keys(userUnsafe)
